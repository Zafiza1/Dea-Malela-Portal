import React, { useState, useCallback } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import FileUpload from '@/Components/FileUpload';
// import FilePreviewModal from '@/Components/FilePreviewModal';
import LoadingSpinner from '@/Components/LoadingSpinner';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { ArrowLeft, Download, Trash2, FolderOpen } from 'lucide-react';
import type { FileData, Folder } from '../../types/global';

interface SuratIndexProps {
    folders: Folder[];
    files: FileData[];
    currentFolder?: Folder | null;
    parentFolder?: Folder | null;
}

export default function SuratIndex({ folders, files, currentFolder, parentFolder }: SuratIndexProps) {
    const [showCreateFolder, setShowCreateFolder] = useState(false);
    const [showUploadFile, setShowUploadFile] = useState(false);
    // const [selectedFileForPreview, setSelectedFileForPreview] = useState<FileData | null>(null);
    const [deletingFolderId, setDeletingFolderId] = useState<number | null>(null);
    const [deletingFileId, setDeletingFileId] = useState<number | null>(null);

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
        console.log('Creating folder with data:', folderForm.data);
        
        folderForm.post('/surat/folder', {
            onSuccess: () => {
                console.log('Folder created successfully');
                folderForm.reset();
                setShowCreateFolder(false);
                // Force full page reload to get fresh data
                window.location.href = currentFolder 
                    ? `/surat?folder_id=${currentFolder.id}` 
                    : '/surat';
            },
            onError: (errors) => {
                console.error('Error creating folder:', errors);
                alert('Error creating folder: ' + JSON.stringify(errors));
            },
        });
    }, [folderForm, currentFolder]);

    const uploadFile = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        
        fileForm.post('/surat/upload', {
            onSuccess: () => {
                fileForm.reset();
                setShowUploadFile(false);
                router.reload();
            },
        } as any);
    }, [fileForm]);

    const deleteFolder = useCallback((folderId: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus folder ini?')) {
            setDeletingFolderId(folderId);
            router.delete(`/surat/folder/${folderId}`, {
                onSuccess: () => {
                    setDeletingFolderId(null);
                    router.reload();
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
                    router.reload();
                },
                onError: () => {
                    setDeletingFileId(null);
                },
            });
        }
    }, []);

    return (
        <DashboardLayout header="Surat Menyurat">
            <Head title="Surat Menyurat" />
            <div className="py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
                                    <a
                                        href={
                                            currentFolder 
                                                ? (parentFolder ? `/surat?folder_id=${parentFolder.id}` : '/surat')
                                                : '/dashboard'
                                        }
                                        className="flex items-center px-3 py-2 sm:px-4 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900 transition-all duration-200 shadow-sm hover:shadow-md text-sm sm:text-base"
                                    >
                                        <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
                                        <span className="font-medium">
                                            {currentFolder 
                                                ? (parentFolder ? `Kembali ke ${parentFolder.nama}` : 'Kembali ke Root')
                                                : 'Kembali ke Dashboard'
                                            }
                                        </span>
                                    </a>
                                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Surat Menyurat</h1>
                                </div>
                                <div className="flex items-center space-x-2 w-full sm:w-auto">
                                    <button
                                        onClick={() => setShowCreateFolder(!showCreateFolder)}
                                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md flex-1 sm:flex-none justify-center"
                                    >
                                        <span className="font-medium">{showCreateFolder ? 'Batal' : 'Buat Folder'}</span>
                                    </button>
                                    <button
                                        onClick={() => setShowUploadFile(!showUploadFile)}
                                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md flex-1 sm:flex-none justify-center"
                                    >
                                        <span className="font-medium">{showUploadFile ? 'Batal' : 'Upload File'}</span>
                                    </button>
                                </div>
                            </div>
                            
                            {/* Create Folder Form */}
                            {showCreateFolder && (
                                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                    <h3 className="font-semibold mb-3">Buat Folder Baru</h3>
                                    <form onSubmit={createFolder} className="flex space-x-2">
                                        <input
                                            type="text"
                                            value={folderForm.data.nama}
                                            onChange={e => folderForm.setData('nama', e.target.value)}
                                            placeholder="Nama Folder"
                                            className="flex-1 px-4 py-2 border rounded-lg"
                                            required
                                            disabled={folderForm.processing}
                                        />
                                        <input
                                            type="hidden"
                                            value={folderForm.data.parent_id || ''}
                                            onChange={e => folderForm.setData('parent_id', e.target.value ? parseInt(e.target.value) : null)}
                                        />
                                        <button
                                            type="submit"
                                            disabled={folderForm.processing}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center min-w-[100px] justify-center"
                                        >
                                            {folderForm.processing ? (
                                                <LoadingSpinner size="sm" />
                                            ) : (
                                                'Buat'
                                            )}
                                        </button>
                                    </form>
                                    {folderForm.errors.nama && (
                                        <p className="text-red-500 text-sm mt-2">{folderForm.errors.nama}</p>
                                    )}
                                </div>
                            )}

                            {/* Upload File Form */}
                            {showUploadFile && (
                                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                    <h3 className="font-semibold mb-3">Upload File</h3>
                                    <form onSubmit={uploadFile}>
                                        <FileUpload
                                            onFileSelect={(file) => fileForm.setData('file', file)}
                                            disabled={fileForm.processing}
                                            className="mb-4"
                                        />
                                        <button
                                            type="submit"
                                            disabled={fileForm.processing}
                                            className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center min-h-[42px]"
                                        >
                                            {fileForm.processing ? (
                                                <LoadingSpinner size="sm" />
                                            ) : (
                                                'Upload'
                                            )}
                                        </button>
                                    </form>
                                </div>
                            )}

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                {/* Folders */}
                                <div>
                                    <h2 className="text-base sm:text-lg font-semibold mb-3">Folders</h2>
                                    <div className="space-y-2">
                                        {folders.map((folder: any) => (
                                            <div
                                                key={folder.id}
                                                className="p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <a
                                                        href={`/surat?folder_id=${folder.id}`}
                                                        className="flex items-center flex-1"
                                                    >
                                                        <FolderOpen className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-blue-600" />
                                                        <span className="font-medium text-sm sm:text-base">{folder.nama}</span>
                                                    </a>
                                                    <button
                                                        onClick={() => deleteFolder(folder.id)}
                                                        disabled={deletingFolderId === folder.id}
                                                        className="flex items-center px-3 py-1.5 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[80px] justify-center"
                                                    >
                                                        {deletingFolderId === folder.id ? (
                                                            <LoadingSpinner size="sm" />
                                                        ) : (
                                                            <>
                                                                <Trash2 className="w-4 h-4 mr-1" />
                                                                Hapus
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Files */}
                                <div>
                                    <h2 className="text-base sm:text-lg font-semibold mb-3">Files</h2>
                                    <div className="space-y-2">
                                        {files.map((file: any) => (
                                            <div
                                                key={file.id}
                                                className="p-3 sm:p-4 bg-gray-50 rounded-lg"
                                            >
                                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                                                    <div className="flex items-center flex-1">
                                                        <span className="text-xl sm:text-2xl mr-2 sm:mr-3">📄</span>
                                                        <div className="flex-1">
                                                            <span className="font-medium block text-sm sm:text-base">{file.nama_file}</span>
                                                            <span className="text-xs sm:text-sm text-gray-500">
                                                                {(file.file_size / 1024).toFixed(2)} KB
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-2 sm:space-x-3">
                                                        {/* <button
                                                            onClick={() => setSelectedFileForPreview(file)}
                                                            className="flex items-center px-3 py-1.5 text-sm text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                                                        >
                                                            <Eye className="w-4 h-4 mr-1" />
                                                            Preview
                                                        </button> */}
                                                        <a
                                                            href={`/surat/file/${file.id}/download`}
                                                            className="flex items-center px-3 py-1.5 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                                        >
                                                            <Download className="w-4 h-4 mr-1" />
                                                            Download
                                                        </a>
                                                        <button
                                                            onClick={() => deleteFile(file.id)}
                                                            disabled={deletingFileId === file.id}
                                                            className="flex items-center px-3 py-1.5 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[80px] justify-center"
                                                        >
                                                            {deletingFileId === file.id ? (
                                                                <LoadingSpinner size="sm" />
                                                            ) : (
                                                                <>
                                                                    <Trash2 className="w-4 h-4 mr-1" />
                                                                    Hapus
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
