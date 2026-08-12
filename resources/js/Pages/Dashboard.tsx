import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import { 
    Users, 
    BookOpen, 
    FileText, 
    FolderOpen, 
    Upload,
    Calendar
} from 'lucide-react';
import PageTransition, { StaggerContainer, StaggerItem } from '@/Components/PageTransition';
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
    
    // Different stats for admin vs guru
    const adminStatCards = [
        {
            title: 'Total Guru',
            value: stats.total_guru,
            icon: Users,
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-500',
        },
        {
            title: 'Guru Aktif',
            value: stats.guru_aktif,
            icon: Users,
            color: 'from-emerald-500 to-emerald-600',
            bgColor: 'bg-emerald-500',
        },
        {
            title: 'Guru Non Aktif',
            value: stats.guru_tidak_aktif,
            icon: Users,
            color: 'from-red-500 to-red-600',
            bgColor: 'bg-red-500',
        },
        {
            title: 'Total Santri',
            value: stats.total_santri,
            icon: BookOpen,
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-500',
        },
        {
            title: 'Total Surat',
            value: stats.total_surat,
            icon: FileText,
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-500',
        },
        {
            title: 'Total Folder',
            value: stats.total_folder,
            icon: FolderOpen,
            color: 'from-orange-500 to-orange-600',
            bgColor: 'bg-orange-500',
        },
        {
            title: 'Upload Hari Ini',
            value: stats.upload_hari_ini,
            icon: Upload,
            color: 'from-teal-500 to-teal-600',
            bgColor: 'bg-teal-500',
        },
    ];

    const guruStatCards = [
        {
            title: 'Total Surat',
            value: stats.total_surat,
            icon: FileText,
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-500',
        },
        {
            title: 'Total Folder',
            value: stats.total_folder,
            icon: FolderOpen,
            color: 'from-orange-500 to-orange-600',
            bgColor: 'bg-orange-500',
        },
        {
            title: 'Upload Hari Ini',
            value: stats.upload_hari_ini,
            icon: Upload,
            color: 'from-teal-500 to-teal-600',
            bgColor: 'bg-teal-500',
        },
    ];

    const statCards = isAdmin ? adminStatCards : guruStatCards;

    return (
        <DashboardLayout header="Dashboard">
            <Head title="Dashboard - Pesantren Modern Internasional Dea Malela" />

            <PageTransition>
                <StaggerContainer className="space-y-6">
                    {/* Welcome Section */}
                    <StaggerItem>
                        <div className="bg-gradient-to-r from-green-700 via-green-600 to-yellow-400 rounded-2xl p-6 text-white shadow-lg">
                            <h1 className="text-2xl font-bold mb-2">
                                {isAdmin ? 'Dashboard Admin' : 'Dashboard Guru'}
                            </h1>
                            <p className="text-green-100">
                                {isAdmin 
                                    ? 'Selamat datang, Admin. Kelola data guru, santri, dan dokumen surat menyurat.'
                                    : `Selamat datang, ${auth.user.name}. Kelola profil dan dokumen surat menyurat.`
                                }
                            </p>
                        </div>
                    </StaggerItem>

                    {/* Stats Grid */}
                    <StaggerItem>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {statCards.map((stat) => (
                                <div key={stat.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                                            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                        </div>
                                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-300`}>
                                            <stat.icon className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </StaggerItem>

                    {/* Recent Documents */}
                    <StaggerItem>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                    <FileText className="w-5 h-5 mr-2 text-green-600" />
                                    {isAdmin ? 'Dokumen Terbaru' : 'Dokumen Terbaru Anda'}
                                </h2>
                                <a
                                    href="/surat"
                                    className="text-sm text-green-600 hover:text-green-700 font-medium"
                                >
                                    Lihat Semua
                                </a>
                            </div>

                    {recentDocuments.length > 0 ? (
                        <div className="space-y-3">
                            {recentDocuments.map((doc) => (
                                <div
                                    key={doc.id}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                            <FileText className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{doc.nama_file}</p>
                                            <p className="text-sm text-gray-500">
                                                {doc.folder?.nama || 'Root'} • {doc.uploadedBy?.name || 'Unknown'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600 flex items-center">
                                            <Calendar className="w-4 h-4 mr-1" />
                                            {new Date(doc.created_at).toLocaleDateString('id-ID')}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {(doc.file_size / 1024).toFixed(2)} KB
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            <p>Belum ada dokumen yang diupload</p>
                        </div>
                    )}
                        </div>
                    </StaggerItem>

                    {/* Quick Actions */}
                    <StaggerItem>
                        {isAdmin ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <a href="/guru" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all hover:border-green-300 group">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                                            <Users className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Kelola Guru</h3>
                                            <p className="text-sm text-gray-500">Manajemen data pendidik</p>
                                        </div>
                                    </div>
                                </a>

                                <a href="/santri" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all hover:border-blue-300 group">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                            <BookOpen className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Kelola Santri</h3>
                                            <p className="text-sm text-gray-500">Manajemen data santri</p>
                                        </div>
                                    </div>
                                </a>

                                <a href="/surat" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all hover:border-purple-300 group">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                                            <FileText className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Surat Menyurat</h3>
                                            <p className="text-sm text-gray-500">Manajemen dokumen</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <a href={`/guru/${auth.user.guru?.id}`} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all hover:border-green-300 group">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                                            <Users className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Profil Saya</h3>
                                            <p className="text-sm text-gray-500">Kelola profil & dokumen</p>
                                        </div>
                                    </div>
                                </a>

                                <a href="/surat" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all hover:border-purple-300 group">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                                            <FileText className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Surat Menyurat</h3>
                                            <p className="text-sm text-gray-500">Buat folder & upload surat</p>
                                        </div>
                                    </div>
                                </a>

                                <a href="/santri" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all hover:border-blue-300 group">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                                            <BookOpen className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Data Santri</h3>
                                            <p className="text-sm text-gray-500">Lihat foto & biodata santri</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        )}
                    </StaggerItem>
                </StaggerContainer>
            </PageTransition>
        </DashboardLayout>
    );
}
