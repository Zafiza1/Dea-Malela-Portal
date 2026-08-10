import { Head, Link, router } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';

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
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">
                            Data Guru
                        </h1>
                        {isAdmin && (
                            <Link
                                href="/guru/create"
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                            >
                                Tambah Guru
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
