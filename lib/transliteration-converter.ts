import { HARDCODED_UCCARON } from './data/quran-bangla-uccaron';

/**
 * Converts Roman transliteration (from api.alquran.cloud) to Bangla Uccaron
 * based on specific phoneme mapping rules.
 */
export function romanToBanglaUccaron(roman: string): string {
    if (!roman) return "";

    // Step A: Lowercase everything first
    let text = roman.toLowerCase();

    // Step B: Common full-word replacements FIRST (before letter rules)
    const wordMap: Record<string, string> = {
        "allah": "আল্লাহ",
        "allahu": "আল্লাহু",
        "lillahi": "লিল্লাহি",
        "lillah": "লিল্লাহ",
        "bismillah": "বিসমিল্লাহ",
        "alhamdulillah": "আলহামদুলিল্লাহ",
        "bismillahi": "বিসমিল্লাহি",
        "ar-rahmani": "আর রাহমানি",
        "ar-rahimi": "আর রাহিমি",
        "r-rahmani": "রাহমানি",
        "r-rahimi": "রাহিমি",
        "al-hamdu": "আলহামদু",
        "al-'alamin": "আলামিন",
        "maliki": "মালিকি",
        "iyyaka": "ইয়্যাকা",
        "na'budu": "না'বুদু",
        "nasta'in": "নাসতাইন",
        "ihdina": "ইহদিনা",
        "as-sirata": "আস সিরাতা",
        "al-mustaqima": "আল মুসতাকিম",
        "sirata": "সিরাতা",
        "alladhina": "আল্লাজিনা",
        "an'amta": "আনআমতা",
        "'alayhim": "আলাইহিম",
        "ghayri": "গাইরি",
        "al-maghdubi": "আল মাগদুবি",
        "wala": "ওয়ালা",
        "ad-dallin": "আদ দোয়াল্লিন",
        "amin": "আমিন",
        "qul": "কুল",
        "huwa": "হুওয়া",
        "ahad": "আহাদ",
        "as-samad": "আস সামাদ",
        "yalid": "ইয়ালিদ",
        "yulad": "ইউলাদ",
        "kufuwan": "কুফুওয়ান",
        "a'udhu": "আউজু",
        "a'uzu": "আউজু",
        "rabb": "রাব্ব",
        "rabbi": "রাব্বি",
        "rabbil": "রাব্বিল",
        "al-falaq": "আল ফালাক",
        "khalaq": "খালাক",
        "ghasiqin": "গাসিকিন",
        "waqab": "ওয়াকাব",
        "an-naffathati": "আন নাফফাসাতি",
        "al-'uqad": "আল উকাদ",
        "hasidin": "হাসিদিন",
        "hasad": "হাসাদ",
        "an-nas": "আন নাস",
        "ilahi": "ইলাহি",
        "al-waswasi": "আল ওয়াসওয়াসি",
        "al-khannas": "আল খান্নাস",
        "yuwaswisu": "ইউওয়াসউইসু",
        "suduri": "সুদুরি",
        "al-jinnati": "আল জিন্নাতি",
        "inna": "ইন্না",
        "wa": "ওয়া",
        "fi": "ফি",
        "min": "মিন",
        "ila": "ইলা",
        "ma": "মা",
        "la": "লা",
        "lahu": "লাহু",
        "bihi": "বিহি",
        "minhu": "মিনহু",
        "anhu": "আনহু",
        "hum": "হুম",
        "antum": "আনতুম",
        "nahnu": "নাহনু",
        "anta": "আনতা",
        "ana": "আনা",
        "kana": "কানা",
        "qala": "কালা",
        "fala": "ফালা",
        "wama": "ওয়ামা",
        "lima": "লিমা",
        "bima": "বিমা",
        "anna": "আন্না",
        "innahu": "ইন্নাহু",
        "alayhi": "'আলাইহি",
        "alayhim": "আলাইহিম",
        "alay": "আলাই",
        "thumma": "সুম্মা",
        "hatta": "হাত্তা",
        "idha": "ইজা",
        "iza": "ইজা",
        "hal": "হাল",
        "lam": "লাম",
        "lan": "লান",
        "qad": "ক্বাদ",
        "bal": "বাল",
        "am": "আম",
        "aw": "আও",
        "fa": "ফা",
        "li": "লি",
        "bi": "বি",
        "ka": "কা",
        "sa": "সা",
    };

    // Replace full words
    for (const [romanWord, bangla] of Object.entries(wordMap)) {
        // Use regex to match whole words, case insensitive
        // escape regex special chars in roman mapping just in case, though mostly simple letters
        const regex = new RegExp('\\b' + romanWord.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '\\b', 'gi');
        text = text.replace(regex, bangla);
    }

    // Step C: Special digraph consonants (must come before single letters)
    const digraphMap: [string, string][] = [
        ["kh", "খ"],   // خ
        ["gh", "গ"],   // غ
        ["sh", "শ"],   // ش
        ["dh", "জ"],   // ذ/ظ
        ["th", "স"],   // ث
        ["zh", "জ"],   // ژ
        ["ts", "স"],
        ["ch", "চ"],
    ];
    for (const [rom, bn] of digraphMap) {
        text = text.replaceAll(rom, bn);
    }

    // Step D: Long vowel marks
    // Step D: Normalize Vowels (Long/Double -> Short)
    // We convert all long vowels and double vowels to their simple forms
    // This allows the Context Aware Logic (Step F) to handle them uniformly
    text = text.replaceAll("aa", "a");
    text = text.replaceAll("ee", "i");
    text = text.replaceAll("oo", "u");

    text = text.replaceAll("ā", "a");
    text = text.replaceAll("ī", "i");
    text = text.replaceAll("ū", "u");
    text = text.replaceAll("â", "a");
    text = text.replaceAll("î", "i");
    text = text.replaceAll("û", "u");
    text = text.replaceAll("á", "a");
    text = text.replaceAll("í", "i");
    text = text.replaceAll("ú", "u");

    // Step E: Consonants
    const consonantMap: [string, string][] = [
        ["b", "ব"], ["t", "ত"], ["j", "জ"], ["h", "হ"],
        ["d", "দ"], ["r", "র"], ["z", "জ"], ["s", "স"],
        ["f", "ফ"], ["q", "ক"], ["k", "ক"], ["l", "ল"],
        ["m", "ম"], ["n", "ন"], ["w", "ও"], ["y", "য়"],
        ["g", "গ"], ["p", "প"], ["v", "ভ"],
    ];
    for (const [rom, bn] of consonantMap) {
        text = text.replaceAll(rom, bn);
    }

    // Step F: Vowels - Context Aware Replacement
    // We iterate through the string to check if a vowel should be Independent or Dependent (Modifier)
    // Rule:
    // 1. If 'a', 'i', 'u', 'e', 'o' is at the start of string -> Independent
    // 2. If it follows a Bangla Consonant -> Dependent (Modifier)
    // 3. If it follows a Vowel or Space -> Independent

    // First, let's process the string character by character or use a smart regex
    // But since we already have Bangla consonants in the string from previous steps, we can use regex lookbehind or strict replacement

    // Mapping for Vowels
    const vowelMap: Record<string, { ind: string; dep: string }> = {
        'a': { ind: 'আ', dep: 'া' },
        'i': { ind: 'ই', dep: 'ি' },
        'u': { ind: 'উ', dep: 'ু' },
        'e': { ind: 'এ', dep: 'ে' },
        'o': { ind: 'ও', dep: 'ো' },
    };

    // We process the text to handle vowels
    let newText = "";
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (vowelMap[char]) {
            // Check previous character
            const prevChar = i > 0 ? text[i - 1] : "";

            // Check if previous char is a Bangla Consonant
            // Bangla Consonants Range: \u0995-\u09B9 (ka to ha), \u09CE (t), \u09DC-\u09DF (rra, rha, ya)
            // Also need to include the Digraph results which are single chars
            // Simple check: is it a Bangla char that is NOT a vowel?
            // Vowels are \u0985-\u0994. Modifiers are \u09BE-\u09CC.

            const isPrevBanglaConsonant = prevChar >= '\u0995' && prevChar <= '\u09B9' ||
                prevChar === '\u09CE' ||
                (prevChar >= '\u09DC' && prevChar <= '\u09DF');

            if (isPrevBanglaConsonant) {
                newText += vowelMap[char].dep;
            } else {
                newText += vowelMap[char].ind;
            }
        } else {
            newText += char;
        }
    }
    text = newText;

    // Step G: Cleanup
    text = text.replaceAll("-", " ");
    text = text.replaceAll("'", "");
    text = text.replaceAll("ʿ", "");
    text = text.replaceAll("ʾ", "");
    text = text.replaceAll("  ", " ");
    text = text.trim();

    return text;
}

