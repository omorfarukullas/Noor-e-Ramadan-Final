import { HadithBook, HadithResponse, TranslatedHadith } from '@/types/hadith';

const BASE_URL = 'https://api.hadith.gading.dev';

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
        // The API structure for single hadith might be different, let's wrap it to match HadithResponse if needed
        // Based on docs/assumption: returns { code, message, data: { name, id, available, contents: { number, arab, id } } }
        // Actually typically: { code, message, data: { ... hadith object ... } }
        // Let's coerce it to our structure
        if (data.data) {
            // If data is just the hadith object, we wrap it in an array for our UI to consume
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
