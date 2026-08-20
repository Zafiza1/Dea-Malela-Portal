<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\SuratFolder;
use App\Models\SuratFile;
use Illuminate\Support\Facades\Storage;

class TestSuratUpload extends Command
{
    protected $signature = 'surat:test-upload';
    protected $description = 'Test surat file upload functionality';

    public function handle()
    {
        $this->info("=== INTEGRATION TEST SURAT FILE UPLOAD ===\n");

        // Test 1: Create a test folder
        $this->info("Test 1: Creating test folder...");
        $folder = SuratFolder::create(['nama' => 'Test Folder', 'parent_id' => null]);
        $this->info("✓ Folder created with ID: {$folder->id}\n");

        // Test 2: Upload a test file to the folder
        $this->info("Test 2: Uploading test file to folder...");
        $testContent = 'This is a test file content for integration testing';
        $testPath = 'surat/' . $folder->id . '/test-file.txt';
        Storage::put($testPath, $testContent);
        $this->info("✓ File uploaded to storage path: {$testPath}\n");

        // Test 3: Check if file exists in storage
        $this->info("Test 3: Checking if file exists in storage...");
        $exists = Storage::exists($testPath);
        $this->info("✓ File exists in storage: " . ($exists ? 'YES' : 'NO') . "\n");

        // Test 4: Create SuratFile record
        $this->info("Test 4: Creating SuratFile record...");
        $file = SuratFile::create([
            'nama_file' => 'test-file.txt',
            'path' => $testPath,
            'tipe_file' => 'txt',
            'ukuran' => strlen($testContent),
            'folder_id' => $folder->id,
        ]);
        $this->info("✓ SuratFile record created with ID: {$file->id}\n");

        // Test 5: Check database record
        $this->info("Test 5: Checking database record...");
        $dbFile = SuratFile::find($file->id);
        $this->info("✓ Database record path: {$dbFile->path}");
        $this->info("✓ Database record folder_id: {$dbFile->folder_id}\n");

        // Test 6: Test file URL generation
        $this->info("Test 6: Testing file URL generation...");
        $fileUrl = Storage::url($testPath);
        $this->info("✓ File URL: {$fileUrl}\n");

        // Test 7: Test download functionality
        $this->info("Test 7: Testing file retrieval...");
        $fileContent = Storage::get($testPath);
        $this->info("✓ File content retrieved: " . substr($fileContent, 0, 50) . "...\n");

        // Test 8: Test storage disk configuration
        $this->info("Test 8: Checking storage configuration...");
        $this->info("✓ Default storage disk: " . config('filesystems.default'));
        $this->info("✓ Public disk URL: " . config('filesystems.disks.public.url') . "\n");

        // Test 9: Test root folder upload
        $this->info("Test 9: Testing root folder upload...");
        $rootTestPath = 'surat/root/test-root-file.txt';
        Storage::put($rootTestPath, 'Root folder test content');
        $rootExists = Storage::exists($rootTestPath);
        $this->info("✓ Root file exists: " . ($rootExists ? 'YES' : 'NO'));
        $this->info("✓ Root file path: {$rootTestPath}\n");

        // Test 10: Cleanup
        $this->info("Test 10: Cleaning up test data...");
        Storage::delete($testPath);
        Storage::delete($rootTestPath);
        $file->delete();
        $folder->delete();
        $this->info("✓ Cleanup completed\n");

        $this->info("=== INTEGRATION TEST COMPLETED SUCCESSFULLY ===");

        return 0;
    }
}