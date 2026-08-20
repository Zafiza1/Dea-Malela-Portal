<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use App\Models\Guru;
use App\Models\Santri;
use App\Models\SuratFile;
use App\Models\SuratFolder;
use App\Models\User;
use App\Policies\GuruPolicy;
use App\Policies\SantriPolicy;
use App\Policies\SuratFilePolicy;
use App\Policies\SuratFolderPolicy;
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
        // Force HTTP in local development to avoid browser HTTPS upgrade
        if (app()->environment('local')) {
            \Illuminate\Support\Facades\URL::forceScheme('http');
        }

        // Force HTTPS for all URLs in production
        if (app()->environment('production')) {
            \Illuminate\Support\Facades\URL::forceScheme('https');
        }

        Vite::prefetch(concurrency: 3);

        Gate::policy(Guru::class, GuruPolicy::class);
        Gate::policy(Santri::class, SantriPolicy::class);
        Gate::policy(SuratFile::class, SuratFilePolicy::class);
        Gate::policy(SuratFolder::class, SuratFolderPolicy::class);
        Gate::policy(User::class, UserPolicy::class);
    }
}
