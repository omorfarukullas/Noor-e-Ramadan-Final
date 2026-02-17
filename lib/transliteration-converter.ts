/**
 * Converts English/Roman transliteration to Bangla script
 * for Quranic pronunciation (উচ্চারণ)
 */

// Mapping of common Arabic sounds to Bangla characters
const transliterationMap: Record<string, string> = {
    // Consonants
    'b': 'ব', 'p': 'প', 't': 'ত', 'th': 'থ', 'd': 'দ', 'dh': 'ধ',
    'k': 'ক', 'kh': 'খ', 'g': 'গ', 'gh': 'ঘ',
    'ch': 'চ', 'chh': 'ছ', 'j': 'জ', 'jh': 'ঝ',
    's': 'স', 'sh': 'শ', 'h': 'হ', 'y': 'য়', 'r': 'র', 'l': 'ল',
    'w': 'ও', 'v': 'ভ', 'f': 'ফ', 'z': 'জ',
    'm': 'ম', 'n': 'ন', 'q': 'ক',

    // Common sequences & Sun Letters (Assimilation)
    'alr': 'আর', 'arr': 'আর',
    'aln': 'আন', 'ann': 'আন',
    'ald': 'আদ', 'add': 'আদ',
    'alt': 'আত', 'att': 'আত',
    'alz': 'আজ', 'azz': 'আজ',
    'als': 'আস', 'ass': 'আস',
    'alsh': 'আশ', 'ash': 'আশ', 'ashsh': 'আশ', 'assh': 'আশ',
    'aldh': 'আধ', 'addh': 'আধ',
    'alth': 'আথ', 'atth': 'আথ',

    'al': 'আল', 'Al': 'আল',
    'llah': 'ল্লাহ', 'lah': 'লাহ',
    'rah': 'রাহ', 'man': 'মান',
};

const vowelMap: Record<string, string> = {
    'a': 'া', 'aa': 'া',
    'i': 'ি', 'ee': 'ী',
    'u': 'ু', 'oo': 'ূ',
    'e': 'ে',
    'o': 'ো',
    'ai': 'ৈ',
    'au': 'ৌ',
};

const initialVowelMap: Record<string, string> = {
    'a': 'আ', 'aa': 'আ',
    'i': 'ই', 'ee': 'ঈ',
    'u': 'উ', 'oo': 'ঊ',
    'e': 'এ',
    'o': 'ও',
};

/**
 * Convert English/Roman transliteration to Bangla script
 */
export function romanToBangla(text: string): string {
    if (!text) return '';

    // Normalize: Remove accents/diacritics (e.g. ā -> a, ḥ -> h)
    let result = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // 1. Specific phrase overrides (Case insensitive)
    // 1. Specific phrase overrides (Case insensitive)
    const overrides: [RegExp, string][] = [
        // Bismillah catch-all (extremely permissive)
        [/Bismi.*llah.*Rahman.*Rahim.*/gi, 'বিসমিল্লাহির রাহমানির রাহিম'],
        [/In\s*the\s*name\s*of\s*Allah/gi, 'আল্লাহর নামে'],
        [/Allahu/gi, 'আল্লাহু'],
        [/Allahi/gi, 'আল্লাহি'],
        [/Allah/gi, 'আল্লাহ'],
    ];

    for (const [pattern, replacement] of overrides) {
        result = result.replace(pattern, replacement);
    }

    // 2. Word-by-word processing
    const words = result.split(/\s+/);
    const processedWords = words.map(word => {
        // Skip if already Bangla (from overrides)
        if (/[\u0980-\u09FF]/.test(word)) return word;

        let banglaWord = word;

        // Handle initial vowel
        let processed = false;
        for (const v of Object.keys(initialVowelMap).sort((a, b) => b.length - a.length)) {
            if (banglaWord.toLowerCase().startsWith(v)) {
                banglaWord = initialVowelMap[v] + banglaWord.slice(v.length);
                processed = true;
                break;
            }
        }

        // Handle mapped consonants and sequences
        const sortedKeys = Object.keys(transliterationMap).sort((a, b) => b.length - a.length);
        for (const key of sortedKeys) {
            const regex = new RegExp(key, 'gi');
            banglaWord = banglaWord.replace(regex, transliterationMap[key]);
        }

        // Handle remaining medial vowels
        const sortedVowels = Object.keys(vowelMap).sort((a, b) => b.length - a.length);
        for (const v of sortedVowels) {
            const regex = new RegExp(v, 'gi');
            // Only replace if preceded by a Bangla char (consonant)
            // This is tricky with regex in JS.
            // Simplification: Replace all remaining roman vowels with diacritics
            banglaWord = banglaWord.replace(regex, vowelMap[v]);
        }

        // Cleanup: remove remaining roman chars if they look like artifacts
        // or map them to close approximations
        return banglaWord;
    });

    return processedWords.join(' ');
}

/**
 * Fallback: If full conversion doesn't work well,
 * at least wrap in Bangla-friendly format
 */
export function ensureBanglaReadable(text: string): string {
    const converted = romanToBangla(text);
    return converted === text ? text : converted;
}
