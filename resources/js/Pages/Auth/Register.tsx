import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ClayBounce, FloatIn } from '@/Components/PageTransition';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
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

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <ClayBounce>
                <form onSubmit={submit} className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <InputLabel htmlFor="name" value="Name" className="font-bold" style={{ color: '#14532D', fontFamily: 'Baloo 2, cursive' }} />

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-2 block w-full rounded-2xl border-2"
                            style={{ borderColor: colors.border }}
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <InputLabel htmlFor="email" value="Email" className="font-bold" style={{ color: '#14532D', fontFamily: 'Baloo 2, cursive' }} />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-2 block w-full rounded-2xl border-2"
                            style={{ borderColor: colors.border }}
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <InputLabel htmlFor="password" value="Password" className="font-bold" style={{ color: '#14532D', fontFamily: 'Baloo 2, cursive' }} />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-2 block w-full rounded-2xl border-2"
                            style={{ borderColor: colors.border }}
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirm Password"
                            className="font-bold"
                            style={{ color: '#14532D', fontFamily: 'Baloo 2, cursive' }}
                        />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-2 block w-full rounded-2xl border-2"
                            style={{ borderColor: colors.border }}
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </motion.div>

                    <motion.div 
                        className="flex items-center justify-end gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Link
                            href={route('login')}
                            className="rounded-2xl text-sm font-semibold underline hover:opacity-80 focus:outline-none transition-opacity"
                            style={{ color: colors.primary }}
                        >
                            Already registered?
                        </Link>

                        <motion.button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-3 rounded-2xl font-semibold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            style={{ 
                                background: 'linear-gradient(135deg, #166534 0%, #65A30D 100%)',
                                fontFamily: 'Baloo 2, cursive'
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {processing ? 'Processing...' : 'Register'}
                        </motion.button>
                    </motion.div>
                </form>
            </ClayBounce>
        </GuestLayout>
    );
}
