import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function SantriEdit({ santri }: any) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        form.submit();
    };

    return (
        <>
            <Head title={`Edit Santri - ${santri.nama}`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold">Edit Santri</h1>
                                <div className="space-x-2">
                                    <Link
                                        href="/santri"
                                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                                    >
                                        Kembali
                                    </Link>
                                    <Link
                                        href={`/santri/${santri.id}`}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Lihat
                                    </Link>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6" method="POST" action={`/santri/${santri.id}`} encType="multipart/form-data">
                                <input type="hidden" name="_method" value="PUT" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            NIS
                                        </label>
                                        <input
                                            type="text"
                                            name="nis"
                                            defaultValue={santri.nis}
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
                                            defaultValue={santri.nama}
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
                                            defaultValue={santri.jenis_kelamin}
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
                                            defaultValue={santri.tempat_lahir}
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
                                            defaultValue={santri.tanggal_lahir}
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
                                            defaultValue={santri.nama_ayah}
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
                                            defaultValue={santri.nama_ibu}
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
                                            defaultValue={santri.nomor_hp}
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
                                            defaultValue={santri.jenjang}
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
                                            defaultValue={santri.kelas}
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
                                            defaultValue={santri.tanggal_masuk}
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
                                            defaultValue={santri.status}
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
                                        defaultValue={santri.alamat}
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
                                        defaultValue={santri.catatan || ''}
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
                                    {santri.foto && (
                                        <p className="text-sm text-gray-500 mt-1">
                                            Foto saat ini: {santri.foto}
                                        </p>
                                    )}
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
