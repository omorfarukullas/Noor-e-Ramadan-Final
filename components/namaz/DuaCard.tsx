'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Dua } from '@/lib/namaz-data';

interface DuaCardProps {
    dua: Dua | { arabic: string; pronunciation: string; translation: string; title?: string };
    className?: string;
}

export default function DuaCard({ dua, className = '' }: DuaCardProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const textToCopy = `${dua.title ? dua.title + '\n' : ''}${dua.arabic}\n${dua.pronunciation}\n${dua.translation}`;
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`bg-[#FDFBF7] border-l-4 border-emerald-500 rounded-r-xl shadow-sm p-5 relative group ${className}`}>
            <button
                onClick={handleCopy}
                className="absolute top-4 right-4 p-2 text-emerald-600/50 hover:text-emerald-600 bg-white rounded-full hover:bg-emerald-50 transition-all opacity-0 group-hover:opacity-100"
                title="Copy Dua"
            >
                {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>

            {dua.title && (
                <h4 className="font-bold text-emerald-800 mb-3 text-lg border-b border-emerald-100/50 pb-2 inline-block">
                    {dua.title}
                </h4>
            )}

            <div className="space-y-4">
                <p className="text-right font-amiri text-2xl md:text-3xl leading-loose text-gray-800 dir-rtl">
                    {dua.arabic}
                </p>

                <div className="space-y-2">
                    <p className="text-gray-700 italic text-sm md:text-base">
                        <span className="font-semibold text-emerald-600 not-italic">উচ্চারণ: </span>
                        {dua.pronunciation}
                    </p>
                    <p className="text-gray-600 text-sm md:text-base">
                        <span className="font-semibold text-emerald-600">অর্থ: </span>
                        {dua.translation}
                    </p>
                </div>
            </div>
        </div>
    );
}
