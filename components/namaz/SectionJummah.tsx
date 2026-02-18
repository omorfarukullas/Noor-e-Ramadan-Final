import React from 'react';
import { JUMMAH_INFO } from '@/lib/namaz-data';
import { Users, Info } from 'lucide-react';

export default function SectionJummah() {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-xl p-6 text-white text-center shadow-lg">
                <Users size={32} className="mx-auto mb-3 opacity-90" />
                <h2 className="text-2xl font-bold mb-2">{JUMMAH_INFO.title}</h2>
                <p className="text-emerald-50 opacity-90 max-w-xl mx-auto leading-relaxed">
                    {JUMMAH_INFO.description}
                </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 p-6">
                <h3 className="text-lg font-bold text-emerald-800 mb-4 flex items-center gap-2">
                    <Info size={18} />
                    গুরুত্বপূর্ণ নিয়মাবলী
                </h3>
                <ul className="space-y-3">
                    {JUMMAH_INFO.rules.map((rule, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-700 bg-emerald-50 p-3 rounded-lg">
                            <span className="bg-emerald-200 text-emerald-800 w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold shrink-0 mt-0.5">{idx + 1}</span>
                            {rule}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-amber-50 rounded-xl p-5 border border-amber-100 flex items-start gap-4">
                <div className="p-2 bg-amber-100 rounded-full text-amber-600 shrink-0">
                    <Users size={20} />
                </div>
                <div>
                    <h4 className="font-bold text-amber-800 mb-1">রাকাত সংখ্যা ও তারতীব</h4>
                    <p className="text-amber-900/80 text-sm leading-relaxed">
                        {JUMMAH_INFO.rakat}
                    </p>
                </div>
            </div>

        </div>
    );
}