/**
 * Main helper to get Uccaron with 3-layer priority:
 * 1. Hardcoded Surah
 * 2. Hardcoded Ayah
 * 3. Roman -> Bangla Conversion
 */
export function getUccaron(surahNum: string | number, ayahNum: string | number, romanFromAPI?: string): string {
    const sNum = surahNum.toString();
    const aNum = Number(ayahNum);

    // Priority 1: Check full surah hardcoded
    if (HARDCODED_UCCARON[sNum] && Array.isArray(HARDCODED_UCCARON[sNum])) {
        const arr = HARDCODED_UCCARON[sNum] as string[];
        if (arr[aNum - 1]) return arr[aNum - 1];
    }

    // Priority 2: Check specific ayah hardcoded
    const key = `${sNum}:${aNum}`;
    if (HARDCODED_UCCARON[key] && typeof HARDCODED_UCCARON[key] === 'string') {
        return HARDCODED_UCCARON[key] as string;
    }

    // Priority 2.5: Partial arrays (e.g. 18:1-10)
    // We check for range keys like "18:1-10" manually if needed
    // Logic: Iterate keys, check if range matches
    // For now, let's map "18:1-10" to individual checks or just handle the key provided
    if (sNum === '18' && aNum <= 10) {
        const kahfArr = HARDCODED_UCCARON["18:1-10"] as string[];
        if (kahfArr && kahfArr[aNum - 1]) return kahfArr[aNum - 1];
    }

    // Priority 3: Convert Roman from API
    if (romanFromAPI) {
        return romanToBanglaUccaron(romanFromAPI);
    }

    return "উচ্চারণ পাওয়া যায়নি";
}

export const romanToBangla = romanToBanglaUccaron;
