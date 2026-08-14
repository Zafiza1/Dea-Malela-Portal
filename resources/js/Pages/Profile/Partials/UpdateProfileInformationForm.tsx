import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import LoadingSpinner from '@/Components/LoadingSpinner';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
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
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                {/* Profile Photo Section */}
                <div className="flex items-center space-x-6">
                    <div className="relative">
                        {user.profile_photo_url ? (
                            <img
                                src={user.profile_photo_url}
                                alt={user.name}
                                className="h-20 w-20 rounded-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        ) : (
                            <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                                <UserIcon className="h-10 w-10 text-gray-400" />
                            </div>
                        )}
                        <label htmlFor="profile_photo" className="absolute bottom-0 right-0 bg-green-600 hover:bg-green-700 text-white rounded-full p-1 cursor-pointer transition-colors">
                            <Camera className="h-4 w-4" />
                        </label>
                        <input
                            id="profile_photo"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handlePhotoChange}
                        />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Profile Photo</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG, GIF up to 2MB</p>
                        {errors.profile_photo && (
                            <p className="mt-1 text-sm text-red-600">{errors.profile_photo}</p>
                        )}
                    </div>
                </div>

                <div>
                    <InputLabel htmlFor="name" value="Name">
                        Name
                    </InputLabel>

                    <TextInputAny
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e: any) => setData('name' as any, e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email">
                        Email
                    </InputLabel>

                    <TextInputAny
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e: any) => setData('email' as any, e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                            Your email address is unverified.
                            <Link
                                href="/email/verification-notification"
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing} className="min-w-[100px] justify-center">
                        {processing ? <LoadingSpinner size="sm" /> : 'Save'}
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
