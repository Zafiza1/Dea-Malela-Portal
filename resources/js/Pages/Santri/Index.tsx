import { Head, Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { ArrowLeft, Eye, Edit, Trash2, Download, Upload, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function SantriIndex({ santri, auth }: any) {
    const isAdmin = auth.user.roles?.some((r: any) => r.name === 'admin');
    const [showImportModal, setShowImportModal] = useState(false);
    const [importStep, setImportStep] = useState<'upload' | 'preview' | 'success'>('upload');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [importing, setImporting] = useState(false);
    const [previewData, setPreviewData] = useState<any>(null);
    const [importResult, setImportResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = (santriId: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus data santri ini?')) {
            router.delete(`/santri/${santriId}`, {
                onSuccess: () => {
                    router.reload();
                },
            });
        }
    };

    const handleDownloadTemplate = () => {
        window.location.href = '/santri/import/template';
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setError(null);
        }
    };

    const handlePreviewImport = async () => {
        if (!selectedFile) {
            setError('Silakan pilih file ZIP terlebih dahulu');
            return;
        }

        setUploading(true);
        setError(null);

        const formData = new FormData();
        formData.append('zip_file', selectedFile);

        try {
            const response = await fetch('/santri/import/preview', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });

            const data = await response.json();

            if (response.ok) {
                setPreviewData(data);
                setImportStep('preview');
            } else {
                setError(data.error || 'Terjadi kesalahan saat upload file');
            }
        } catch (err) {
            setError('Terjadi kesalahan koneksi');
        } finally {
            setUploading(false);
        }
    };

    const handleExecuteImport = async () => {
        if (!previewData) return;

        setImporting(true);
        setError(null);

        try {
            const response = await fetch('/santri/import/execute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: JSON.stringify({ import_id: previewData.import_id }),
            });

            const data = await response.json();

            if (response.ok) {
                setImportResult(data);
                setImportStep('success');
            } else {
                setError(data.error || 'Terjadi kesalahan saat import');
            }
        } catch (err) {
            setError('Terjadi kesalahan koneksi');
        } finally {
            setImporting(false);
        }
    };

    const handleCloseModal = () => {
        setShowImportModal(false);
        setImportStep('upload');
        setSelectedFile(null);
        setPreviewData(null);
        setImportResult(null);
        setError(null);

        if (importStep === 'success') {
            router.reload();
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
                            <div className="flex items-center space-x-2 w-full sm:w-auto">
                                <Link
                                    href="/santri/create"
                                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md justify-center"
                                >
                                    <span className="font-medium">Tambah Santri</span>
                                </Link>
                                <button
                                    onClick={() => setShowImportModal(true)}
                                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md justify-center"
                                >
                                    <Upload className="w-4 h-4 mr-2" />
                                    <span className="font-medium">Import Data</span>
                                </button>
                            </div>
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
                                                        src={s.foto_url}
                                                        alt={s.nama}
                                                        className="h-10 w-10 object-cover rounded-full"
                                                        onError={(e) => {
                                                            e.currentTarget.style.display = 'none';
                                                        }}
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

            {/* Import Modal */}
            {showImportModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">
                                {importStep === 'upload' && 'Import Data Santri'}
                                {importStep === 'preview' && 'Preview Import Santri'}
                                {importStep === 'success' && 'Import Berhasil'}
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            {importStep === 'upload' && (
                                <div className="space-y-6">
                                    {/* Download Template Section */}
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <h3 className="font-semibold text-blue-900 mb-2">1. Download Template</h3>
                                        <p className="text-sm text-blue-700 mb-3">
                                            Download template Excel (.xlsx) dan isi data santri sesuai format.
                                        </p>
                                        <button
                                            onClick={handleDownloadTemplate}
                                            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            <Download className="w-4 h-4 mr-2" />
                                            Download Template
                                        </button>
                                    </div>

                                    {/* Instructions */}
                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                        <h3 className="font-semibold text-gray-900 mb-2">2. Siapkan File ZIP</h3>
                                        <div className="text-sm text-gray-700 space-y-2">
                                            <p>Buat file ZIP dengan struktur:</p>
                                            <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
{`import-santri.zip
├── data-santri.xlsx
└── foto/
    ├── 24001.jpg
    ├── 24002.jpg
    └── ...`}
                                            </pre>
                                            <p className="text-xs text-gray-500">
                                                Format foto: jpg, jpeg, png, webp (maks. 2MB per file)
                                            </p>
                                        </div>
                                    </div>

                                    {/* Upload Section */}
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">3. Upload File ZIP</h3>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                                            <input
                                                type="file"
                                                id="zip-upload"
                                                accept=".zip"
                                                onChange={handleFileSelect}
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor="zip-upload"
                                                className="cursor-pointer"
                                            >
                                                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                                                <p className="text-sm text-gray-600">
                                                    {selectedFile ? selectedFile.name : 'Klik untuk memilih file ZIP'}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    Maksimal 10MB
                                                </p>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Error Message */}
                                    {error && (
                                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                                            <AlertCircle className="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                                            <p className="text-sm text-red-700">{error}</p>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex justify-end space-x-3">
                                        <button
                                            onClick={handleCloseModal}
                                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            onClick={handlePreviewImport}
                                            disabled={!selectedFile || uploading}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                        >
                                            {uploading ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                    Memproses...
                                                </>
                                            ) : (
                                                <>
                                                    <span>Preview Import</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {importStep === 'preview' && previewData && (
                                <div className="space-y-6">
                                    {/* Summary */}
                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                        <h3 className="font-semibold text-gray-900 mb-3">Ringkasan Import</h3>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="text-gray-600">Total baris:</span>
                                                <span className="ml-2 font-medium">{previewData.total_rows}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Data valid:</span>
                                                <span className="ml-2 font-medium text-green-600">{previewData.valid_count}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Data error:</span>
                                                <span className="ml-2 font-medium text-red-600">{previewData.error_count}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Foto ditemukan:</span>
                                                <span className="ml-2 font-medium text-green-600">{previewData.photo_found_count}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Foto tidak ditemukan:</span>
                                                <span className="ml-2 font-medium text-orange-600">{previewData.photo_missing_count}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Errors */}
                                    {previewData.errors && previewData.errors.length > 0 && (
                                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                            <h3 className="font-semibold text-red-900 mb-3">Daftar Error</h3>
                                            <div className="space-y-2 max-h-60 overflow-y-auto">
                                                {previewData.errors.map((error: any, index: number) => (
                                                    <div key={index} className="text-sm">
                                                        <span className="font-medium text-red-700">Baris {error.row}:</span>
                                                        <span className="text-red-600 ml-2">NIS {error.nis}</span>
                                                        <div className="text-red-600 ml-4">
                                                            {error.errors.join(', ')}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex justify-end space-x-3">
                                        <button
                                            onClick={handleCloseModal}
                                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            Batal
                                        </button>
                                        <button
                                            onClick={handleExecuteImport}
                                            disabled={previewData.valid_count === 0 || importing}
                                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                        >
                                            {importing ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                    Mengimport...
                                                </>
                                            ) : (
                                                <>
                                                    <span>Import {previewData.valid_count} Data</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {importStep === 'success' && importResult && (
                                <div className="space-y-6">
                                    {/* Success Message */}
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                                        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-green-900 mb-2">Import Berhasil</h3>
                                        <p className="text-green-700 mb-4">{importResult.message}</p>
                                    </div>

                                    {/* Details */}
                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                        <h3 className="font-semibold text-gray-900 mb-3">Detail Import</h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Data berhasil diimport:</span>
                                                <span className="font-medium">{importResult.imported_count}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Foto berhasil:</span>
                                                <span className="font-medium text-green-600">{importResult.photo_success_count}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Foto gagal:</span>
                                                <span className="font-medium text-red-600">{importResult.photo_failed_count}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Data dilewati (error):</span>
                                                <span className="font-medium text-orange-600">{importResult.skipped_count}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="flex justify-end">
                                        <button
                                            onClick={handleCloseModal}
                                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                        >
                                            Lihat Data Santri
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
