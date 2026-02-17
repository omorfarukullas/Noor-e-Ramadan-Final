import { Mosque } from '@/lib/mosque-api';
import { toBanglaNumber } from '@/lib/bangla-utils';
import { estimateWalkingTime } from '@/lib/geo-utils';
import { Navigation, MapPin, Clock, ArrowUpRight } from 'lucide-react';

interface MosqueListProps {
    mosques: Mosque[];
}

export default function MosqueList({ mosques }: MosqueListProps) {
    if (mosques.length === 0) {
        return (
            <div className="text-center text-gray-500 py-10">
                কোনো মসজিদ পাওয়া যায়নি। অনুগ্রহ করে এলাকার পরিধি বাড়ান অথবা অন্য স্থানে চেষ্টা করুন।
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {mosques.map((mosque) => (
                <div key={mosque.id} className="group bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-200 relative overflow-hidden">

                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:scale-110 transition-transform"></div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-3">
                            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                                <MapPin size={24} />
                            </div>
                            <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-100">
                                {toBanglaNumber(mosque.distance)} কিমি
                            </span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                            {mosque.name}
                        </h3>

                        <div className="space-y-2 mb-6">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock size={16} className="text-emerald-500" />
                                <span>হাঁটার সময়: {toBanglaNumber(estimateWalkingTime(mosque.distance))}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Navigation size={16} className="text-blue-500" />
                                <span>দিক: {mosque.bearing}</span>
                            </div>
                        </div>

                        <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${mosque.lat},${mosque.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-xl hover:bg-emerald-600 transition-colors font-medium group-hover:shadow-lg"
                        >
                            <span>নেভিগেট করুন</span>
                            <ArrowUpRight size={18} />
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
}
