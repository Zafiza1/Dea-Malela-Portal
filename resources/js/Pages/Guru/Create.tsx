import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { ArrowLeft } from 'lucide-react';

export default function GuruCreate() {
    const { data, setData, post, processing, errors } = useForm({
        nama_lengkap: '',
        jenis_kelamin: 'L',
        tempat_lahir: '',
        tanggal_lahir: '',
        jabatan: '',
        nomor_hp: '',
        email: '',
        alamat: '',
        pendidikan_terakhir: '',
        tanggal_masuk: '',
        status: 'aktif',
        username: '',
        password: '',
        password_confirmation: '',
        foto: null as File | null,
        ktp: null as File | null,
        sk_kerja: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        post('/guru');
    };

    return (
        <DashboardLayout header="Tambah Guru">
            <Head title="Tambah Guru" />
            <div className="py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
                                    <Link
                                        href="/guru"
                                        className="flex items-center px-3 py-2 sm:px-4 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900 transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base"
                                    >
                                        <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
                                        <span className="font-medium">Kembali</span>
                                    </Link>
                                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Tambah Guru</h1>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nama Lengkap
                                        </label>
                                        <input
                                            type="text"
                                            value={data.nama_lengkap}
                                            onChange={(e) => setData('nama_lengkap', e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                            required
                                        />
                                        {errors.nama_lengkap && <p className="text-red-500 text-sm mt-1">{errors.nama_lengkap}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Jenis Kelamin
                                        </label>
                                        <select
                                            value={data.jenis_kelamin}
                                            onChange={(e) => setData('jenis_kelamin', e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                            required
                                        >
                                            <option value="L">Laki-laki</option>
                                            <option value="P">Perempuan</option>
                                        </select>
                                        {errors.jenis_kelamin && <p className="text-red-500 text-sm mt-1">{errors.jenis_kelamin}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tempat Lahir
                                        </label>
                                        <input
                                            type="text"
                                            value={data.tempat_lahir}
                                            onChange={(e) => setData('tempat_lahir', e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                            required
                                        />
                                        {errors.tempat_lahir && <p className="text-red-500 text-sm mt-1">{errors.tempat_lahir}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tanggal Lahir
                                        </label>
                                        <input
                                            type="date"
                                            value={data.tanggal_lahir}
                                            onChange={(e) => setData('tanggal_lahir', e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                            required
                                        />
                                        {errors.tanggal_lahir && <p className="text-red-500 text-sm mt-1">{errors.tanggal_lahir}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Jabatan
                                        </label>
                                        <input
                                            type="text"
                                            value={data.jabatan}
                                            onChange={(e) => setData('jabatan', e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                            required
                                        />
                                        {errors.jabatan && <p className="text-red-500 text-sm mt-1">{errors.jabatan}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nomor HP
                                        </label>
                                        <input
                                            type="text"
                                            value={data.nomor_hp}
                                            onChange={(e) => setData('nomor_hp', e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                            required
                                        />
                                        {errors.nomor_hp && <p className="text-red-500 text-sm mt-1">{errors.nomor_hp}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Pendidikan Terakhir
                                        </label>
                                        <input
                                            type="text"
                                            value={data.pendidikan_terakhir}
                                            onChange={(e) => setData('pendidikan_terakhir', e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                            required
                                        />
                                        {errors.pendidikan_terakhir && <p className="text-red-500 text-sm mt-1">{errors.pendidikan_terakhir}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tanggal Masuk
                                        </label>
                                        <input
                                            type="date"
                                            value={data.tanggal_masuk}
                                            onChange={(e) => setData('tanggal_masuk', e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                            required
                                        />
                                        {errors.tanggal_masuk && <p className="text-red-500 text-sm mt-1">{errors.tanggal_masuk}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Status
                                        </label>
                                        <select
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                            required
                                        >
                                            <option value="aktif">Aktif</option>
                                            <option value="tidak_aktif">Tidak Aktif</option>
                                        </select>
                                        {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Alamat
                                    </label>
                                    <textarea
                                        value={data.alamat}
                                        onChange={(e) => setData('alamat', e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg"
                                        rows={3}
                                        required
                                    />
                                    {errors.alamat && <p className="text-red-500 text-sm mt-1">{errors.alamat}</p>}
                                </div>

                                <div className="border-t pt-6 mt-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Akun Login</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Username
                                            </label>
                                            <input
                                                type="text"
                                                value={data.username}
                                                onChange={(e) => setData('username', e.target.value)}
                                                className="w-full px-4 py-2 border rounded-lg"
                                                required
                                            />
                                            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                                        </div>

                                        <div></div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                className="w-full px-4 py-2 border rounded-lg"
                                                required
                                            />
                                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Konfirmasi Password
                                            </label>
                                            <input
                                                type="password"
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                className="w-full px-4 py-2 border rounded-lg"
                                                required
                                            />
                                            {errors.password_confirmation && <p className="text-red-500 text-sm mt-1">{errors.password_confirmation}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Foto
                                        </label>
                                        <input
                                            type="file"
                                            onChange={(e) => setData('foto', e.target.files?.[0] || null)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                            accept="image/*"
                                        />
                                        {errors.foto && <p className="text-red-500 text-sm mt-1">{errors.foto}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            KTP
                                        </label>
                                        <input
                                            type="file"
                                            onChange={(e) => setData('ktp', e.target.files?.[0] || null)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                        />
                                        {errors.ktp && <p className="text-red-500 text-sm mt-1">{errors.ktp}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            SK Kerja
                                        </label>
                                        <input
                                            type="file"
                                            onChange={(e) => setData('sk_kerja', e.target.files?.[0] || null)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                            accept=".pdf"
                                        />
                                        {errors.sk_kerja && <p className="text-red-500 text-sm mt-1">{errors.sk_kerja}</p>}
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                                    >
                                        {processing ? 'Menyimpan...' : 'Simpan'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
