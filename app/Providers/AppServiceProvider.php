<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use App\Models\Guru;
use App\Models\Santri;
use App\Models\SuratFile;
use App\Models\User;
use App\Policies\GuruPolicy;
use App\Policies\SantriPolicy;
use App\Policies\SuratFilePolicy;
use App\Policies\UserPolicy;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        Gate::policy(Guru::class, GuruPolicy::class);
        Gate::policy(Santri::class, SantriPolicy::class);
        Gate::policy(SuratFile::class, SuratFilePolicy::class);
        Gate::policy(User::class, UserPolicy::class);
    }
}
