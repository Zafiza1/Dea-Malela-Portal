<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Santri extends Model
{
    protected $table = 'santri';

    protected $fillable = [
        'nis',
        'nama',
        'jenis_kelamin',
        'tempat_lahir',
        'tanggal_lahir',
        'nama_ayah',
        'nama_ibu',
        'alamat',
        'nomor_hp',
        'jenjang',
        'kelas',
        'status',
        'catatan',
        'foto',
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
        'status' => 'string',
        'jenis_kelamin' => 'string',
    ];
}
