<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
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
