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
    ChevronRight
} from 'lucide-react';

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
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-green-800 to-green-900 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
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
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                                    (window as any).route().current(item.href.split('.')[0])
                                        ? 'bg-white text-green-800 shadow-md'
                                        : 'text-green-100 hover:bg-green-700 hover:text-white'
                                }`}
                            >
                                <item.icon className="w-5 h-5 mr-3" />
                                {item.name}
                                {(window as any).route().current(item.href.split('.')[0]) && (
                                    <ChevronRight className="w-4 h-4 ml-auto" />
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
                            <Settings className="w-4 h-4 mr-2" />
                            Pengaturan
                        </Link>
                        <Link
                            href={(window as any).route('logout')}
                            method="post"
                            as="button"
                            className="mt-2 flex items-center px-4 py-2 text-sm text-red-200 hover:bg-red-600 rounded-lg transition-colors w-full"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Top bar */}
                <div className="sticky top-0 z-30 flex items-center h-16 px-4 bg-white border-b border-gray-200 shadow-sm">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
                    >
                        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                    
                    <div className="flex-1 px-4">
                        <h1 className="text-xl font-semibold text-gray-800">
                            {header || 'Dashboard'}
                        </h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="hidden sm:block text-right">
                            <p className="text-sm font-medium text-gray-800">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.roles?.[0]?.name || 'User'}</p>
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
