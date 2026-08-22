import { Head, Link, router } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { ArrowLeft, Eye, Edit, Trash2, Download, Upload, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';

// Add Google Fonts for education-friendly typography
const fontLink = (
    <link
        href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700&family=Comic+Neue:wght@300;400;700&display=swap"
        rel="stylesheet"
    />
);

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

    // Design system colors from santri page overrides
    const colors = {
        primary: '#0D9488',
        onPrimary: '#000000',
        secondary: '#2DD4BF',
        onSecondary: '#0F172A',
        accent: '#D97706',
        onAccent: '#000000',
        background: '#F0FDFA',
        foreground: '#134E4A',
        card: '#FFFFFF',
        cardForeground: '#134E4A',
        muted: '#E8F1F4',
        mutedForeground: '#475569',
        border: '#5EEAD4',
        destructive: '#DC2626',
        onDestructive: '#FFFFFF',
        ring: '#0D9488',
    };

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
            setError('Silakan pilih file Excel terlebih dahulu');
            return;
        }

        setUploading(true);
        setError(null);

        const formData = new FormData();
        formData.append('excel_file', selectedFile);

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
            <Head title="Data Santri">
                {fontLink}
                <style>{`
                    :root {
                        --color-primary: ${colors.primary};
                        --color-on-primary: ${colors.onPrimary};
                        --color-secondary: ${colors.secondary};
                        --color-on-secondary: ${colors.onSecondary};
                        --color-accent: ${colors.accent};
                        --color-on-accent: ${colors.onAccent};
                        --color-background: ${colors.background};
                        --color-foreground: ${colors.foreground};
                        --color-card: ${colors.card};
                        --color-card-foreground: ${colors.cardForeground};
                        --color-muted: ${colors.muted};
                        --color-muted-foreground: ${colors.mutedForeground};
                        --color-border: ${colors.border};
                        --color-destructive: ${colors.destructive};
                        --color-on-destructive: ${colors.onDestructive};
                        --color-ring: ${colors.ring};
                    }
                    body {
                        font-family: 'Comic Neue', sans-serif;
                    }
                    h1, h2, h3, h4, h5, h6 {
                        font-family: 'Baloo 2', cursive;
                    }
                `}</style>
            </Head>
            <div className="py-6 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: colors.background, fontFamily: 'Comic Neue, sans-serif' }}>
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
                            <Link
                                href="/dashboard"
                                className="flex items-center px-3 py-2 sm:px-4 bg-white border-2 rounded-lg transition-all duration-200 text-sm sm:text-base cursor-pointer"
                                style={{ 
                                    borderColor: colors.border, 
                                    color: colors.foreground,
                                    backgroundColor: colors.card
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = colors.muted;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = colors.card;
                                }}
                            >
                                <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
                                <span className="font-medium" style={{ fontFamily: 'Baloo 2, cursive' }}>Kembali</span>
                            </Link>
                            <h1 className="text-xl sm:text-2xl font-bold" style={{ color: colors.foreground, fontFamily: 'Baloo 2, cursive' }}>
                                {isAdmin ? 'Data Santri' : 'Data Santri (View Only)'}
                            </h1>
                        </div>
                        {isAdmin && (
                            <div className="flex items-center space-x-2 w-full sm:w-auto">
                                <Link
                                    href="/santri/create"
                                    className="flex items-center px-4 py-2 rounded-lg transition-all duration-200 justify-center cursor-pointer"
                                    style={{ 
                                        backgroundColor: colors.accent, 
                                        color: colors.onAccent
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.opacity = '0.9';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.opacity = '1';
                                    }}
                                >
                                    <span className="font-medium" style={{ fontFamily: 'Baloo 2, cursive' }}>Tambah Santri</span>
                                </Link>
                                <button
                                    onClick={() => setShowImportModal(true)}
                                    className="flex items-center px-4 py-2 rounded-lg transition-all duration-200 justify-center cursor-pointer"
                                    style={{ 
                                        backgroundColor: colors.primary, 
                                        color: colors.onPrimary
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.opacity = '0.9';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.opacity = '1';
                                    }}
                                >
                                    <Upload className="w-4 h-4 mr-2" />
                                    <span className="font-medium" style={{ fontFamily: 'Baloo 2, cursive' }}>Import Data</span>
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="rounded-xl border-2 overflow-hidden" style={{ 
                        backgroundColor: colors.card, 
                        borderColor: colors.border 
                    }}>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-full">
                            <thead style={{ backgroundColor: colors.muted }}>
                                <tr>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: colors.mutedForeground }}>Foto</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: colors.mutedForeground }}>NIS</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: colors.mutedForeground }}>Nama</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: colors.mutedForeground }}>Jenjang</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: colors.mutedForeground }}>Kelas</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: colors.mutedForeground }}>Status</th>
                                    <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium uppercase tracking-wider" style={{ color: colors.mutedForeground }}>Aksi</th>
                                </tr>
                            </thead>
                            <tbody style={{ backgroundColor: colors.card, borderColor: colors.border }} className="divide-y">
                                {santri.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-4 sm:px-6 py-8 sm:py-12 text-center">
                                            <p className="text-sm" style={{ color: colors.mutedForeground }}>Tidak ada data santri</p>
                                        </td>
                                    </tr>
                                ) : (
                                    santri.data.map((s: any) => (
                                        <tr key={s.id} className="transition" style={{ 
                                            backgroundColor: colors.card 
                                        }} onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = colors.muted;
                                        }} onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = colors.card;
                                        }}>
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
                                                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.muted }}>
                                                        <span className="text-xs" style={{ color: colors.mutedForeground }}>No Photo</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm" style={{ color: colors.cardForeground }}>{s.nis}</td>
                                            <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm">
                                                <div>
                                                    <div className="font-medium" style={{ color: colors.cardForeground, fontFamily: 'Baloo 2, cursive' }}>{s.nama}</div>
                                                    <div className="text-sm" style={{ color: colors.mutedForeground }}>
                                                        {s.tempat_lahir}, {new Date(s.tanggal_lahir).toLocaleDateString('id-ID')}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm" style={{ color: colors.cardForeground }}>{s.jenjang}</td>
                                            <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm" style={{ color: colors.cardForeground }}>{s.kelas}</td>
                                            <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer ${
                                                    s.status === 'aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {s.status === 'aktif' ? 'Aktif' : 'Tidak Aktif'}
                                                </span>
                                            </td>
                                            <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-right text-sm">
                                                <div className="flex items-center space-x-2 justify-end">
                                                    <Link
                                                        href={`/santri/${s.id}`}
                                                        className="flex items-center px-3 py-1.5 text-sm rounded-lg transition-colors cursor-pointer"
                                                        style={{ 
                                                            backgroundColor: colors.secondary, 
                                                            color: colors.onSecondary
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.opacity = '0.8';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.opacity = '1';
                                                        }}
                                                    >
                                                        <Eye className="w-4 h-4 mr-1" />
                                                        Lihat
                                                    </Link>
                                                    {isAdmin && (
                                                        <>
                                                            <Link
                                                                href={`/santri/${s.id}/edit`}
                                                                className="flex items-center px-3 py-1.5 text-sm rounded-lg transition-colors cursor-pointer"
                                                                style={{ 
                                                                    backgroundColor: colors.primary, 
                                                                    color: colors.onPrimary
                                                                }}
                                                                onMouseEnter={(e) => {
                                                                    e.currentTarget.style.opacity = '0.8';
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    e.currentTarget.style.opacity = '1';
                                                                }}
                                                            >
                                                                <Edit className="w-4 h-4 mr-1" />
                                                                Edit
                                                            </Link>
                                                            <button
                                                                onClick={() => handleDelete(s.id)}
                                                                className="flex items-center px-3 py-1.5 text-sm rounded-lg transition-colors cursor-pointer"
                                                                style={{ 
                                                                    backgroundColor: colors.destructive, 
                                                                    color: colors.onDestructive
                                                                }}
                                                                onMouseEnter={(e) => {
                                                                    e.currentTarget.style.opacity = '0.8';
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    e.currentTarget.style.opacity = '1';
                                                                }}
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
                        </div>
                        
                        {/* Simple Pagination */}
                        {santri.last_page > 1 && (
                            <div className="px-4 sm:px-6 py-4 border-t-2 flex items-center justify-between" style={{ borderColor: colors.border }}>
                                <div className="text-xs sm:text-sm" style={{ color: colors.mutedForeground }}>
                                    Menampilkan {((santri.current_page - 1) * santri.per_page) + 1} - {Math.min(santri.current_page * santri.per_page, santri.total)} dari {santri.total} data
                                </div>
                                <div className="flex items-center gap-2">
                                    {santri.current_page > 1 && (
                                        <Link
                                            href={`/santri?page=${santri.current_page - 1}`}
                                            className="px-3 py-1 rounded-lg border-2 transition text-sm cursor-pointer"
                                            style={{ 
                                                borderColor: colors.border,
                                                color: colors.cardForeground
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = colors.muted;
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = 'transparent';
                                            }}
                                        >
                                            Previous
                                        </Link>
                                    )}
                                    <span className="px-3 py-1 rounded-lg text-sm" style={{ 
                                        backgroundColor: colors.primary, 
                                        color: colors.onPrimary
                                    }}>
                                        {santri.current_page}
                                    </span>
                                    {santri.current_page < santri.last_page && (
                                        <Link
                                            href={`/santri?page=${santri.current_page + 1}`}
                                            className="px-3 py-1 rounded-lg border-2 transition text-sm cursor-pointer"
                                            style={{ 
                                                borderColor: colors.border,
                                                color: colors.cardForeground
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = colors.muted;
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = 'transparent';
                                            }}
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
                <div className="fixed inset-0 flex items-center justify-center p-4" style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 50 
                }}>
                    <div className="rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" style={{ 
                        backgroundColor: colors.card,
                        border: `2px solid ${colors.border}`
                    }}>
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b-2" style={{ borderColor: colors.border }}>
                            <h2 className="text-xl font-bold" style={{ color: colors.cardForeground, fontFamily: 'Baloo 2, cursive' }}>
                                {importStep === 'upload' && 'Import Data Santri'}
                                {importStep === 'preview' && 'Preview Import Santri'}
                                {importStep === 'success' && 'Import Berhasil'}
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="transition-colors cursor-pointer"
                                style={{ color: colors.mutedForeground }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = colors.cardForeground;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = colors.mutedForeground;
                                }}
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            {importStep === 'upload' && (
                                <div className="space-y-6">
                                    {/* Download Template Section */}
                                    <div className="rounded-lg p-4 border-2" style={{ 
                                        backgroundColor: colors.muted, 
                                        borderColor: colors.secondary 
                                    }}>
                                        <h3 className="font-semibold mb-2" style={{ color: colors.onSecondary, fontFamily: 'Baloo 2, cursive' }}>1. Download Template</h3>
                                        <p className="text-sm mb-3" style={{ color: colors.onSecondary }}>
                                            Download template Excel (.xlsx) dan isi data santri sesuai format.
                                        </p>
                                        <button
                                            onClick={handleDownloadTemplate}
                                            className="flex items-center px-4 py-2 rounded-lg transition-colors cursor-pointer"
                                            style={{ 
                                                backgroundColor: colors.primary, 
                                                color: colors.onPrimary
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.opacity = '0.9';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.opacity = '1';
                                            }}
                                        >
                                            <Download className="w-4 h-4 mr-2" />
                                            Download Template
                                        </button>
                                    </div>

                                    {/* Instructions */}
                                    <div className="rounded-lg p-4 border-2" style={{ 
                                        backgroundColor: colors.muted, 
                                        borderColor: colors.border 
                                    }}>
                                        <h3 className="font-semibold mb-2" style={{ color: colors.cardForeground, fontFamily: 'Baloo 2, cursive' }}>2. Siapkan File Excel</h3>
                                        <div className="text-sm space-y-2" style={{ color: colors.cardForeground }}>
                                            <p>Isi template Excel dengan data santri:</p>
                                            <ul className="list-disc list-inside text-xs space-y-1" style={{ color: colors.mutedForeground }}>
                                                <li>NIS harus unik</li>
                                                <li>Jenjang: SD, SMP, SMA</li>
                                                <li>Status: aktif, tidak aktif</li>
                                                <li>Foto akan diupload terpisah oleh admin</li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Upload Section */}
                                    <div>
                                        <h3 className="font-semibold mb-2" style={{ color: colors.cardForeground, fontFamily: 'Baloo 2, cursive' }}>3. Upload File Excel</h3>
                                        <div className="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer" style={{ 
                                            borderColor: colors.border 
                                        }} onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = colors.primary;
                                        }} onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = colors.border;
                                        }}>
                                            <input
                                                type="file"
                                                id="excel-upload"
                                                accept=".xlsx,.xls"
                                                onChange={handleFileSelect}
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor="excel-upload"
                                                className="cursor-pointer"
                                            >
                                                <Upload className="w-12 h-12 mx-auto mb-2" style={{ color: colors.mutedForeground }} />
                                                <p className="text-sm" style={{ color: colors.cardForeground }}>
                                                    {selectedFile ? selectedFile.name : 'Klik untuk memilih file Excel'}
                                                </p>
                                                <p className="text-xs mt-1" style={{ color: colors.mutedForeground }}>
                                                    Maksimal 10MB
                                                </p>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Error Message */}
                                    {error && (
                                        <div className="rounded-lg p-4 flex items-start border-2" style={{ 
                                            backgroundColor: colors.muted, 
                                            borderColor: colors.destructive 
                                        }}>
                                            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" style={{ color: colors.destructive }} />
                                            <p className="text-sm" style={{ color: colors.destructive }}>{error}</p>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex justify-end space-x-3">
                                        <button
                                            onClick={handleCloseModal}
                                            className="px-4 py-2 border-2 rounded-lg transition-colors cursor-pointer"
                                            style={{ 
                                                borderColor: colors.border,
                                                color: colors.cardForeground
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = colors.muted;
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = 'transparent';
                                            }}
                                        >
                                            Batal
                                        </button>
                                        <button
                                            onClick={handlePreviewImport}
                                            disabled={!selectedFile || uploading}
                                            className="px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center cursor-pointer"
                                            style={{ 
                                                backgroundColor: colors.primary, 
                                                color: colors.onPrimary
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!e.currentTarget.disabled) {
                                                    e.currentTarget.style.opacity = '0.9';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!e.currentTarget.disabled) {
                                                    e.currentTarget.style.opacity = '1';
                                                }
                                            }}
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
                                    <div className="rounded-lg p-4 border-2" style={{ 
                                        backgroundColor: colors.muted, 
                                        borderColor: colors.border 
                                    }}>
                                        <h3 className="font-semibold mb-3" style={{ color: colors.cardForeground, fontFamily: 'Baloo 2, cursive' }}>Ringkasan Import</h3>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span style={{ color: colors.mutedForeground }}>Total baris:</span>
                                                <span className="ml-2 font-medium" style={{ color: colors.cardForeground }}>{previewData.total_rows}</span>
                                            </div>
                                            <div>
                                                <span style={{ color: colors.mutedForeground }}>Data valid:</span>
                                                <span className="ml-2 font-medium" style={{ color: colors.primary }}>{previewData.valid_count}</span>
                                            </div>
                                            <div>
                                                <span style={{ color: colors.mutedForeground }}>Data error:</span>
                                                <span className="ml-2 font-medium" style={{ color: colors.destructive }}>{previewData.error_count}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Errors */}
                                    {previewData.errors && previewData.errors.length > 0 && (
                                        <div className="rounded-lg p-4 border-2" style={{ 
                                            backgroundColor: colors.muted, 
                                            borderColor: colors.destructive 
                                        }}>
                                            <h3 className="font-semibold mb-3" style={{ color: colors.destructive, fontFamily: 'Baloo 2, cursive' }}>Daftar Error</h3>
                                            <div className="space-y-2 max-h-60 overflow-y-auto">
                                                {previewData.errors.map((error: any, index: number) => (
                                                    <div key={index} className="text-sm">
                                                        <span className="font-medium" style={{ color: colors.destructive }}>Baris {error.row}:</span>
                                                        <span className="ml-2" style={{ color: colors.destructive }}>NIS {error.nis}</span>
                                                        <div className="ml-4" style={{ color: colors.destructive }}>
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
                                            className="px-4 py-2 border-2 rounded-lg transition-colors cursor-pointer"
                                            style={{ 
                                                borderColor: colors.border,
                                                color: colors.cardForeground
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = colors.muted;
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = 'transparent';
                                            }}
                                        >
                                            Batal
                                        </button>
                                        <button
                                            onClick={handleExecuteImport}
                                            disabled={previewData.valid_count === 0 || importing}
                                            className="px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center cursor-pointer"
                                            style={{ 
                                                backgroundColor: colors.accent, 
                                                color: colors.onAccent
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!e.currentTarget.disabled) {
                                                    e.currentTarget.style.opacity = '0.9';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!e.currentTarget.disabled) {
                                                    e.currentTarget.style.opacity = '1';
                                                }
                                            }}
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
                                    <div className="rounded-lg p-6 text-center border-2" style={{ 
                                        backgroundColor: colors.muted, 
                                        borderColor: colors.primary 
                                    }}>
                                        <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: colors.primary }} />
                                        <h3 className="text-xl font-bold mb-2" style={{ color: colors.primary, fontFamily: 'Baloo 2, cursive' }}>Import Berhasil</h3>
                                        <p className="mb-4" style={{ color: colors.cardForeground }}>{importResult.message}</p>
                                    </div>

                                    {/* Details */}
                                    <div className="rounded-lg p-4 border-2" style={{ 
                                        backgroundColor: colors.muted, 
                                        borderColor: colors.border 
                                    }}>
                                        <h3 className="font-semibold mb-3" style={{ color: colors.cardForeground, fontFamily: 'Baloo 2, cursive' }}>Detail Import</h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span style={{ color: colors.mutedForeground }}>Data berhasil diimport:</span>
                                                <span className="font-medium" style={{ color: colors.cardForeground }}>{importResult.imported_count}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span style={{ color: colors.mutedForeground }}>Data dilewati (error):</span>
                                                <span className="font-medium" style={{ color: colors.accent }}>{importResult.skipped_count}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="flex justify-end">
                                        <button
                                            onClick={handleCloseModal}
                                            className="px-4 py-2 rounded-lg transition-colors cursor-pointer"
                                            style={{ 
                                                backgroundColor: colors.primary, 
                                                color: colors.onPrimary
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.opacity = '0.9';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.opacity = '1';
                                            }}
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
