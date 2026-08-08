import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function GuruEdit({ guru }: any) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        form.submit();
    };

    return (
        <>
            <Head title={`Edit Guru - ${guru.nama_lengkap}`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold">Edit Guru</h1>
                                <div className="space-x-2">
                                    <Link
                                        href="/guru"
                                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                                    >
                                        Kembali
                                    </Link>
                                    <Link
                                        href={`/guru/${guru.id}`}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Lihat
                                    </Link>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6" method="POST" action={`/guru/${guru.id}`} encType="multipart/form-data">
                                <input type="hidden" name="_method" value="PUT" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nama Lengkap
                                        </label>
                                        <input
                                            type="text"
                                            name="nama_lengkap"
                                            defaultValue={guru.nama_lengkap}
                                            className="w-full px-4 py-2 border rounded-lg"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Jenis Kelamin
                                        </label>
                                        <select
                                            name="jenis_kelamin"
                                            defaultValue={guru.jenis_kelamin}
                                            className="w-full px-4 py-2 border rounded-lg"
                                            required
                                        >
                                            <option value="L">Laki-laki</option>
                                            <option value="P">Perempuan</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tempat Lahir
                                        </label>
                                        <input
                                            type="text"
                                            name="tempat_lahir"
                                            defaultValue={guru.tempat_lahir}
                                            className="w-full px-4 py-2 border rounded-lg"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tanggal Lahir
                                        </label>
                                        <input
                                            type="date"
                                            name="tanggal_lahir"
                                            defaultValue={guru.tanggal_lahir}
                                            className="w-full px-4 py-2 border rounded-lg"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Jabatan
                                        </label>
                                        <input
                                            type="text"
                                            name="jabatan"
                                            defaultValue={guru.jabatan}
                                            className="w-full px-4 py-2 border rounded-lg"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nomor HP
                                        </label>
                                        <input
                                            type="text"
                                            name="nomor_hp"
                                            defaultValue={guru.nomor_hp}
                                            className="w-full px-4 py-2 border rounded-lg"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            defaultValue={guru.email || ''}
                                            className="w-full px-4 py-2 border rounded-lg"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Pendidikan Terakhir
                                        </label>
                                        <input
                                            type="text"
                                            name="pendidikan_terakhir"
                                            defaultValue={guru.pendidikan_terakhir}
                                            className="w-full px-4 py-2 border rounded-lg"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tanggal Masuk
                                        </label>
                                        <input
                                            type="date"
                                            name="tanggal_masuk"
                                            defaultValue={guru.tanggal_masuk}
                                            className="w-full px-4 py-2 border rounded-lg"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Status
                                        </label>
                                        <select
                                            name="status"
                                            defaultValue={guru.status}
                                            className="w-full px-4 py-2 border rounded-lg"
                                            required
                                        >
                                            <option value="aktif">Aktif</option>
                                            <option value="tidak_aktif">Tidak Aktif</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Alamat
                                    </label>
                                    <textarea
                                        name="alamat"
                                        defaultValue={guru.alamat}
                                        className="w-full px-4 py-2 border rounded-lg"
                                        rows={3}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Foto
                                        </label>
                                        <input
                                            type="file"
                                            name="foto"
                                            className="w-full px-4 py-2 border rounded-lg"
                                            accept="image/*"
                                        />
                                        {guru.foto && (
                                            <p className="text-sm text-gray-500 mt-1">
                                                Foto saat ini: {guru.foto}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            KTP
                                        </label>
                                        <input
                                            type="file"
                                            name="ktp"
                                            className="w-full px-4 py-2 border rounded-lg"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                        />
                                        {guru.ktp_path && (
                                            <p className="text-sm text-gray-500 mt-1">
                                                KTP saat ini: {guru.ktp_path}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            SK Kerja
                                        </label>
                                        <input
                                            type="file"
                                            name="sk_kerja"
                                            className="w-full px-4 py-2 border rounded-lg"
                                            accept=".pdf"
                                        />
                                        {guru.sk_kerja_path && (
                                            <p className="text-sm text-gray-500 mt-1">
                                                SK saat ini: {guru.sk_kerja_path}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
