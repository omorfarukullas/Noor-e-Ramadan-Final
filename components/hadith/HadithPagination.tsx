import React from 'react';
import { toBanglaNumber } from '@/lib/bangla-utils';

interface HadithPaginationProps {
    currentPage: number;
    totalPages: number;
    totalHadiths: number;
    onPageChange: (page: number) => void;
}

export default function HadithPagination({
    currentPage,
    totalPages,
    totalHadiths,
    onPageChange,
}: HadithPaginationProps) {
    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first, last, current, and surrounding
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('...');
                pages.push(currentPage - 1);
                pages.push(currentPage);
                pages.push(currentPage + 1);
                pages.push('...');
                pages.push(totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="flex flex-col items-center space-y-4 mt-8">
            <div className="text-gray-600 text-sm">
                পাতা {toBanglaNumber(currentPage)} / মোট {toBanglaNumber(totalPages)} পাতা (মোট হাদিস: {toBanglaNumber(totalHadiths)})
            </div>

            <div className="flex items-center space-x-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-white border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    ← আগের পাতা
                </button>

                <div className="flex space-x-1">
                    {getPageNumbers().map((page, index) => (
                        typeof page === 'number' ? (
                            <button
                                key={index}
                                onClick={() => onPageChange(page)}
                                className={`w-10 h-10 rounded border ${currentPage === page
                                    ? 'bg-emerald-600 text-white border-emerald-600'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                {toBanglaNumber(page)}
                            </button>
                        ) : (
                            <span key={index} className="px-2 py-2 text-gray-400">...</span>
                        )
                    ))}
                </div>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-white border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    পরবর্তী পাতা →
                </button>
            </div>
        </div>
    );
}
