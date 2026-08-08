<?php

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use App\Models\SuratFile;
use App\Models\User;

class SuratPolicy
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
    public function view(User $user, SuratFile $suratFile): bool
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
    public function update(User $user, SuratFile $suratFile): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, SuratFile $suratFile): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can download the model.
     */
    public function download(User $user, SuratFile $suratFile): bool
    {
        return $user->hasRole('admin') || $user->hasRole('guru');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, SuratFile $suratFile): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, SuratFile $suratFile): bool
    {
        return $user->hasRole('admin');
    }
}
