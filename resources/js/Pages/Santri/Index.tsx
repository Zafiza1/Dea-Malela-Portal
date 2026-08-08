import { Head, Link } from '@inertiajs/react';

export default function SantriIndex({ santri, filters, auth }: any) {
    const isAdmin = auth.user.roles?.some((r: any) => r.name === 'admin');

    return (
        <>
            <Head title="Data Santri" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold">
                                    {isAdmin ? 'Data Santri' : 'Data Santri (View Only)'}
                                </h1>
                                {isAdmin && (
                                    <Link
                                        href="/santri/create"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Tambah Santri
                                    </Link>
                                )}
                            </div>

                            {/* Search and Filter */}
                            <div className="mb-6 flex space-x-4">
                                <input
                                    type="text"
                                    placeholder="Cari santri..."
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
                                <select
                                    defaultValue={filters.jenjang}
                                    className="px-4 py-2 border rounded-lg"
                                >
                                    <option value="">Semua Jenjang</option>
                                    <option value="SD">SD</option>
                                    <option value="SMP">SMP</option>
                                    <option value="SMA">SMA</option>
                                </select>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Foto
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                NIS
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Nama
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Jenjang
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Kelas
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
                                        {santri.data.map((s: any) => (
                                            <tr key={s.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
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
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                                    {s.nis}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-medium text-gray-900">{s.nama}</div>
                                                    <div className="text-sm text-gray-500">
                                                        {s.tempat_lahir}, {new Date(s.tanggal_lahir).toLocaleDateString('id-ID')}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                                    {s.jenjang}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                                    {s.kelas}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        s.status === 'aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {s.status === 'aktif' ? 'Aktif' : 'Tidak Aktif'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <Link href={`/santri/${s.id}`} className="text-blue-600 hover:text-blue-900">
                                                        Lihat
                                                    </Link>
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
