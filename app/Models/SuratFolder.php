<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SuratFolder extends Model
{
    protected $table = 'surat_folders';

    protected $fillable = [
        'nama',
        'parent_id',
        'created_by',
    ];

    public function parent(): BelongsTo
    {
        return $this->belongsTo(SuratFolder::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(SuratFolder::class, 'parent_id');
    }

    public function files(): HasMany
    {
        return $this->hasMany(SuratFile::class, 'folder_id');
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
