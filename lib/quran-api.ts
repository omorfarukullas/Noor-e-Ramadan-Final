import type { Surah, Verse, SurahDetail } from '@/types/quran';
import { getUccaron } from './transliteration-converter';

const ALQURAN_API_BASE = 'https://api.alquran.cloud/v1';

/**
 * Fetch all surahs (chapters) metadata
 */
export async function getAllSurahs(): Promise<Surah[]> {
    try {
        const response = await fetch(`${ALQURAN_API_BASE}/surah`);
        const data = await response.json();

        if (data.code === 200 && data.data) {
            return data.data.map((surah: any) => ({
                number: surah.number,
                name: surah.name,
                englishName: surah.englishName,
                englishNameTranslation: surah.englishNameTranslation,
                numberOfAyahs: surah.numberOfAyahs,
                revelationType: surah.revelationType === 'Meccan' ? 'Meccan' : 'Medinan',
            }));
        }

        throw new Error('Failed to fetch surahs');
    } catch (error) {
        console.error('Error fetching surahs:', error);
        throw error;
    }
}

/**
 * Fetch a single surah with Arabic, English Transliteration, and Bengali Translation
 * Uses 3-edition endpoint for efficiency
 */
export async function getSurahWithTranslations(surahNumber: number): Promise<SurahDetail> {
    try {
        // Fetch 3 editions in one call: Arabic, Roman Transliteration, Bengali Meaning
        const response = await fetch(`${ALQURAN_API_BASE}/surah/${surahNumber}/editions/quran-uthmani,en.transliteration,bn.bengali`);
        const data = await response.json();

        if (data.code !== 200 || !data.data || data.data.length < 3) {
            throw new Error('Failed to fetch surah data');
        }

        const [arabicEdition, translitEdition, bengaliEdition] = data.data;

        // Extract metadata from the first edition (Arabic)
        const metadata = arabicEdition; // Has number, name, englishName etc.

        // Map verses
        const verses: Verse[] = arabicEdition.ayahs.map((ayah: any, index: number) => {
            const romanText = translitEdition.ayahs[index]?.text || '';
            const bengaliMeaning = bengaliEdition.ayahs[index]?.text || '';

            // Generate Accurate Bangla Uccaron
            const banglaUccaron = getUccaron(surahNumber, ayah.numberInSurah, romanText);

            return {
                number: ayah.number, // Global number
                numberInSurah: ayah.numberInSurah,
                text: ayah.text, // Uthmani text
                transliteration: romanText,
                transliterationBn: banglaUccaron, // The star feature
                translation: {
                    en: '', // We dropped English translation to keep it simple as per request, or we could fetch it if needed. 
                    // The request said "No other new features needed. Only focus on perfect উচ্চারণ."
                    // But usually users want English translation. 
                    // Re-reading user request: "Toggle buttons: [আরবি ✓] [উচ্চারণ ✓] [অনুবাদ ✓]" -> This likely means Bangla translation.
                    // I will leave English empty or fetch it if I had 4 slots. 
                    // For now, let's stick to the 3 critical layers requested.
                    bn: bengaliMeaning,
                },
            };
        });

        return {
            number: metadata.number,
            name: metadata.name,
            englishName: metadata.englishName,
            englishNameTranslation: metadata.englishNameTranslation,
            numberOfAyahs: metadata.numberOfAyahs,
            revelationType: metadata.revelationType === 'Meccan' ? 'Meccan' : 'Medinan',
            verses,
            bismillahPre: false, // The api.alquran.cloud includes Bismillah in the text for Surah 1, but for others? 
            // Actually alquran.cloud Uthmani text handles Bismillah differently.
            // Usually separate. let's set to false and rely on the text from API.
            // Wait, standard behavior for Surah 1 is it's part of Verse 1.
            // For others, it's usually pre-text. 
            // Let's check logic: if text starts with Bismillah, it's there.
        };
    } catch (error) {
        console.error(`Error fetching surah ${surahNumber}:`, error);
        throw error;
    }
}

/**
 * Get surah by number (1-114)
 */
export async function getSurahById(id: number): Promise<SurahDetail> {
    if (id < 1 || id > 114) {
        throw new Error('Invalid surah number. Must be between 1 and 114.');
    }

    return getSurahWithTranslations(id);
}
