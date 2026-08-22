import { Link, usePage } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Head } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    Users, 
    BookOpen, 
    FileText, 
    Settings, 
    LogOut,
    Menu,
    X,
    ChevronRight
} from 'lucide-react';
import type { User } from '../types/global';

// Add Google Fonts for educational-friendly typography
const fontLink = (
    <link
        href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700&family=Comic+Neue:wght@300;400;700&display=swap"
        rel="stylesheet"
    />
);

interface DashboardLayoutProps {
    header?: string;
    children: React.ReactNode;
}

interface NavigationItem {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
}

export default function DashboardLayout({ header, children }: DashboardLayoutProps) {
    const page = usePage();
    const user = (page.props as any).auth.user as User;
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const isAdmin = useMemo(() => 
        user?.roles?.some((r) => r.name === 'admin') || false, [user?.roles]
    );
    
    const isGuru = useMemo(() => 
        user?.roles?.some((r) => r.name === 'guru') || false, [user?.roles]
    );

    const navigation: NavigationItem[] = useMemo(() => [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        ...(isAdmin ? [
            { name: 'Profil Pendidik', href: '/guru', icon: Users },
            { name: 'Data Santri', href: '/santri', icon: BookOpen },
        ] : []),
        ...(isGuru ? [
            { 
                name: 'Profil Saya', 
                href: user.guru?.id ? `/guru/${user.guru.id}` : '/profile', 
                icon: Users 
            },
            { name: 'Data Santri', href: '/santri', icon: BookOpen },
        ] : []),
        { name: 'Surat Menyurat', href: '/surat', icon: FileText },
        // Fallback untuk memastikan minimal menu selalu tampil
        ...((!isAdmin && !isGuru) ? [
            { name: 'Profile', href: '/profile', icon: Users },
        ] : []),
    ], [isAdmin, isGuru, user.guru?.id]);

    return (
        <>
            <Head>
                {fontLink}
                <style>{`
                    :root {
                        --color-primary: #166534;
                        --color-on-primary: #FFFFFF;
                        --color-secondary: #65A30D;
                        --color-on-secondary: #0F172A;
                        --color-accent: #EAB308;
                        --color-on-accent: #000000;
                        --color-background: #F0FDF4;
                        --color-foreground: #14532D;
                        --color-card: #FFFFFF;
                        --color-card-foreground: #14532D;
                        --color-muted: #F0FDF4;
                        --color-muted-foreground: #475569;
                        --color-border: #86EFAC;
                        --color-destructive: #DC2626;
                        --color-on-destructive: #FFFFFF;
                        --color-ring: #166534;
                    }
                    body {
                        font-family: 'Comic Neue', sans-serif;
                    }
                    h1, h2, h3, h4, h5, h6 {
                        font-family: 'Baloo 2', cursive;
                    }
                `}</style>
            </Head>
            <div className="min-h-screen" style={{ backgroundColor: '#F0FDF4' }}>
            {/* Mobile sidebar backdrop */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                        onClick={() => setSidebarOpen(false)}
                        role="button"
                        tabIndex={0}
                        aria-label="Close sidebar"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                setSidebarOpen(false);
                            }
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.div 
                initial={false}
                animate={{ x: sidebarOpen ? 0 : -256 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed inset-y-0 left-0 z-50 w-64 shadow-2xl"
                style={{ 
                    background: 'linear-gradient(135deg, #166534 0%, #65A30D 50%, #EAB308 100%)',
                    boxShadow: '4px 0 24px rgba(22, 101, 52, 0.2)'
                }}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <motion.div 
                        className="flex items-center justify-center h-20 px-4 border-b border-white/20"
                        whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="flex items-center space-x-3">
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <img
                                    src="/images/logo.png"
                                    alt="Dea Malela Logo"
                                    className="w-12 h-12 object-contain"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                    }}
                                />
                            </motion.div>
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center hidden shadow-lg">
                                <span className="text-green-700 font-bold text-xl">DM</span>
                            </div>
                            <span className="text-white font-bold text-xl tracking-tight">Dea Malela</span>
                        </div>
                    </motion.div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                        {navigation.map((item, index) => {
                            const isActive = (window as any).route().current(item.href.split('.')[0]);
                            return (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Link
                                            href={item.href}
                                            className={`flex items-center px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-200 cursor-pointer ${
                                                isActive
                                                    ? 'bg-white text-green-700 shadow-lg'
                                                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                                            }`}
                                            style={{
                                                boxShadow: isActive ? '0 8px 16px rgba(22, 101, 52, 0.3)' : 'none'
                                            }}
                                            aria-current={isActive ? 'page' : undefined}
                                        >
                                        <motion.div
                                            whileHover={{ rotate: 10 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                        >
                                            <item.icon className="w-5 h-5 mr-3" aria-hidden="true" />
                                        </motion.div>
                                        <span className="flex-1">{item.name}</span>
                                        {isActive && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                                            >
                                                <ChevronRight className="w-4 h-4" aria-hidden="true" />
                                            </motion.div>
                                        )}
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </nav>

                    {/* User info */}
                    <div className="p-4 border-t border-white/20">
                        <motion.div 
                            className="flex items-center p-3 bg-white/10 rounded-2xl backdrop-blur-sm"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                        >
                            <motion.div 
                                className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-green-700 font-bold text-lg shadow-lg"
                                whileHover={{ rotate: 5 }}
                            >
                                {user.name.charAt(0).toUpperCase()}
                            </motion.div>
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-semibold text-white">{user.name}</p>
                                <p className="text-xs text-white/70 capitalize">{user.roles?.[0]?.name || 'User'}</p>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-3 space-y-2"
                        >
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Link
                                    href={(window as any).route('profile.edit')}
                                    className="flex items-center px-4 py-3 text-sm text-white/90 hover:bg-white/10 rounded-2xl transition-all duration-200 cursor-pointer"
                                >
                                    <Settings className="w-4 h-4 mr-3" aria-hidden="true" />
                                    Pengaturan
                                </Link>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Link
                                    href={(window as any).route('logout')}
                                    method="post"
                                    as="button"
                                    className="flex items-center px-4 py-3 text-sm text-red-200 hover:bg-red-500/20 rounded-2xl transition-all duration-200 cursor-pointer w-full"
                                >
                                    <LogOut className="w-4 h-4 mr-3" aria-hidden="true" />
                                    Logout
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Main content */}
            <div className="lg:pl-64 transition-all duration-300">
                {/* Top bar */}
                <motion.div 
                    className="sticky top-0 z-30 flex items-center h-20 px-6 bg-white/80 backdrop-blur-lg border-b border-green-100 shadow-sm"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-3 rounded-2xl text-green-700 hover:bg-green-50 transition-colors cursor-pointer"
                        aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
                        aria-expanded={sidebarOpen}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </motion.button>
                    
                    <div className="flex-1 px-6">
                        <motion.h1 
                            className="text-2xl font-bold"
                            style={{ color: '#14532D', fontFamily: 'Baloo 2, cursive' }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {header || 'Dashboard'}
                        </motion.h1>
                    </div>

                    <motion.div 
                        className="flex items-center space-x-4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="hidden sm:block text-right">
                            <p className="text-sm font-semibold" style={{ color: '#14532D' }}>{user.name}</p>
                            <p className="text-xs capitalize" style={{ color: '#475569' }}>{user.roles?.[0]?.name || 'User'}</p>
                        </div>
                        <motion.div 
                            className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-semibold shadow-lg"
                            style={{ background: 'linear-gradient(135deg, #166534 0%, #65A30D 50%, #EAB308 100%)' }}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                            {user.name.charAt(0).toUpperCase()}
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Page content */}
                <main className="p-6">
                    {children}
                </main>
            </div>
            </div>
        </>
    );
}
