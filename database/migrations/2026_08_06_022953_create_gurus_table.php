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
        Schema::create('gurus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->string('nama_lengkap');
            $table->string('jenis_kelamin', 1); // 'L' or 'P'
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->string('jabatan');
            $table->string('nomor_hp');
            $table->string('email')->nullable();
            $table->text('alamat');
            $table->string('pendidikan_terakhir');
            $table->string('status', 20)->default('aktif'); // 'aktif' or 'tidak_aktif'
            $table->string('foto')->nullable();
            $table->string('ktp_path')->nullable();
            $table->string('sk_kerja_path')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gurus');
    }
};
