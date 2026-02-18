'use client';

import React from 'react';
import { RAMADAN_DUAS } from '@/lib/ramadan-data';
import { Heart } from 'lucide-react';

export default function RamadanDuas() {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold font-bengali text-rose-800 flex items-center gap-2">
                <Heart className="text-rose-600" />
                গুরুত্বপূর্ণ দোয়া
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
                {RAMADAN_DUAS.map((dua) => (
                    <div key={dua.id} className="bg-white rounded-xl p-5 shadow-sm border border-rose-100 hover:shadow-md transition-shadow">
                        <h3 className="text-lg font-bold text-rose-700 mb-3 border-b border-rose-50 pb-2">
                            {dua.title}
                        </h3>

                        <div className="mb-3">
                            <p className="font-arabic text-xl md:text-2xl text-gray-800 leading-loose text-center py-2 dir-rtl">
                                {dua.arabic}
                            </p>
                        </div>

                        <div className="space-y-2 text-sm">
                            <p className="text-gray-600">
                                <span className="font-semibold text-rose-800">উচ্চারণ:</span> {dua.pronunciation}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold text-rose-800">অর্থ:</span> {dua.translation}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
