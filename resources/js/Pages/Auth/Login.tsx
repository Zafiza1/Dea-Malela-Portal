import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, useForm } from '@inertiajs/react';
import { FormField, validationSchemas } from '@/Components/Form';
import { useState } from 'react';

interface LoginProps {
    status?: string;
}

export default function Login({ status }: LoginProps) {
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
        <>
            <Head title="Login - Pesantren Modern Internasional Dea Malela" />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-700 via-green-600 to-yellow-400 px-4 sm:px-6">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-sm bg-opacity-95">
                        <div className="flex flex-col items-center mb-6 sm:mb-8">
                            <img
                                src="/images/logo.png"
                                alt="Dea Malela Logo"
                                className="w-20 h-20 sm:w-24 sm:h-24 object-contain mb-3 sm:mb-4"
                            />
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">
                                Pesantren Modern Internasional
                            </h1>
                            <p className="text-gray-600 text-center mt-1 text-sm sm:text-base">Dea Malela</p>
                        </div>

                        {status && (
                            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm font-medium text-green-700">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-4 sm:space-y-6">
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

                            <div className="flex items-center">
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
                            </div>

                            <PrimaryButton 
                                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200" 
                                disabled={processing}
                            >
                                {processing ? 'Memproses...' : 'Login'}
                            </PrimaryButton>
                        </form>

                        <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-500">
                            <p>© 2026 Pesantren Modern Internasional Dea Malela</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
