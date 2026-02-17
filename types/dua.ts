export interface Dua {
    id: number;
    category_id: number;
    sub_category_id?: number;
    title: string;
    arabic: string;
    pronunciation: string;
    translation: string;
    reference: string;
}

export interface DuaCategory {
    id: number;
    name: string;
    slug: string;
    sub_categories?: DuaSubCategory[];
}

export interface DuaSubCategory {
    id: number;
    name: string;
    slug: string;
}
