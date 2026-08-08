<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Santri;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SantriController extends Controller
{
    public function index(Request $request)
    {
        $query = Santri::query();

        if ($request->search) {
            $query->where('nama', 'like', '%' . $request->search . '%')
                ->orWhere('nis', 'like', '%' . $request->search . '%');
        }

        if ($request->status) {
            $query->where('status', $request->status);
        }

        if ($request->jenjang) {
            $query->where('jenjang', $request->jenjang);
        }

        $santri = $query->latest()->paginate(10);

        return Inertia::render('Santri/Index', [
            'santri' => $santri,
            'filters' => $request->only(['search', 'status', 'jenjang']),
            'auth' => [
                'user' => $request->user()->load('roles'),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Santri/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nis' => 'required|string|unique:santri,nis',
            'nama' => 'required|string|max:255',
            'jenis_kelamin' => 'required|in:L,P',
            'tempat_lahir' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'nama_ayah' => 'required|string|max:255',
            'nama_ibu' => 'required|string|max:255',
            'alamat' => 'required|string',
            'nomor_hp' => 'required|string|max:20',
            'jenjang' => 'required|string|max:255',
            'kelas' => 'required|string|max:255',
            'status' => 'required|in:aktif,tidak_aktif',
            'tanggal_masuk' => 'required|date',
            'catatan' => 'nullable|string',
            'foto' => 'nullable|image|max:2048',
        ]);

        $santri = Santri::create($validated);

        if ($request->hasFile('foto')) {
            $fotoPath = $request->file('foto')->store('santri/foto', 'public');
            $santri->foto = $fotoPath;
            $santri->save();
        }

        return redirect()->route('santri.index')->with('success', 'Data santri berhasil disimpan');
    }

    public function show(Santri $santri)
    {
        return Inertia::render('Santri/Show', [
            'santri' => $santri,
            'auth' => [
                'user' => request()->user()->load('roles'),
            ],
        ]);
    }

    public function edit(Santri $santri)
    {
        return Inertia::render('Santri/Edit', [
            'santri' => $santri,
        ]);
    }

    public function update(Request $request, Santri $santri)
    {
        $validated = $request->validate([
            'nis' => 'required|string|unique:santri,nis,' . $santri->id,
            'nama' => 'required|string|max:255',
            'jenis_kelamin' => 'required|in:L,P',
            'tempat_lahir' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'nama_ayah' => 'required|string|max:255',
            'nama_ibu' => 'required|string|max:255',
            'alamat' => 'required|string',
            'nomor_hp' => 'required|string|max:20',
            'jenjang' => 'required|string|max:255',
            'kelas' => 'required|string|max:255',
            'status' => 'required|in:aktif,tidak_aktif',
            'tanggal_masuk' => 'required|date',
            'catatan' => 'nullable|string',
            'foto' => 'nullable|image|max:2048',
        ]);

        $santri->update($validated);

        if ($request->hasFile('foto')) {
            if ($santri->foto) {
                Storage::disk('public')->delete($santri->foto);
            }
            $fotoPath = $request->file('foto')->store('santri/foto', 'public');
            $santri->foto = $fotoPath;
            $santri->save();
        }

        return redirect()->route('santri.index')->with('success', 'Data santri berhasil diubah');
    }

    public function destroy(Santri $santri)
    {
        if ($santri->foto) {
            Storage::disk('public')->delete($santri->foto);
        }

        $santri->delete();

        return redirect()->route('santri.index')->with('success', 'Data santri berhasil dihapus');
    }
}
