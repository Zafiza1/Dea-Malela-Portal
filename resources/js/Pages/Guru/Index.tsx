import { Head, Link, router } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import { ArrowLeft } from 'lucide-react';

export default function GuruIndex({ gurus, auth }: any) {
    const isAdmin = auth.user.roles?.some((r: any) => r.name === 'admin');

    const columns = [
        {
            key: 'nama_lengkap',
            label: 'Nama',
            render: (guru: any) => (
                <div>
                    <div className="font-medium text-gray-900">{guru.nama_lengkap}</div>
                    <div className="text-sm text-gray-500">{guru.email}</div>
                </div>
            ),
        },
        {
            key: 'jabatan',
            label: 'Jabatan',
        },
        {
            key: 'status',
            label: 'Status',
            render: (guru: any) => (
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    guru.status === 'aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                    {guru.status === 'aktif' ? 'Aktif' : 'Tidak Aktif'}
                </span>
            ),
        },
    ];

    const handlePageChange = (page: number) => {
        router.get('/guru', { page });
    };

    const handleSearch = (query: string) => {
        router.get('/guru', { search: query });
    };

    return (
        <>
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

                    <DataTable
                        data={gurus.data}
                        columns={columns}
                        pagination={{
                            current_page: gurus.current_page,
                            last_page: gurus.last_page,
                            per_page: gurus.per_page,
                            total: gurus.total,
                        }}
                        onPageChange={handlePageChange}
                        onSearch={handleSearch}
                        emptyMessage="Tidak ada data guru"
                        actions={(guru: any) => (
                            <div className="flex items-center space-x-2">
                                <Link href={`/guru/${guru.id}`} className="text-green-600 hover:text-green-700">
                                    Lihat
                                </Link>
                                {isAdmin && (
                                    <Link href={`/guru/${guru.id}/edit`} className="text-blue-600 hover:text-blue-700">
                                        Edit
                                    </Link>
                                )}
                            </div>
                        )}
                    />
                </div>
            </div>
        </>
    );
}
