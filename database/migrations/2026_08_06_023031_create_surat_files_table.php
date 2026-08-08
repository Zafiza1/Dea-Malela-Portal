<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('surat_files', function (Blueprint $table) {
            $table->id();
            $table->string('nama_file');
            $table->string('path');
            $table->string('file_type');
            $table->bigInteger('file_size');
            $table->foreignId('folder_id')->nullable()->constrained('surat_folders')->onDelete('set null');
            $table->foreignId('uploaded_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surat_files');
    }
};
