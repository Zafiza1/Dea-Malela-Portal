<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\DB;

class NeonServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Only process Neon.tech hosts, skip Supabase and other providers
        if (env('DB_CONNECTION') === 'pgsql' && env('DB_HOST')) {
            $dbHost = env('DB_HOST');
            if (strpos($dbHost, 'neon.tech') !== false) {
                // Extract endpoint ID from host
                $endpointId = $this->extractEndpointId($dbHost);
                if ($endpointId) {
                    config(['database.connections.pgsql.dsn_options' => "endpoint={$endpointId}"]);
                }
            }
        }
    }

    private function extractEndpointId($host): ?string
    {
        // Extract endpoint ID from Neon host
        // ep-lively-hill-auf3qss9.c-10.us-east-1.aws.neon.tech -> ep-lively-hill-auf3qss9
        if (preg_match('/^([a-z0-9-]+)\./', $host, $matches)) {
            return $matches[1];
        }
        return null;
    }
}
