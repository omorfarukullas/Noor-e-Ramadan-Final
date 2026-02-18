import React from 'react';
import { AladhanDate } from '@/lib/hijri-api';
import { ISLAMIC_OCCASIONS, BANGLA_WEEKDAYS, HIJRI_MONTHS_BANGLA } from '@/lib/calendar-data';
import { toBanglaNumber } from '@/lib/bangla-utils';
import { cn } from '@/lib/utils';
import { isToday } from 'date-fns';

interface CalendarGridProps {
    days: AladhanDate[];
    currentMonth: Date;
    onDateClick: (date: AladhanDate) => void;
}

export default function CalendarGrid({ days, currentMonth, onDateClick }: CalendarGridProps) {
    // Helper to check for occasions
    const getOccasions = (hijriDate: AladhanDate['hijri']) => {
        return ISLAMIC_OCCASIONS.filter(
            occ => occ.hijriMonth === hijriDate.month.number && occ.hijriDay === parseInt(hijriDate.day)
        );
    };

    return (
        <div className="bg-white rounded-3xl shadow-xl shadow-emerald-50/50 border border-emerald-100 overflow-hidden ring-4 ring-white">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 bg-emerald-50/80 border-b border-emerald-100 backdrop-blur-sm">
                {BANGLA_WEEKDAYS.map((day, idx) => (
                    <div
                        key={day}
                        className={cn(
                            "py-4 text-center text-sm font-bold tracking-wide",
                            idx === 5 ? "text-emerald-700" : "text-gray-500"
                        )}
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 auto-rows-fr bg-gray-50/30 gap-px border-l border-t border-gray-100">
                {days.length > 0 && generateGrid(days, currentMonth).map((cell, idx) => {
                    // Determine if this cell represents TODAY
                    let isTodayDate = false;
                    if (cell.date) {
                        const [d, m, y] = cell.date.gregorian.date.split('-').map(Number);
                        // Note: Aladhan format is DD-MM-YYYY
                        isTodayDate = isToday(new Date(y, m - 1, d));
                    }

                    return (
                        <div
                            key={idx}
                            onClick={() => cell.date && onDateClick(cell.date)}
                            className={cn(
                                "min-h-[120px] p-2 sm:p-3 relative transition-all duration-300 flex flex-col justify-between group border-b border-r border-gray-50",
                                // Base interactions
                                cell.date && "hover:bg-white hover:shadow-lg hover:z-10 hover:-translate-y-1 cursor-pointer",
                                // Friday background
                                (idx % 7 === 5) && !isTodayDate && "bg-emerald-50/20",
                                // Today Highlighting
                                isTodayDate && "bg-gradient-to-br from-emerald-50 to-white ring-2 ring-emerald-500 ring-inset z-20 shadow-xl shadow-emerald-100",
                                // Empty/Previous month
                                !cell.isCurrentMonth && "bg-gray-50/80 text-gray-300 pointer-events-none"
                            )}
                        >
                            {cell.date && (
                                <>
                                    {/* Gregorian Date */}
                                    <div className="flex justify-between items-start">
                                        <span className={cn(
                                            "text-lg sm:text-xl font-bold leading-none w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-300",
                                            isTodayDate
                                                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200 rotate-3"
                                                : "text-gray-700 bg-white border border-gray-100 group-hover:border-emerald-200 group-hover:bg-emerald-50"
                                        )}>
                                            {toBanglaNumber(cell.date.gregorian.day)}
                                        </span>

                                        {/* Occasion Pulse */}
                                        {getOccasions(cell.date.hijri).length > 0 && (
                                            <span className="relative flex h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                                            </span>
                                        )}
                                    </div>

                                    {/* Hijri Date */}
                                    <div className="mt-auto pt-2 sm:pt-3">
                                        <div className={cn(
                                            "text-[10px] sm:text-xs font-semibold text-right transition-colors mb-1.5 flex justify-end items-center gap-1",
                                            getOccasions(cell.date.hijri).length > 0 ? "text-rose-600" : "text-emerald-600/70 group-hover:text-emerald-700"
                                        )}>
                                            <span>{toBanglaNumber(cell.date.hijri.day)}</span>
                                            {/* Localized Month Name */}
                                            <span className="opacity-80 font-normal hidden sm:inline">
                                                {HIJRI_MONTHS_BANGLA.find(m => m.number === cell.date.hijri.month.number)?.bn || cell.date.hijri.month.en}
                                            </span>
                                        </div>

                                        {/* Occasion Badges */}
                                        {getOccasions(cell.date.hijri).slice(0, 1).map(occ => (
                                            <div key={occ.id} className="text-[9px] sm:text-[10px] bg-rose-50 text-rose-700 px-2 py-1 rounded-md border border-rose-100 truncate font-bold text-center shadow-sm">
                                                {occ.name}
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// Helper to generate the 42-cell grid
function generateGrid(apiDays: AladhanDate[], currentMonth: Date): { date: AladhanDate | null, isCurrentMonth: boolean }[] {
    if (!apiDays.length) return [];

    // Aladhan days usually start from 1st of month.
    // We need to find the weekday of the 1st day.
    const firstDay = apiDays[0];

    const [d, m, y] = firstDay.gregorian.date.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);

    const startDayOfWeek = dateObj.getDay(); // 0 (Sun) to 6 (Sat)

    const grid = [];

    // Padding for start
    for (let i = 0; i < startDayOfWeek; i++) {
        grid.push({ date: null, isCurrentMonth: false });
    }

    // Current month days
    apiDays.forEach(day => {
        grid.push({ date: day, isCurrentMonth: true });
    });

    // Padding for end to complete grid
    while (grid.length % 7 !== 0) {
        grid.push({ date: null, isCurrentMonth: false });
    }

    return grid;
}
