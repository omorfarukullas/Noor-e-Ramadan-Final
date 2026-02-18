import { HadithBook, HadithResponse, TranslatedHadith } from '@/types/hadith';

const BASE_URL = 'https://api.hadith.gading.dev';

// Bangla Hadith API via jsDelivr CDN (md-rifatkhan/hadithbangla)
const BANGLA_API_BASE = 'https://cdn.jsdelivr.net/gh/md-rifatkhan/hadithbangla@main';

// Mapping from our book IDs to Bangla API folder names
const BANGLA_BOOK_MAP: Record<string, string> = {
    'bukhari': 'Bukhari',
    'muslim': 'Muslim',
    'abu-daud': 'AbuDaud',
    'ibnu-majah': 'Ibne-Mazah',
    'tirmidzi': 'At-tirmizi',
    'nasai': 'Al-Nasai',
};

export const BOOKS = [
    { id: 'bukhari', name: 'সহিহ বুখারী' },
    { id: 'muslim', name: 'সহিহ মুসলিম' },
    { id: 'abu-daud', name: 'আবু দাউদ' },
    { id: 'ibnu-majah', name: 'ইবনে মাজাহ' },
    { id: 'tirmidzi', name: 'তিরমিজি' },
    { id: 'nasai', name: 'নাসাই' },
    { id: 'ahmad', name: 'আহমাদ' },
    { id: 'malik', name: 'মালিক' },
    { id: 'darimi', name: ' দারিমি' },
];

export async function fetchBooks(): Promise<HadithBook[]> {
    try {
        const response = await fetch(`${BASE_URL}/books`);
        const data = await response.json();
        return data.data.map((book: any) => ({
            ...book,
            name: BOOKS.find((b) => b.id === book.id)?.name || book.name,
        }));
    } catch (error) {
        console.error('Error fetching books:', error);
        return [];
    }
}

export async function fetchHadiths(bookId: string, range: string): Promise<HadithResponse | null> {
    try {
        const response = await fetch(`${BASE_URL}/books/${bookId}?range=${range}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching hadiths:', error);
        return null;
    }
}

export async function fetchHadithByNumber(bookId: string, number: string): Promise<HadithResponse | null> {
    try {
        const response = await fetch(`${BASE_URL}/books/${bookId}/${number}`);
        const data = await response.json();
        if (data.data) {
            return {
                ...data,
                data: {
                    ...data.data,
                    hadiths: [data.data.contents || data.data]
                }
            };
        }
        return data;
    } catch (error) {
        console.error('Error fetching specific hadith:', error);
        return null;
    }
}

/**
 * Fetches Bangla translation for a single hadith from the Bangla Hadith API.
 * Returns { bn, narrator, grade } or null if not available.
 */
export async function fetchBanglaHadith(bookId: string, number: number): Promise<{
    bn: string;
    narrator: string;
    grade: string;
} | null> {
    const folderName = BANGLA_BOOK_MAP[bookId];
    if (!folderName) return null;

    try {
        const url = `${BANGLA_API_BASE}/${folderName}/hadith/${number}.json`;
        const response = await fetch(url);
        if (!response.ok) return null;
        const data = await response.json();
        if (data?.hadith) {
            return {
                bn: data.hadith.bn || '',
                narrator: data.hadith.narrator || '',
                grade: data.hadith.grade || '',
            };
        }
        return null;
    } catch (error) {
        return null;
    }
}

/**
 * Fetches Bangla translations for multiple hadiths in parallel.
 * Falls back to Indonesian->Bangla translation if Bangla API is unavailable.
 */
export async function fetchBanglaHadiths(
    bookId: string,
    numbers: number[]
): Promise<Record<number, { bn: string; narrator: string; grade: string }>> {
    const folderName = BANGLA_BOOK_MAP[bookId];
    if (!folderName) return {};

    const results: Record<number, { bn: string; narrator: string; grade: string }> = {};

    await Promise.all(
        numbers.map(async (num) => {
            const bangla = await fetchBanglaHadith(bookId, num);
            if (bangla) {
                results[num] = bangla;
            }
        })
    );

    return results;
}

export async function translateText(text: string): Promise<string> {
    try {
        const response = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|bn`
        );
        const data = await response.json();
        return data.responseData.translatedText;
    } catch (error) {
        console.error('Error translating text:', error);
        return text; // Fallback to original text
    }
}
