import React, { useState, useCallback, useEffect, useMemo, memo } from 'react';
import { ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react';
import type { PaginationMeta } from '../types/global';
import { useDebounce } from '../hooks/useDebounce';

interface Column<T = unknown> {
    key: string;
    label: string;
    render?: (item: T) => React.ReactNode;
    sortable?: boolean;
}

interface DataTableProps<T = unknown> {
    data: T[];
    columns: Column<T>[];
    searchable?: boolean;
    filterable?: boolean;
    pagination?: PaginationMeta;
    onPageChange?: (page: number) => void;
    onSearch?: (query: string) => void;
    onFilter?: (filters: Record<string, unknown>) => void;
    loading?: boolean;
    emptyMessage?: string;
    actions?: (item: T) => React.ReactNode;
    debounceDelay?: number;
}

function DataTableInternal<T = unknown>({
    data,
    columns,
    searchable = true,
    filterable = true,
    pagination,
    onPageChange,
    onSearch,
    onFilter,
    loading = false,
    emptyMessage = 'Tidak ada data',
    actions,
    debounceDelay = 300,
}: DataTableProps<T>) {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [showFilter, setShowFilter] = useState(false);

    // Debounced search implementation using custom hook
    const debouncedSearchQuery = useDebounce(searchQuery, debounceDelay);

    useEffect(() => {
        if (onSearch) {
            onSearch(debouncedSearchQuery);
        }
    }, [debouncedSearchQuery]); // Removed onSearch from dependencies

    const handleSearchSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(debouncedSearchQuery);
        }
    }, [debouncedSearchQuery, onSearch]);

    const handleSort = useCallback((column: string) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    }, [sortColumn, sortDirection]);

    const renderCell = useCallback((item: T, column: Column<T>) => {
        if (column.render) {
            return column.render(item);
        }
        return (item as Record<string, unknown>)[column.key] as React.ReactNode;
    }, []);

    // Memoize sorted data if client-side sorting is needed
    const sortedData = useMemo(() => {
        if (!sortColumn) return data;
        
        return [...data].sort((a, b) => {
            const aValue = (a as Record<string, unknown>)[sortColumn];
            const bValue = (b as Record<string, unknown>)[sortColumn];
            
            if (aValue === bValue) return 0;
            
            // Handle different types safely
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                const comparison = aValue.localeCompare(bValue);
                return sortDirection === 'asc' ? comparison : -comparison;
            }
            
            if (typeof aValue === 'number' && typeof bValue === 'number') {
                const comparison = aValue < bValue ? -1 : 1;
                return sortDirection === 'asc' ? comparison : -comparison;
            }
            
            // Fallback for other types
            const comparison = String(aValue || '').localeCompare(String(bValue || ''));
            return sortDirection === 'asc' ? comparison : -comparison;
        });
    }, [data, sortColumn, sortDirection]);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden" role="region" aria-label="Data table">
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">Data Table</h2>
                    
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                        {searchable && (
                            <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-auto">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
                                <input
                                    type="text"
                                    placeholder="Cari..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent w-full sm:w-64 text-sm"
                                    aria-label="Search data"
                                />
                            </form>
                        )}
                        
                        {filterable && (
                            <button
                                onClick={() => setShowFilter(!showFilter)}
                                className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-sm"
                                aria-expanded={showFilter}
                                aria-label="Toggle filters"
                            >
                                <Filter className="w-4 h-4" />
                                <span className="hidden sm:inline">Filter</span>
                            </button>
                        )}
                    </div>
                </div>

                {showFilter && onFilter && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        {/* Filter form can be customized */}
                        <p className="text-sm text-gray-500">Filter options will be rendered here</p>
                    </div>
                )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className={`px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                                        column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                                    }`}
                                    onClick={() => column.sortable && handleSort(column.key)}
                                >
                                    <div className="flex items-center gap-2">
                                        {column.label}
                                        {column.sortable && sortColumn === column.key && (
                                            <span className="text-green-600">
                                                {sortDirection === 'asc' ? '↑' : '↓'}
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                            {actions && <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            // Loading skeleton
                            Array.from({ length: 5 }).map((_, index) => (
                                <tr key={index}>
                                    {columns.map((column) => (
                                        <td key={column.key} className="px-4 sm:px-6 py-4">
                                            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                        </td>
                                    ))}
                                    {actions && <td className="px-4 sm:px-6 py-4"><div className="h-4 bg-gray-200 rounded animate-pulse"></div></td>}
                                </tr>
                            ))
                        ) : sortedData.length === 0 ? (
                            // Empty state
                            <tr>
                                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-4 sm:px-6 py-8 sm:py-12 text-center">
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                            <Search className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                                        </div>
                                        <p className="text-sm sm:text-base text-gray-500">{emptyMessage}</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            // Data rows
                            sortedData.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition">
                                    {columns.map((column) => (
                                        <td key={column.key} className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm">
                                            {renderCell(item, column)}
                                        </td>
                                    ))}
                                    {actions && (
                                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-right text-sm">
                                            {actions(item)}
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {pagination && (
                <div className="px-4 sm:px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
                        Menampilkan {((pagination.current_page - 1) * pagination.per_page) + 1} - {Math.min(pagination.current_page * pagination.per_page, pagination.total)} dari {pagination.total} data
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => onPageChange && onPageChange(pagination.current_page - 1)}
                            disabled={pagination.current_page === 1}
                            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        
                        {Array.from({ length: Math.min(5, pagination.last_page) }, (_, index) => {
                            const pageNum = index + 1;
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => onPageChange && onPageChange(pageNum)}
                                    className={`px-3 py-1 rounded-lg transition text-sm ${
                                        pagination.current_page === pageNum
                                            ? 'bg-green-600 text-white'
                                            : 'border border-gray-200 hover:bg-gray-50'
                                    }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                        
                        <button
                            onClick={() => onPageChange && onPageChange(pagination.current_page + 1)}
                            disabled={pagination.current_page === pagination.last_page}
                            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const DataTable = memo(DataTableInternal) as typeof DataTableInternal;
export default DataTable;
