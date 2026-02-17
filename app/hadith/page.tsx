'use client';

import React, { useState, useEffect } from 'react';
import { HadithBook } from '@/types/hadith';
import { fetchBooks } from '@/lib/hadith-api';
import HadithCategoryCard from '@/components/hadith/HadithCategoryCard';
import HadithGlobalSearch from '@/components/hadith/HadithGlobalSearch';

export default function HadithPage() {
    const [books, setBooks] = useState<HadithBook[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getBooks() {
            const booksData = await fetchBooks();
            setBooks(booksData);
            setLoading(false);
        }
        getBooks();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-emerald-700 mb-4">
                    আল হাদিস সম্ভার
                </h1>
                <p className="text-gray-600">
                    আপনার পছন্দের কিতাব নির্বাচন করুন এবং হাদিস পাঠ শুরু করুন
                </p>
            </div>

            <HadithGlobalSearch />

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(9)].map((_, i) => (
                        <div key={i} className="bg-white rounded-xl h-48 animate-pulse shadow-sm border border-gray-100"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map((book) => (
                        <HadithCategoryCard key={book.id} book={book} />
                    ))}
                </div>
            )}
        </div>
    );
}
