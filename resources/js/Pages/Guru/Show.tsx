import { Head, Link } from '@inertiajs/react';

export default function GuruShow({ guru, auth }: any) {
    const isAdmin = auth.user.roles?.some((r: any) => r.name === 'admin');
    const isGuru = auth.user.roles?.some((r: any) => r.name === 'guru');
    const isOwnProfile = isGuru && auth.user.guru?.id === guru.id;

    return (
        <>
            <Head title={`Profil Guru - ${guru.nama_lengkap}`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold">
                                    {isOwnProfile ? 'Profil Saya' : 'Profil Guru'}
                                </h1>
                                <div className="space-x-2">
                                    <Link
                                        href={isAdmin ? '/guru' : '/dashboard'}
                                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                                    >
                                        Kembali
                                    </Link>
                                    {isAdmin && (
                                        <Link
                                            href={`/guru/${guru.id}/edit`}
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
                                        {guru.foto ? (
                                            <img
                                                src={`/storage/${guru.foto}`}
                                                alt={guru.nama_lengkap}
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
                                            <label className="block text-sm font-medium text-gray-500">Nama Lengkap</label>
                                            <p className="text-lg font-medium">{guru.nama_lengkap}</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Jabatan</label>
                                            <p className="text-lg">{guru.jabatan}</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Status</label>
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                guru.status === 'aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                                {guru.status === 'aktif' ? 'Aktif' : 'Tidak Aktif'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column - Detailed Info */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Tempat, Tanggal Lahir</label>
                                        <p>{guru.tempat_lahir}, {new Date(guru.tanggal_lahir).toLocaleDateString('id-ID')}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Jenis Kelamin</label>
                                        <p>{guru.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Nomor HP</label>
                                        <p>{guru.nomor_hp}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Email</label>
                                        <p>{guru.email || '-'}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Pendidikan Terakhir</label>
                                        <p>{guru.pendidikan_terakhir}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Tanggal Masuk</label>
                                        <p>{new Date(guru.tanggal_masuk).toLocaleDateString('id-ID')}</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Alamat</label>
                                        <p>{guru.alamat}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Documents Section */}
                            <div className="mt-8 border-t pt-6">
                                <h2 className="text-xl font-bold mb-4">Dokumen</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <h3 className="font-medium mb-2">KTP</h3>
                                        {guru.ktp_path ? (
                                            <div className="space-y-2">
                                                <a
                                                    href={`/guru/${guru.id}/download-ktp`}
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    Download KTP
                                                </a>
                                                <form
                                                    method="POST"
                                                    action={`/guru/${guru.id}/upload-ktp`}
                                                    encType="multipart/form-data"
                                                    className="mt-2"
                                                >
                                                    <input type="file" name="ktp" className="w-full px-2 py-1 border rounded" />
                                                    <button
                                                        type="submit"
                                                        className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                                                    >
                                                        Update KTP
                                                    </button>
                                                </form>
                                            </div>
                                        ) : (
                                            <form
                                                method="POST"
                                                action={`/guru/${guru.id}/upload-ktp`}
                                                encType="multipart/form-data"
                                            >
                                                <input type="file" name="ktp" className="w-full px-2 py-1 border rounded" />
                                                <button
                                                    type="submit"
                                                    className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                                                >
                                                    Upload KTP
                                                </button>
                                            </form>
                                        )}
                                    </div>

                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <h3 className="font-medium mb-2">SK Kerja</h3>
                                        {guru.sk_kerja_path ? (
                                            <div className="space-y-2">
                                                <a
                                                    href={`/guru/${guru.id}/download-sk`}
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    Download SK Kerja
                                                </a>
                                                <form
                                                    method="POST"
                                                    action={`/guru/${guru.id}/upload-sk`}
                                                    encType="multipart/form-data"
                                                    className="mt-2"
                                                >
                                                    <input type="file" name="sk_kerja" className="w-full px-2 py-1 border rounded" />
                                                    <button
                                                        type="submit"
                                                        className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                                                    >
                                                        Update SK
                                                    </button>
                                                </form>
                                            </div>
                                        ) : (
                                            <form
                                                method="POST"
                                                action={`/guru/${guru.id}/upload-sk`}
                                                encType="multipart/form-data"
                                            >
                                                <input type="file" name="sk_kerja" className="w-full px-2 py-1 border rounded" />
                                                <button
                                                    type="submit"
                                                    className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                                                >
                                                    Upload SK
                                                </button>
                                            </form>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
