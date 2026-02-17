'use client';

import React, { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import HadithReader from '@/components/hadith/HadithReader';
import { fetchBooks, BOOKS } from '@/lib/hadith-api';
import { HadithBook } from '@/types/hadith';

interface PageProps {
    params: {
        bookId: string;
    };
}

export default function BookPage({ params }: PageProps) {
    const { bookId } = params;
    const [book, setBook] = useState<HadithBook | null>(null);
    const [loading, setLoading] = useState(true);

    // We need to fetch book details to get the 'available' count for pagination
    // We can look nicely in our BOOKS constant for the name, but count comes from API

    useEffect(() => {
        async function loadBookData() {
            const books = await fetchBooks();
            const foundBook = books.find(b => b.id === bookId);
            if (foundBook) {
                setBook(foundBook);
            } else {
                // Maybe verify if it's a valid ID from static list even if fetch fails?
                // But we need the count.
                const staticInfo = BOOKS.find(b => b.id === bookId);
                if (staticInfo) {
                    // Fallback or loading state? 
                    // If API fails often, we might be in trouble for pagination limits.
                    // Let's assume fetchBooks works or we handle error gracefully.
                }
            }
            setLoading(false);
        }
        loadBookData();
    }, [bookId]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                <p>কিতাবের তথ্য লোড হচ্ছে...</p>
            </div>
        );
    }

    if (!book) {
        // If book not found in API list
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold text-red-600">কিতাবটি পাওয়া যায়নি</h1>
                <a href="/hadith" className="text-emerald-600 hover:underline mt-4 block">ফিরে যান</a>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <a href="/hadith" className="flex items-center text-emerald-600 hover:text-emerald-700 transition-colors mb-4">
                    <span className="mr-2">←</span> সব কিতাব
                </a>
            </div>

            <HadithReader
                bookId={bookId}
                bookName={book.name}
                available={book.available}
            />
        </div>
    );
}
