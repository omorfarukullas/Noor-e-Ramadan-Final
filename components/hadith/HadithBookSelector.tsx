import React from 'react';
import { HadithBook } from '@/types/hadith';
import { toBanglaNumber } from '@/lib/bangla-utils';

interface HadithBookSelectorProps {
    books: HadithBook[];
    selectedBook: string;
    onSelectBook: (bookId: string) => void;
}

export default function HadithBookSelector({
    books,
    selectedBook,
    onSelectBook,
}: HadithBookSelectorProps) {
    return (
        <div className="w-full md:w-64 bg-white rounded-lg shadow-md p-4 mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-4 text-emerald-600 border-b pb-2">কিতাব সমূহ</h3>
            <div className="flex flex-col space-y-2">
                {books.map((book) => (
                    <button
                        key={book.id}
                        onClick={() => onSelectBook(book.id)}
                        className={`text-left px-4 py-2 rounded-md transition-colors ${selectedBook === book.id
                            ? 'bg-emerald-600 text-white'
                            : 'hover:bg-emerald-50 text-gray-700'
                            }`}
                    >
                        {book.name}
                        {book.available > 0 && (
                            <span className="text-xs ml-2 opacity-75">({toBanglaNumber(book.available)} টি)</span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
