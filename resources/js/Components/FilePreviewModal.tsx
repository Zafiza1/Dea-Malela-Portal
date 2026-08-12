import React, { useState, useEffect, useRef } from 'react';
import { X, Download, ExternalLink, Image as ImageIcon, FileText, Music, Video, Archive, AlertCircle } from 'lucide-react';
import type { FileData } from '../types/global';

interface FilePreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    file: FileData | null;
}

export default function FilePreviewModal({ isOpen, onClose, file }: FilePreviewModalProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileIdRef = useRef<number | null>(null);
    const previewUrlRef = useRef<string | null>(null);

    useEffect(() => {
        let isCancelled = false;

        const loadPreview = async () => {
            if (!file || !file.file_path) {
                if (!isCancelled) {
                    setError('File path is not available');
                    setLoading(false);
                }
                return;
            }

            if (!isCancelled) {
                setLoading(true);
                setError(null);
            }

            try {
                const response = await fetch(`/storage/${file.file_path}`);
                if (response.ok) {
                    const blob = await response.blob();
                    const url = URL.createObjectURL(blob);
                    previewUrlRef.current = url;
                    if (!isCancelled) {
                        setPreviewUrl(url);
                    }
                } else {
                    if (!isCancelled) {
                        setError(`Failed to load file preview: ${response.statusText}`);
                    }
                }
            } catch (err) {
                if (!isCancelled) {
                    setError(err instanceof Error ? err.message : 'Failed to load file preview');
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        };

        if (isOpen && file && file.id !== fileIdRef.current) {
            fileIdRef.current = file.id;
            loadPreview();
        }

        return () => {
            isCancelled = true;
            if (previewUrlRef.current) {
                URL.revokeObjectURL(previewUrlRef.current);
                previewUrlRef.current = null;
            }
        };
    }, [isOpen, file?.id, file?.file_path]);

    const getFileIcon = (fileType: string) => {
        if (fileType.startsWith('image/')) {
            return ImageIcon;
        } else if (fileType.startsWith('video/')) {
            return Video;
        } else if (fileType.startsWith('audio/')) {
            return Music;
        } else if (fileType.includes('zip') || fileType.includes('rar') || fileType.includes('tar')) {
            return Archive;
        } else {
            return FileText;
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    const isPreviewable = (fileType: string) => {
        return fileType.startsWith('image/') || 
               fileType.startsWith('video/') || 
               fileType.startsWith('audio/') ||
               fileType === 'application/pdf';
    };

    if (!isOpen || !file) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="file-preview-title"
        >
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            {React.createElement(getFileIcon(file.file_type), {
                                className: 'w-5 h-5 text-gray-600',
                                'aria-hidden': 'true',
                            })}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 
                                id="file-preview-title"
                                className="font-semibold text-gray-900 truncate"
                            >
                                {file.nama_file}
                            </h3>
                            <p className="text-sm text-gray-500">{formatFileSize(file.file_size)}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 transition rounded-lg hover:bg-gray-100"
                        aria-label="Close preview"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                            <AlertCircle className="w-16 h-16 text-red-300 mb-4" />
                            <p className="text-gray-500 mb-2 font-medium">Preview Error</p>
                            <p className="text-sm text-gray-400 mb-4">{error}</p>
                            <a
                                href={`/storage/${file.file_path}`}
                                download={file.nama_file}
                                className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                                aria-label={`Download ${file.nama_file}`}
                            >
                                <Download className="w-4 h-4" />
                                <span>Download File</span>
                            </a>
                        </div>
                    ) : previewUrl && isPreviewable(file.file_type) ? (
                        <div className="flex items-center justify-center">
                            {file.file_type.startsWith('image/') && (
                                <img
                                    src={previewUrl}
                                    alt={file.nama_file}
                                    className="max-w-full max-h-[60vh] object-contain rounded-lg"
                                />
                            )}
                            {file.file_type.startsWith('video/') && (
                                <video
                                    src={previewUrl}
                                    controls
                                    className="max-w-full max-h-[60vh] rounded-lg"
                                />
                            )}
                            {file.file_type.startsWith('audio/') && (
                                <audio
                                    src={previewUrl}
                                    controls
                                    className="w-full"
                                />
                            )}
                            {file.file_type === 'application/pdf' && (
                                <iframe
                                    src={previewUrl}
                                    className="w-full h-[60vh] rounded-lg"
                                    title={file.nama_file}
                                />
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                            {React.createElement(getFileIcon(file.file_type), {
                                className: 'w-16 h-16 text-gray-300 mb-4',
                            })}
                            <p className="text-gray-500 mb-2">Preview not available for this file type</p>
                            <p className="text-sm text-gray-400 mb-4">Download the file to view its contents</p>
                            <div className="flex space-x-3">
                                <a
                                    href={`/storage/${file.file_path}`}
                                    download={file.nama_file}
                                    className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                                >
                                    <Download className="w-4 h-4" />
                                    <span>Download</span>
                                </a>
                                <a
                                    href={`/storage/${file.file_path}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    <span>Open in New Tab</span>
                                </a>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end space-x-3 p-4 border-t border-gray-200 bg-gray-50">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition"
                        aria-label="Close preview"
                    >
                        Close
                    </button>
                    <a
                        href={`/storage/${file.file_path}`}
                        download={file.nama_file}
                        className="inline-flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                        aria-label={`Download ${file.nama_file}`}
                    >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
