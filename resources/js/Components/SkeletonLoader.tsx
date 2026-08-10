import React from 'react';

interface SkeletonProps {
    className?: string;
    variant?: 'text' | 'circular' | 'rectangular';
    width?: string | number;
    height?: string | number;
    animation?: 'pulse' | 'wave' | 'none';
}

export function Skeleton({
    className = '',
    variant = 'text',
    width,
    height,
    animation = 'pulse',
}: SkeletonProps) {
    const baseClasses = 'bg-gray-200';
    
    const variantClasses = {
        text: 'rounded',
        circular: 'rounded-full',
        rectangular: 'rounded-md',
    };
    
    const animationClasses = {
        pulse: 'animate-pulse',
        wave: 'animate-pulse',
        none: '',
    };
    
    const style: React.CSSProperties = {};
    if (width) style.width = typeof width === 'number' ? `${width}px` : width;
    if (height) style.height = typeof height === 'number' ? `${height}px` : height;
    
    return (
        <div
            className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
            style={style}
        />
    );
}

// Card Skeleton
export function CardSkeleton() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-4 mb-4">
                <Skeleton variant="circular" width={48} height={48} />
                <div className="flex-1 space-y-2">
                    <Skeleton width="60%" height={20} />
                    <Skeleton width="40%" height={16} />
                </div>
            </div>
            <div className="space-y-2">
                <Skeleton width="100%" height={16} />
                <Skeleton width="80%" height={16} />
                <Skeleton width="90%" height={16} />
            </div>
        </div>
    );
}

// Table Row Skeleton
export function TableRowSkeleton({ columns = 4 }: { columns?: number }) {
    return (
        <tr className="animate-pulse">
            {Array.from({ length: columns }).map((_, index) => (
                <td key={index} className="px-6 py-4">
                    <Skeleton width="100%" height={20} />
                </td>
            ))}
        </tr>
    );
}

// Stat Card Skeleton
export function StatCardSkeleton() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
                <div className="flex-1 space-y-2">
                    <Skeleton width="50%" height={16} />
                    <Skeleton width="30%" height={32} />
                </div>
                <Skeleton variant="circular" width={48} height={48} />
            </div>
        </div>
    );
}

// Form Skeleton
export function FormSkeleton({ fields = 3 }: { fields?: number }) {
    return (
        <div className="space-y-6">
            {Array.from({ length: fields }).map((_, index) => (
                <div key={index} className="space-y-2">
                    <Skeleton width="30%" height={16} />
                    <Skeleton width="100%" height={44} />
                </div>
            ))}
            <Skeleton width="40%" height={44} className="rounded-lg" />
        </div>
    );
}

// List Item Skeleton
export function ListItemSkeleton() {
    return (
        <div className="flex items-center space-x-4 p-4">
            <Skeleton variant="circular" width={40} height={40} />
            <div className="flex-1 space-y-2">
                <Skeleton width="60%" height={16} />
                <Skeleton width="40%" height={14} />
            </div>
            <Skeleton width={80} height={32} />
        </div>
    );
}

// Page Skeleton
export function PageSkeleton() {
    return (
        <div className="space-y-6">
            {/* Header Skeleton */}
            <div className="space-y-4">
                <Skeleton width="40%" height={32} />
                <Skeleton width="60%" height={16} />
            </div>
            
            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                    <StatCardSkeleton key={index} />
                ))}
            </div>
            
            {/* Content Skeleton */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="space-y-4 mb-6">
                    <Skeleton width="30%" height={24} />
                    <Skeleton width="100%" height={40} />
                </div>
                <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <TableRowSkeleton key={index} columns={4} />
                    ))}
                </div>
            </div>
        </div>
    );
}
