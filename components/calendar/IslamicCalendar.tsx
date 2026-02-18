'use client';

import React, { useState, useEffect } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { AladhanDate, getHijriMonth } from '@/lib/hijri-api';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import OccasionModal from './OccasionModal';
import UpcomingEvents from './UpcomingEvents';
import HijriMonthsInfo from './HijriMonthsInfo';
import { toBanglaNumber } from '@/lib/bangla-utils';
import { ISLAMIC_OCCASIONS, IslamicOccasion, HIJRI_MONTHS_BANGLA } from '@/lib/calendar-data';

export default function IslamicCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [calendarData, setCalendarData] = useState<AladhanDate[]>([]);
    const [loading, setLoading] = useState(true);
    const [hijriRange, setHijriRange] = useState('');

    // Modal State
    const [selectedOccasion, setSelectedOccasion] = useState<IslamicOccasion | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const month = currentDate.getMonth() + 1;
                const year = currentDate.getFullYear();

                const data = await getHijriMonth(year, month);
                setCalendarData(data);

                // Calculate Hijri Range Display
                if (data.length > 0) {
                    const first = data[0].hijri;
                    const last = data[data.length - 1].hijri;

                    const startBn = HIJRI_MONTHS_BANGLA.find(m => m.number === first.month.number)?.bn || first.month.en;
                    const endBn = HIJRI_MONTHS_BANGLA.find(m => m.number === last.month.number)?.bn || last.month.en;
                    const yearBn = toBanglaNumber(first.year);

                    setHijriRange(startBn === endBn ? `${startBn} ${yearBn}` : `${startBn} - ${endBn} ${yearBn}`);
                }
            } catch (error) {
                console.error("Failed to fetch calendar", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentDate]);

    const handlePrevMonth = () => setCurrentDate(prev => subMonths(prev, 1));
    const handleNextMonth = () => setCurrentDate(prev => addMonths(prev, 1));
    const handleToday = () => setCurrentDate(new Date());

    const handleDateClick = (date: AladhanDate) => {
        // Find if there is an occasion on this date
        const occasion = ISLAMIC_OCCASIONS.find(
            occ => occ.hijriMonth === date.hijri.month.number && occ.hijriDay === parseInt(date.hijri.day)
        );

        if (occasion) {
            setSelectedOccasion(occasion);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Calendar Area */}
                <div className="lg:col-span-3">
                    <CalendarHeader
                        currentDate={currentDate}
                        hijriMonthName={hijriRange}
                        onPrevMonth={handlePrevMonth}
                        onNextMonth={handleNextMonth}
                        onToday={handleToday}
                    />

                    {loading ? (
                        <div className="h-[500px] flex items-center justify-center bg-white rounded-2xl border border-emerald-100 shadow-sm">
                            <div className="flex flex-col items-center gap-4">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
                                <p className="text-emerald-600 text-sm animate-pulse">ক্যালেন্ডার লোড হচ্ছে...</p>
                            </div>
                        </div>
                    ) : (
                        <CalendarGrid
                            days={calendarData}
                            currentMonth={currentDate}
                            onDateClick={handleDateClick}
                        />
                    )}

                    {/* Bottom Info Section (Desktop/Tablet) */}
                    <div className="hidden lg:block">
                        <HijriMonthsInfo />
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <UpcomingEvents />

                    {/* Compact Month Info for Mobile (or duplicated for easy access) */}
                    <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
                        <h4 className="font-bold text-emerald-800 mb-2">আজকের টিপস</h4>
                        <p className="text-sm text-emerald-700 leading-relaxed">
                            ইসলামিক ক্যালেন্ডার অনুযায়ী দিন সূর্যাস্তের পর শুরু হয়।
                            তাই মাগরিবের পর পরবর্তী হিজরি তারিখ গণনা করা হয়।
                        </p>
                    </div>
                </div>

                {/* Bottom Info Section (Mobile) */}
                <div className="lg:hidden col-span-1 block">
                    <HijriMonthsInfo />
                </div>
            </div>

            {/* Modals */}
            <OccasionModal
                occasion={selectedOccasion}
                onClose={() => setSelectedOccasion(null)}
            />
        </div>
    );
}
