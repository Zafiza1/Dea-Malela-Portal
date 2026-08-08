<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::with('roles');

        if ($request->search) {
            $query->where('name', 'like', '%' . $request->search . '%')
                ->orWhere('username', 'like', '%' . $request->search . '%');
        }

        $users = $query->latest()->paginate(10);

        return Inertia::render('User/Index', [
            'users' => $users,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('User/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|unique:users,username|max:255',
            'email' => 'nullable|email|unique:users,email|max:255',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:admin,guru',
            'is_active' => 'boolean',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'username' => $validated['username'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'is_active' => $validated['is_active'] ?? true,
        ]);

        $user->assignRole($validated['role']);

        return redirect()->route('user.index')->with('success', 'User berhasil dibuat');
    }

    public function edit(User $user)
    {
        $user->load('roles');

        return Inertia::render('User/Edit', [
            'user' => $user,
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|unique:users,username,' . $user->id . '|max:255',
            'email' => 'nullable|email|unique:users,email,' . $user->id . '|max:255',
            'password' => 'nullable|string|min:8|confirmed',
            'role' => 'required|in:admin,guru',
            'is_active' => 'boolean',
        ]);

        $user->update([
            'name' => $validated['name'],
            'username' => $validated['username'],
            'email' => $validated['email'],
            'is_active' => $validated['is_active'] ?? true,
        ]);

        if ($request->filled('password')) {
            $user->password = Hash::make($validated['password']);
            $user->save();
        }

        $user->syncRoles([$validated['role']]);

        return redirect()->route('user.index')->with('success', 'User berhasil diubah');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('user.index')->with('success', 'User berhasil dihapus');
    }

    public function resetPassword(Request $request, User $user)
    {
        $validated = $request->validate([
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user->password = Hash::make($validated['password']);
        $user->save();

        return back()->with('success', 'Password berhasil direset');
    }
}
