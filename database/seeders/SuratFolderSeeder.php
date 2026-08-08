<?php

namespace Database\Seeders;

use App\Models\SuratFolder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SuratFolderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $defaultFolders = [
            'Surat Masuk',
            'Surat Keluar',
            'SK Guru',
            'SK Santri',
            'SK Yayasan',
            'Dokumen Keuangan',
            'Dokumen Akademik',
            'Dokumen Lainnya',
        ];

        foreach ($defaultFolders as $folderName) {
            SuratFolder::firstOrCreate(
                ['nama' => $folderName],
                ['parent_id' => null]
            );
        }
    }
}
