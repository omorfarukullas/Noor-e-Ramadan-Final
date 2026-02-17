'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BOOKS } from '@/lib/hadith-api';
import { toEnglishNumber } from '@/lib/bangla-utils';

export default function HadithGlobalSearch() {
    const router = useRouter();
    const [selectedBook, setSelectedBook] = useState(BOOKS[0].id);
    const [hadithNumber, setHadithNumber] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const englishNum = toEnglishNumber(hadithNumber.trim());
        if (englishNum) {
            // Navigate to the book page with a query param to jump to the specific hadith
            // We'll handle the 'jump' logic in the book page
            router.push(`/hadith/${selectedBook}?jumpTo=${englishNum}`);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto mb-12">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                {/* Abstract shapes for decoration */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-x-10 -translate-y-10"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-emerald-900 opacity-10 rounded-full translate-x-10 translate-y-10"></div>

                <h2 className="text-2xl md:text-3xl font-bold mb-6 relative z-10">
                    যেকোনো হাদিস খুঁজুন সহজেই
                </h2>

                <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 justify-center items-center relative z-10">
                    {/* Book Selector */}
                    <div className="w-full md:w-1/3">
                        <select
                            value={selectedBook}
                            onChange={(e) => setSelectedBook(e.target.value)}
                            className="w-full h-14 pl-4 pr-10 rounded-xl text-gray-800 bg-white border-none focus:ring-4 focus:ring-emerald-300 transition-shadow text-lg appearance-none cursor-pointer"
                            style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23000000%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right .7em top 50%', backgroundSize: '.65em auto' }}
                        >
                            {BOOKS.map((book) => (
                                <option key={book.id} value={book.id}>
                                    {book.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Number Input */}
                    <div className="w-full md:w-1/3">
                        <input
                            type="text"
                            value={hadithNumber}
                            onChange={(e) => setHadithNumber(e.target.value)}
                            placeholder="হাদিস নম্বর (যেমন: ৫)"
                            className="w-full h-14 px-6 rounded-xl text-gray-800 bg-white border-none focus:ring-4 focus:ring-emerald-300 transition-shadow text-lg"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full md:w-auto h-14 px-8 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2"
                    >
                        <span className="text-xl">🔍</span>
                        <span>খুঁজুন</span>
                    </button>
                </form>

                <p className="mt-4 text-emerald-100 text-sm">
                    উদাহরণ: সহিহ বুখারী, হাদিস নম্বর ৫০
                </p>
            </div>
        </div>
    );
}
