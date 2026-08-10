import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { 
    LayoutDashboard, 
    Users, 
    BookOpen, 
    FileText, 
    Settings, 
    LogOut,
    Menu,
    X,
    ChevronRight,
    Moon,
    Sun
} from 'lucide-react';
import { useTheme } from '@/Contexts/ThemeContext';

interface DashboardLayoutProps {
    header?: string;
    children: React.ReactNode;
}

interface NavigationItem {
    name: string;
    href: string;
    icon: any;
}

export default function DashboardLayout({ header, children }: DashboardLayoutProps) {
    const page = usePage();
    const user = (page.props as any).auth.user as any;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const isAdmin = user.roles?.some((r: any) => r.name === 'admin');
    const isGuru = user.roles?.some((r: any) => r.name === 'guru');

    const navigation: NavigationItem[] = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        ...(isAdmin ? [
            { name: 'Profil Pendidik', href: '/guru', icon: Users },
            { name: 'Data Santri', href: '/santri', icon: BookOpen },
        ] : []),
        ...(isGuru ? [
            { name: 'Profil Saya', href: `/guru/${user.guru?.id}`, icon: Users },
            { name: 'Data Santri', href: '/santri', icon: BookOpen },
        ] : []),
        { name: 'Surat Menyurat', href: '/surat', icon: FileText },
        ...(isAdmin ? [{ name: 'User Management', href: '/user', icon: Settings }] : []),
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
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

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-green-800 to-green-900 dark:from-gray-800 dark:to-gray-900 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-center h-16 px-4 border-b border-green-700">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-green-700" />
                            </div>
                            <span className="text-white font-bold text-lg">Dea Malela</span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105 ${
                                    (window as any).route().current(item.href.split('.')[0])
                                        ? 'bg-white text-green-800 shadow-md'
                                        : 'text-green-100 hover:bg-green-700 hover:text-white'
                                }`}
                                aria-current={(window as any).route().current(item.href.split('.')[0]) ? 'page' : undefined}
                            >
                                <item.icon className="w-5 h-5 mr-3 transition-transform duration-200" aria-hidden="true" />
                                {item.name}
                                {(window as any).route().current(item.href.split('.')[0]) && (
                                    <ChevronRight className="w-4 h-4 ml-auto animate-pulse" aria-hidden="true" />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* User info */}
                    <div className="p-4 border-t border-green-700">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-white">{user.name}</p>
                                <p className="text-xs text-green-200">{user.roles?.[0]?.name || 'User'}</p>
                            </div>
                        </div>
                        <Link
                            href={(window as any).route('profile.edit')}
                            className="mt-3 flex items-center px-4 py-2 text-sm text-green-100 hover:bg-green-700 rounded-lg transition-colors"
                        >
                            <Settings className="w-4 h-4 mr-2" aria-hidden="true" />
                            Pengaturan
                        </Link>
                        <Link
                            href={(window as any).route('logout')}
                            method="post"
                            as="button"
                            className="mt-2 flex items-center px-4 py-2 text-sm text-red-200 hover:bg-red-600 rounded-lg transition-colors w-full"
                        >
                            <LogOut className="w-4 h-4 mr-2" aria-hidden="true" />
                            Logout
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Top bar */}
                <div className="sticky top-0 z-30 flex items-center h-16 px-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                        aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
                        aria-expanded={sidebarOpen}
                    >
                        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                    
                    <div className="flex-1 px-4">
                        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            {header || 'Dashboard'}
                        </h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition dark:bg-gray-700 dark:hover:bg-gray-600"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? (
                                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                            ) : (
                                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                            )}
                        </button>
                        <div className="hidden sm:block text-right">
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{user.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{user.roles?.[0]?.name || 'User'}</p>
                        </div>
                    </div>
                </div>

                {/* Page content */}
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
