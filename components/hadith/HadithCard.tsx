import React from 'react';
import { Hadith } from '@/types/hadith';
import { toBanglaNumber } from '@/lib/bangla-utils';

interface HadithCardProps {
    hadith: Hadith;
    translation?: string;
    narrator?: string;
    grade?: string;
}

export default function HadithCard({ hadith, translation, narrator, grade }: HadithCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 border-t-4 border-emerald-500">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <span className="bg-emerald-100 text-emerald-800 text-sm font-bold px-3 py-1 rounded-full">
                        হাদিস: {toBanglaNumber(hadith.number)}
                    </span>
                    {grade && (
                        <span className="text-xs font-semibold px-3 py-1 rounded-full"
                            style={{
                                backgroundColor: grade.includes('সহিহ') ? '#d1fae5' : grade.includes('হাসান') ? '#fef3c7' : '#fee2e2',
                                color: grade.includes('সহিহ') ? '#065f46' : grade.includes('হাসান') ? '#92400e' : '#991b1b',
                            }}
                        >
                            {grade}
                        </span>
                    )}
                </div>

                <div className="mb-6 text-right" dir="rtl">
                    <p className="text-2xl leading-loose font-amiri text-gray-800 border-b border-gray-100 pb-4">
                        {hadith.arab}
                    </p>
                </div>

                <div className="mb-4">
                    {translation ? (
                        <p className="text-gray-700 text-lg leading-relaxed font-solaiman">
                            {translation}
                        </p>
                    ) : (
                        <div className="animate-pulse space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    )}
                </div>

                {narrator && (
                    <div className="text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
                        বর্ণনাকারী: {narrator}
                    </div>
                )}
            </div>
        </div>
    );
}
