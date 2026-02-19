import type { Surah, Verse, SurahDetail } from '@/types/quran';
import { getUccaron } from './transliteration-converter';

const ALQURAN_API_BASE = 'https://api.alquran.cloud/v1';

/**
 * Helper function to fetch with retry logic
 */
async function fetchWithRetry(url: string, retries = 3, delay = 1000): Promise<Response> {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url);
            if (response.ok) return response;
            if (response.status === 429) { // Too Many Requests
                console.warn(`Rate limited (429). Retrying in ${delay}ms...`);
                await new Promise(res => setTimeout(res, delay));
                delay *= 2; // Exponential backoff
                continue;
            }
            throw new Error(`Request failed with status ${response.status}`);
        } catch (error) {
            if (i === retries - 1) throw error;
            console.warn(`Fetch failed. Retrying in ${delay}ms...`);
            await new Promise(res => setTimeout(res, delay));
            delay *= 2;
        }
    }
    throw new Error('All retries failed');
}

/**
 * Fetch all surahs (chapters) metadata
 */
export async function getAllSurahs(): Promise<Surah[]> {
    try {
        const response = await fetchWithRetry(`${ALQURAN_API_BASE}/surah`);
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
        const response = await fetchWithRetry(`${ALQURAN_API_BASE}/surah/${surahNumber}/editions/quran-uthmani,en.transliteration,bn.bengali`, 5, 2000);
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
                    en: '', // Still empty as per design
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
            bismillahPre: false,
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
