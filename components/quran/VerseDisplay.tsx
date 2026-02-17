import type { Verse } from '@/types/quran';

interface VerseDisplayProps {
    verse: Verse;
    showTransliterationBn?: boolean;
}

export default function VerseDisplay({ verse, showTransliterationBn = true }: VerseDisplayProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6 border border-gray-100 dark:border-gray-700">
            {/* Verse number badge */}
            <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold text-sm shadow-md">
                    {verse.numberInSurah}
                </div>
            </div>

            {/* Arabic text */}
            <div className="mb-6" dir="rtl">
                <p className="text-3xl md:text-4xl leading-loose text-gray-800 dark:text-gray-100 font-arabic text-right">
                    {verse.text}
                </p>
            </div>

            {/* Transliterations */}
            <div className="space-y-3 mb-6">
                {/* Bangla transliteration */}
                {showTransliterationBn && verse.transliterationBn && (
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-lg p-4">
                        <p className="text-xs font-semibold text-purple-700 dark:text-purple-300 mb-1 font-bengali">
                            বাংলা উচ্চারণ:
                        </p>
                        <p className="text-lg md:text-xl text-purple-900 dark:text-purple-100 font-bengali leading-relaxed">
                            {verse.transliterationBn}
                        </p>
                    </div>
                )}
            </div>

            {/* Translations */}
            <div className="space-y-4">
                {/* Bengali translation */}
                {verse.translation.bn && (
                    <div className="border-l-4 border-teal-500 pl-4">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 font-bengali">
                            বাংলা অনুবাদ:
                        </p>
                        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-bengali">
                            {verse.translation.bn}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
