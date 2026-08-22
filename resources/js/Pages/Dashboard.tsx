import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    Users, 
    BookOpen, 
    FileText, 
    FolderOpen, 
    Upload,
    Calendar,
    LayoutDashboard
} from 'lucide-react';
import PageTransition, { StaggerContainer, StaggerItem, ClayCard, FloatIn, ClayBounce } from '@/Components/PageTransition';
import type { User, DashboardStats } from '../types/global';

interface DashboardProps {
    stats: DashboardStats;
    recentDocuments: Array<{
        id: number;
        nama_file: string;
        folder?: { nama: string };
        uploadedBy?: { name: string };
        created_at: string;
        file_size: number;
    }>;
    auth: {
        user: User;
    };
}

export default function Dashboard({ stats, recentDocuments, auth }: DashboardProps) {
    const isAdmin = auth.user.roles?.some((r: any) => r.name === 'admin');
    
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
    
    // Different stats for admin vs guru with claymorphism colors
    const adminStatCards = [
        {
            title: 'Total Guru',
            value: stats.total_guru,
            icon: Users,
            gradient: 'from-green-500 to-green-600',
            shadow: 'shadow-green-200',
        },
        {
            title: 'Guru Aktif',
            value: stats.guru_aktif,
            icon: Users,
            gradient: 'from-lime-500 to-lime-600',
            shadow: 'shadow-lime-200',
        },
        {
            title: 'Guru Non Aktif',
            value: stats.guru_tidak_aktif,
            icon: Users,
            gradient: 'from-rose-500 to-rose-600',
            shadow: 'shadow-rose-200',
        },
        {
            title: 'Total Santri',
            value: stats.total_santri,
            icon: BookOpen,
            gradient: 'from-emerald-500 to-emerald-600',
            shadow: 'shadow-emerald-200',
        },
        {
            title: 'Total Surat',
            value: stats.total_surat,
            icon: FileText,
            gradient: 'from-green-600 to-green-700',
            shadow: 'shadow-green-200',
        },
        {
            title: 'Total Folder',
            value: stats.total_folder,
            icon: FolderOpen,
            gradient: 'from-yellow-500 to-yellow-600',
            shadow: 'shadow-yellow-200',
        },
        {
            title: 'Upload Hari Ini',
            value: stats.upload_hari_ini,
            icon: Upload,
            gradient: 'from-lime-600 to-lime-700',
            shadow: 'shadow-lime-200',
        },
    ];

    const guruStatCards = [
        {
            title: 'Total Surat',
            value: stats.total_surat,
            icon: FileText,
            gradient: 'from-green-600 to-green-700',
            shadow: 'shadow-green-200',
        },
        {
            title: 'Total Folder',
            value: stats.total_folder,
            icon: FolderOpen,
            gradient: 'from-yellow-500 to-yellow-600',
            shadow: 'shadow-yellow-200',
        },
        {
            title: 'Upload Hari Ini',
            value: stats.upload_hari_ini,
            icon: Upload,
            gradient: 'from-lime-600 to-lime-700',
            shadow: 'shadow-lime-200',
        },
    ];

    const statCards = isAdmin ? adminStatCards : guruStatCards;

    return (
        <DashboardLayout header="Dashboard">
            <Head title="Dashboard - Pesantren Modern Internasional Dea Malela" />

            <PageTransition>
                <StaggerContainer className="space-y-8">
                    {/* Welcome Section */}
                    <StaggerItem>
                        <ClayCard className="rounded-3xl p-8 text-black shadow-2xl cursor-default" style={{ 
                            background: 'linear-gradient(135deg, #166534 0%, #65A30D 50%, #EAB308 100%)',
                            boxShadow: '0 20px 40px rgba(22, 101, 52, 0.3), inset 0 2px 4px rgba(255,255,255,0.1)'
                        }}>
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <motion.h1 
                                        className="text-3xl sm:text-4xl font-bold mb-3"
                                        style={{ fontFamily: 'Baloo 2, cursive' }}
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        {isAdmin ? 'Dashboard Admin' : 'Dashboard Guru'}
                                    </motion.h1>
                                    <motion.p 
                                        className="text-black/90 text-lg"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        {isAdmin 
                                            ? 'Selamat datang, Admin. Kelola data guru, santri, dan dokumen surat menyurat.'
                                            : `Selamat datang, ${auth.user.name}. Kelola profil dan dokumen surat menyurat.`
                                        }
                                    </motion.p>
                                </div>
                                <motion.div 
                                    className="hidden sm:block"
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                                >
                                    <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border-2 border-white/30">
                                        <LayoutDashboard className="w-10 h-10 text-white" />
                                    </div>
                                </motion.div>
                            </div>
                        </ClayCard>
                    </StaggerItem>

                    {/* Stats Grid */}
                    <StaggerItem>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {statCards.map((stat, index) => (
                                <ClayCard 
                                    key={stat.title} 
                                    className="rounded-3xl p-6 border-2 cursor-default"
                                    style={{ 
                                        backgroundColor: colors.card,
                                        borderColor: colors.border,
                                        boxShadow: '0 8px 16px rgba(22, 101, 52, 0.1)'
                                    }}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <motion.p 
                                                className="text-sm font-medium mb-2"
                                                style={{ color: '#475569', fontFamily: 'Comic Neue, sans-serif' }}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                {stat.title}
                                            </motion.p>
                                            <motion.p 
                                                className="text-4xl font-bold"
                                                style={{ color: '#14532D', fontFamily: 'Baloo 2, cursive' }}
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: index * 0.1 + 0.1, type: 'spring' }}
                                            >
                                                {stat.value}
                                            </motion.p>
                                        </div>
                                        <motion.div 
                                            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}
                                            initial={{ scale: 0, rotate: -90 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ delay: index * 0.1 + 0.2, type: 'spring', stiffness: 200 }}
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                        >
                                            <stat.icon className="w-7 h-7 text-white" />
                                        </motion.div>
                                    </div>
                                </ClayCard>
                            ))}
                        </div>
                    </StaggerItem>

                    {/* Recent Documents */}
                    <StaggerItem>
                        <ClayCard 
                            className="rounded-3xl p-6 border-2"
                            style={{ 
                                backgroundColor: colors.card,
                                borderColor: colors.border,
                                boxShadow: '0 8px 16px rgba(79, 70, 229, 0.1)'
                            }}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <motion.h2 
                                    className="text-xl font-bold flex items-center"
                                    style={{ color: '#1E1B4B', fontFamily: 'Baloo 2, cursive' }}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center mr-3">
                                        <FileText className="w-5 h-5 text-green-600" />
                                    </div>
                                    {isAdmin ? 'Dokumen Terbaru' : 'Dokumen Terbaru Anda'}
                                </motion.h2>
                                <motion.a
                                    href="/surat"
                                    className="text-sm font-semibold px-4 py-2 rounded-xl cursor-pointer transition-all duration-200"
                                    style={{ color: colors.primary, backgroundColor: colors.muted }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    Lihat Semua
                                </motion.a>
                            </div>

                            {recentDocuments.length > 0 ? (
                                <div className="space-y-3">
                                    {recentDocuments.map((doc, index) => (
                                        <motion.div
                                            key={doc.id}
                                            className="flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all duration-200"
                                            style={{ backgroundColor: colors.muted }}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            whileHover={{ scale: 1.02, backgroundColor: '#DCFCE7' }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="flex items-center space-x-4">
                                                <motion.div 
                                                    className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center"
                                                    whileHover={{ rotate: 10 }}
                                                >
                                                    <FileText className="w-6 h-6 text-green-600" />
                                                </motion.div>
                                                <div>
                                                    <p className="font-semibold" style={{ color: '#1E1B4B', fontFamily: 'Baloo 2, cursive' }}>{doc.nama_file}</p>
                                                    <p className="text-sm" style={{ color: '#475569' }}>
                                                        {doc.folder?.nama || 'Root'} • {doc.uploadedBy?.name || 'Unknown'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm flex items-center justify-end" style={{ color: '#475569' }}>
                                                    <Calendar className="w-4 h-4 mr-1" />
                                                    {new Date(doc.created_at).toLocaleDateString('id-ID')}
                                                </p>
                                                <p className="text-xs" style={{ color: '#64748B' }}>
                                                    {(doc.file_size / 1024).toFixed(2)} KB
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <motion.div 
                                    className="text-center py-12"
                                    style={{ color: '#475569' }}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    <div className="w-20 h-20 mx-auto mb-4 rounded-3xl flex items-center justify-center" style={{ backgroundColor: colors.muted }}>
                                        <FileText className="w-10 h-10" style={{ color: '#86EFAC' }} />
                                    </div>
                                    <p className="text-lg font-medium">Belum ada dokumen yang diupload</p>
                                </motion.div>
                            )}
                        </ClayCard>
                    </StaggerItem>

                    {/* Quick Actions */}
                    <StaggerItem>
                        {isAdmin ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { href: '/guru', icon: Users, title: 'Kelola Guru', desc: 'Manajemen data pendidik', color: 'from-green-500 to-green-600', bg: 'bg-green-100' },
                                    { href: '/santri', icon: BookOpen, title: 'Kelola Santri', desc: 'Manajemen data santri', color: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-100' },
                                    { href: '/surat', icon: FileText, title: 'Surat Menyurat', desc: 'Manajemen dokumen', color: 'from-lime-500 to-lime-600', bg: 'bg-lime-100' },
                                ].map((action, index) => (
                                    <ClayCard key={action.title}>
                                        <motion.a
                                            href={action.href}
                                            className="block rounded-3xl p-6 border-2 transition-all duration-300"
                                            style={{ 
                                                backgroundColor: colors.card,
                                                borderColor: colors.border,
                                                boxShadow: '0 8px 16px rgba(79, 70, 229, 0.1)'
                                            }}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            whileHover={{ scale: 1.03, borderColor: colors.primary }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="flex items-center space-x-4">
                                                <motion.div 
                                                    className={`w-14 h-14 ${action.bg} rounded-2xl flex items-center justify-center`}
                                                    whileHover={{ rotate: 10, scale: 1.1 }}
                                                >
                                                    <action.icon className={`w-7 h-7 bg-gradient-to-br ${action.color} bg-clip-text text-transparent`} />
                                                </motion.div>
                                                <div>
                                                    <h3 className="font-bold text-lg" style={{ color: '#1E1B4B', fontFamily: 'Baloo 2, cursive' }}>{action.title}</h3>
                                                    <p className="text-sm" style={{ color: '#475569' }}>{action.desc}</p>
                                                </div>
                                            </div>
                                        </motion.a>
                                    </ClayCard>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { href: `/guru/${auth.user.guru?.id}`, icon: Users, title: 'Profil Saya', desc: 'Kelola profil & dokumen', color: 'from-green-500 to-green-600', bg: 'bg-green-100' },
                                    { href: '/surat', icon: FileText, title: 'Surat Menyurat', desc: 'Buat folder & upload surat', color: 'from-lime-500 to-lime-600', bg: 'bg-lime-100' },
                                    { href: '/santri', icon: BookOpen, title: 'Data Santri', desc: 'Lihat foto & biodata santri', color: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-100' },
                                ].map((action, index) => (
                                    <ClayCard key={action.title}>
                                        <motion.a
                                            href={action.href}
                                            className="block rounded-3xl p-6 border-2 transition-all duration-300"
                                            style={{ 
                                                backgroundColor: colors.card,
                                                borderColor: colors.border,
                                                boxShadow: '0 8px 16px rgba(79, 70, 229, 0.1)'
                                            }}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            whileHover={{ scale: 1.03, borderColor: colors.primary }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="flex items-center space-x-4">
                                                <motion.div 
                                                    className={`w-14 h-14 ${action.bg} rounded-2xl flex items-center justify-center`}
                                                    whileHover={{ rotate: 10, scale: 1.1 }}
                                                >
                                                    <action.icon className={`w-7 h-7 bg-gradient-to-br ${action.color} bg-clip-text text-transparent`} />
                                                </motion.div>
                                                <div>
                                                    <h3 className="font-bold text-lg" style={{ color: '#1E1B4B', fontFamily: 'Baloo 2, cursive' }}>{action.title}</h3>
                                                    <p className="text-sm" style={{ color: '#475569' }}>{action.desc}</p>
                                                </div>
                                            </div>
                                        </motion.a>
                                    </ClayCard>
                                ))}
                            </div>
                        )}
                    </StaggerItem>
                </StaggerContainer>
            </PageTransition>
        </DashboardLayout>
    );
}
