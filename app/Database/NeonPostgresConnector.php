<?php

namespace App\Database;

use Illuminate\Database\Connectors\PostgresConnector;
use PDO;

class NeonPostgresConnector extends PostgresConnector
{
    /**
     * Add the SSL options to the DSN.
     *
     * @param  string  $dsn
     * @param  array  $config
     * @return string
     */
    protected function addSslOptions($dsn, array $config)
    {
        foreach (['sslmode', 'sslcert', 'sslkey', 'sslrootcert'] as $option) {
            if (isset($config[$option])) {
                $dsn .= ";{$option}={$config[$option]}";
            }
        }

        // Add Neon endpoint parameter if present
        if (isset($config['dsn_options'])) {
            $dsn .= ";options={$config['dsn_options']}";
        }

        return $dsn;
    }
}