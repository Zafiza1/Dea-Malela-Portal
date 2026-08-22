import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import PageTransition, { StaggerContainer, StaggerItem, ClayCard } from '@/Components/PageTransition';

interface EditProps {
    mustVerifyEmail?: boolean;
    status?: string;
}

export default function Edit({ mustVerifyEmail, status }: EditProps) {
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

    return (
        <DashboardLayout header="Pengaturan Profile">
            <Head title="Profile" />

            <PageTransition>
                <div className="py-6 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: colors.background }}>
                    <div className="mx-auto max-w-7xl space-y-6">
                        <StaggerContainer>
                            {/* Header */}
                            <StaggerItem>
                                <div className="flex items-center space-x-2 sm:space-x-4 mb-6">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link
                                            href="/dashboard"
                                            className="flex items-center px-5 py-3 rounded-2xl transition-all duration-300 cursor-pointer shadow-md"
                                            style={{ 
                                                backgroundColor: colors.card,
                                                borderColor: colors.border,
                                                borderWidth: '2px',
                                                color: '#14532D'
                                            }}
                                        >
                                            <ArrowLeft className="w-5 h-5 mr-2" />
                                            <span className="font-bold" style={{ fontFamily: 'Baloo 2, cursive' }}>Kembali</span>
                                        </Link>
                                    </motion.div>
                                    <motion.h1 
                                        className="text-2xl sm:text-3xl font-bold"
                                        style={{ color: '#1E1B4B', fontFamily: 'Baloo 2, cursive' }}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                    >
                                        Pengaturan Profile
                                    </motion.h1>
                                </div>
                            </StaggerItem>

                            {/* Profile Information Form */}
                            <StaggerItem>
                                <ClayCard 
                                    className="rounded-3xl border-2 p-6 sm:p-8"
                                    style={{ 
                                        backgroundColor: colors.card,
                                        borderColor: colors.border,
                                        boxShadow: '0 8px 16px rgba(22, 101, 52, 0.1)'
                                    }}
                                >
                                    <UpdateProfileInformationForm
                                        mustVerifyEmail={mustVerifyEmail}
                                        status={status}
                                        className="max-w-xl"
                                    />
                                </ClayCard>
                            </StaggerItem>

                            {/* Password Form */}
                            <StaggerItem>
                                <ClayCard 
                                    className="rounded-3xl border-2 p-6 sm:p-8"
                                    style={{ 
                                        backgroundColor: colors.card,
                                        borderColor: colors.border,
                                        boxShadow: '0 8px 16px rgba(22, 101, 52, 0.1)'
                                    }}
                                >
                                    <UpdatePasswordForm className="max-w-xl" />
                                </ClayCard>
                            </StaggerItem>

                            {/* Delete Account Form */}
                            <StaggerItem>
                                <ClayCard 
                                    className="rounded-3xl border-2 p-6 sm:p-8"
                                    style={{ 
                                        backgroundColor: colors.card,
                                        borderColor: colors.border,
                                        boxShadow: '0 8px 16px rgba(22, 101, 52, 0.1)'
                                    }}
                                >
                                    <DeleteUserForm className="max-w-xl" />
                                </ClayCard>
                            </StaggerItem>
                        </StaggerContainer>
                    </div>
                </div>
            </PageTransition>
        </DashboardLayout>
    );
}
