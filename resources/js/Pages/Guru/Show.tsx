import { Head, Link, usePage } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { ArrowLeft } from 'lucide-react';

export default function GuruShow({ guru, auth }: any) {
    const { props } = usePage();
    const isAdmin = auth.user.roles?.some((r: any) => r.name === 'admin');
    const isGuru = auth.user.roles?.some((r: any) => r.name === 'guru');
    const isOwnProfile = isGuru && auth.user.guru?.id === guru.id;
    const csrfToken = (props as any).csrf_token;

    return (
        <DashboardLayout header={isOwnProfile ? 'Profil Saya' : 'Profil Guru'}>
            <Head title={`Profil Guru - ${guru.nama_lengkap}`} />
            <div className="py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
                                    <Link
                                        href={isAdmin ? '/guru' : '/dashboard'}
                                        className="flex items-center px-3 py-2 sm:px-4 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900 transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base"
                                    >
                                        <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
                                        <span className="font-medium">Kembali</span>
                                    </Link>
                                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                                        {isOwnProfile ? 'Profil Saya' : 'Profil Guru'}
                                    </h1>
                                </div>
                                {isAdmin && (
                                    <Link
                                        href={`/guru/${guru.id}/edit`}
                                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md w-full sm:w-auto justify-center"
                                    >
                                        <span className="font-medium">Edit</span>
                                    </Link>
                                )}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                                {/* Left Column - Photo and Basic Info */}
                                <div>
                                    <div className="mb-6 flex justify-center">
                                        <div className="w-40 h-40 sm:w-48 sm:h-48 relative">
                                            {guru.foto_url && guru.foto !== '0' && guru.foto !== 0 && guru.foto ? (
                                                <img
                                                    src={guru.foto_url}
                                                    alt={guru.nama_lengkap}
                                                    className="w-full h-full object-cover rounded-lg"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none';
                                                    }}
                                                />
                                            ) : null}
                                            {(!guru.foto_url || guru.foto === '0' || guru.foto === 0 || !guru.foto) && (
                                                <div className="placeholder w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                                                    <span className="text-gray-500">No Photo</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Nama Lengkap</label>
                                            <p className="text-base sm:text-lg font-medium">{guru.nama_lengkap}</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Jabatan</label>
                                            <p className="text-base sm:text-lg">{guru.jabatan}</p>
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
                            <div className="mt-6 sm:mt-8 border-t pt-6">
                                <h2 className="text-lg sm:text-xl font-bold mb-4">Dokumen</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <h3 className="font-medium mb-2">KTP</h3>
                                        {guru.ktp_path ? (
                                            <div className="space-y-2">
                                                <button
                                                    onClick={() => {
                                                        window.open(`/guru/${guru.id}/download-ktp`, '_blank');
                                                    }}
                                                    className="text-blue-600 hover:underline text-left"
                                                >
                                                    Download KTP
                                                </button>
                                                <form
                                                    method="POST"
                                                    action={`/guru/${guru.id}/upload-ktp`}
                                                    encType="multipart/form-data"
                                                    className="mt-2"
                                                >
                                                    <input type="hidden" name="_token" value={csrfToken} />
                                                    <input type="file" name="ktp" className="w-full px-2 py-1 border rounded text-sm" />
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
                                                <input type="hidden" name="_token" value={csrfToken} />
                                                <input type="file" name="ktp" className="w-full px-2 py-1 border rounded text-sm" />
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
                                                <button
                                                    onClick={() => {
                                                        window.open(`/guru/${guru.id}/download-sk`, '_blank');
                                                    }}
                                                    className="text-blue-600 hover:underline text-left"
                                                >
                                                    Download SK Kerja
                                                </button>
                                                <form
                                                    method="POST"
                                                    action={`/guru/${guru.id}/upload-sk`}
                                                    encType="multipart/form-data"
                                                    className="mt-2"
                                                >
                                                    <input type="hidden" name="_token" value={csrfToken} />
                                                    <input type="file" name="sk_kerja" className="w-full px-2 py-1 border rounded text-sm" />
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
                                                <input type="hidden" name="_token" value={csrfToken} />
                                                <input type="file" name="sk_kerja" className="w-full px-2 py-1 border rounded text-sm" />
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
        </DashboardLayout>
    );
}
