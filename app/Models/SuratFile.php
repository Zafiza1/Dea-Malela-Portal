<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SuratFile extends Model
{
    protected $table = 'surat_files';

    protected $fillable = [
        'nama_file',
        'path',
        'tipe_file',
        'ukuran',
        'folder_id',
    ];

    protected $casts = [
        'ukuran' => 'integer',
    ];

    public function folder(): BelongsTo
    {
        return $this->belongsTo(SuratFolder::class, 'folder_id');
    }
}
