<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        
        // Force HTTPS for asset URLs in production
        if (app()->environment('production')) {
            $this->forceHttpsForAssets();
        }
        
        // Generate URLs for user files with validation
        if ($user) {
            $user->profile_photo_url = null;
            if ($user->profile_photo_path && $user->profile_photo_path !== '0' && $user->profile_photo_path !== '' && $user->profile_photo_path !== null) {
                try {
                    $user->profile_photo_url = Storage::disk('supabase')->url($user->profile_photo_path);
                } catch (\Exception $e) {
                    $user->profile_photo_url = null;
                }
            }
        }
        
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user ? $user->load('roles', 'guru') : null,
            ],
        ];
    }

    /**
     * Force HTTPS for all asset URLs
     */
    protected function forceHttpsForAssets(): void
    {
        if (request()->secure()) {
            config(['app.asset_url' => str_replace('http://', 'https://', config('app.asset_url', config('app.url')))]);
        }
    }
}
