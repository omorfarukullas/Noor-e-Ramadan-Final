// Quran data types
export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
}

export interface Verse {
  number: number;
  numberInSurah: number;
  text: string; // Arabic text
  transliteration?: string; // English transliteration
  transliterationBn?: string; // Bangla transliteration
  translation: {
    en?: string;
    bn?: string;
  };
}

export interface SurahDetail extends Surah {
  verses: Verse[];
  bismillahPre?: boolean;
}

export interface QuranApiResponse<T> {
  code: number;
  status: string;
  data: T;
}
