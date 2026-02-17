import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getSurahById } from '@/lib/quran-api';
import SurahHeader from '@/components/quran/SurahHeader';
import VerseDisplay from '@/components/quran/VerseDisplay';

export default async function SurahDetailPage({
    params,
}: {
    params: Promise<{ locale: string; id: string }>;
}) {
    const { locale, id } = await params;
    const t = await getTranslations('quran');

    const surahNumber = parseInt(id, 10);

    // Validate surah number
    if (isNaN(surahNumber) || surahNumber < 1 || surahNumber > 114) {
        notFound();
    }

    // Fetch surah data with all translations
    let surah;
    try {
        surah = await getSurahById(surahNumber);
    } catch (error) {
        console.error('Error fetching surah:', error);
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-6">
            {/* Surah Header */}
            <SurahHeader surah={surah} locale={locale} />

            {/* Verses */}
            <div className="max-w-4xl mx-auto">
                {surah.verses.map((verse) => (
                    <VerseDisplay key={verse.number} verse={verse} />
                ))}
            </div>
        </div>
    );
}

// Generate static params for all 114 surahs
export async function generateStaticParams() {
    return Array.from({ length: 114 }, (_, i) => ({
        id: String(i + 1),
    }));
}
