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
        'file_type',
        'file_size',
        'folder_id',
        'uploaded_by',
    ];

    protected $casts = [
        'ukuran' => 'integer',
    ];

    public function folder(): BelongsTo
    {
        return $this->belongsTo(SuratFolder::class, 'folder_id');
    }
}
