import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { ArrowLeft } from 'lucide-react';

// Helper function to format date for HTML date input
const formatDateForInput = (dateString: string | null | undefined): string => {
    if (!dateString) return '';
    return dateString.split('T')[0]; // Extract just the date part
};

export default function SantriEdit({ santri }: any) {
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(santri.foto_url || null);

    const { data, setData, put, processing, errors } = useForm({
        nis: santri.nis,
        nama: santri.nama,
        jenis_kelamin: santri.jenis_kelamin,
        tempat_lahir: santri.tempat_lahir,
        tanggal_lahir: formatDateForInput(santri.tanggal_lahir),
        nama_ayah: santri.nama_ayah,
        nama_ibu: santri.nama_ibu,
        alamat: santri.alamat,
        nomor_hp: santri.nomor_hp,
        jenjang: santri.jenjang,
        kelas: santri.kelas,
        status: santri.status,
        catatan: santri.catatan || '',
        foto: null as File | null,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('foto', file);
        
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        } else {
            setPreviewUrl(santri.foto_url || null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/santri/${santri.id}`);
    };

    return (
        <DashboardLayout header="Edit Santri">
            <Head title={`Edit Santri - ${santri.nama}`} />
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
                                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Edit Santri</h1>
                                </div>
                                <Link
                                    href={`/santri/${santri.id}`}
                                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md w-full sm:w-auto justify-center"
                                >
                                    <span className="font-medium">Lihat</span>
                                </Link>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            NIS
                                        </label>
                                        <input
                                            type="text"
                                            value={data.nis}
                                            onChange={(e) => setData('nis', e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                            required
                                        />
                                        {errors.nis && <p className="text-red-500 text-sm mt-1">{errors.nis}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nama
                                        </label>
                                        <input
                                            type="text"
                                            value={data.nama}
                                            onChange={(e) => setData('nama', e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                            required
                                        />
                                        {errors.nama && <p className="text-red-500 text-sm mt-1">{errors.nama}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Jenis Kelamin
                                        </label>
                                        <select
                                            value={data.jenis_kelamin}
                                            onChange={(e) => setData('jenis_kelamin', e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                            required
                                        >
                                            <option value="L">Laki-laki</option>
                                            <option value="P">Perempuan</option>
                                        </select>
                                        {errors.jenis_kelamin && <p className="text-red-500 text-sm mt-1">{errors.jenis_kelamin}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tempat Lahir
                                        </label>
                                        <input
                                            type="text"
                                            value={data.tempat_lahir}
                                            onChange={(e) => setData('tempat_lahir', e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                            required
                                        />
                                        {errors.tempat_lahir && <p className="text-red-500 text-sm mt-1">{errors.tempat_lahir}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tanggal Lahir
                                        </label>
                                        <input
                                            type="date"
                                            value={data.tanggal_lahir}
                                            onChange={(e) => setData('tanggal_lahir', e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                            required
                                        />
                                        {errors.tanggal_lahir && <p className="text-red-500 text-sm mt-1">{errors.tanggal_lahir}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nama Ayah
                                        </label>
                                        <input
                                            type="text"
                                            value={data.nama_ayah}
                                            onChange={(e) => setData('nama_ayah', e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                            required
                                        />
                                        {errors.nama_ayah && <p className="text-red-500 text-sm mt-1">{errors.nama_ayah}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nama Ibu
                                        </label>
                                        <input
                                            type="text"
                                            value={data.nama_ibu}
                                            onChange={(e) => setData('nama_ibu', e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                            required
                                        />
                                        {errors.nama_ibu && <p className="text-red-500 text-sm mt-1">{errors.nama_ibu}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nomor HP
                                        </label>
                                        <input
                                            type="text"
                                            value={data.nomor_hp}
                                            onChange={(e) => setData('nomor_hp', e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                            required
                                        />
                                        {errors.nomor_hp && <p className="text-red-500 text-sm mt-1">{errors.nomor_hp}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Jenjang
                                        </label>
                                        <select
                                            value={data.jenjang}
                                            onChange={(e) => setData('jenjang', e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                            required
                                        >
                                            <option value="">Pilih Jenjang</option>
                                            <option value="SD">SD</option>
                                            <option value="SMP">SMP</option>
                                            <option value="SMA">SMA</option>
                                        </select>
                                        {errors.jenjang && <p className="text-red-500 text-sm mt-1">{errors.jenjang}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Kelas
                                        </label>
                                        <input
                                            type="text"
                                            value={data.kelas}
                                            onChange={(e) => setData('kelas', e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                            required
                                        />
                                        {errors.kelas && <p className="text-red-500 text-sm mt-1">{errors.kelas}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Status
                                        </label>
                                        <select
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg"
                                            required
                                        >
                                            <option value="aktif">Aktif</option>
                                            <option value="tidak_aktif">Tidak Aktif</option>
                                        </select>
                                        {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Alamat
                                    </label>
                                    <textarea
                                        value={data.alamat}
                                        onChange={(e) => setData('alamat', e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg"
                                        rows={3}
                                        required
                                    />
                                    {errors.alamat && <p className="text-red-500 text-sm mt-1">{errors.alamat}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Catatan
                                    </label>
                                    <textarea
                                        value={data.catatan}
                                        onChange={(e) => setData('catatan', e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg"
                                        rows={3}
                                    />
                                    {errors.catatan && <p className="text-red-500 text-sm mt-1">{errors.catatan}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Foto
                                    </label>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="w-full px-4 py-2 border rounded-lg"
                                        accept="image/*"
                                    />
                                    {previewUrl && (
                                        <div className="mt-2">
                                            <img
                                                src={previewUrl}
                                                alt="Preview"
                                                className="h-32 w-32 object-cover rounded-lg border"
                                            />
                                        </div>
                                    )}
                                    {santri.foto && !previewUrl && (
                                        <p className="text-sm text-gray-500 mt-1">
                                            Foto saat ini: {santri.foto}
                                        </p>
                                    )}
                                    {errors.foto && <p className="text-red-500 text-sm mt-1">{errors.foto}</p>}
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                                    >
                                        {processing ? 'Updating...' : 'Update'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
