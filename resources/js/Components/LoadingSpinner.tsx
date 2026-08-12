import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    color?: string;
    className?: string;
    text?: string;
}

export default function LoadingSpinner({ 
    size = 'md', 
    color = 'text-green-600', 
    className = '',
    text
}: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    };

    return (
        <div className={`flex flex-col items-center justify-center ${className}`}>
            <Loader2 
                className={`${sizeClasses[size]} ${color} animate-spin`} 
                aria-hidden="true"
            />
            {text && (
                <p className="mt-2 text-sm text-gray-600">{text}</p>
            )}
        </div>
    );
}

// Full page loading component
export function FullPageLoading({ text = 'Loading...' }: { text?: string }) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
            <div className="text-center">
                <LoadingSpinner size="lg" text={text} />
            </div>
        </div>
    );
}

// Button loading component
export function ButtonLoading({ text = 'Loading...' }: { text?: string }) {
    return (
        <div className="flex items-center justify-center">
            <LoadingSpinner size="sm" text={text} />
        </div>
    );
}