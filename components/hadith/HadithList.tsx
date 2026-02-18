'use client';

import React, { useState, useEffect } from 'react';
import { HadithBook } from '@/types/hadith';
import { fetchBooks } from '@/lib/hadith-api';
import HadithBookSelector from './HadithBookSelector';
import HadithReader from './HadithReader';

export default function HadithList() {
    const [books, setBooks] = useState<HadithBook[]>([]);
    const [selectedBookId, setSelectedBookId] = useState<string>('bukhari'); // Default to Bukhari
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function loadBooks() {
            setLoading(true);
            const fetchedBooks = await fetchBooks();
            setBooks(fetchedBooks);
            setLoading(false);
        }

        loadBooks();
    }, []);

    const selectedBook = books.find(b => b.id === selectedBookId);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row gap-6">
            <HadithBookSelector
                books={books}
                selectedBook={selectedBookId}
                onSelectBook={setSelectedBookId}
            />

            <div className="flex-1">
                {selectedBook ? (
                    <HadithReader
                        key={selectedBook.id} // Reset state when book changes
                        bookId={selectedBook.id}
                        bookName={selectedBook.name}
                        available={selectedBook.available}
                    />
                ) : (
                    <div className="text-center py-10 text-gray-500">
                        কিতাব নির্বাচন করুন
                    </div>
                )}
            </div>
        </div>
    );
}
