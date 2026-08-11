import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

interface EditProps {
    mustVerifyEmail?: boolean;
    status?: string;
}

export default function Edit({ mustVerifyEmail, status }: EditProps) {
    return (
        <DashboardLayout header="Pengaturan Profile">
            <Head title="Profile" />

            <div className="py-6 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl space-y-6">
                    <div className="flex items-center space-x-2 sm:space-x-4 mb-6">
                        <Link
                            href="/dashboard"
                            className="flex items-center px-3 py-2 sm:px-4 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900 transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
                            <span className="font-medium">Kembali</span>
                        </Link>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Pengaturan Profile</h1>
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
