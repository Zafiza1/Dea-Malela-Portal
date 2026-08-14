<?php

namespace App\Models;

use App\Models\User;
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
        'file_size' => 'integer',
    ];

    public function folder(): BelongsTo
    {
        return $this->belongsTo(SuratFolder::class, 'folder_id');
    }

    public function uploadedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}
