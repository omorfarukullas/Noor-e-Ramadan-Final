import React from 'react';
import { X, Calendar as CalendarIcon, Info } from 'lucide-react';
import { IslamicOccasion, HIJRI_MONTHS_BANGLA } from '@/lib/calendar-data';
import { toBanglaNumber } from '@/lib/bangla-utils';

interface OccasionModalProps {
    occasion: IslamicOccasion | null;
    onClose: () => void;
}

export default function OccasionModal({ occasion, onClose }: OccasionModalProps) {
    if (!occasion) return null;

    const monthName = HIJRI_MONTHS_BANGLA.find(m => m.number === occasion.hijriMonth)?.bn;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <span className="w-2 h-6 bg-emerald-500 rounded-full" />
                        {occasion.name}
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    <div className="flex items-center gap-3 text-emerald-700 bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                        <CalendarIcon size={20} />
                        <span className="font-bold">
                            {toBanglaNumber(occasion.hijriDay)} {monthName}
                        </span>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                            <Info size={16} className="text-emerald-500" />
                            তাৎপর্য
                        </h4>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            {occasion.description}
                        </p>
                    </div>

                    <div className="space-y-2 pt-2">
                        <h4 className="font-semibold text-gray-700">Recommended Ibadah</h4>
                        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 text-amber-800 text-sm leading-relaxed">
                            {occasion.ibadah}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-gray-50 rounded-b-2xl border-t border-gray-100 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-200"
                    >
                        বন্ধ করুন
                    </button>
                </div>
            </div>
        </div>
    );
}
