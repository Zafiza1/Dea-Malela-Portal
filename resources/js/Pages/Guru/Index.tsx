import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { ArrowLeft, Eye, Edit, Trash2 } from 'lucide-react';
import LoadingSpinner from '@/Components/LoadingSpinner';
import type { User, PaginatedResponse } from '../../types/global';

interface Guru {
    id: number;
    nama_lengkap: string;
    email: string;
    jabatan: string;
    status: string;
    foto?: string;
    foto_url?: string;
}

interface GuruIndexProps {
    gurus: PaginatedResponse<Guru>;
    auth: {
        user: User;
    };
}

export default function GuruIndex({ gurus, auth }: GuruIndexProps) {
    const isAdmin = auth.user.roles?.some((r) => r.name === 'admin');
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const handleDelete = (guruId: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus data guru ini?')) {
            setDeletingId(guruId);
            router.delete(`/guru/${guruId}`, {
                onSuccess: () => {
                    setDeletingId(null);
                    router.reload();
                },
                onError: () => {
                    setDeletingId(null);
                },
            });
        }
    };

    // const handleDelete = (guruId: number) => {
    //     if (confirm('Apakah Anda yakin ingin menghapus data guru ini?')) {
    //         setDeletingId(guruId);
    //         router.delete(`/guru/${guruId}`, {
    //             onSuccess: () => {
    //                 setDeletingId(null);
    //                 router.reload();
    //             },
    //             onError: () => {
    //                 setDeletingId(null);
    //             },
    //         });
    //     }
    // };

    // const columns = [
    //     {
    //         key: 'nama_lengkap',
    //         label: 'Nama',
    //         render: (guru: Guru) => (
    //             <div>
    //                 <div className="font-medium text-gray-900">{guru.nama_lengkap}</div>
    //                 <div className="text-sm text-gray-500">{guru.email}</div>
    //             </div>
    //         ),
    //     },
    //     {
    //         key: 'jabatan',
    //         label: 'Jabatan',
    //     },
    //     {
    //         key: 'status',
    //         label: 'Status',
    //         render: (guru: Guru) => (
    //             <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
    //                 guru.status === 'aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    //             }`}>
    //                 {guru.status === 'aktif' ? 'Aktif' : 'Tidak Aktif'}
    //             </span>
    //         ),
    //     },
    // ];

    // const handlePageChange = (page: number) => {
    //     router.get('/guru', { page });
    // };

    // const handleSearch = (query: string) => {
    //     router.get('/guru', { search: query });
    // };

    return (
        <DashboardLayout header="Data Guru">
            <Head title="Data Guru" />
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
                                Data Guru
                            </h1>
                        </div>
                        {isAdmin && (
                            <Link
                                href="/guru/create"
                                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md w-full sm:w-auto justify-center"
                            >
                                <span className="font-medium">Tambah Guru</span>
                            </Link>
                        )}
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Foto</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jabatan</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {gurus.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-4 sm:px-6 py-8 sm:py-12 text-center">
                                            <p className="text-sm text-gray-500">Tidak ada data guru</p>
                                        </td>
                                    </tr>
                                ) : (
                                    gurus.data.map((guru: Guru) => (
                                        <tr key={guru.id} className="hover:bg-gray-50 transition">
                                            <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm">
                                                {guru.foto_url && guru.foto !== '0' && guru.foto !== 0 ? (
                                                    <img
                                                        src={guru.foto_url}
                                                        alt={guru.nama_lengkap}
                                                        className="h-10 w-10 object-cover rounded-full"
                                                        onError={(e) => {
                                                            e.currentTarget.style.display = 'none';
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                        <span className="text-gray-500 text-xs">{guru.nama_lengkap.charAt(0)}</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm">
                                                <div>
                                                    <div className="font-medium text-gray-900">{guru.nama_lengkap}</div>
                                                    <div className="text-sm text-gray-500">{guru.email}</div>
                                                </div>
                                            </td>
                                            <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm">{guru.jabatan}</td>
                                            <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    guru.status === 'aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {guru.status === 'aktif' ? 'Aktif' : 'Tidak Aktif'}
                                                </span>
                                            </td>
                                            <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-right text-sm">
                                                <div className="flex items-center space-x-2 justify-end">
                                                    <Link
                                                        href={`/guru/${guru.id}`}
                                                        className="flex items-center px-3 py-1.5 text-sm text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                                                    >
                                                        <Eye className="w-4 h-4 mr-1" />
                                                        Lihat
                                                    </Link>
                                                    {isAdmin && (
                                                        <>
                                                            <Link
                                                                href={`/guru/${guru.id}/edit`}
                                                                className="flex items-center px-3 py-1.5 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                                            >
                                                                <Edit className="w-4 h-4 mr-1" />
                                                                Edit
                                                            </Link>
                                                            <button
                                                                onClick={() => handleDelete(guru.id)}
                                                                disabled={deletingId === guru.id}
                                                                className="flex items-center px-3 py-1.5 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[80px] justify-center"
                                                            >
                                                                {deletingId === guru.id ? (
                                                                    <LoadingSpinner size="sm" />
                                                                ) : (
                                                                    <>
                                                                        <Trash2 className="w-4 h-4 mr-1" />
                                                                        Hapus
                                                                    </>
                                                                )}
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
                        {gurus.last_page > 1 && (
                            <div className="px-4 sm:px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                                <div className="text-xs sm:text-sm text-gray-500">
                                    Menampilkan {((gurus.current_page - 1) * gurus.per_page) + 1} - {Math.min(gurus.current_page * gurus.per_page, gurus.total)} dari {gurus.total} data
                                </div>
                                <div className="flex items-center gap-2">
                                    {gurus.current_page > 1 && (
                                        <Link
                                            href={`/guru?page=${gurus.current_page - 1}`}
                                            className="px-3 py-1 rounded-lg border border-gray-200 hover:bg-gray-50 transition text-sm"
                                        >
                                            Previous
                                        </Link>
                                    )}
                                    <span className="px-3 py-1 rounded-lg bg-green-600 text-white text-sm">
                                        {gurus.current_page}
                                    </span>
                                    {gurus.current_page < gurus.last_page && (
                                        <Link
                                            href={`/guru?page=${gurus.current_page + 1}`}
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
