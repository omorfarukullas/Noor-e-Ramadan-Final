import React, { useEffect, useState } from 'react';
import { IslamicOccasion, ISLAMIC_OCCASIONS, HIJRI_MONTHS_BANGLA } from '@/lib/calendar-data';
import { getHijriDate } from '@/lib/hijri-api';
import { toBanglaNumber } from '@/lib/bangla-utils';
import { Clock, X } from 'lucide-react';

export default function UpcomingEvents() {
    const [upcoming, setUpcoming] = useState<IslamicOccasion[]>([]);
    const [isViewAllOpen, setIsViewAllOpen] = useState(false);

    useEffect(() => {
        const fetchAndFilterEvents = async () => {
            try {
                // Get accurate Hijri date from API
                const today = new Date();
                const hData = await getHijriDate(today);

                if (!hData) {
                    // Fallback if API fails
                    setUpcoming(ISLAMIC_OCCASIONS.slice(0, 5));
                    return;
                }

                const hDay = parseInt(hData.day);
                const hMonth = hData.month.number;

                // Sort all occasions by Month then Day
                const allOccasions = [...ISLAMIC_OCCASIONS].sort((a, b) => {
                    if (a.hijriMonth !== b.hijriMonth) return a.hijriMonth - b.hijriMonth;
                    return a.hijriDay - b.hijriDay;
                });

                // Filter: Occasions later in this year
                const nextInYear = allOccasions.filter(occ => {
                    if (occ.hijriMonth > hMonth) return true;
                    if (occ.hijriMonth === hMonth && occ.hijriDay >= hDay) return true;
                    return false;
                });

                // Occasions in next year (wrap around)
                const nextYear = allOccasions.filter(occ => !nextInYear.includes(occ));

                // Combine and take top 5
                setUpcoming([...nextInYear, ...nextYear].slice(0, 5));

            } catch (e) {
                console.error("Error calculating upcoming events", e);
                setUpcoming(ISLAMIC_OCCASIONS.slice(0, 5));
            }
        };

        fetchAndFilterEvents();
    }, []);

    const getMonthName = (num: number) => HIJRI_MONTHS_BANGLA.find(m => m.number === num)?.bn;

    // Ordered list for display in modal (Jan to Dec equiv / Muharram to Dhul Hijjah)
    const sortedAllOccasions = [...ISLAMIC_OCCASIONS].sort((a, b) => {
        if (a.hijriMonth !== b.hijriMonth) return a.hijriMonth - b.hijriMonth;
        return a.hijriDay - b.hijriDay;
    });

    return (
        <>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2 flex items-center gap-2">
                    <Clock size={18} className="text-emerald-500" />
                    আসন্ন ইসলামিক দিবস
                </h3>

                <div className="space-y-3">
                    {upcoming.map((occ) => (
                        <div key={occ.id} className="group relative pl-4 border-l-2 border-emerald-200 hover:border-emerald-500 transition-colors">
                            <div className="text-sm font-semibold text-gray-800 group-hover:text-emerald-700 transition-colors">
                                {occ.name}
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">
                                {toBanglaNumber(occ.hijriDay)} {getMonthName(occ.hijriMonth)}
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => setIsViewAllOpen(true)}
                    className="w-full mt-4 py-2 text-xs font-medium text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                >
                    সব দেখুন
                </button>
            </div>

            {/* View All Modal */}
            {isViewAllOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl w-full max-w-lg max-h-[80vh] flex flex-col shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-100 shrink-0">
                            <h3 className="text-xl font-bold text-gray-900">
                                সারা বছরের ইসলামিক দিবসসমূহ
                            </h3>
                            <button
                                onClick={() => setIsViewAllOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content - Scrollable */}
                        <div className="p-4 overflow-y-auto custom-scrollbar space-y-3 flex-1">
                            {sortedAllOccasions.map((occ, idx) => (
                                <div key={occ.id} className="flex items-start gap-4 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors border border-gray-100 hover:border-emerald-100">
                                    <div className="flex flex-col items-center justify-center w-12 h-12 bg-white rounded-lg shadow-sm border border-emerald-100 shrink-0">
                                        <span className="text-lg font-bold text-emerald-600">{toBanglaNumber(occ.hijriDay)}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">{occ.name}</h4>
                                        <p className="text-xs text-emerald-600 font-medium mt-0.5">
                                            {getMonthName(occ.hijriMonth)}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                            {occ.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-gray-100 shrink-0">
                            <button
                                onClick={() => setIsViewAllOpen(false)}
                                className="w-full py-2.5 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors shadow-sm"
                            >
                                বন্ধ করুন
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
