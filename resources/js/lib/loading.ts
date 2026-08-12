// Common loading configurations
export const loadingConfig = {
    button: {
        size: 'sm' as const,
        text: 'Loading...',
    },
    page: {
        size: 'lg' as const,
        text: 'Loading...',
    },
    table: {
        size: 'md' as const,
        text: 'Loading data...',
    },
};

// Note: withLoading HOC commented out as it requires JSX (.tsx file)
// Uncomment and move to .tsx file if needed in the future
/*
import type { ComponentType } from 'react';
import LoadingSpinner from '@/Components/LoadingSpinner';

export function withLoading<T extends object>(
    Component: ComponentType<T>,
    loading: boolean,
    loadingText?: string
) {
    return function WithLoadingComponent(props: T) {
        if (loading) {
            return <LoadingSpinner size="md" text={loadingText} />;
        }
        return <Component {...props} />;
    };
}
*/