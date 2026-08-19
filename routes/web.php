<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GuruController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SantriController;
use App\Http\Controllers\SuratController;
use App\Http\Controllers\UserController;
use App\Models\SuratFolder;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Test GET route first
    Route::get('/test-folder-create', [SuratController::class, 'createFolder'])->name('surat.test-create-folder');
    
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

    // Surat Routes
    Route::get('/surat', [SuratController::class, 'index'])->name('surat.index')->middleware('can:viewAny,App\Models\SuratFile');
    Route::post('/surat/upload', [SuratController::class, 'uploadFile'])->name('surat.upload')->middleware('can:create,App\Models\SuratFile');
    Route::get('/surat/file/{file}/download', [SuratController::class, 'downloadFile'])->name('surat.download')->middleware('can:download,file');
    Route::delete('/surat/file/{file}', [SuratController::class, 'deleteFile'])->name('surat.delete-file')->middleware('can:delete,file');
    Route::put('/surat/file/{file}', [SuratController::class, 'renameFile'])->name('surat.rename-file')->middleware('can:update,file');

    // Surat Folder Routes
    Route::get('/test-folder', function() {
        return response()->json(['message' => 'Test route works']);
    });
    Route::put('/surat/folder/{folder}', [SuratController::class, 'updateFolder'])->name('surat.update-folder')->middleware(['auth']);

    // Separate folder delete route with manual permission check
    Route::delete('/surat/folder/{folder}', [SuratController::class, 'deleteFolder'])
        ->name('surat.delete-folder')
        ->middleware(['auth', 'verified']);

    // User Routes
    Route::get('/user', [UserController::class, 'index'])->name('user.index')->middleware('can:viewAny,App\Models\User');
    Route::get('/user/create', [UserController::class, 'create'])->name('user.create')->middleware('can:create,App\Models\User');
    Route::post('/user', [UserController::class, 'store'])->name('user.store')->middleware('can:create,App\Models\User');
    Route::get('/user/{user}/edit', [UserController::class, 'edit'])->name('user.edit')->middleware('can:update,user');
    Route::put('/user/{user}', [UserController::class, 'update'])->name('user.update')->middleware('can:update,user');
    Route::delete('/user/{user}', [UserController::class, 'destroy'])->name('user.destroy')->middleware('can:delete,user');
    Route::post('/user/{user}/reset-password', [UserController::class, 'resetPassword'])->name('user.reset-password')->middleware('can:resetPassword,user');

    // Profile Routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
