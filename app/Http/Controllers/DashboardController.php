<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Guru;
use App\Models\Santri;
use App\Models\SuratFile;
use App\Models\SuratFolder;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        try {
            // Debug: Log query execution
            \Log::info('Dashboard stats query started');

            // Optimize stats queries by grouping
            $guruStats = Guru::selectRaw('
                COUNT(*) as total_guru,
                SUM(CASE WHEN status = \'aktif\' THEN 1 ELSE 0 END) as guru_aktif,
                SUM(CASE WHEN status = \'tidak_aktif\' THEN 1 ELSE 0 END) as guru_tidak_aktif
            ')->first();

            \Log::info('Guru stats result', ['stats' => $guruStats]);

            $stats = [
                'total_guru' => $guruStats->total_guru ?? 0,
                'guru_aktif' => $guruStats->guru_aktif ?? 0,
                'guru_tidak_aktif' => $guruStats->guru_tidak_aktif ?? 0,
                'total_santri' => Santri::count(),
                'total_surat' => SuratFile::count(),
                'total_folder' => SuratFolder::count(),
                'upload_hari_ini' => SuratFile::whereDate('created_at', today())->count(),
            ];

            \Log::info('Final stats', ['stats' => $stats]);

            $recentDocuments = SuratFile::with(['uploadedBy', 'folder'])
                ->latest()
                ->take(5)
                ->get();
        } catch (\Exception $e) {
            // Log error
            \Log::error('Dashboard stats error', ['error' => $e->getMessage()]);

            // Fallback jika database tidak terhubung
            $stats = [
                'total_guru' => 0,
                'guru_aktif' => 0,
                'guru_tidak_aktif' => 0,
                'total_santri' => 0,
                'total_surat' => 0,
                'total_folder' => 0,
                'upload_hari_ini' => 0,
            ];
            $recentDocuments = collect();
        }

        $user = request()->user()->load(['roles', 'guru']);

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'recentDocuments' => $recentDocuments,
            'auth' => [
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'username' => $user->username,
                    'email' => $user->email,
                    'roles' => $user->roles->toArray(),
                    'guru' => $user->guru ? [
                        'id' => $user->guru->id,
                        'nama_lengkap' => $user->guru->nama_lengkap,
                    ] : null,
                ],
            ],
        ]);
    }
}
