import React from 'react';
import Link from 'next/link';
import { HadithBook } from '@/types/hadith';
import { toBanglaNumber } from '@/lib/bangla-utils';

interface HadithCategoryCardProps {
    book: HadithBook;
}

export default function HadithCategoryCard({ book }: HadithCategoryCardProps) {
    return (
        <Link href={`/hadith/${book.id}`} className="block group">
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 border border-emerald-100 hover:border-emerald-300 h-full flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                    <span className="text-3xl">📚</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-700 transition-colors">
                    {book.name}
                </h3>
                <p className="text-sm text-gray-500 mt-auto">
                    {toBanglaNumber(book.available)} টি হাদিস
                </p>
            </div>
        </Link>
    );
}
