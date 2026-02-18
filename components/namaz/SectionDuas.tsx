import React from 'react';
import { NAMAZ_DUAS } from '@/lib/namaz-data';
import DuaCard from './DuaCard';

export default function SectionDuas() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 text-center mb-6">
                <h3 className="text-emerald-800 font-bold text-lg">নামাজের যাবতীয় দোয়া ও তাসবিহ</h3>
                <p className="text-emerald-600 text-sm mt-1">ক্লিক করে কপি করুন এবং মুখস্থ করুন</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {NAMAZ_DUAS.map((dua) => (
                    <DuaCard key={dua.id} dua={dua} />
                ))}
            </div>
        </div>
    );
}
