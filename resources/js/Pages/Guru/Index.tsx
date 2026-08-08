import { Head, Link } from '@inertiajs/react';

export default function GuruIndex({ gurus, filters, auth }: any) {
    const isAdmin = auth.user.roles?.some((r: any) => r.name === 'admin');

    return (
        <>
            <Head title="Data Guru" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold">
                                    {isAdmin ? 'Data Guru' : 'Daftar Guru'}
                                </h1>
                                {isAdmin && (
                                    <Link
                                        href="/guru/create"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Tambah Guru
                                    </Link>
                                )}
                            </div>

                            {/* Search and Filter */}
                            <div className="mb-6 flex space-x-4">
                                <input
                                    type="text"
                                    placeholder="Cari guru..."
                                    defaultValue={filters.search}
                                    className="flex-1 px-4 py-2 border rounded-lg"
                                />
                                <select
                                    defaultValue={filters.status}
                                    className="px-4 py-2 border rounded-lg"
                                >
                                    <option value="">Semua Status</option>
                                    <option value="aktif">Aktif</option>
                                    <option value="tidak_aktif">Tidak Aktif</option>
                                </select>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nama
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Jabatan
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {gurus.data.map((guru: any) => (
                                            <tr key={guru.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-medium text-gray-900">{guru.nama_lengkap}</div>
                                                    <div className="text-sm text-gray-500">{guru.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                                    {guru.jabatan}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        guru.status === 'aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {guru.status === 'aktif' ? 'Aktif' : 'Tidak Aktif'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <Link href={`/guru/${guru.id}`} className="text-blue-600 hover:text-blue-900 mr-3">
                                                        Lihat
                                                    </Link>
                                                    {isAdmin && (
                                                        <Link href={`/guru/${guru.id}/edit`} className="text-indigo-600 hover:text-indigo-900">
                                                            Edit
                                                        </Link>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
