import { Head, Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { ArrowLeft, Eye, Edit, Trash2 } from 'lucide-react';

export default function SantriIndex({ santri, auth }: any) {
    const isAdmin = auth.user.roles?.some((r: any) => r.name === 'admin');

    const handleDelete = (santriId: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus data santri ini?')) {
            router.delete(`/santri/${santriId}`, {
                onSuccess: () => {
                    router.reload();
                },
            });
        }
    };

    // const handleDelete = (santriId: number) => {
    //     if (confirm('Apakah Anda yakin ingin menghapus data santri ini?')) {
    //         router.delete(`/santri/${santriId}`, {
    //             onSuccess: () => {
    //                 router.reload();
    //             },
    //         });
    //     }
    // };

    // const columns = [
    //     {
    //         key: 'foto',
    //         label: 'Foto',
    //         render: (s: any) => (
    //             s.foto ? (
    //                 <img
    //                     src={`/storage/${s.foto}`}
    //                     alt={s.nama}
    //                     className="w-12 h-12 object-cover rounded-full"
    //                 />
    //             ) : (
    //                 <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
    //                     <span className="text-gray-500 text-xs">No Photo</span>
    //                 </div>
    //             )
    //         ),
    //     },
    //     {
    //         key: 'nis',
    //         label: 'NIS',
    //     },
    //     {
    //         key: 'nama',
    //         label: 'Nama',
    //         render: (s: any) => (
    //             <div>
    //                 <div className="font-medium text-gray-900">{s.nama}</div>
    //                 <div className="text-sm text-gray-500">
    //                     {s.tempat_lahir}, {new Date(s.tanggal_lahir).toLocaleDateString('id-ID')}
    //                 </div>
    //             </div>
    //         ),
    //     },
    //     {
    //         key: 'jenjang',
    //         label: 'Jenjang',
    //     },
    //     {
    //         key: 'kelas',
    //         label: 'Kelas',
    //     },
    //     {
    //         key: 'status',
    //         label: 'Status',
    //         render: (s: any) => (
    //             <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
    //                 s.status === 'aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    //             }`}>
    //                 {s.status === 'aktif' ? 'Aktif' : 'Tidak Aktif'}
    //             </span>
    //         ),
    //     },
    // ];

    // const handlePageChange = (page: number) => {
    //     router.get('/santri', { page });
    // };

    // const handleSearch = (query: string) => {
    //     router.get('/santri', { search: query });
    // };

    return (
        <DashboardLayout header={isAdmin ? 'Data Santri' : 'Data Santri (View Only)'}>
            <Head title="Data Santri" />
            <div className="py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
                            <Link
                                href="/dashboard"
                                className="flex items-center px-3 py-2 sm:px-4 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900 transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base"
                            >
                                <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
                                <span className="font-medium">Kembali</span>
                            </Link>
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                                {isAdmin ? 'Data Santri' : 'Data Santri (View Only)'}
                            </h1>
                        </div>
                        {isAdmin && (
                            <Link
                                href="/santri/create"
                                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md w-full sm:w-auto justify-center"
                            >
                                <span className="font-medium">Tambah Santri</span>
                            </Link>
                        )}
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Foto</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIS</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenjang</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelas</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {santri.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-4 sm:px-6 py-8 sm:py-12 text-center">
                                            <p className="text-sm text-gray-500">Tidak ada data santri</p>
                                        </td>
                                    </tr>
                                ) : (
                                    santri.data.map((s: any) => (
                                        <tr key={s.id} className="hover:bg-gray-50 transition">
                                            <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm">
                                                {s.foto ? (
                                                    <img
                                                        src={`/storage/${s.foto}`}
                                                        alt={s.nama}
                                                        className="w-12 h-12 object-cover rounded-full"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                                        <span className="text-gray-500 text-xs">No Photo</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm">{s.nis}</td>
                                            <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm">
                                                <div>
                                                    <div className="font-medium text-gray-900">{s.nama}</div>
                                                    <div className="text-sm text-gray-500">
                                                        {s.tempat_lahir}, {new Date(s.tanggal_lahir).toLocaleDateString('id-ID')}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm">{s.jenjang}</td>
                                            <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm">{s.kelas}</td>
                                            <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    s.status === 'aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {s.status === 'aktif' ? 'Aktif' : 'Tidak Aktif'}
                                                </span>
                                            </td>
                                            <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-right text-sm">
                                                <div className="flex items-center space-x-2 justify-end">
                                                    <Link
                                                        href={`/santri/${s.id}`}
                                                        className="flex items-center px-3 py-1.5 text-sm text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                                                    >
                                                        <Eye className="w-4 h-4 mr-1" />
                                                        Lihat
                                                    </Link>
                                                    {isAdmin && (
                                                        <>
                                                            <Link
                                                                href={`/santri/${s.id}/edit`}
                                                                className="flex items-center px-3 py-1.5 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                                            >
                                                                <Edit className="w-4 h-4 mr-1" />
                                                                Edit
                                                            </Link>
                                                            <button
                                                                onClick={() => handleDelete(s.id)}
                                                                className="flex items-center px-3 py-1.5 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                                            >
                                                                <Trash2 className="w-4 h-4 mr-1" />
                                                                Hapus
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                        
                        {/* Simple Pagination */}
                        {santri.last_page > 1 && (
                            <div className="px-4 sm:px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                                <div className="text-xs sm:text-sm text-gray-500">
                                    Menampilkan {((santri.current_page - 1) * santri.per_page) + 1} - {Math.min(santri.current_page * santri.per_page, santri.total)} dari {santri.total} data
                                </div>
                                <div className="flex items-center gap-2">
                                    {santri.current_page > 1 && (
                                        <Link
                                            href={`/santri?page=${santri.current_page - 1}`}
                                            className="px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 transition text-sm"
                                        >
                                            Previous
                                        </Link>
                                    )}
                                    <span className="px-3 py-1 rounded-lg bg-green-600 text-white text-sm">
                                        {santri.current_page}
                                    </span>
                                    {santri.current_page < santri.last_page && (
                                        <Link
                                            href={`/santri?page=${santri.current_page + 1}`}
                                            className="px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 transition text-sm"
                                        >
                                            Next
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
