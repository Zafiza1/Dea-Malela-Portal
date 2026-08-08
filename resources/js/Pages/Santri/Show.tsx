import { Head, Link } from '@inertiajs/react';

export default function SantriShow({ santri, auth }: any) {
    const isAdmin = auth.user.roles?.some((r: any) => r.name === 'admin');

    return (
        <>
            <Head title={`Data Santri - ${santri.nama}`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold">Data Santri</h1>
                                <div className="space-x-2">
                                    <Link
                                        href="/santri"
                                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                                    >
                                        Kembali
                                    </Link>
                                    {isAdmin && (
                                        <Link
                                            href={`/santri/${santri.id}/edit`}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                        >
                                            Edit
                                        </Link>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Left Column - Photo and Basic Info */}
                                <div>
                                    <div className="mb-6">
                                        {santri.foto ? (
                                            <img
                                                src={`/storage/${santri.foto}`}
                                                alt={santri.nama}
                                                className="w-48 h-48 object-cover rounded-lg mx-auto"
                                            />
                                        ) : (
                                            <div className="w-48 h-48 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
                                                <span className="text-gray-500">No Photo</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">NIS</label>
                                            <p className="text-lg font-medium">{santri.nis}</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Nama</label>
                                            <p className="text-lg font-medium">{santri.nama}</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Status</label>
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                santri.status === 'aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                                {santri.status === 'aktif' ? 'Aktif' : 'Tidak Aktif'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Detailed Info */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Tempat, Tanggal Lahir</label>
                                        <p>{santri.tempat_lahir}, {new Date(santri.tanggal_lahir).toLocaleDateString('id-ID')}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Jenis Kelamin</label>
                                        <p>{santri.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Nama Ayah</label>
                                        <p>{santri.nama_ayah}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Nama Ibu</label>
                                        <p>{santri.nama_ibu}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Nomor HP</label>
                                        <p>{santri.nomor_hp}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Jenjang</label>
                                        <p>{santri.jenjang}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Kelas</label>
                                        <p>{santri.kelas}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Tanggal Masuk</label>
                                        <p>{new Date(santri.tanggal_masuk).toLocaleDateString('id-ID')}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Alamat</label>
                                        <p>{santri.alamat}</p>
                                    </div>

                                    {santri.catatan && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Catatan</label>
                                            <p>{santri.catatan}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
