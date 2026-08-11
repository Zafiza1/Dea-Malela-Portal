import React from 'react';
import { Head, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { ArrowLeft } from 'lucide-react';

export default function SantriCreate() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        form.submit();
    };

    return (
        <DashboardLayout header="Tambah Santri">
            <Head title="Tambah Santri" />
            <div className="py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
                                    <Link
                                        href="/santri"
                                        className="flex items-center px-3 py-2 sm:px-4 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900 transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base"
                                    >
                                        <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
                                        <span className="font-medium">Kembali</span>
                                    </Link>
                                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Tambah Santri</h1>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6" method="POST" action="/santri" encType="multipart/form-data">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            NIS
                                        </label>
                                        <input
                                            type="text"
                                            name="nis"
                                            className="w-full px-4 py-2 border rounded-lg"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nama
                                        </label>
                                        <input
                                            type="text"
                                            name="nama"
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
                                            className="w-full px-4 py-2 border rounded-lg"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nama Ayah
                                        </label>
                                        <input
                                            type="text"
                                            name="nama_ayah"
                                            className="w-full px-4 py-2 border rounded-lg"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nama Ibu
                                        </label>
                                        <input
                                            type="text"
                                            name="nama_ibu"
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
                                            className="w-full px-4 py-2 border rounded-lg"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Jenjang
                                        </label>
                                        <select
                                            name="jenjang"
                                            className="w-full px-4 py-2 border rounded-lg"
                                            required
                                        >
                                            <option value="">Pilih Jenjang</option>
                                            <option value="SD">SD</option>
                                            <option value="SMP">SMP</option>
                                            <option value="SMA">SMA</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Kelas
                                        </label>
                                        <input
                                            type="text"
                                            name="kelas"
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
                                        className="w-full px-4 py-2 border rounded-lg"
                                        rows={3}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Catatan
                                    </label>
                                    <textarea
                                        name="catatan"
                                        className="w-full px-4 py-2 border rounded-lg"
                                        rows={3}
                                    />
                                </div>

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
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Simpan
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
