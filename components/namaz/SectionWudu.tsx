import React from 'react';
import { WUDU_DATA } from '@/lib/namaz-data';
import DuaCard from './DuaCard';
import { CheckCircle2, AlertTriangle, AlertOctagon } from 'lucide-react';

export default function SectionWudu() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* Farz Section */}
            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
                <div className="bg-emerald-600 px-4 py-3 text-white flex items-center gap-2">
                    <CheckCircle2 size={20} />
                    <h3 className="font-bold text-lg">অযুর ফরজ (৪টি)</h3>
                </div>
                <div className="p-4 bg-emerald-50/30">
                    <ul className="space-y-2">
                        {WUDU_DATA.farz.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-gray-700 font-medium">
                                <span className="bg-emerald-100 text-emerald-700 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shrink-0 mt-0.5">{idx + 1}</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Sunnah Section */}
            <div className="bg-white rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
                <div className="bg-teal-600 px-4 py-3 text-white flex items-center gap-2">
                    <CheckCircle2 size={20} />
                    <h3 className="font-bold text-lg">অযুর সুন্নত</h3>
                </div>
                <div className="p-4">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {WUDU_DATA.sunnah.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-gray-600 text-sm">
                                <span className="w-1.5 h-1.5 bg-teal-400 rounded-full shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Breakers Section */}
            <div className="bg-white rounded-xl shadow-sm border border-rose-100 overflow-hidden">
                <div className="bg-rose-500 px-4 py-3 text-white flex items-center gap-2">
                    <AlertOctagon size={20} />
                    <h3 className="font-bold text-lg">অযু ভঙ্গের কারণ</h3>
                </div>
                <div className="p-4 bg-rose-50/30">
                    <ul className="space-y-2">
                        {WUDU_DATA.breakers.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-gray-700">
                                <span className="bg-rose-100 text-rose-700 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shrink-0 mt-0.5">{idx + 1}</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Dua Section */}
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-emerald-500 rounded-full" />
                    অযুর শেষের দোয়া
                </h3>
                <DuaCard dua={{ ...WUDU_DATA.dua, title: 'কালেমা শাহাদাত' }} />
            </div>

        </div>
    );
}
