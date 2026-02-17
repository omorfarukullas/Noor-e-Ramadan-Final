import Link from 'next/link';
import type { Surah } from '@/types/quran';

interface SurahCardProps {
    surah: Surah;
}

export default function SurahCard({ surah }: SurahCardProps) {
    return (
        <Link
            href={`/quran/${surah.number}`}
            className="block bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden border border-gray-100 dark:border-gray-700"
        >
            <div className="p-6">
                {/* Header with surah number */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md">
                            {surah.number}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                {surah.englishName}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {surah.englishNameTranslation}
                            </p>
                        </div>
                    </div>

                    {/* Arabic name */}
                    <div className="text-right">
                        <p className="text-2xl font-arabic text-gray-800 dark:text-gray-100" dir="rtl">
                            {surah.name}
                        </p>
                    </div>
                </div>

                {/* Metadata */}
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                            {surah.revelationType}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">
                            {surah.numberOfAyahs} আয়াত
                        </span>
                    </div>

                    <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </div>
            </div>
        </Link>
    );
}
