import { getTranslations } from 'next-intl/server';
import { getAllSurahs } from '@/lib/quran-api';
import SurahCard from '@/components/quran/SurahCard';

export default async function QuranPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations('quran');

    // Fetch all surahs
    const surahs = await getAllSurahs();

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    {t('quran')}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Read the Holy Quran with translations in English and Bangla
                </p>
            </div>

            {/* Surah Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {surahs.map((surah) => (
                    <SurahCard key={surah.number} surah={surah} locale={locale} />
                ))}
            </div>
        </div>
    );
}
