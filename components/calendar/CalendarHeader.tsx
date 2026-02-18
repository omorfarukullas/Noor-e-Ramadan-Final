import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Printer, Calendar as CalendarIcon } from 'lucide-react';
import { toBanglaNumber } from '@/lib/bangla-utils';
import { getHijriDate } from '@/lib/hijri-api';
import { HIJRI_MONTHS_BANGLA } from '@/lib/calendar-data';

interface CalendarHeaderProps {
    currentDate: Date;
    hijriMonthName: string; // "Rajab - Shaban 1447"
    onPrevMonth: () => void;
    onNextMonth: () => void;
    onToday: () => void;
}

const BANGLA_MONTHS = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
];

export default function CalendarHeader({
    currentDate,
    hijriMonthName,
    onPrevMonth,
    onNextMonth,
    onToday
}: CalendarHeaderProps) {
    const month = BANGLA_MONTHS[currentDate.getMonth()];
    const year = toBanglaNumber(currentDate.getFullYear());
    const [hijriToday, setHijriToday] = useState('');

    useEffect(() => {
        const fetchHijriToday = async () => {
            try {
                const hData = await getHijriDate(new Date());
                if (hData) {
                    const monthBn = HIJRI_MONTHS_BANGLA.find(m => m.number === hData.month.number)?.bn || hData.month.en;
                    const dateBn = toBanglaNumber(hData.day);
                    const yearBn = toBanglaNumber(hData.year);
                    setHijriToday(`${dateBn} ${monthBn}, ${yearBn}`);
                }
            } catch (e) {
                console.error(e);
            }
        };
        fetchHijriToday();
    }, []);

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100 mb-6 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50/50 rounded-full -translate-y-32 translate-x-32 -z-0 pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">

                {/* Today's Date (New Feature) */}
                <div className="flex flex-col items-center md:items-start order-2 md:order-1 bg-emerald-50/80 px-4 py-3 rounded-2xl border border-emerald-100 backdrop-blur-sm min-w-[200px]">
                    <div className="flex items-center gap-2 mb-1">
                        <CalendarIcon className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">আজকের তারিখ</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-gray-900">
                            {new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                    </div>
                    <span className="text-sm font-medium text-emerald-700 mt-0.5 opacity-90">
                        {hijriToday} <span className="text-[10px] opacity-70">(Hijri)</span>
                    </span>
                </div>

                {/* Month Navigation & Title */}
                <div className="flex items-center justify-center gap-6 order-1 md:order-2">
                    <button
                        onClick={onPrevMonth}
                        className="p-3 hover:bg-emerald-50 text-emerald-600 rounded-full transition-all hover:scale-110 shadow-sm bg-white border border-gray-100 hover:border-emerald-200"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <div className="text-center min-w-[220px]">
                        <h2 className="text-4xl font-bold text-gray-800 tracking-tight">
                            {month} {year}
                        </h2>
                        <div className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-sm font-bold mt-2 shadow-sm border border-emerald-200">
                            {hijriMonthName}
                        </div>
                    </div>

                    <button
                        onClick={onNextMonth}
                        className="p-3 hover:bg-emerald-50 text-emerald-600 rounded-full transition-all hover:scale-110 shadow-sm bg-white border border-gray-100 hover:border-emerald-200"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 order-3">
                    <button
                        onClick={onToday}
                        className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all shadow-md shadow-emerald-200 flex items-center gap-2"
                    >
                        ফিরে আসুন
                    </button>
                    <button
                        onClick={() => window.print()}
                        className="p-2.5 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors border border-emerald-200"
                        title="Print"
                    >
                        <Printer className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
