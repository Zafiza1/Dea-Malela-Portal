import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { ArrowLeft, Eye, Edit, Trash2, User } from 'lucide-react';
import LoadingSpinner from '@/Components/LoadingSpinner';
import PageTransition, { StaggerContainer, StaggerItem, ClayCard, FloatIn } from '@/Components/PageTransition';
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

    // Design system colors
    const colors = {
        primary: '#166534',
        secondary: '#65A30D',
        accent: '#EAB308',
        background: '#F0FDF4',
        card: '#FFFFFF',
        muted: '#F0FDF4',
        border: '#86EFAC',
    };

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

    return (
        <DashboardLayout header="Data Guru">
            <Head title="Data Guru" />
            <PageTransition>
                <div className="py-6 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: colors.background }}>
                    <div className="max-w-7xl mx-auto">
                        <StaggerContainer className="space-y-6">
                            {/* Header Section */}
                            <StaggerItem>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Link
                                                href="/dashboard"
                                                className="flex items-center px-5 py-3 rounded-2xl transition-all duration-300 cursor-pointer shadow-md"
                                                style={{ 
                                                    backgroundColor: colors.card,
                                                    borderColor: colors.border,
                                                    borderWidth: '2px',
                                                    color: '#1E1B4B'
                                                }}
                                            >
                                                <ArrowLeft className="w-5 h-5 mr-2" />
                                                <span className="font-bold" style={{ fontFamily: 'Baloo 2, cursive' }}>Kembali</span>
                                            </Link>
                                        </motion.div>
                                        <motion.h1 
                                            className="text-2xl sm:text-3xl font-bold"
                                            style={{ color: '#1E1B4B', fontFamily: 'Baloo 2, cursive' }}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                        >
                                            Data Guru
                                        </motion.h1>
                                    </div>
                                    {isAdmin && (
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                        >
                                            <Link
                                                href="/guru/create"
                                                className="flex items-center px-6 py-3 rounded-2xl transition-all duration-300 justify-center cursor-pointer shadow-lg"
                                                style={{ 
                                                    backgroundColor: colors.accent,
                                                    color: '#000000'
                                                }}
                                            >
                                                <span className="font-bold" style={{ fontFamily: 'Baloo 2, cursive' }}>+ Tambah Guru</span>
                                            </Link>
                                        </motion.div>
                                    )}
                                </div>
                            </StaggerItem>

                            {/* Table Card */}
                            <StaggerItem>
                                <ClayCard 
                                    className="rounded-3xl border-2 overflow-hidden"
                                    style={{ 
                                        backgroundColor: colors.card,
                                        borderColor: colors.border,
                                        boxShadow: '0 8px 16px rgba(79, 70, 229, 0.1)'
                                    }}
                                >
                                    <div className="overflow-x-auto">
                                        <table className="w-full min-w-full">
                                            <thead style={{ backgroundColor: colors.muted }}>
                                                <tr>
                                                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#475569' }}>Foto</th>
                                                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#475569' }}>Nama</th>
                                                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#475569' }}>Jabatan</th>
                                                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#475569' }}>Status</th>
                                                    <th className="px-4 sm:px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider" style={{ color: '#475569' }}>Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody style={{ backgroundColor: colors.card, borderColor: colors.border }} className="divide-y">
                                                {gurus.data.length === 0 ? (
                                                    <tr>
                                                        <td colSpan={5} className="px-4 sm:px-6 py-12 text-center">
                                                            <motion.div 
                                                                className="flex flex-col items-center"
                                                                initial={{ opacity: 0, scale: 0.9 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                            >
                                                                <div className="w-16 h-16 rounded-3xl flex items-center justify-center mb-4" style={{ backgroundColor: colors.muted }}>
                                                                    <User className="w-8 h-8" style={{ color: '#C7D2FE' }} />
                                                                </div>
                                                                <p className="text-lg font-medium" style={{ color: '#475569' }}>Tidak ada data guru</p>
                                                            </motion.div>
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    gurus.data.map((guru: Guru, index) => (
                                                        <motion.tr 
                                                            key={guru.id} 
                                                            className="transition-all duration-200 cursor-pointer"
                                                            style={{ backgroundColor: colors.card }}
                                                            initial={{ opacity: 0, y: 20 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: index * 0.05 }}
                                                            whileHover={{ backgroundColor: colors.muted }}
                                                        >
                                                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
                                                                {guru.foto_url && guru.foto && guru.foto !== '0' ? (
                                                                    <motion.img
                                                                        src={guru.foto_url}
                                                                        alt={guru.nama_lengkap}
                                                                        className="h-12 w-12 object-cover rounded-2xl"
                                                                        onError={(e) => {
                                                                            e.currentTarget.style.display = 'none';
                                                                        }}
                                                                        whileHover={{ scale: 1.1 }}
                                                                    />
                                                                ) : (
                                                                    <div className="h-12 w-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: colors.muted }}>
                                                                        <span className="font-bold text-lg" style={{ color: '#C7D2FE' }}>{guru.nama_lengkap.charAt(0)}</span>
                                                                    </div>
                                                                )}
                                                            </td>
                                                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
                                                                <div>
                                                                    <div className="font-bold" style={{ color: '#1E1B4B', fontFamily: 'Baloo 2, cursive' }}>{guru.nama_lengkap}</div>
                                                                    <div className="text-sm" style={{ color: '#475569' }}>{guru.email}</div>
                                                                </div>
                                                            </td>
                                                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium" style={{ color: '#1E1B4B' }}>{guru.jabatan}</td>
                                                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm">
                                                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer ${
                                                                    guru.status === 'aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                                }`}>
                                                                    {guru.status === 'aktif' ? 'Aktif' : 'Tidak Aktif'}
                                                                </span>
                                                            </td>
                                                            <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm">
                                                                <div className="flex items-center space-x-2 justify-end">
                                                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                                        <Link
                                                                            href={`/guru/${guru.id}`}
                                                                            className="flex items-center px-4 py-2 text-sm font-semibold rounded-xl transition-colors cursor-pointer"
                                                                            style={{ color: colors.primary, backgroundColor: `${colors.primary}10` }}
                                                                        >
                                                                            <Eye className="w-4 h-4 mr-1" />
                                                                            Lihat
                                                                        </Link>
                                                                    </motion.div>
                                                                    {isAdmin && (
                                                                        <>
                                                                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                                                <Link
                                                                                    href={`/guru/${guru.id}/edit`}
                                                                                    className="flex items-center px-4 py-2 text-sm font-semibold rounded-xl transition-colors cursor-pointer"
                                                                                    style={{ color: '#2563EB', backgroundColor: '#DBEAFE' }}
                                                                                >
                                                                                    <Edit className="w-4 h-4 mr-1" />
                                                                                    Edit
                                                                                </Link>
                                                                            </motion.div>
                                                                            <motion.button
                                                                                onClick={() => handleDelete(guru.id)}
                                                                                disabled={deletingId === guru.id}
                                                                                className="flex items-center px-4 py-2 text-sm font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[90px] justify-center cursor-pointer"
                                                                                style={{ color: '#DC2626', backgroundColor: '#FEE2E2' }}
                                                                                whileHover={{ scale: 1.05 }}
                                                                                whileTap={{ scale: 0.95 }}
                                                                            >
                                                                                {deletingId === guru.id ? (
                                                                                    <LoadingSpinner size="sm" />
                                                                                ) : (
                                                                                    <>
                                                                                        <Trash2 className="w-4 h-4 mr-1" />
                                                                                        Hapus
                                                                                    </>
                                                                                )}
                                                                            </motion.button>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </td>
                                                        </motion.tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    
                                    {/* Simple Pagination */}
                                    {gurus.last_page > 1 && (
                                        <div className="px-4 sm:px-6 py-4 border-t flex items-center justify-between" style={{ borderColor: colors.border }}>
                                            <div className="text-xs sm:text-sm" style={{ color: '#475569' }}>
                                                Menampilkan {((gurus.current_page - 1) * gurus.per_page) + 1} - {Math.min(gurus.current_page * gurus.per_page, gurus.total)} dari {gurus.total} data
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {gurus.current_page > 1 && (
                                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                        <Link
                                                            href={`/guru?page=${gurus.current_page - 1}`}
                                                            className="px-4 py-2 rounded-xl border-2 transition text-sm font-medium cursor-pointer"
                                                            style={{ borderColor: colors.border, color: '#1E1B4B' }}
                                                        >
                                                            Previous
                                                        </Link>
                                                    </motion.div>
                                                )}
                                                <motion.span 
                                                    className="px-4 py-2 rounded-xl text-sm font-bold cursor-default"
                                                    style={{ backgroundColor: colors.primary, color: '#FFFFFF' }}
                                                    whileHover={{ scale: 1.05 }}
                                                >
                                                    {gurus.current_page}
                                                </motion.span>
                                                {gurus.current_page < gurus.last_page && (
                                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                        <Link
                                                            href={`/guru?page=${gurus.current_page + 1}`}
                                                            className="px-4 py-2 rounded-xl border-2 transition text-sm font-medium cursor-pointer"
                                                            style={{ borderColor: colors.border, color: '#1E1B4B' }}
                                                        >
                                                            Next
                                                        </Link>
                                                    </motion.div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </ClayCard>
                            </StaggerItem>
                        </StaggerContainer>
                    </div>
                </div>
            </PageTransition>
        </DashboardLayout>
    );
}
