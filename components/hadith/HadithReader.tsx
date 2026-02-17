'use client';

import React, { useState, useEffect } from 'react';
import { Hadith, TranslatedHadith, HadithBook } from '@/types/hadith';
import { fetchHadiths, fetchHadithByNumber, translateText } from '@/lib/hadith-api'; // Import fetchHadithByNumber
import HadithCard from './HadithCard';
import HadithPagination from './HadithPagination';
import HadithSearch from './HadithSearch';
import { toBanglaNumber } from '@/lib/bangla-utils';
import { useSearchParams } from 'next/navigation';

const ITEMS_PER_PAGE = 25;

interface HadithReaderProps {
    bookId: string;
    bookName: string; // Passed from parent or derived
    available: number; // Passed via props to know total
}

export default function HadithReader({ bookId, bookName, available }: HadithReaderProps) {
    const searchParams = useSearchParams();
    const jumpTo = searchParams.get('jumpTo');

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [hadiths, setHadiths] = useState<TranslatedHadith[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Handle jumpTo param on mount or change
    useEffect(() => {
        if (jumpTo) {
            // Instead of calculating page, just let the main effect handle it if we treat it as a search
            // But we need a way to distinguish "search mode" vs "pagination mode"
            // Let's use a separate state or just load it
        }
    }, [jumpTo]);

    const [searchQuery, setSearchQuery] = useState<string | null>(jumpTo);

    useEffect(() => {
        setSearchQuery(jumpTo);
    }, [jumpTo]);

    // Fetch hadiths key logic
    useEffect(() => {
        async function getHadiths() {
            setLoading(true);
            setError(null);
            setHadiths([]); // Clear previous

            try {
                let response;

                if (searchQuery) {
                    // Fetch specific hadith
                    response = await fetchHadithByNumber(bookId, searchQuery);
                } else {
                    // Normal pagination
                    const start = (currentPage - 1) * ITEMS_PER_PAGE + 1;
                    const end = currentPage * ITEMS_PER_PAGE;
                    const range = `${start}-${end}`;
                    response = await fetchHadiths(bookId, range);
                }

                if (response && response.data && response.data.hadiths) {
                    const fetchedHadiths = response.data.hadiths;

                    const processedHadiths = await Promise.all(
                        fetchedHadiths.map(async (hadith: Hadith) => {
                            const cacheKey = `hadith_${bookId}_${hadith.number}`;
                            const cached = sessionStorage.getItem(cacheKey);

                            if (cached) {
                                return JSON.parse(cached);
                            }

                            const textToTranslate = (hadith as any).id || (hadith as any).en || '';

                            let translation = '';
                            if (textToTranslate) {
                                translation = await translateText(textToTranslate);
                            }

                            const translatedHadith = {
                                ...hadith,
                                translation,
                                narrator: bookName
                            };

                            sessionStorage.setItem(cacheKey, JSON.stringify(translatedHadith));
                            return translatedHadith;
                        })
                    );

                    setHadiths(processedHadiths);
                } else {
                    // If search failed
                    if (searchQuery) {
                        setError('হাদিসটি খুঁজে পাওয়া যায়নি।');
                    } else {
                        setError('হাদিস লোড করতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।');
                    }
                }
            } catch (err) {
                setError('একটি ত্রুটি ঘটেছে।');
            } finally {
                setLoading(false);
            }
        }

        getHadiths();
    }, [bookId, currentPage, bookName, searchQuery]);

    const handleSearch = (hadithNumber: string) => {
        const num = parseInt(hadithNumber);
        if (!isNaN(num) && num > 0) {
            setSearchQuery(hadithNumber);
            setCurrentPage(1); // Reset page context though not used in search mode
        } else {
            alert('সঠিক হাদিস নম্বর দিন।');
        }
    };

    const clearSearch = () => {
        setSearchQuery(null);
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(available / ITEMS_PER_PAGE);

    return (
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b pb-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{bookName}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        {searchQuery ? `অনুসন্ধান: হাদিস ${toBanglaNumber(searchQuery)}` : `মোট হাদিস: ${toBanglaNumber(available)} টি`}
                    </p>
                </div>
                <div className="mt-4 md:mt-0 w-full md:w-auto flex items-center gap-2">
                    <HadithSearch onSearch={handleSearch} />
                    {searchQuery && (
                        <button onClick={clearSearch} className="text-sm text-red-500 hover:text-red-700 px-3 py-2 bg-red-50 rounded-full">
                            মুছুন
                        </button>
                    )}
                </div>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="text-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                    <p className="text-lg text-gray-600">হাদিস লোড হচ্ছে...</p>
                </div>
            ) : (
                <>
                    <div className="space-y-6">
                        {hadiths.map((hadith) => (
                            <HadithCard
                                key={hadith.number}
                                hadith={hadith}
                                translation={hadith.translation}
                                narrator={bookName}
                            />
                        ))}
                    </div>

                    {!searchQuery && (
                        <HadithPagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalHadiths={available}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </>
            )}
        </div>
    );
}
