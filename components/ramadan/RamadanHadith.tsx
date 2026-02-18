'use client';

import React from 'react';
import { RAMADAN_HADITHS } from '@/lib/ramadan-data';
import { Quote } from 'lucide-react';

export default function RamadanHadith() {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold font-bengali text-emerald-800 flex items-center gap-2">
                <Quote className="text-emerald-600" />
                রমজানের ফজিলত ও হাদিস
            </h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {RAMADAN_HADITHS.map((hadith, index) => (
                    <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-emerald-100 hover:shadow-md transition-shadow relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Quote size={48} />
                        </div>

                        <div className="mb-3">
                            <p className="font-arabic text-xl md:text-2xl text-emerald-900 leading-loose text-right dir-rtl">
                                {hadith.arabic}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm text-emerald-600 italic">
                                {hadith.pronunciation}
                            </p>
                            <p className="text-gray-700 font-medium">
                                {hadith.translation}
                            </p>
                            <p className="text-xs text-gray-500 font-bold mt-2 text-right">
                                — {hadith.reference}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
