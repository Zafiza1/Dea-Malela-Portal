<?php

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use App\Models\SuratFolder;
use App\Models\User;

class SuratFolderPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasRole('admin') || $user->hasRole('guru');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, SuratFolder $folder): bool
    {
        return $user->hasRole('admin') || $user->hasRole('guru');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasRole('admin') || $user->hasRole('guru');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, SuratFolder $folder): bool
    {
        return $user->hasRole('admin') || ($user->hasRole('guru') && $folder->created_by === $user->id);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, SuratFolder $folder): bool
    {
        // Admin can delete any folder
        if ($user->hasRole('admin')) {
            return true;
        }

        // Guru can delete any folder for easier file management
        if ($user->hasRole('guru')) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, SuratFolder $folder): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, SuratFolder $folder): bool
    {
        return $user->hasRole('admin');
    }
}
