'use client';

import React, { useState, useEffect } from 'react';
import { Dua } from '@/types/dua';
import { Copy, Heart, Check } from 'lucide-react';

interface DuaCardProps {
    dua: Dua;
    isFavorite: boolean;
    onToggleFavorite: (id: number) => void;
}

export default function DuaCard({ dua, isFavorite, onToggleFavorite }: DuaCardProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const textToCopy = `${dua.title}\n\n${dua.arabic}\n\nউচ্চারণ: ${dua.pronunciation}\n\nঅনুবাদ: ${dua.translation}\n\nরেফারেন্স: ${dua.reference}`;
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden group">
            {/* Header */}
            <div className="bg-emerald-50 px-6 py-4 flex justify-between items-center border-b border-emerald-100">
                <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                    <span className="text-emerald-600">❖</span> {dua.title}
                </h3>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onToggleFavorite(dua.id)}
                        className={`p-2 rounded-full transition-colors ${isFavorite
                                ? 'bg-red-50 text-red-500 hover:bg-red-100'
                                : 'bg-white text-gray-400 hover:bg-gray-100 hover:text-red-400'
                            }`}
                        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
                    </button>
                    <button
                        onClick={handleCopy}
                        className="p-2 rounded-full bg-white text-gray-500 hover:bg-emerald-100 hover:text-emerald-600 transition-colors"
                        title="Copy to clipboard"
                    >
                        {copied ? <Check size={20} className="text-emerald-600" /> : <Copy size={20} />}
                    </button>
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* Arabic */}
                <div className="text-right" dir="rtl">
                    <p className="text-2xl md:text-3xl leading-loose font-amiri text-gray-800">
                        {dua.arabic}
                    </p>
                </div>

                {/* Pronunciation & Translation */}
                <div className="space-y-4">
                    <div>
                        <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider font-semibold">উচ্চারণ</p>
                        <p className="text-gray-600 italic leading-relaxed text-lg font-kalpurush">
                            {dua.pronunciation}
                        </p>
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                        <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider font-semibold">অনুবাদ</p>
                        <p className="text-gray-700 leading-relaxed">
                            {dua.translation}
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="pt-4 flex justify-between items-center text-sm text-gray-400 border-t border-gray-50 bg-gray-50/50 -mx-6 -mb-6 px-6 py-3 mt-2">
                    <span className="flex items-center gap-1">
                        📖 {dua.reference}
                    </span>
                    <span className="text-emerald-600/20 group-hover:text-emerald-600/40 transition-colors">
                        Noor-e-Ramadan
                    </span>
                </div>
            </div>
        </div>
    );
}
