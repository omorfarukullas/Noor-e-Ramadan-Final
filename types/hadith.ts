export interface HadithBook {
    name: string;
    id: string;
    available: number;
}

export interface Hadith {
    number: number;
    arab: string;
    id: string;
}

export interface HadithResponse {
    code: number;
    message: string;
    data: {
        name: string;
        id: string;
        available: number;
        requested: number;
        hadiths: Hadith[];
    };
}

export interface TranslatedHadith extends Hadith {
    translation: string; // Bangla translation
    narrator: string; // Narrator info
}
