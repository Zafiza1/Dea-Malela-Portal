import { Head, Link } from '@inertiajs/react';
import { 
    BookOpen, 
    Users, 
    FileText, 
    Shield, 
    CheckCircle, 
    ArrowRight,
    GraduationCap,
    Globe,
    Calendar
} from 'lucide-react';

export default function Welcome({ auth }: any) {
    const features = [
        {
            icon: BookOpen,
            title: 'Kurikulum Modern',
            description: 'Kombinasi kurikulum nasional dan internasional dengan pendekatan kontemporer.'
        },
        {
            icon: Users,
            title: 'Tenaga Pendidik Profesional',
            description: 'Guru-guru berpengalaman dan bersertifikasi dengan metode pembelajaran interaktif.'
        },
        {
            icon: FileText,
            title: 'Sistem Administrasi Digital',
            description: 'Manajemen surat menyurat dan data santri yang terintegrasi dan efisien.'
        },
        {
            icon: Shield,
            title: 'Lingkungan Aman',
            description: 'Fasilitas modern dengan sistem keamanan 24 jam untuk kenyamanan santri.'
        }
    ];

    const stats = [
        { label: 'Guru Aktif', value: '50+' },
        { label: 'Santri', value: '500+' },
        { label: 'Program Unggulan', value: '20+' },
        { label: 'Tahun Pengalaman', value: '15+' }
    ];

    return (
        <>
            <Head title="Pesantren Modern Internasional Dea Malela" />
            
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
                {/* Navigation */}
                <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-2">
                                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-800 rounded-lg flex items-center justify-center">
                                    <BookOpen className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-xl font-bold text-gray-800">Dea Malela</span>
                            </div>
                            
                            <div className="hidden md:flex items-center space-x-8">
                                <a href="#features" className="text-gray-600 hover:text-green-600 transition">Fitur</a>
                                <a href="#about" className="text-gray-600 hover:text-green-600 transition">Tentang</a>
                                <a href="#contact" className="text-gray-600 hover:text-green-600 transition">Kontak</a>
                            </div>

                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href="/dashboard"
                                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-medium"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            className="text-gray-600 hover:text-green-600 transition font-medium"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-medium"
                                        >
                                            Daftar
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-8">
                                <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                                    <GraduationCap className="w-4 h-4" />
                                    <span>Pendidikan Berkualitas</span>
                                </div>
                                
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                    Pesantren Modern 
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-500">
                                        {' '}Internasional
                                    </span>
                                    <br />
                                    Dea Malela
                                </h1>
                                
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Membentuk generasi Qur'ani yang berwawasan global, berakhlak mulia, 
                                    dan siap menghadapi tantangan zaman dengan pondasi iman dan ilmu.
                                </p>
                                
                                <div className="flex flex-col sm:flex-row gap-4">
                                    {auth.user ? (
                                        <Link
                                            href="/dashboard"
                                            className="inline-flex items-center justify-center bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl hover:from-green-700 hover:to-green-800 transition font-medium shadow-lg hover:shadow-xl"
                                        >
                                            Masuk Dashboard
                                            <ArrowRight className="w-5 h-5 ml-2" />
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href="/register"
                                                className="inline-flex items-center justify-center bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl hover:from-green-700 hover:to-green-800 transition font-medium shadow-lg hover:shadow-xl"
                                            >
                                                Daftar Sekarang
                                                <ArrowRight className="w-5 h-5 ml-2" />
                                            </Link>
                                            <Link
                                                href="/login"
                                                className="inline-flex items-center justify-center border-2 border-green-600 text-green-600 px-8 py-4 rounded-xl hover:bg-green-50 transition font-medium"
                                            >
                                                Login
                                            </Link>
                                        </>
                                    )}
                                </div>

                                <div className="flex items-center space-x-8 pt-4">
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        <span className="text-gray-600">Terakreditasi A</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        <span className="text-gray-600">Sistem Digital</span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-yellow-400 rounded-3xl blur-3xl opacity-20"></div>
                                <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                                    <div className="aspect-square bg-gradient-to-br from-green-100 to-yellow-100 rounded-2xl flex items-center justify-center">
                                        <BookOpen className="w-32 h-32 text-green-600" />
                                    </div>
                                    <div className="mt-6 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600">Kapasitas Santri</span>
                                            <span className="font-semibold text-gray-900">95%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-gradient-to-r from-green-600 to-green-700 h-2 rounded-full" style={{ width: '95%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-700">
                                        {stat.value}
                                    </div>
                                    <div className="text-gray-600 mt-2">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Mengapa Memilih Kami?
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Kami berkomitmen memberikan pendidikan terbaik dengan fasilitas modern 
                                dan metode pembelajaran yang efektif.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((feature, index) => (
                                <div 
                                    key={index}
                                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200 group"
                                >
                                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <feature.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-yellow-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                    Tentang Pesantren
                                </h2>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Pesantren Modern Internasional Dea Malela adalah lembaga pendidikan Islam 
                                    yang menggabungkan nilai-nilai kepesantrenan dengan kurikulum modern. 
                                    Didirikan pada tahun 2009, kami telah mencetak ribuan alumni yang berprestasi 
                                    dan berakhlak mulia.
                                </p>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    Dengan visi menjadi pusat pendidikan Islam unggulan di tingkat internasional, 
                                    kami terus berinovasi dalam metode pembelajaran dan pengembangan fasilitas 
                                    untuk memberikan pengalaman pendidikan terbaik bagi santri.
                                </p>
                                
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Globe className="w-4 h-4 text-green-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Wawasan Global</h4>
                                            <p className="text-sm text-gray-600">Program internasional</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Calendar className="w-4 h-4 text-green-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Ekskul Lengkap</h4>
                                            <p className="text-sm text-gray-600">20+ kegiatan</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-yellow-400 rounded-3xl blur-3xl opacity-20"></div>
                                <div className="relative grid grid-cols-2 gap-4">
                                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                                            <BookOpen className="w-6 h-6 text-green-600" />
                                        </div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Hafalan</h4>
                                        <p className="text-sm text-gray-600">Program Tahfidz Al-Qur'an</p>
                                    </div>
                                    <div className="bg-white rounded-2xl p-6 shadow-lg mt-8">
                                        <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                                            <Users className="w-6 h-6 text-yellow-600" />
                                        </div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Karakter</h4>
                                        <p className="text-sm text-gray-600">Pembentukan akhlak mulia</p>
                                    </div>
                                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                                            <Globe className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Bahasa</h4>
                                        <p className="text-sm text-gray-600">Arab & Inggris</p>
                                    </div>
                                    <div className="bg-white rounded-2xl p-6 shadow-lg mt-8">
                                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                                            <Shield className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Teknologi</h4>
                                        <p className="text-sm text-gray-600">Digital learning</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Siap Bergabung Bersama Kami?
                            </h2>
                            <p className="text-green-100 mb-8 text-lg">
                                Daftarkan putra-putri Anda sekarang dan berikan mereka pendidikan 
                                terbaik untuk masa depan yang cerah.
                            </p>
                            {auth.user ? (
                                <Link
                                    href="/dashboard"
                                    className="inline-flex items-center justify-center bg-white text-green-600 px-8 py-4 rounded-xl hover:bg-green-50 transition font-medium shadow-lg"
                                >
                                    Masuk Dashboard
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                            ) : (
                                <Link
                                    href="/register"
                                    className="inline-flex items-center justify-center bg-white text-green-600 px-8 py-4 rounded-xl hover:bg-green-50 transition font-medium shadow-lg"
                                >
                                    Daftar Sekarang
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                            )}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer id="contact" className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-4 gap-8 mb-8">
                            <div>
                                <div className="flex items-center space-x-2 mb-4">
                                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                                        <BookOpen className="w-6 h-6 text-white" />
                                    </div>
                                    <span className="text-xl font-bold">Dea Malela</span>
                                </div>
                                <p className="text-gray-400">
                                    Pesantren Modern Internasional Dea Malela
                                </p>
                            </div>
                            
                            <div>
                                <h4 className="font-semibold mb-4">Program</h4>
                                <ul className="space-y-2 text-gray-400">
                                    <li>SD Islam Terpadu</li>
                                    <li>SMP Islam Terpadu</li>
                                    <li>SMA Islam Terpadu</li>
                                    <li>Program Tahfidz</li>
                                </ul>
                            </div>
                            
                            <div>
                                <h4 className="font-semibold mb-4">Kontak</h4>
                                <ul className="space-y-2 text-gray-400">
                                    <li>Jl. Pendidikan No. 123</li>
                                    <li>info@deamalela.com</li>
                                    <li>(021) 1234-5678</li>
                                </ul>
                            </div>
                            
                            <div>
                                <h4 className="font-semibold mb-4">Links</h4>
                                <ul className="space-y-2 text-gray-400">
                                    <li><a href="#features" className="hover:text-white transition">Fitur</a></li>
                                    <li><a href="#about" className="hover:text-white transition">Tentang</a></li>
                                    <li><a href="#contact" className="hover:text-white transition">Kontak</a></li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
                            <p>© 2024 Pesantren Modern Internasional Dea Malela. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
