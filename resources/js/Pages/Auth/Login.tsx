import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { BookOpen } from 'lucide-react';
import { FormField, validationSchemas } from '@/Components/Form';
import { useState } from 'react';

interface LoginProps {
    status?: string;
    canResetPassword?: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        remember: false,
    });

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
        <GuestLayout>
            <Head title="Login - Pesantren Modern Internasional Dea Malela" />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-700 via-green-600 to-yellow-400 px-4">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-95">
                        <div className="flex flex-col items-center mb-8">
                            <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center mb-4 shadow-lg">
                                <BookOpen className="w-10 h-10 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-800 text-center">
                                Pesantren Modern Internasional
                            </h1>
                            <p className="text-gray-600 text-center mt-1">Dea Malela</p>
                        </div>

                        {status && (
                            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm font-medium text-green-700">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
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

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setData('remember', e.target.checked)
                                        }
                                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                                    />
                                    <span className="ms-2 text-sm text-gray-600">
                                        Ingat saya
                                    </span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={(window as any).route('password.request')}
                                        className="text-sm text-green-600 hover:text-green-700 font-medium"
                                    >
                                        Lupa password?
                                    </Link>
                                )}
                            </div>

                            <PrimaryButton 
                                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200" 
                                disabled={processing}
                            >
                                {processing ? 'Memproses...' : 'Login'}
                            </PrimaryButton>
                        </form>

                        <div className="mt-6 text-center text-sm text-gray-500">
                            <p>© 2024 Pesantren Modern Internasional Dea Malela</p>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
