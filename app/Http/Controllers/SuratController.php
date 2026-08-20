<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\SuratFile;
use App\Models\SuratFolder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SuratController extends Controller
{
    public function index(Request $request)
    {
        $folderId = $request->folder_id;
        
        // Get folders
        $folders = SuratFolder::where('parent_id', $folderId)
            ->get();
        \Log::info('Folders loaded', ['count' => $folders->count(), 'folderId' => $folderId]);

        // Hanya tampilkan file jika berada di dalam folder
        if ($folderId) {
            $files = SuratFile::where('folder_id', $folderId)
                ->with(['folder'])
                ->latest()
                ->get()
                ->map(function ($file) {
                    // Map to match FilePreviewModal interface
                    return [
                        'id' => $file->id,
                        'nama_file' => $file->nama_file,
                        'file_path' => $file->path,
                        'file_type' => $file->file_type,
                        'file_size' => $file->file_size,
                        'file_url' => ($file->path && $file->path !== '0' && $file->path !== 0) ? Storage::url($file->path) : null,
                    ];
                });
        } else {
            $files = collect(); // Kosong di root
        }

        $currentFolder = $folderId ? SuratFolder::find($folderId) : null;
        
        \Log::info('Surat index data', [
            'folderId' => $folderId,
            'currentFolder' => $currentFolder ? $currentFolder->toArray() : null,
            'foldersCount' => $folders->count(),
            'filesCount' => $files->count(),
        ]);

        return Inertia::render('Surat/Index', [
            'folders' => $folders,
            'files' => $files,
            'currentFolder' => $currentFolder,
            'parentFolder' => $currentFolder ? $currentFolder->parent : null,
        ]);
    }

    public function createFolder(Request $request)
    {
        try {
            \Log::info('createFolder called', [
                'method' => $request->method(),
                'all_data' => $request->all(),
                'user_id' => auth()->id(),
                'user_authenticated' => auth()->check()
            ]);

            // Simple validation
            $validated = $request->validate([
                'nama' => 'required|string|max:255',
                'parent_id' => 'nullable|integer',
            ]);

            \Log::info('Validation passed', ['validated' => $validated]);

            // Simple database insert with retry
            $folder = null;
            $retries = 3;
            for ($i = 0; $i < $retries; $i++) {
                try {
                    $folder = SuratFolder::create([
                        'nama' => $validated['nama'],
                        'parent_id' => $validated['parent_id'] ?? null,
                    ]);
                    \Log::info('Folder created', ['folder' => $folder, 'folder_id' => $folder->id ?? null]);
                    break;
                } catch (\Exception $dbError) {
                    \Log::error("Database error attempt " . ($i + 1) . ": " . $dbError->getMessage());
                    if ($i < $retries - 1) {
                        sleep(1); // Wait before retry
                    } else {
                        throw $dbError;
                    }
                }
            }

            return back()->with('success', 'Folder berhasil dibuat');
        } catch (\Exception $e) {
            \Log::error('createFolder error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ]);
            return back()->with('error', 'Gagal membuat folder: ' . $e->getMessage());
        }
    }

    public function updateFolder(Request $request, SuratFolder $folder)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
        ]);

        $folder->update($validated);

        return back()->with('success', 'Folder berhasil diubah');
    }

    public function deleteFolder(SuratFolder $folder)
    {
        // Manual permission check using Gate directly
        if (!Gate::allows('delete', $folder)) {
            abort(403, 'You do not have permission to delete this folder');
        }

        if ($folder->children()->exists() || $folder->files()->exists()) {
            return back()->with('error', 'Folder tidak kosong');
        }

        $folder->delete();

        return back()->with('success', 'Folder berhasil dihapus');
    }

    public function uploadFile(Request $request)
    {
        try {
            // Check if file is present
            if (!$request->hasFile('file')) {
                \Log::error('No file in request', ['request_data' => $request->all()]);
                return back()->with('error', 'Tidak ada file yang diupload');
            }

            $file = $request->file('file');
            if (!$file->isValid()) {
                \Log::error('File upload validation failed', [
                    'error' => $file->getErrorMessage(),
                    'file_name' => $file->getClientOriginalName(),
                ]);
                return back()->with('error', 'File upload gagal: ' . $file->getErrorMessage());
            }

            $fileName = $file->getClientOriginalName();
            $fileType = $file->getClientOriginalExtension();
            $fileSize = $file->getSize();

            // Use default storage disk and folder-specific path
            $folderPath = $request->folder_id ? 'surat/' . $request->folder_id : 'surat/root';
            $path = $file->store($folderPath);

            \Log::info('File upload details', [
                'original_name' => $fileName,
                'folder_id' => $request->folder_id,
                'storage_path' => $path,
                'storage_disk' => config('filesystems.default'),
                'file_size' => $fileSize,
            ]);

            // Database insert with retry
            $retries = 3;
            for ($i = 0; $i < $retries; $i++) {
                try {
                    SuratFile::create([
                        'nama_file' => $fileName,
                        'path' => $path,
                        'file_type' => $fileType,
                        'file_size' => $fileSize,
                        'folder_id' => $request->folder_id,
                        'uploaded_by' => auth()->id(),
                    ]);
                    \Log::info('File uploaded successfully', ['file_id' => $path]);
                    break;
                } catch (\Exception $dbError) {
                    \Log::error("Database error attempt " . ($i + 1) . ": " . $dbError->getMessage());
                    if ($i < $retries - 1) {
                        sleep(1);
                    } else {
                        throw $dbError;
                    }
                }
            }

            return back()->with('success', 'File berhasil diupload');
        } catch (\Exception $e) {
            \Log::error('uploadFile error: ' . $e->getMessage());
            \Log::error('Stack trace: ' . $e->getTraceAsString());
            return back()->with('error', 'Gagal upload file: ' . $e->getMessage());
        }
    }

    public function downloadFile(SuratFile $file)
    {
        return Storage::download($file->path);
    }

    public function deleteFile(SuratFile $file)
    {
        Storage::delete($file->path);
        $file->delete();

        return back()->with('success', 'File berhasil dihapus');
    }

    public function renameFile(Request $request, SuratFile $file)
    {
        $validated = $request->validate([
            'nama_file' => 'required|string|max:255',
        ]);

        $file->update($validated);

        return back()->with('success', 'File berhasil diubah nama');
    }
}
