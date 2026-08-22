import React, { useState, useCallback } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import FileUpload from '@/Components/FileUpload';
// import FilePreviewModal from '@/Components/FilePreviewModal';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Download, Trash2, FolderOpen, ArrowLeft, FileText } from 'lucide-react';
import PageTransition, { StaggerContainer, StaggerItem, ClayCard, FloatIn } from '@/Components/PageTransition';
import type { FileData, Folder } from '../../types/global';

interface SuratIndexProps {
    folders: Folder[];
    files: FileData[];
    currentFolder?: Folder | null;
}

export default function SuratIndex({ folders, files, currentFolder }: SuratIndexProps) {
    const [showCreateFolder, setShowCreateFolder] = useState(false);
    const [showUploadFile, setShowUploadFile] = useState(false);
    // const [selectedFileForPreview, setSelectedFileForPreview] = useState<FileData | null>(null);
    const [deletingFolderId, setDeletingFolderId] = useState<number | null>(null);
    const [deletingFileId, setDeletingFileId] = useState<number | null>(null);

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

    const folderForm = useForm({
        nama: '',
        parent_id: currentFolder?.id || null,
    });

    const fileForm = useForm({
        file: null as File | null,
        folder_id: currentFolder?.id || null,
    } as any);

    const createFolder = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        folderForm.post('/surat/folder', {
            onSuccess: () => {
                folderForm.reset();
                setShowCreateFolder(false);
            },
            preserveState: true,
        });
    }, [folderForm]);

    const uploadFile = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        fileForm.post('/surat/upload', {
            onSuccess: () => {
                fileForm.reset();
                setShowUploadFile(false);
            },
            preserveState: true,
        } as any);
    }, [fileForm]);

    const deleteFolder = useCallback((folderId: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus folder ini?')) {
            setDeletingFolderId(folderId);
            router.delete(`/surat/folder/${folderId}`, {
                onSuccess: () => {
                    setDeletingFolderId(null);
                },
                onError: () => {
                    setDeletingFolderId(null);
                },
            });
        }
    }, []);

    const deleteFile = useCallback((fileId: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus file ini?')) {
            setDeletingFileId(fileId);
            router.delete(`/surat/file/${fileId}`, {
                onSuccess: () => {
                    setDeletingFileId(null);
                },
                onError: () => {
                    setDeletingFileId(null);
                },
            });
        }
    }, []);

    return (
        <DashboardLayout header={currentFolder ? `Surat Menyurat > ${currentFolder.nama}` : "Surat Menyurat"}>
            <Head title={currentFolder ? `Surat Menyurat > ${currentFolder.nama}` : "Surat Menyurat"} />
            <PageTransition>
                <div className="py-6 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: colors.background }}>
                    <div className="max-w-7xl mx-auto">
                        <StaggerContainer className="space-y-6">
                            {/* Main Card */}
                            <StaggerItem>
                                <ClayCard 
                                    className="rounded-3xl border-2 overflow-hidden"
                                    style={{ 
                                        backgroundColor: colors.card,
                                        borderColor: colors.border,
                                        boxShadow: '0 8px 16px rgba(79, 70, 229, 0.1)'
                                    }}
                                >
                                    <div className="p-4 sm:p-6">
                                        {/* Header */}
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                            <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
                                                <div className="flex items-center">
                                                    <motion.h1 
                                                        className="text-xl sm:text-2xl font-bold"
                                                        style={{ color: '#1E1B4B', fontFamily: 'Baloo 2, cursive' }}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                    >
                                                        {currentFolder && currentFolder.nama ? (
                                                            <span>Surat Menyurat &gt; {currentFolder.nama}</span>
                                                        ) : (
                                                            <span>Surat Menyurat</span>
                                                        )}
                                                    </motion.h1>
                                                </div>
                                                {currentFolder && (
                                                    <motion.div
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        <a
                                                            href="/surat"
                                                            className="flex items-center px-4 py-2 rounded-xl transition-all duration-200 shadow-md cursor-pointer"
                                                            style={{ backgroundColor: '#6B7280', color: '#FFFFFF' }}
                                                        >
                                                            <ArrowLeft className="w-4 h-4 mr-2" />
                                                            <span className="font-medium">Kembali ke Root</span>
                                                        </a>
                                                    </motion.div>
                                                )}
                                            </div>

                                            <div className="flex items-center space-x-2 w-full sm:w-auto">
                                                <motion.button
                                                    onClick={() => setShowCreateFolder(!showCreateFolder)}
                                                    className="flex items-center px-4 py-2 rounded-xl transition-all duration-200 shadow-md flex-1 sm:flex-none justify-center cursor-pointer"
                                                    style={{ backgroundColor: showCreateFolder ? '#6B7280' : '#2563EB', color: '#FFFFFF' }}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <span className="font-medium">{showCreateFolder ? 'Batal' : 'Buat Folder'}</span>
                                                </motion.button>
                                                <motion.button
                                                    onClick={() => setShowUploadFile(!showUploadFile)}
                                                    className="flex items-center px-4 py-2 rounded-xl transition-all duration-200 shadow-md flex-1 sm:flex-none justify-center cursor-pointer"
                                                    style={{ backgroundColor: showUploadFile ? '#6B7280' : '#16A34A', color: '#FFFFFF' }}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <span className="font-medium">{showUploadFile ? 'Batal' : 'Upload File'}</span>
                                                </motion.button>
                                            </div>
                                        </div>
                                        
                                        {/* Create Folder Form */}
                                        <AnimatePresence>
                                            {showCreateFolder && (
                                                <motion.div 
                                                    className="mb-6 p-4 rounded-2xl"
                                                    style={{ backgroundColor: colors.muted }}
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                >
                                                    <h3 className="font-bold mb-3" style={{ color: '#1E1B4B', fontFamily: 'Baloo 2, cursive' }}>Buat Folder Baru</h3>
                                                    <form onSubmit={createFolder} className="flex space-x-2">
                                                        <input
                                                            type="text"
                                                            value={folderForm.data.nama}
                                                            onChange={e => folderForm.setData('nama', e.target.value)}
                                                            placeholder="Nama Folder"
                                                            className="flex-1 px-4 py-2 border-2 rounded-xl"
                                                            style={{ borderColor: colors.border }}
                                                            required
                                                            disabled={folderForm.processing}
                                                        />
                                                        <input
                                                            type="hidden"
                                                            value={folderForm.data.parent_id || ''}
                                                            onChange={e => folderForm.setData('parent_id', e.target.value ? parseInt(e.target.value) : null)}
                                                        />
                                                        <motion.button
                                                            type="submit"
                                                            disabled={folderForm.processing}
                                                            className="px-4 py-2 rounded-xl transition disabled:opacity-50 flex items-center min-w-[100px] justify-center cursor-pointer"
                                                            style={{ backgroundColor: '#2563EB', color: '#FFFFFF' }}
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            {folderForm.processing ? 'Loading...' : 'Buat'}
                                                        </motion.button>
                                                    </form>
                                                    {folderForm.errors.nama && (
                                                        <p className="text-red-500 text-sm mt-2">{folderForm.errors.nama}</p>
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Upload File Form */}
                                        <AnimatePresence>
                                            {showUploadFile && (
                                                <motion.div 
                                                    className="mb-6 p-4 rounded-2xl"
                                                    style={{ backgroundColor: colors.muted }}
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                >
                                                    <h3 className="font-bold mb-3" style={{ color: '#1E1B4B', fontFamily: 'Baloo 2, cursive' }}>Upload File</h3>
                                                    <form onSubmit={uploadFile}>
                                                        <FileUpload
                                                            onFileSelect={(file) => fileForm.setData('file', file)}
                                                            disabled={fileForm.processing}
                                                            className="mb-4"
                                                        />
                                                        <motion.button
                                                            type="submit"
                                                            disabled={fileForm.processing}
                                                            className="w-full px-4 py-2 rounded-xl transition disabled:opacity-50 flex items-center justify-center min-h-[42px] cursor-pointer"
                                                            style={{ backgroundColor: '#16A34A', color: '#FFFFFF' }}
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                        >
                                                            {fileForm.processing ? 'Loading...' : 'Upload'}
                                                        </motion.button>
                                                    </form>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                            {/* Folders */}
                                            <div>
                                                <motion.h2 
                                                    className="text-base sm:text-lg font-bold mb-3"
                                                    style={{ color: '#1E1B4B', fontFamily: 'Baloo 2, cursive' }}
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                >
                                                    Folders
                                                </motion.h2>
                                                <div className="space-y-2">
                                                    {folders.map((folder: any, index) => (
                                                        <motion.div
                                                            key={folder.id}
                                                            className="p-3 sm:p-4 rounded-2xl cursor-pointer transition-all duration-200"
                                                            style={{ backgroundColor: colors.muted }}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: index * 0.05 }}
                                                            whileHover={{ scale: 1.02, backgroundColor: '#E0E7FF' }}
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <a
                                                                    href={`/surat?folder_id=${folder.id}`}
                                                                    className="flex items-center flex-1"
                                                                >
                                                                    <motion.div 
                                                                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mr-2 sm:mr-3"
                                                                        style={{ backgroundColor: '#DBEAFE' }}
                                                                        whileHover={{ rotate: 10 }}
                                                                    >
                                                                        <FolderOpen className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                                                                    </motion.div>
                                                                    <span className="font-medium text-sm sm:text-base" style={{ color: '#1E1B4B', fontFamily: 'Baloo 2, cursive' }}>{folder.nama}</span>
                                                                </a>
                                                                <motion.button
                                                                    onClick={() => deleteFolder(folder.id)}
                                                                    disabled={deletingFolderId === folder.id}
                                                                    className="flex items-center px-3 py-1.5 text-sm font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[80px] justify-center cursor-pointer"
                                                                    style={{ color: '#DC2626', backgroundColor: '#FEE2E2' }}
                                                                    whileHover={{ scale: 1.05 }}
                                                                    whileTap={{ scale: 0.95 }}
                                                                >
                                                                    {deletingFolderId === folder.id ? (
                                                                        'Loading...'
                                                                    ) : (
                                                                        <>
                                                                            <Trash2 className="w-4 h-4 mr-1" />
                                                                            Hapus
                                                                        </>
                                                                    )}
                                                                </motion.button>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Files */}
                                            <div>
                                                <motion.h2 
                                                    className="text-base sm:text-lg font-bold mb-3"
                                                    style={{ color: '#1E1B4B', fontFamily: 'Baloo 2, cursive' }}
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                >
                                                    Files
                                                </motion.h2>
                                                <div className="space-y-2">
                                                    {files.map((file: any, index) => (
                                                        <motion.div
                                                            key={file.id}
                                                            className="p-3 sm:p-4 rounded-2xl cursor-pointer transition-all duration-200"
                                                            style={{ backgroundColor: colors.muted }}
                                                            initial={{ opacity: 0, x: 20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: index * 0.05 }}
                                                            whileHover={{ scale: 1.02, backgroundColor: '#E0E7FF' }}
                                                        >
                                                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                                                                <div className="flex items-center flex-1">
                                                                    <motion.div 
                                                                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mr-2 sm:mr-3"
                                                                        style={{ backgroundColor: '#DBEAFE' }}
                                                                        whileHover={{ rotate: 10 }}
                                                                    >
                                                                        <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                                                                    </motion.div>
                                                                    <div className="flex-1">
                                                                        <span className="font-medium block text-sm sm:text-base" style={{ color: '#1E1B4B', fontFamily: 'Baloo 2, cursive' }}>{file.nama_file}</span>
                                                                        <span className="text-xs sm:text-sm" style={{ color: '#64748B' }}>
                                                                            {(file.file_size / 1024).toFixed(2)} KB
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex space-x-2 sm:space-x-3">
                                                                    <motion.a
                                                                        href={`/surat/file/${file.id}/download`}
                                                                        className="flex items-center px-3 py-1.5 text-sm font-semibold rounded-xl transition-colors cursor-pointer"
                                                                        style={{ color: '#2563EB', backgroundColor: '#DBEAFE' }}
                                                                        whileHover={{ scale: 1.05 }}
                                                                        whileTap={{ scale: 0.95 }}
                                                                    >
                                                                        <Download className="w-4 h-4 mr-1" />
                                                                        Download
                                                                    </motion.a>
                                                                    <motion.button
                                                                        onClick={() => deleteFile(file.id)}
                                                                        disabled={deletingFileId === file.id}
                                                                        className="flex items-center px-3 py-1.5 text-sm font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[80px] justify-center cursor-pointer"
                                                                        style={{ color: '#DC2626', backgroundColor: '#FEE2E2' }}
                                                                        whileHover={{ scale: 1.05 }}
                                                                        whileTap={{ scale: 0.95 }}
                                                                    >
                                                                        {deletingFileId === file.id ? (
                                                                            'Loading...'
                                                                        ) : (
                                                                            <>
                                                                                <Trash2 className="w-4 h-4 mr-1" />
                                                                                Hapus
                                                                            </>
                                                                        )}
                                                                    </motion.button>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ClayCard>
                            </StaggerItem>
                        </StaggerContainer>
                    </div>
                </div>
            </PageTransition>

            {/* File Preview Modal - temporarily disabled */}
            {/* {selectedFileForPreview && (
                <FilePreviewModal
                    isOpen={true}
                    onClose={() => setSelectedFileForPreview(null)}
                    file={selectedFileForPreview}
                />
            )} */}
        </DashboardLayout>
    );
}
