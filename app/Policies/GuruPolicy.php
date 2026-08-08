<?php

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use App\Models\Guru;
use App\Models\User;

class GuruPolicy
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
    public function view(User $user, Guru $guru): bool
    {
        // Admin can view any guru
        if ($user->hasRole('admin')) {
            return true;
        }

        // Guru can view their own profile
        if ($user->hasRole('guru') && $user->guru && $user->guru->id === $guru->id) {
            return true;
        }

        // Guru can also view other gurus (for collaboration purposes)
        if ($user->hasRole('guru')) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Guru $guru): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        if ($user->hasRole('guru') && $user->guru && $user->guru->id === $guru->id) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Guru $guru): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can upload documents.
     */
    public function uploadDocuments(User $user, Guru $guru): bool
    {
        // Admin can upload for any guru
        if ($user->hasRole('admin')) {
            return true;
        }

        // Guru can upload their own documents
        if ($user->hasRole('guru') && $user->guru && $user->guru->id === $guru->id) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Guru $guru): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Guru $guru): bool
    {
        return $user->hasRole('admin');
    }
}
