import { Head, Link, router } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import { ArrowLeft } from 'lucide-react';

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
