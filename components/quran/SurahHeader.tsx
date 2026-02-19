import Link from 'next/link';
import type { SurahDetail } from '@/types/quran';
import DownloadButton from './DownloadButton';

interface SurahHeaderProps {
    surah: SurahDetail;
}

export default function SurahHeader({ surah }: SurahHeaderProps) {
    const prevSurah = surah.number > 1 ? surah.number - 1 : null;
    const nextSurah = surah.number < 114 ? surah.number + 1 : null;

    return (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-800 dark:to-teal-800 rounded-xl shadow-xl p-8 mb-8 text-white relative">
            {/* Navigation & Actions */}
            <div className="flex items-center justify-between mb-6">
                <Link
                    href="/quran"
                    className="inline-flex items-center text-white hover:text-emerald-100 transition-colors"
                >
                    <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    সূরা তালিকায় ফিরে যান
                </Link>

                <DownloadButton surahId={surah.number} initialData={surah} />
            </div>

            {/* Surah info */}
            <div className="text-center mb-6">
                <h1 className="text-4xl md:text-5xl font-arabic mb-2" dir="rtl">
                    {surah.name}
                </h1>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    {surah.englishName}
                </h2>
                <p className="text-lg text-emerald-100 mb-4">
                    {surah.englishNameTranslation}
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm">
                    <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                        সূরা {surah.number}
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                        {surah.revelationType === 'Meccan' ? 'মক্কী' : 'মাদানী'}
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                        {surah.numberOfAyahs} আয়াত
                    </span>
                </div>
            </div>

            {/* Bismillah (if applicable) */}
            {surah.bismillahPre && (
                <div className=" text-center py-6 border-t border-white/20">
                    <p className="text-3xl md:text-4xl font-arabic" dir="rtl">
                        بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                    </p>
                    <p className="text-sm mt-2 text-emerald-100">
                        পরম করুণাময় ও দয়ালু আল্লাহর নামে
                    </p>
                </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/20">
                {prevSurah ? (
                    <Link
                        href={`/quran/${prevSurah}`}
                        className="inline-flex items-center bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-lg transition-all"
                    >
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        আগের সূরা
                    </Link>
                ) : (
                    <div></div>
                )}

                {nextSurah ? (
                    <Link
                        href={`/quran/${nextSurah}`}
                        className="inline-flex items-center bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-lg transition-all"
                    >
                        পরবর্তী সূরা
                        <svg
                            className="w-5 h-5 ml-2"
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
                    </Link>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
}
