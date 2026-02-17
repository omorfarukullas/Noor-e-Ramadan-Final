'use client';

import React from 'react';
import TasbihCounter from '@/components/dhikr/TasbihCounter';
import { DHIKR_DATA } from '@/lib/dhikr-data';
import Link from 'next/link';

export default function DhikrPage() {
    return (
        <div className="min-h-screen bg-slate-50 pb-20 md:pb-0">
            {/* Simple Header for merging Context */}
            <div className="bg-white border-b border-gray-100 p-4 sticky top-0 z-40 flex items-center shadow-sm">
                <Link href="/" className="text-emerald-600 hover:bg-emerald-50 p-2 rounded-full transition-colors mr-2">
                    ←
                </Link>
                <h1 className="text-xl font-bold text-gray-800">Digital Dhikr & Tasbih</h1>
            </div>

            <TasbihCounter dhikrs={DHIKR_DATA} />
        </div>
    );
}
