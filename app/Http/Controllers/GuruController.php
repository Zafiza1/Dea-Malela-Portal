<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Guru;
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

        return Inertia::render('Guru/Index', [
            'gurus' => $gurus,
            'filters' => $request->only(['search', 'status']),
            'auth' => [
                'user' => request()->user()->load('roles'),
            ],
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
            'email' => 'nullable|email|max:255',
            'alamat' => 'required|string',
            'pendidikan_terakhir' => 'required|string|max:255',
            'tanggal_masuk' => 'required|date',
            'status' => 'required|in:aktif,tidak_aktif',
            'foto' => 'nullable|image|max:2048',
            'ktp' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'sk_kerja' => 'nullable|file|mimes:pdf|max:2048',
        ]);

        $guru = Guru::create($validated);

        if ($request->hasFile('foto')) {
            $fotoPath = $request->file('foto')->store('guru/foto', 'public');
            $guru->foto = $fotoPath;
        }

        if ($request->hasFile('ktp')) {
            $ktpPath = $request->file('ktp')->store('guru/ktp', 'public');
            $guru->ktp_path = $ktpPath;
        }

        if ($request->hasFile('sk_kerja')) {
            $skPath = $request->file('sk_kerja')->store('guru/sk', 'public');
            $guru->sk_kerja_path = $skPath;
        }

        $guru->save();

        return redirect()->route('guru.index')->with('success', 'Data guru berhasil disimpan');
    }

    public function show(Guru $guru)
    {
        $guru->load('user');

        return Inertia::render('Guru/Show', [
            'guru' => $guru,
            'auth' => [
                'user' => request()->user()->load('roles', 'guru'),
            ],
        ]);
    }

    public function edit(Guru $guru)
    {
        $guru->load('user');

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
            'email' => 'nullable|email|max:255',
            'alamat' => 'required|string',
            'pendidikan_terakhir' => 'required|string|max:255',
            'tanggal_masuk' => 'required|date',
            'status' => 'required|in:aktif,tidak_aktif',
            'foto' => 'nullable|image|max:2048',
            'ktp' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'sk_kerja' => 'nullable|file|mimes:pdf|max:2048',
        ]);

        $guru->update($validated);

        if ($request->hasFile('foto')) {
            if ($guru->foto) {
                Storage::disk('public')->delete($guru->foto);
            }
            $fotoPath = $request->file('foto')->store('guru/foto', 'public');
            $guru->foto = $fotoPath;
        }

        if ($request->hasFile('ktp')) {
            if ($guru->ktp_path) {
                Storage::disk('public')->delete($guru->ktp_path);
            }
            $ktpPath = $request->file('ktp')->store('guru/ktp', 'public');
            $guru->ktp_path = $ktpPath;
        }

        if ($request->hasFile('sk_kerja')) {
            if ($guru->sk_kerja_path) {
                Storage::disk('public')->delete($guru->sk_kerja_path);
            }
            $skPath = $request->file('sk_kerja')->store('guru/sk', 'public');
            $guru->sk_kerja_path = $skPath;
        }

        $guru->save();

        return redirect()->route('guru.index')->with('success', 'Data guru berhasil diubah');
    }

    public function destroy(Guru $guru)
    {
        if ($guru->foto) {
            Storage::disk('public')->delete($guru->foto);
        }
        if ($guru->ktp_path) {
            Storage::disk('public')->delete($guru->ktp_path);
        }
        if ($guru->sk_kerja_path) {
            Storage::disk('public')->delete($guru->sk_kerja_path);
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
            Storage::disk('public')->delete($guru->ktp_path);
        }

        $ktpPath = $request->file('ktp')->store('guru/ktp', 'public');
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
            Storage::disk('public')->delete($guru->sk_kerja_path);
        }

        $skPath = $request->file('sk_kerja')->store('guru/sk', 'public');
        $guru->sk_kerja_path = $skPath;
        $guru->save();

        return back()->with('success', 'SK Kerja berhasil diupload');
    }

    public function downloadKtp(Guru $guru)
    {
        if (!$guru->ktp_path) {
            return back()->with('error', 'KTP tidak tersedia');
        }

        return Storage::disk('public')->download($guru->ktp_path);
    }

    public function downloadSk(Guru $guru)
    {
        if (!$guru->sk_kerja_path) {
            return back()->with('error', 'SK Kerja tidak tersedia');
        }

        return Storage::disk('public')->download($guru->sk_kerja_path);
    }
}
