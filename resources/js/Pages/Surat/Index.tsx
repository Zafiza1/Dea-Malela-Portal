import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import FileUpload from '@/Components/FileUpload';
import FilePreviewModal from '@/Components/FilePreviewModal';

export default function SuratIndex({ folders, files, currentFolder, breadcrumb }: any) {
    const [showCreateFolder, setShowCreateFolder] = useState(false);
    const [showUploadFile, setShowUploadFile] = useState(false);
    const [selectedFileForPreview, setSelectedFileForPreview] = useState<any>(null);

    const folderForm = useForm({
        nama: '',
        parent_id: currentFolder?.id || null,
    });

    const fileForm = useForm({
        file: null as File | null,
        folder_id: currentFolder?.id || null,
    });

    const createFolder = (e: React.FormEvent) => {
        e.preventDefault();
        folderForm.post('/surat/folder', {
            onSuccess: () => {
                folderForm.reset();
                setShowCreateFolder(false);
                router.reload();
            },
        } as any);
    };

    const uploadFile = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        if (fileForm.data.file) {
            formData.append('file', fileForm.data.file);
        }
        if (fileForm.data.folder_id) {
            formData.append('folder_id', String(fileForm.data.folder_id));
        }

        fileForm.post('/surat/upload', {
            data: formData,
            onSuccess: () => {
                fileForm.reset();
                setShowUploadFile(false);
                router.reload();
            },
        } as any);
    };

    const deleteFolder = (folderId: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus folder ini?')) {
            router.delete(`/surat/folder/${folderId}`, {
                onSuccess: () => router.reload(),
            });
        }
    };

    const deleteFile = (fileId: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus file ini?')) {
            router.delete(`/surat/file/${fileId}`, {
                onSuccess: () => router.reload(),
            });
        }
    };

    return (
        <>
            <Head title="Surat Menyurat" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold">Surat Menyurat</h1>
                                <div className="space-x-2">
                                    <button
                                        onClick={() => setShowCreateFolder(!showCreateFolder)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        {showCreateFolder ? 'Batal' : 'Buat Folder'}
                                    </button>
                                    <button
                                        onClick={() => setShowUploadFile(!showUploadFile)}
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                                    >
                                        {showUploadFile ? 'Batal' : 'Upload File'}
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
                                        />
                                        <button
                                            type="submit"
                                            disabled={folderForm.processing}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                                        >
                                            {folderForm.processing ? 'Membuat...' : 'Buat'}
                                        </button>
                                    </form>
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
                                            className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                                        >
                                            {fileForm.processing ? 'Mengupload...' : 'Upload'}
                                        </button>
                                    </form>
                                </div>
                            )}
                            
                            {/* Breadcrumb */}
                            {breadcrumb && breadcrumb.length > 0 && (
                                <div className="mb-4 flex items-center space-x-2">
                                    <a href="/surat" className="text-blue-600 hover:underline">Root</a>
                                    {breadcrumb.map((folder: any) => (
                                        <React.Fragment key={folder.id}>
                                            <span>/</span>
                                            <a href={`/surat?folder_id=${folder.id}`} className="text-blue-600 hover:underline">
                                                {folder.nama}
                                            </a>
                                        </React.Fragment>
                                    ))}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Folders */}
                                <div>
                                    <h2 className="text-lg font-semibold mb-3">Folders</h2>
                                    <div className="space-y-2">
                                        {folders.map((folder: any) => (
                                            <div
                                                key={folder.id}
                                                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <a
                                                        href={`/surat?folder_id=${folder.id}`}
                                                        className="flex items-center flex-1"
                                                    >
                                                        <span className="text-2xl mr-3">📁</span>
                                                        <span className="font-medium">{folder.nama}</span>
                                                    </a>
                                                    <button
                                                        onClick={() => deleteFolder(folder.id)}
                                                        className="text-red-600 hover:text-red-800 ml-2"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Files */}
                                <div>
                                    <h2 className="text-lg font-semibold mb-3">Files</h2>
                                    <div className="space-y-2">
                                        {files.map((file: any) => (
                                            <div
                                                key={file.id}
                                                className="p-4 bg-gray-50 rounded-lg"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center flex-1">
                                                        <span className="text-2xl mr-3">📄</span>
                                                        <div className="flex-1">
                                                            <span className="font-medium block">{file.nama_file}</span>
                                                            <span className="text-sm text-gray-500">
                                                                {(file.file_size / 1024).toFixed(2)} KB
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => setSelectedFileForPreview(file)}
                                                            className="text-green-600 hover:text-green-800"
                                                        >
                                                            Preview
                                                        </button>
                                                        <a
                                                            href={`/surat/file/${file.id}/download`}
                                                            className="text-blue-600 hover:text-blue-800"
                                                        >
                                                            Download
                                                        </a>
                                                        <button
                                                            onClick={() => deleteFile(file.id)}
                                                            className="text-red-600 hover:text-red-800"
                                                        >
                                                            Hapus
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

            {/* File Preview Modal */}
            {selectedFileForPreview && (
                <FilePreviewModal
                    isOpen={!!selectedFileForPreview}
                    onClose={() => setSelectedFileForPreview(null)}
                    file={selectedFileForPreview}
                />
            )}
        </>
    );
}
