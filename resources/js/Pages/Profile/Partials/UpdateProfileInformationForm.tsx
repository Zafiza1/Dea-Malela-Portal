import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import LoadingSpinner from '@/Components/LoadingSpinner';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Camera, User as UserIcon } from 'lucide-react';
import type { User } from '../../../types/global';

// @ts-ignore - TextInput component has inaccurate type definitions
const TextInputAny = TextInput as any;

interface UpdateProfileInformationProps {
    mustVerifyEmail?: boolean;
    status?: string;
    className?: string;
}

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}: UpdateProfileInformationProps) {
    const page = usePage();
    const user = (page.props as any).auth.user as User;

    // Design system colors
    const colors = {
        primary: '#166534',
        secondary: '#65A30D',
        background: '#F0FDF4',
        card: '#FFFFFF',
        muted: '#F0FDF4',
        border: '#86EFAC',
    };

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            profile_photo: null as File | null,
        });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        patch('/profile', {
            forceFormData: true,
        });
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData('profile_photo' as any, e.target.files[0]);
        }
    };

    return (
        <section className={className}>
            <header className="mb-6">
                <motion.h2 
                    className="text-xl font-bold"
                    style={{ color: '#1E1B4B', fontFamily: 'Baloo 2, cursive' }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Profile Information
                </motion.h2>

                <motion.p 
                    className="mt-2 text-sm"
                    style={{ color: '#475569' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    Update your account's profile information and email address.
                </motion.p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                {/* Profile Photo Section */}
                <motion.div 
                    className="flex items-center space-x-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="relative">
                        {user.profile_photo_url ? (
                            <motion.img
                                src={user.profile_photo_url}
                                alt={user.name}
                                className="h-24 w-24 rounded-3xl object-cover shadow-lg"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                                whileHover={{ scale: 1.05 }}
                            />
                        ) : (
                            <motion.div 
                                className="h-24 w-24 rounded-3xl flex items-center justify-center shadow-lg"
                                style={{ backgroundColor: colors.muted }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <UserIcon className="h-12 w-12" style={{ color: '#C7D2FE' }} />
                            </motion.div>
                        )}
                        <motion.label 
                            htmlFor="profile_photo" 
                            className="absolute bottom-0 right-0 text-white rounded-2xl p-2 cursor-pointer transition-colors shadow-lg"
                            style={{ backgroundColor: colors.primary }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Camera className="h-5 w-5" />
                        </motion.label>
                        <input
                            id="profile_photo"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handlePhotoChange}
                        />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold" style={{ color: '#1E1B4B', fontFamily: 'Baloo 2, cursive' }}>Profile Photo</h3>
                        <p className="text-xs" style={{ color: '#64748B' }}>PNG, JPG, GIF up to 2MB</p>
                        {errors.profile_photo && (
                            <p className="mt-1 text-sm text-red-600">{errors.profile_photo}</p>
                        )}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <InputLabel htmlFor="name" value="Name" className="font-bold" style={{ color: '#1E1B4B', fontFamily: 'Baloo 2, cursive' }} />

                    <TextInputAny
                        className="mt-2 block w-full rounded-2xl border-2"
                        style={{ borderColor: colors.border }}
                        value={data.name}
                        onChange={(e: any) => setData('name' as any, e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <InputLabel htmlFor="email" value="Email" className="font-bold" style={{ color: '#1E1B4B', fontFamily: 'Baloo 2, cursive' }} />

                    <TextInputAny
                        type="email"
                        className="mt-2 block w-full rounded-2xl border-2"
                        style={{ borderColor: colors.border }}
                        value={data.email}
                        onChange={(e: any) => setData('email' as any, e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </motion.div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <p className="mt-2 text-sm" style={{ color: '#475569' }}>
                            Your email address is unverified.
                            <Link
                                href="/email/verification-notification"
                                method="post"
                                as="button"
                                className="rounded-2xl text-sm underline hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-opacity"
                                style={{ color: colors.primary }}
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </motion.div>
                )}

                <motion.div 
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <motion.button
                        type="submit"
                        disabled={processing}
                        className="min-w-[100px] justify-center px-6 py-3 rounded-2xl font-bold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        style={{ backgroundColor: colors.primary }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {processing ? <LoadingSpinner size="sm" /> : 'Save'}
                    </motion.button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm font-medium" style={{ color: '#16A34A' }}>
                            Saved.
                        </p>
                    </Transition>
                </motion.div>
            </form>
        </section>
    );
}
