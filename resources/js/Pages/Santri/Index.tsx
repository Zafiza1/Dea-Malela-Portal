import { Head, Link, router } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';

export default function SantriIndex({ santri, auth }: any) {
    const isAdmin = auth.user.roles?.some((r: any) => r.name === 'admin');

    const columns = [
        {
            key: 'foto',
            label: 'Foto',
            render: (s: any) => (
                s.foto ? (
                    <img
                        src={`/storage/${s.foto}`}
                        alt={s.nama}
                        className="w-12 h-12 object-cover rounded-full"
                    />
                ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-500 text-xs">No Photo</span>
                    </div>
                )
            ),
        },
        {
            key: 'nis',
            label: 'NIS',
        },
        {
            key: 'nama',
            label: 'Nama',
            render: (s: any) => (
                <div>
                    <div className="font-medium text-gray-900">{s.nama}</div>
                    <div className="text-sm text-gray-500">
                        {s.tempat_lahir}, {new Date(s.tanggal_lahir).toLocaleDateString('id-ID')}
                    </div>
                </div>
            ),
        },
        {
            key: 'jenjang',
            label: 'Jenjang',
        },
        {
            key: 'kelas',
            label: 'Kelas',
        },
        {
            key: 'status',
            label: 'Status',
            render: (s: any) => (
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    s.status === 'aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                    {s.status === 'aktif' ? 'Aktif' : 'Tidak Aktif'}
                </span>
            ),
        },
    ];

    const handlePageChange = (page: number) => {
        router.get('/santri', { page });
    };

    const handleSearch = (query: string) => {
        router.get('/santri', { search: query });
    };

    return (
        <>
            <Head title="Data Santri" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">
                            {isAdmin ? 'Data Santri' : 'Data Santri (View Only)'}
                        </h1>
                        {isAdmin && (
                            <Link
                                href="/santri/create"
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                            >
                                Tambah Santri
                            </Link>
                        )}
                    </div>

                    <DataTable
                        data={santri.data}
                        columns={columns}
                        pagination={{
                            current_page: santri.current_page,
                            last_page: santri.last_page,
                            per_page: santri.per_page,
                            total: santri.total,
                        }}
                        onPageChange={handlePageChange}
                        onSearch={handleSearch}
                        emptyMessage="Tidak ada data santri"
                        actions={(s: any) => (
                            <Link href={`/santri/${s.id}`} className="text-green-600 hover:text-green-700">
                                Lihat
                            </Link>
                        )}
                    />
                </div>
            </div>
        </>
    );
}
