<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GuruController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SantriController;
use App\Http\Controllers\SuratController;
use App\Models\SuratFolder;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

// Test route outside middleware group
Route::post('/test-simple-post', function(\Illuminate\Http\Request $request) {
    return response()->json(['message' => 'Simple POST works', 'data' => $request->all()]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    // Debug route for dashboard stats
    Route::get('/debug-stats', function() {
        try {
            $guruStats = \App\Models\Guru::selectRaw('
                COUNT(*) as total_guru,
                SUM(CASE WHEN status = \'aktif\' THEN 1 ELSE 0 END) as guru_aktif,
                SUM(CASE WHEN status = \'tidak_aktif\' THEN 1 ELSE 0 END) as guru_tidak_aktif
            ')->first();

            $stats = [
                'total_guru' => $guruStats->total_guru ?? 0,
                'guru_aktif' => $guruStats->guru_aktif ?? 0,
                'guru_tidak_aktif' => $guruStats->guru_tidak_aktif ?? 0,
                'total_santri' => \App\Models\Santri::count(),
                'total_surat' => \App\Models\SuratFile::count(),
                'total_folder' => \App\Models\SuratFolder::count(),
                'upload_hari_ini' => \App\Models\SuratFile::whereDate('created_at', today())->count(),
            ];

            return response()->json([
                'guru_stats' => $guruStats,
                'final_stats' => $stats,
                'date_today' => today()->toDateString(),
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    })->name('debug.stats');

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Guru Routes
    Route::middleware('can:viewAny,App\Models\Guru')->group(function () {
        Route::get('/guru', [GuruController::class, 'index'])->name('guru.index');
        Route::get('/guru/create', [GuruController::class, 'create'])->name('guru.create')->middleware('can:create,App\Models\Guru');
        Route::post('/guru', [GuruController::class, 'store'])->name('guru.store')->middleware('can:create,App\Models\Guru');
        Route::get('/guru/{guru}/edit', [GuruController::class, 'edit'])->name('guru.edit')->middleware('can:update,guru');
        Route::put('/guru/{guru}', [GuruController::class, 'update'])->name('guru.update')->middleware('can:update,guru');
        Route::delete('/guru/{guru}', [GuruController::class, 'destroy'])->name('guru.destroy')->middleware('can:delete,guru');
    });

    // Individual guru routes (accessible to both admin and their own profile)
    Route::get('/guru/{guru}', [GuruController::class, 'show'])->name('guru.show')->middleware('can:view,guru');
    Route::post('/guru/{guru}/upload-ktp', [GuruController::class, 'uploadKtp'])->name('guru.upload-ktp')->middleware('can:uploadDocuments,guru');
    Route::post('/guru/{guru}/upload-sk', [GuruController::class, 'uploadSk'])->name('guru.upload-sk')->middleware('can:uploadDocuments,guru');
    Route::get('/guru/{guru}/view-ktp', [GuruController::class, 'viewKtp'])->name('guru.view-ktp')->middleware('can:view,guru');
    Route::get('/guru/{guru}/view-sk', [GuruController::class, 'viewSk'])->name('guru.view-sk')->middleware('can:view,guru');
    Route::get('/guru/{guru}/download-ktp', [GuruController::class, 'downloadKtp'])->name('guru.download-ktp')->middleware('can:view,guru');
    Route::get('/guru/{guru}/download-sk', [GuruController::class, 'downloadSk'])->name('guru.download-sk')->middleware('can:view,guru');

    // Santri Routes
    Route::get('/santri', [SantriController::class, 'index'])->name('santri.index')->middleware('can:viewAny,App\Models\Santri');
    Route::get('/santri/create', [SantriController::class, 'create'])->name('santri.create')->middleware('can:create,App\Models\Santri');
    Route::post('/santri', [SantriController::class, 'store'])->name('santri.store')->middleware('can:create,App\Models\Santri');
    Route::get('/santri/{santri}', [SantriController::class, 'show'])->name('santri.show')->middleware('can:view,santri');
    Route::get('/santri/{santri}/edit', [SantriController::class, 'edit'])->name('santri.edit')->middleware('can:update,santri');
    Route::put('/santri/{santri}', [SantriController::class, 'update'])->name('santri.update')->middleware('can:update,santri');
    Route::delete('/santri/{santri}', [SantriController::class, 'destroy'])->name('santri.destroy')->middleware('can:delete,santri');
    Route::get('/santri/{santri}/foto', [SantriController::class, 'showFoto'])->name('santri.foto')->middleware('can:view,santri');

    // Santri Import Routes (Admin only)
    Route::get('/santri/import/template', [SantriController::class, 'downloadTemplate'])->name('santri.import.template')->middleware('can:import,App\Models\Santri');
    Route::post('/santri/import/preview', [SantriController::class, 'previewImport'])->name('santri.import.preview')->middleware('can:import,App\Models\Santri');
    Route::post('/santri/import/execute', [SantriController::class, 'executeImport'])->name('santri.import.execute')->middleware('can:import,App\Models\Santri');

    // Surat Routes
    Route::get('/surat', [SuratController::class, 'index'])->name('surat.index')->middleware('can:viewAny,App\Models\SuratFile');
    Route::post('/surat/upload', [SuratController::class, 'uploadFile'])->name('surat.upload')->middleware('can:create,App\Models\SuratFile');
    Route::get('/surat/file/{file}/download', [SuratController::class, 'downloadFile'])->name('surat.download')->middleware('can:download,file');
    Route::delete('/surat/file/{file}', [SuratController::class, 'deleteFile'])->name('surat.delete-file')->middleware('can:delete,file');
    Route::put('/surat/file/{file}', [SuratController::class, 'renameFile'])->name('surat.rename-file')->middleware('can:update,file');

    // Surat Folder Routes
    Route::post('/surat/folder', [SuratController::class, 'createFolder'])->name('surat.create-folder');
    Route::put('/surat/folder/{folder}', [SuratController::class, 'updateFolder'])->name('surat.update-folder')->middleware(['auth']);

    // Separate folder delete route with manual permission check
    Route::delete('/surat/folder/{folder}', [SuratController::class, 'deleteFolder'])
        ->name('surat.delete-folder')
        ->middleware(['auth', 'verified']);

    // Profile Routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
