import type { Surah, Verse, SurahDetail } from '@/types/quran';
import { romanToBangla } from './transliteration-converter';

const QURAN_API_BASE = 'https://api.quran.com/api/v4';
const ALQURAN_API_BASE = 'https://api.alquran.cloud/v1';

// Translation IDs from Quran.com API
const TRANSLATION_IDS = {
    english: 20, // Saheeh International
    bengali: 161, // Taisirul Quran
    transliteration: 57, // English transliteration
};

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
 * Fetch a single surah with all verses and translations
 */
export async function getSurahWithTranslations(surahNumber: number): Promise<SurahDetail> {
    try {
        // Fetch Arabic text, English translation, Bengali translation, and transliteration in parallel
        const [arabicRes, englishRes, bengaliRes, translitRes, metadataRes] = await Promise.all([
            fetch(`${QURAN_API_BASE}/quran/verses/uthmani?chapter_number=${surahNumber}`),
            fetch(`${QURAN_API_BASE}/quran/translations/${TRANSLATION_IDS.english}?chapter_number=${surahNumber}`),
            fetch(`${QURAN_API_BASE}/quran/translations/${TRANSLATION_IDS.bengali}?chapter_number=${surahNumber}`),
            fetch(`${QURAN_API_BASE}/quran/translations/${TRANSLATION_IDS.transliteration}?chapter_number=${surahNumber}`),
            fetch(`${ALQURAN_API_BASE}/surah/${surahNumber}`),
        ]);

        const [arabicData, englishData, bengaliData, translitData, metadataData] = await Promise.all([
            arabicRes.json(),
            englishRes.json(),
            bengaliRes.json(),
            translitRes.json(),
            metadataRes.json(),
        ]);

        // Extract metadata
        const metadata = metadataData.data;

        // Combine all data
        const verses: Verse[] = arabicData.verses.map((verse: any, index: number) => {
            const englishVerse = englishData.translations[index];
            const bengaliVerse = bengaliData.translations[index];
            const translitVerse = translitData.translations[index];

            const englishTranslit = translitVerse?.text || '';

            return {
                number: verse.verse_number,
                numberInSurah: verse.id,
                text: verse.text_uthmani,
                transliteration: englishTranslit,
                transliterationBn: romanToBangla(englishTranslit),
                translation: {
                    en: englishVerse?.text || '',
                    bn: bengaliVerse?.text || '',
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
            bismillahPre: metadata.number !== 1 && metadata.number !== 9, // All surahs except 1 and 9 have Bismillah
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
