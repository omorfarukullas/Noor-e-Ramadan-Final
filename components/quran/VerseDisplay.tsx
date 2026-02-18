'use client';

import { useState } from 'react';
import type { Verse } from '@/types/quran';
import { Copy, Bookmark, Check } from 'lucide-react';

interface VerseDisplayProps {
    verse: Verse;
}

export default function VerseDisplay({ verse }: VerseDisplayProps) {
    const [copied, setCopied] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    const handleCopy = () => {
        const textToCopy = `${verse.text}\n\n${verse.transliterationBn}\n\n${verse.translation.bn} - [Surah ${verse.numberInSurah}]`;
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleBookmark = () => {
        // Logic for bookmarking would go here (e.g. valid localStorage update)
        setBookmarked(!bookmarked);
    };

    return (
        <div className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800 py-8 px-4 md:px-6 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
            {/* Ayah Number */}
            <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-700 font-bold text-lg dark:bg-emerald-900/20 dark:text-emerald-400">
                    {verse.numberInSurah.toLocaleString('bn-BD')}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                    <button
                        onClick={handleCopy}
                        className="p-2 text-gray-400 hover:text-emerald-600 transition-colors rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                        title="Copy Ayah"
                    >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                    <button
                        onClick={handleBookmark}
                        className={`p-2 transition-colors rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-900/20 ${bookmarked ? 'text-emerald-600' : 'text-gray-400 hover:text-emerald-600'}`}
                        title="Bookmark"
                    >
                        <Bookmark size={18} fill={bookmarked ? "currentColor" : "none"} />
                    </button>
                </div>
            </div>

            {/* Layer 1: Arabic Text */}
            <div className="mb-6 text-right" dir="rtl">
                <p className="text-3xl md:text-4xl leading-[2.5] text-gray-900 dark:text-gray-100 font-arabic">
                    {verse.text}
                </p>
            </div>

            {/* Layer 2: Bangla Transliteration (Uccaron) */}
            {verse.transliterationBn && (
                <div className="mb-4">
                    <p className="text-sm text-emerald-600 dark:text-emerald-500 mb-1 font-semibold">উচ্চারণ:</p>
                    <p className="text-lg md:text-xl text-emerald-700 dark:text-emerald-400 font-bengali italic leading-relaxed">
                        {verse.transliterationBn}
                    </p>
                </div>
            )}

            {/* Layer 3: Bangla Translation (Meaning) */}
            {verse.translation.bn && (
                <div className="mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-semibold">অনুবাদ:</p>
                    <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 font-bengali leading-relaxed">
                        {verse.translation.bn}
                    </p>
                </div>
            )}
        </div>
    );
}
