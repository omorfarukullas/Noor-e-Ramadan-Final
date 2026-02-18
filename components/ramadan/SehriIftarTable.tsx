'use client';

import React, { useRef } from 'react';
import { Download, Share2, Printer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GREGORIAN_DATES, DISTRICT_DATA } from '@/lib/ramadan-data';

interface SehriIftarTableProps {
    selectedDistrict: string;
}

export default function SehriIftarTable({ selectedDistrict }: SehriIftarTableProps) {
    const tableRef = useRef<HTMLDivElement>(null);
    const districtData = DISTRICT_DATA[selectedDistrict] || DISTRICT_DATA['ঢাকা'];

    // Convert English numerals to Bangla
    const toBangla = (dateIn: string | number) => {
        return dateIn.toString().replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[parseInt(d)]);
    };

    // Helper to check if a date is "today"
    const isToday = (dateStr: string) => {
        const today = new Date();
        const currentMonth = today.getMonth(); // 0-11
        const currentDate = today.getDate();

        // Map months for parsing
        const monthMap: { [key: string]: number } = { 'ফেব্রুয়ারি': 1, 'মার্চ': 2 };

        const [dayBangla, monthName] = dateStr.split(' ');
        // Convert Bangla day to English number
        const day = parseInt(dayBangla.replace(/[০-৯]/g, d => "0123456789"["০১২৩৪৫৬৭৮৯".indexOf(d)]));

        return currentMonth === monthMap[monthName] && currentDate === day;
    };

    const handlePrint = () => {
        window.print();
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `রমজান ক্যালেন্ডার ২০২৬ - ${selectedDistrict}`,
                    text: `${selectedDistrict} জেলার সেহরি ও ইফতারের সময়সূচি`,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            alert('Sharing is not supported on this browser.');
        }
    };

    return (
        <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100" ref={tableRef}>

            {/* Header / Toolbar */}
            <div className="bg-emerald-600 p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-4 text-white">
                <div>
                    <h2 className="text-2xl font-bold font-bengali text-center md:text-left">
                        পুরো মাসের সময়সূচি - {selectedDistrict}
                    </h2>
                    <p className="text-emerald-100 text-sm mt-1 text-center md:text-left opacity-90">
                        রমজান ২০২৬ (১৪৪৭ হিজরি)
                    </p>
                </div>

                <div className="flex gap-3 print:hidden">
                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                    >
                        <Printer size={16} />
                        প্রিন্ট
                    </button>
                    <button
                        onClick={handleShare}
                        className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                    >
                        <Share2 size={16} />
                        শেয়ার
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse">
                    <thead>
                        <tr className="bg-emerald-50 text-emerald-900 border-b border-emerald-200">
                            <th className="py-4 px-2 font-bold font-bengali">রমজান</th>
                            <th className="py-4 px-2 font-bold font-bengali">তারিখ</th>
                            <th className="py-4 px-2 font-bold font-bengali text-emerald-700 bg-emerald-100/50">সেহরির শেষ সময়</th>
                            <th className="py-4 px-2 font-bold font-bengali text-rose-700 bg-rose-50/50">ইফতারের সময়</th>
                            <th className="py-4 px-2 font-bold font-bengali hidden md:table-cell text-gray-600">ফজরের শুরু</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {GREGORIAN_DATES.map((date, index) => {
                            const isCurrentDay = isToday(date);
                            const ramadanDay = toBangla(index + 1);

                            return (
                                <tr
                                    key={index}
                                    className={cn(
                                        "border-b border-gray-100 hover:bg-emerald-50/60 transition-colors font-medium",
                                        isCurrentDay ? "bg-emerald-100/80 ring-2 ring-inset ring-emerald-400" : (index % 2 === 0 ? "bg-white" : "bg-gray-50/30")
                                    )}
                                >
                                    <td className="py-3 px-2 font-bengali">
                                        {ramadanDay}
                                    </td>
                                    <td className="py-3 px-2 font-bengali text-gray-600">
                                        {date}
                                    </td>
                                    <td className="py-3 px-2 font-bengali font-bold text-emerald-700 bg-emerald-50/30">
                                        {toBangla(districtData.sehri[index])} মি.
                                    </td>
                                    <td className="py-3 px-2 font-bengali font-bold text-rose-600 bg-rose-50/30">
                                        {toBangla(districtData.iftar[index])} মি.
                                    </td>
                                    <td className="py-3 px-2 font-bengali hidden md:table-cell text-gray-500 text-sm">
                                        {toBangla(districtData.fajr[index])} মি.
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Footer Note */}
            <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
                <p className="text-xs text-gray-500">
                    * সতর্কতামূলকভাবে সেহরির শেষ সময় ৩ মিনিট কমানো এবং ইফতারের সময় ৩ মিনিট বাড়ানো হয়েছে।
                </p>
            </div>
        </div>
    );
}
