<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Guru;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GuruController extends Controller
{
    public function index(Request $request)
    {
        $query = Guru::with('user');

        if ($request->search) {
            $query->where('nama_lengkap', 'like', '%' . $request->search . '%');
        }

        if ($request->status) {
            $query->where('status', $request->status);
        }

        $gurus = $query->latest()->paginate(10);

        // Generate URLs for existing files
        $gurus->getCollection()->transform(function ($guru) {
            $guru->foto_url = ($guru->foto && $guru->foto !== '0' && $guru->foto !== 0) ? Storage::disk('supabase')->url($guru->foto) : null;
            $guru->ktp_url = ($guru->ktp_path && $guru->ktp_path !== '0' && $guru->ktp_path !== 0) ? Storage::disk('supabase')->url($guru->ktp_path) : null;
            $guru->sk_kerja_url = ($guru->sk_kerja_path && $guru->sk_kerja_path !== '0' && $guru->sk_kerja_path !== 0) ? Storage::disk('supabase')->url($guru->sk_kerja_path) : null;
            return $guru;
        });

        return Inertia::render('Guru/Index', [
            'gurus' => $gurus,
            'auth' => [
                'user' => request()->user()->load('roles'),
            ],
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Guru/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'jenis_kelamin' => 'required|in:L,P',
            'tempat_lahir' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'jabatan' => 'required|string|max:255',
            'nomor_hp' => 'required|string|max:20',
            'email' => 'nullable|email|unique:users,email|max:255',
            'alamat' => 'required|string',
            'pendidikan_terakhir' => 'required|string|max:255',
            'tanggal_masuk' => 'required|date',
            'status' => 'required|in:aktif,tidak_aktif',
            'username' => 'required|string|unique:users,username|max:255',
            'password' => 'required|string|min:8|confirmed',
            'foto' => 'nullable|image|max:2048',
            'ktp' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'sk_kerja' => 'nullable|file|mimes:pdf|max:2048',
        ]);

        // Create user account
        $user = User::create([
            'name' => $validated['nama_lengkap'],
            'username' => $validated['username'],
            'email' => $validated['email'] ?? null,
            'password' => bcrypt($validated['password']),
            'is_active' => true,
        ]);

        // Assign guru role
        $user->assignRole('guru');

        // Remove user-related fields from validated data
        $guruData = array_diff_key($validated, array_flip(['username', 'password', 'password_confirmation', 'email']));

        // Create guru with user relationship
        $guru = Guru::create($guruData);
        $guru->user()->associate($user);
        $guru->save();

        if ($request->hasFile('foto')) {
            // Check if there's an invalid foto value and clean it up
            if ($guru->foto === '0' || $guru->foto === 0) {
                $guru->foto = null;
            }
            $fotoPath = $request->file('foto')->store('guru/foto', 'supabase');
            $guru->foto = $fotoPath;
        }

        if ($request->hasFile('ktp')) {
            $ktpPath = $request->file('ktp')->store('guru/ktp', 'supabase');
            $guru->ktp_path = $ktpPath;
        }

        if ($request->hasFile('sk_kerja')) {
            $skPath = $request->file('sk_kerja')->store('guru/sk', 'supabase');
            $guru->sk_kerja_path = $skPath;
        }

        $guru->save();

        return redirect()->route('guru.index')->with('success', 'Data guru dan akun login berhasil dibuat');
    }

    public function show(Guru $guru)
    {
        $guru->load('user');

        // Generate URLs for existing files
        $guru->foto_url = ($guru->foto && $guru->foto !== '0' && $guru->foto !== 0) ? Storage::disk('supabase')->url($guru->foto) : null;
        $guru->ktp_url = ($guru->ktp_path && $guru->ktp_path !== '0' && $guru->ktp_path !== 0) ? Storage::disk('supabase')->url($guru->ktp_path) : null;
        $guru->sk_kerja_url = ($guru->sk_kerja_path && $guru->sk_kerja_path !== '0' && $guru->sk_kerja_path !== 0) ? Storage::disk('supabase')->url($guru->sk_kerja_path) : null;

        return Inertia::render('Guru/Show', [
            'guru' => $guru,
        ]);
    }

    public function edit(Guru $guru)
    {
        $guru->load('user');

        // Generate URLs for existing files
        $guru->foto_url = ($guru->foto && $guru->foto !== '0' && $guru->foto !== 0) ? Storage::disk('supabase')->url($guru->foto) : null;
        $guru->ktp_url = ($guru->ktp_path && $guru->ktp_path !== '0' && $guru->ktp_path !== 0) ? Storage::disk('supabase')->url($guru->ktp_path) : null;
        $guru->sk_kerja_url = ($guru->sk_kerja_path && $guru->sk_kerja_path !== '0' && $guru->sk_kerja_path !== 0) ? Storage::disk('supabase')->url($guru->sk_kerja_path) : null;

        return Inertia::render('Guru/Edit', [
            'guru' => $guru,
        ]);
    }

    public function update(Request $request, Guru $guru)
    {
        $validated = $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'jenis_kelamin' => 'required|in:L,P',
            'tempat_lahir' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'jabatan' => 'required|string|max:255',
            'nomor_hp' => 'required|string|max:20',
            'email' => 'nullable|email|unique:users,email,' . $guru->user_id . '|max:255',
            'alamat' => 'required|string',
            'pendidikan_terakhir' => 'required|string|max:255',
            'tanggal_masuk' => 'required|date',
            'status' => 'required|in:aktif,tidak_aktif',
            'foto' => 'nullable|image|max:2048',
            'ktp' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'sk_kerja' => 'nullable|file|mimes:pdf|max:2048',
        ]);

        // Remove file fields from validated data to prevent overwriting with null
        $validated = array_diff_key($validated, array_flip(['foto', 'ktp', 'sk_kerja', 'email']));

        $guru->update($validated);

        // Update user email if provided
        if ($request->has('email') && $guru->user) {
            $guru->user->update(['email' => $request->email]);
        }

        if ($request->hasFile('foto')) {
            // Delete old photo if exists and is valid
            if ($guru->foto && $guru->foto !== '0' && $guru->foto !== 0) {
                try {
                    Storage::disk('supabase')->delete($guru->foto);
                } catch (\Exception $e) {
                    // Ignore deletion errors
                }
            }
            $fotoPath = $request->file('foto')->store('guru/foto', 'supabase');
            $guru->foto = $fotoPath;
        }

        if ($request->hasFile('ktp')) {
            if ($guru->ktp_path) {
                Storage::disk('supabase')->delete($guru->ktp_path);
            }
            $ktpPath = $request->file('ktp')->store('guru/ktp', 'supabase');
            $guru->ktp_path = $ktpPath;
        }

        if ($request->hasFile('sk_kerja')) {
            if ($guru->sk_kerja_path) {
                Storage::disk('supabase')->delete($guru->sk_kerja_path);
            }
            $skPath = $request->file('sk_kerja')->store('guru/sk', 'supabase');
            $guru->sk_kerja_path = $skPath;
        }

        $guru->save();

        return redirect()->route('guru.index')->with('success', 'Data guru berhasil diubah');
    }

    public function destroy(Guru $guru)
    {
        if ($guru->foto) {
            Storage::disk('supabase')->delete($guru->foto);
        }
        if ($guru->ktp_path) {
            Storage::disk('supabase')->delete($guru->ktp_path);
        }
        if ($guru->sk_kerja_path) {
            Storage::disk('supabase')->delete($guru->sk_kerja_path);
        }

        $guru->delete();

        return redirect()->route('guru.index')->with('success', 'Data guru berhasil dihapus');
    }

    public function uploadKtp(Request $request, Guru $guru)
    {
        $validated = $request->validate([
            'ktp' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ]);

        if ($guru->ktp_path) {
            Storage::disk('supabase')->delete($guru->ktp_path);
        }

        $ktpPath = $request->file('ktp')->store('guru/ktp', 'supabase');
        $guru->ktp_path = $ktpPath;
        $guru->save();

        return back()->with('success', 'KTP berhasil diupload');
    }

    public function uploadSk(Request $request, Guru $guru)
    {
        $validated = $request->validate([
            'sk_kerja' => 'required|file|mimes:pdf|max:2048',
        ]);

        if ($guru->sk_kerja_path) {
            Storage::disk('supabase')->delete($guru->sk_kerja_path);
        }

        $skPath = $request->file('sk_kerja')->store('guru/sk', 'supabase');
        $guru->sk_kerja_path = $skPath;
        $guru->save();

        return back()->with('success', 'SK Kerja berhasil diupload');
    }

    public function downloadKtp(Guru $guru)
    {
        if (!$guru->ktp_path) {
            return back()->with('error', 'KTP tidak tersedia');
        }

        return Storage::disk('supabase')->download($guru->ktp_path);
    }

    public function downloadSk(Guru $guru)
    {
        if (!$guru->sk_kerja_path) {
            return back()->with('error', 'SK Kerja tidak tersedia');
        }

        return Storage::disk('supabase')->download($guru->sk_kerja_path);
    }
}
