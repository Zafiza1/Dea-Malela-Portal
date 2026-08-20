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

        // Generate URLs for existing files through proxy
        $santri->getCollection()->transform(function ($s) {
            $s->foto_url = ($s->foto && $s->foto !== '0' && $s->foto !== 0) ? route('santri.foto', $s) : null;
            return $s;
        });

        return Inertia::render('Santri/Index', [
            'santri' => $santri,
            'auth' => [
                'user' => request()->user()->load('roles'),
            ],
            'filters' => $request->only(['search', 'status', 'jenjang']),
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
            'catatan' => 'nullable|string',
            'foto' => 'nullable|image|max:2048',
        ]);

        $santri = Santri::create($validated);

        if ($request->hasFile('foto')) {
            $fotoPath = $request->file('foto')->store('santri/foto');
            $santri->foto = $fotoPath;
            $santri->save();
        }

        return redirect()->route('santri.index')->with('success', 'Data santri berhasil disimpan');
    }

    public function show(Santri $santri)
    {
        // Generate URL for existing file through proxy
        $santri->foto_url = ($santri->foto && $santri->foto !== '0' && $santri->foto !== 0) ? route('santri.foto', $santri) : null;

        return Inertia::render('Santri/Show', [
            'santri' => $santri,
            'auth' => [
                'user' => request()->user()->load('roles'),
            ],
        ]);
    }

    public function showFoto(Santri $santri)
    {
        if (!$santri->foto || $santri->foto === '0' || $santri->foto === 0) {
            abort(404);
        }

        $file = Storage::get($santri->foto);
        $mimeType = Storage::mimeType($santri->foto);

        return response($file)->header('Content-Type', $mimeType);
    }

    public function edit(Santri $santri)
    {
        // Generate URL for existing file through proxy
        $santri->foto_url = ($santri->foto && $santri->foto !== '0' && $santri->foto !== 0) ? route('santri.foto', $santri) : null;

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
            'catatan' => 'nullable|string',
            'foto' => 'nullable|image|max:2048',
        ]);

        // Remove file fields from validated data to prevent overwriting with null
        $validated = array_diff_key($validated, array_flip(['foto']));

        $santri->update($validated);

        if ($request->hasFile('foto')) {
            if ($santri->foto) {
                Storage::delete($santri->foto);
            }
            $fotoPath = $request->file('foto')->store('santri/foto');
            $santri->foto = $fotoPath;
            $santri->save();
        }

        return redirect()->route('santri.index')->with('success', 'Data santri berhasil diubah');
    }

    public function destroy(Santri $santri)
    {
        if ($santri->foto) {
            Storage::delete($santri->foto);
        }

        $santri->delete();

        return redirect()->route('santri.index')->with('success', 'Data santri berhasil dihapus');
    }
}
