import Dexie, { Table } from 'dexie';
import type { SurahDetail } from '@/types/quran';

export class QuranDatabase extends Dexie {
    surahs!: Table<SurahDetail, number>; // Primary key is surah number (1-114)

    constructor() {
        super('NoorERamadanDB');
        this.version(1).stores({
            surahs: 'number, name, englishName', // Primary key and indexed props
        });
    }
}

export const db = new QuranDatabase();
