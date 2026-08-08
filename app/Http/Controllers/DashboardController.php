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
        $stats = [
            'total_guru' => Guru::count(),
            'guru_aktif' => Guru::where('status', 'aktif')->count(),
            'guru_tidak_aktif' => Guru::where('status', 'tidak_aktif')->count(),
            'total_santri' => Santri::count(),
            'total_surat' => SuratFile::count(),
            'total_folder' => SuratFolder::count(),
            'upload_hari_ini' => SuratFile::whereDate('created_at', today())->count(),
        ];

        $recentDocuments = SuratFile::with(['uploadedBy', 'folder'])
            ->latest()
            ->take(5)
            ->get();

        $user = request()->user();
        
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
