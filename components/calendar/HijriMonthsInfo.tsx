import React from 'react';
import { HIJRI_MONTHS_BANGLA } from '@/lib/calendar-data';
import { toBanglaNumber } from '@/lib/bangla-utils';

export default function HijriMonthsInfo() {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100 mt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                হিজরি মাসের পরিচিতি
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {HIJRI_MONTHS_BANGLA.map((month) => (
                    <div key={month.number} className="p-4 rounded-xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl font-bold text-emerald-600/20 group-hover:text-emerald-600/40 transition-colors">
                                {toBanglaNumber(month.number)}
                            </span>
                            <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-full group-hover:bg-emerald-100 group-hover:text-emerald-700">
                                {month.ar}
                            </span>
                        </div>
                        <h4 className="text-lg font-bold text-gray-800 mb-1">{month.bn}</h4>
                        <p className="text-sm text-gray-500 leading-snug">{month.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
