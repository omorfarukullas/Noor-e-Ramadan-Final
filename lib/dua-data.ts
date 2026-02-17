import { Dua, DuaCategory } from '@/types/dua';
import duasData from '@/data/duas.json';

export const DUA_CATEGORIES: DuaCategory[] = [
    { id: 1, name: 'নিয়মিত মাসনূন দোয়া', slug: 'masnoon' },
    { id: 2, name: 'সুরক্ষার দোয়া', slug: 'protection' },
    { id: 3, name: 'রোগ ও সুস্বাস্থ্যের দোয়া', slug: 'health' },
    { id: 4, name: 'রমজানের দোয়া', slug: 'ramadan' },
    { id: 5, name: 'নামাজের দোয়া', slug: 'prayer' },
    { id: 6, name: 'বিশেষ অনুষ্ঠানের দোয়া', slug: 'special' },
];

export function getAllDuas(): Dua[] {
    return duasData as Dua[];
}

export function getDuaCategory(slug: string): DuaCategory | undefined {
    if (slug === 'favorites') {
        return { id: 0, name: 'আমার প্রিয় দোয়া', slug: 'favorites' };
    }
    return DUA_CATEGORIES.find(cat => cat.slug === slug);
}

export function getDuasByCategory(categoryId: number): Dua[] {
    return (duasData as Dua[]).filter(dua => dua.category_id === categoryId);
}

export function getDuasByIds(ids: number[]): Dua[] {
    return (duasData as Dua[]).filter(dua => ids.includes(dua.id));
}
