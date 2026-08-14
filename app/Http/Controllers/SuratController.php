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
        
        $folders = SuratFolder::where('parent_id', $folderId)
            ->with('createdBy')
            ->get();

        $files = SuratFile::when($folderId, function ($query) use ($folderId) {
            return $query->where('folder_id', $folderId);
        })
            ->with(['uploadedBy', 'folder'])
            ->latest()
            ->get()
            ->map(function ($file) {
                // Map to match FilePreviewModal interface
                return [
                    'id' => $file->id,
                    'nama_file' => $file->nama_file,
                    'file_path' => $file->path, // Map 'path' to 'file_path'
                    'file_type' => $file->file_type,
                    'file_size' => $file->file_size,
                ];
            });

        $currentFolder = $folderId ? SuratFolder::find($folderId) : null;

        return Inertia::render('Surat/Index', [
            'folders' => $folders,
            'files' => $files,
            'currentFolder' => $currentFolder,
            'parentFolder' => $currentFolder ? $currentFolder->parent : null,
        ]);
    }

    public function createFolder(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:surat_folders,id',
        ]);

        try {
            SuratFolder::create([
                'nama' => $validated['nama'],
                'parent_id' => $validated['parent_id'] ?? null,
                'created_by' => auth()->id(),
            ]);

            return back()->with('success', 'Folder berhasil dibuat');
        } catch (\Exception $e) {
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
        $validated = $request->validate([
            'file' => 'required|file|max:20480',
            'folder_id' => 'nullable|exists:surat_folders,id',
        ]);

        try {
            $file = $request->file('file');
            $fileName = $file->getClientOriginalName();
            $fileType = $file->getClientOriginalExtension();
            $fileSize = $file->getSize();

            $path = $file->store('surat/' . ($request->folder_id ?? 'root'), 'public');

            SuratFile::create([
                'nama_file' => $fileName,
                'path' => $path,
                'file_type' => $fileType,
                'file_size' => $fileSize,
                'folder_id' => $request->folder_id,
                'uploaded_by' => auth()->id(),
            ]);

            return back()->with('success', 'File berhasil diupload');
        } catch (\Exception $e) {
            return back()->with('error', 'Gagal upload file: ' . $e->getMessage());
        }
    }

    public function downloadFile(SuratFile $file)
    {
        return Storage::disk('public')->download($file->path);
    }

    public function deleteFile(SuratFile $file)
    {
        Storage::disk('public')->delete($file->path);
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
