import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, useForm } from '@inertiajs/react';
import { FormField, validationSchemas } from '@/Components/Form';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ClayBounce, FloatIn } from '@/Components/PageTransition';

interface LoginProps {
    status?: string;
}

export default function Login({ status }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        remember: false,
    });

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

    const [touched, setTouched] = useState({ username: false, password: false });

    const handleFieldChange = (name: string, value: string) => {
        setData(name as any, value);
        setTouched(prev => ({ ...prev, [name]: true }));
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post((window as any).route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Login - Pesantren Modern Internasional Dea Malela" />

            <div className="min-h-screen flex items-center justify-center px-4 sm:px-6" style={{ background: 'linear-gradient(135deg, #166534 0%, #65A30D 50%, #EAB308 100%)' }}>
                <div className="w-full max-w-md">
                    <ClayBounce>
                        <div 
                            className="rounded-3xl p-6 sm:p-8 backdrop-blur-sm border-2"
                            style={{ 
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                borderColor: 'rgba(255, 255, 255, 0.3)',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                            }}
                        >
                            <FloatIn>
                                <div className="flex flex-col items-center mb-6 sm:mb-8">
                                    <motion.div 
                                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl flex items-center justify-center mb-4 shadow-2xl"
                                        style={{ background: 'linear-gradient(135deg, #166534 0%, #65A30D 100%)' }}
                                        whileHover={{ scale: 1.05, rotate: 5 }}
                                    >
                                        <img
                                            src="/images/logo.png"
                                            alt="Dea Malela Logo"
                                            className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                            }}
                                        />
                                        <div className="hidden text-white font-bold text-3xl">DM</div>
                                    </motion.div>
                                    <motion.h1 
                                        className="text-2xl sm:text-3xl font-bold text-center"
                                        style={{ color: '#14532D', fontFamily: 'Baloo 2, cursive' }}
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        Pesantren Modern Internasional
                                    </motion.h1>
                                    <motion.p 
                                        className="text-center mt-2 text-base sm:text-lg"
                                        style={{ color: '#475569', fontFamily: 'Comic Neue, sans-serif' }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        Dea Malela
                                    </motion.p>
                                </div>
                            </FloatIn>

                            {status && (
                                <motion.div 
                                    className="mb-4 p-4 rounded-2xl text-sm font-semibold border-2"
                                    style={{ 
                                        backgroundColor: '#DCFCE7',
                                        borderColor: '#86EFAC',
                                        color: '#166534'
                                    }}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    {status}
                                </motion.div>
                            )}

                            <form onSubmit={submit} className="space-y-5 sm:space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <FormField
                                        name="username"
                                        label="Username"
                                        type="text"
                                        value={data.username}
                                        onChange={handleFieldChange}
                                        validation={validationSchemas.username}
                                        error={errors.username}
                                        touched={touched.username}
                                        placeholder="Masukkan username"
                                        className="mb-4"
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <FormField
                                        name="password"
                                        label="Password"
                                        type="password"
                                        value={data.password}
                                        onChange={handleFieldChange}
                                        validation={{
                                            required: true,
                                            minLength: 6,
                                            message: 'Password minimal 6 karakter',
                                        }}
                                        error={errors.password}
                                        touched={touched.password}
                                        placeholder="Masukkan password"
                                        className="mb-4"
                                    />
                                </motion.div>

                                <motion.div 
                                    className="flex items-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <label className="flex items-center cursor-pointer">
                                        <Checkbox
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                setData('remember', e.target.checked)
                                        }
                                            className="rounded-2xl border-gray-300 focus:ring-green-500"
                                            style={{ '--tw-ring-color': colors.primary } as any}
                                        />
                                        <span className="ms-2 text-sm cursor-pointer" style={{ color: '#475569' }}>
                                            Ingat saya
                                        </span>
                                    </label>
                                </motion.div>

                                <motion.button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full font-semibold py-4 rounded-2xl shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                    style={{ 
                                        background: 'linear-gradient(135deg, #166534 0%, #65A30D 100%)',
                                        color: '#FFFFFF',
                                        fontFamily: 'Baloo 2, cursive'
                                    }}
                                    whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(22, 101, 52, 0.3)' }}
                                    whileTap={{ scale: 0.98 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    {processing ? 'Memproses...' : 'Login'}
                                </motion.button>
                            </form>

                            <motion.div 
                                className="mt-6 text-center text-xs sm:text-sm"
                                style={{ color: '#64748B' }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                            >
                                <p>© 2026 Pesantren Modern Internasional Dea Malela</p>
                            </motion.div>
                        </div>
                    </ClayBounce>
                </div>
            </div>
        </>
    );
}
