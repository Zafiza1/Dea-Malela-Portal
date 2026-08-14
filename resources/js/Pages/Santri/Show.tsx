import { Head, Link } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { ArrowLeft } from 'lucide-react';

export default function SantriShow({ santri, auth }: any) {
    const isAdmin = auth.user.roles?.some((r: any) => r.name === 'admin');

    return (
        <DashboardLayout header="Detail Santri">
            <Head title={`Data Santri - ${santri.nama}`} />
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
                                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Data Santri</h1>
                                </div>
                                {isAdmin && (
                                    <Link
                                        href={`/santri/${santri.id}/edit`}
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
                                        {santri.foto_url ? (
                                            <img
                                                src={santri.foto_url}
                                                alt={santri.nama}
                                                className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-lg"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                }}
                                            />
                                        ) : (
                                            <div className="w-40 h-40 sm:w-48 sm:h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                                                <span className="text-gray-500">No Photo</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">NIS</label>
                                            <p className="text-base sm:text-lg font-medium">{santri.nis}</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-500">Nama</label>
                                            <p className="text-base sm:text-lg font-medium">{santri.nama}</p>
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
        </DashboardLayout>
    );
}
