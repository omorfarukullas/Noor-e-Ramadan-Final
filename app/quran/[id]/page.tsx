import { notFound } from 'next/navigation';
import { getSurahById } from '@/lib/quran-api';
import SurahHeader from '@/components/quran/SurahHeader';
import VerseDisplay from '@/components/quran/VerseDisplay';
import DownloadButton from '@/components/quran/DownloadButton';

// export const dynamic = 'force-static'; // Removed to enable ISR
export const revalidate = 86400; // Revalidate daily
export const dynamicParams = true; // Allow dynamic params (default)

// export async function generateStaticParams() { ... } // Removed to avoid build timeout

export default async function SurahDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const surahNumber = parseInt(id, 10);

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
            <SurahHeader surah={surah} />

            {/* Verses */}
            <div className="max-w-4xl mx-auto">
                {surah.verses.map((verse) => (
                    <VerseDisplay key={verse.number} verse={verse} />
                ))}
            </div>
        </div>
    );
}
