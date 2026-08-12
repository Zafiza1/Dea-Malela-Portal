import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, FileText, Music, Video, Archive, AlertCircle } from 'lucide-react';

interface FileUploadProps {
    onFileSelect: (file: File) => void;
    accept?: string;
    maxSize?: number; // in bytes
    disabled?: boolean;
    className?: string;
    id?: string;
    label?: string;
}

export default function FileUpload({
    onFileSelect,
    accept = '*/*',
    maxSize = 10 * 1024 * 1024, // 10MB default
    disabled = false,
    className = '',
    id = 'file-upload',
    label = 'Upload file',
}: FileUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        if (!disabled) {
            setIsDragging(true);
        }
    }, [disabled]);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (disabled) return;

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    }, [disabled]);

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFile(files[0]);
        }
    }, []);

    const handleFile = useCallback((file: File) => {
        setError(null);

        // Check file size
        if (file.size > maxSize) {
            setError(`File size exceeds ${maxSize / (1024 * 1024)}MB limit`);
            return;
        }

        // Check file type
        if (accept !== '*/*' && !file.type.match(accept.replace('*', '.*'))) {
            setError('Invalid file type');
            return;
        }

        setSelectedFile(file);
        onFileSelect(file);
    }, [maxSize, accept, onFileSelect]);

    const handleRemove = () => {
        setSelectedFile(null);
        setError(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const getFileIcon = (file: File) => {
        if (file.type.startsWith('image/')) {
            return ImageIcon;
        } else if (file.type.startsWith('video/')) {
            return Video;
        } else if (file.type.startsWith('audio/')) {
            return Music;
        } else if (file.type.includes('zip') || file.type.includes('rar') || file.type.includes('tar')) {
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

    return (
        <div className={className}>
            <input
                ref={inputRef}
                id={id}
                type="file"
                onChange={handleFileSelect}
                accept={accept}
                disabled={disabled}
                className="hidden"
                aria-label={label}
            />

            {!selectedFile ? (
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => !disabled && inputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                        isDragging
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-300 hover:border-green-400 hover:bg-gray-50'
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    role="button"
                    tabIndex={disabled ? -1 : 0}
                    aria-label={label}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            !disabled && inputRef.current?.click();
                        }
                    }}
                >
                    <Upload 
                        className={`w-12 h-12 mx-auto mb-4 ${isDragging ? 'text-green-500' : 'text-gray-400'}`}
                        aria-hidden="true"
                    />
                    <p className="text-gray-600 mb-2">
                        {isDragging ? 'Drop file here' : 'Drag & drop file here'}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">or</p>
                    <button
                        type="button"
                        disabled={disabled}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                        aria-label="Browse files"
                    >
                        Browse Files
                    </button>
                    <p className="text-xs text-gray-400 mt-4">
                        Max file size: {formatFileSize(maxSize)}
                    </p>
                </div>
            ) : (
                <div className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                {React.createElement(getFileIcon(selectedFile), {
                                    className: 'w-6 h-6 text-gray-600',
                                })}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 truncate">{selectedFile.name}</p>
                                <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="p-2 text-gray-400 hover:text-red-500 transition"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}

            {error && (
                <div className="mt-2 flex items-center text-sm text-red-600" role="alert">
                    <AlertCircle className="w-4 h-4 mr-1" aria-hidden="true" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
}
