<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Guru;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class GuruSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $guruRole = Role::firstOrCreate(['name' => 'guru']);

        $gurus = [
            ['username' => 'tia', 'nama' => 'Ustadzah Tia'],
            ['username' => 'nia', 'nama' => 'Ustadzah Nia'],
            ['username' => 'dhiwanti', 'nama' => 'Ustadzah Dhiwanti'],
            ['username' => 'asri', 'nama' => 'Ustadzah Asri'],
            ['username' => 'intan', 'nama' => 'Ustadzah Intan'],
            ['username' => 'lisa', 'nama' => 'Ustadzah Lisa'],
            ['username' => 'nida', 'nama' => 'Ustadzah Nida'],
            ['username' => 'tami', 'nama' => 'Ustadzah Tami'],
            ['username' => 'ayu', 'nama' => 'Ustadzah Ayu'],
            ['username' => 'efi', 'nama' => 'Ustadzah Efi'],
            ['username' => 'atika', 'nama' => 'Ustadzah Atika'],
            ['username' => 'asmaul', 'nama' => 'Ustadzah Asmaul Husna'],
            ['username' => 'septi', 'nama' => 'Ustadzah Septi'],
            ['username' => 'naura', 'nama' => 'Ustadzah Naura'],
            ['username' => 'isma', 'nama' => 'Ustadzah Isma'],
            ['username' => 'hidayat', 'nama' => 'Ustadz Muhammad Hidayat'],
            ['username' => 'fachturrahman', 'nama' => 'Ustadz Mochammad Fachturrahman Spama Putra'],
            ['username' => 'ubaidillah', 'nama' => 'Ustadz Ubaidillah'],
            ['username' => 'raffa', 'nama' => 'Ustadz Raffa'],
        ];

        foreach ($gurus as $guruData) {
            $user = User::firstOrCreate(
                ['username' => $guruData['username']],
                [
                    'name' => $guruData['nama'],
                    'email' => $guruData['username'] . '@deamalela.com',
                    'password' => Hash::make('guru123'),
                    'is_active' => true,
                ]
            );

            $user->assignRole($guruRole);

            Guru::firstOrCreate(
                ['user_id' => $user->id],
                [
                    'nama_lengkap' => $guruData['nama'],
                    'jenis_kelamin' => str_starts_with($guruData['nama'], 'Ustadzah') ? 'P' : 'L',
                    'tempat_lahir' => '-',
                    'tanggal_lahir' => '1990-01-01',
                    'jabatan' => 'Guru',
                    'nomor_hp' => '081234567890',
                    'email' => $guruData['username'] . '@deamalela.com',
                    'alamat' => '-',
                    'pendidikan_terakhir' => 'S1',
                    'tanggal_masuk' => '2024-01-01',
                    'status' => 'aktif',
                ]
            );
        }
    }
}
