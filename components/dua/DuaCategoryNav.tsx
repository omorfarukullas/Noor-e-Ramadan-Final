'use client';

import React from 'react';
import { DuaCategory } from '@/types/dua';

interface DuaCategoryNavProps {
    categories: DuaCategory[];
    activeCategory: number | 'favorites';
    categoryCounts: Record<number | 'favorites', number>;
    onSelectCategory: (id: number | 'favorites') => void;
}

export default function DuaCategoryNav({
    categories,
    activeCategory,
    categoryCounts,
    onSelectCategory,
}: DuaCategoryNavProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
            <div className="p-4 bg-emerald-800 text-white">
                <h3 className="font-bold text-lg">ক্যাটাগরি</h3>
                <p className="text-emerald-200 text-xs">বিষয়ভিত্তিক দোয়া</p>
            </div>

            <div className="flex md:flex-col overflow-x-auto md:overflow-visible hide-scrollbar divide-x md:divide-x-0 md:divide-y divide-gray-100">
                {/* Favorites Tab */}
                <button
                    onClick={() => onSelectCategory('favorites')}
                    className={`flex items-center justify-between w-full p-4 text-left transition-colors flex-shrink-0 md:flex-shrink ${activeCategory === 'favorites'
                            ? 'bg-emerald-50 text-emerald-700 border-l-4 border-emerald-600'
                            : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'
                        }`}
                >
                    <span className="font-medium whitespace-nowrap">❤️ প্রিয় দোয়া</span>
                    <span className={`ml-3 text-xs px-2 py-0.5 rounded-full ${activeCategory === 'favorites' ? 'bg-emerald-200 text-emerald-800' : 'bg-gray-100 text-gray-600'}`}>
                        {categoryCounts['favorites'] || 0}
                    </span>
                </button>

                {/* Regular Categories */}
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => onSelectCategory(category.id)}
                        className={`flex items-center justify-between w-full p-4 text-left transition-colors flex-shrink-0 md:flex-shrink ${activeCategory === category.id
                                ? 'bg-emerald-50 text-emerald-700 border-l-4 border-emerald-600'
                                : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'
                            }`}
                    >
                        <span className="font-medium whitespace-nowrap">{category.name}</span>
                        <span className={`ml-3 text-xs px-2 py-0.5 rounded-full ${activeCategory === category.id ? 'bg-emerald-200 text-emerald-800' : 'bg-gray-100 text-gray-600'}`}>
                            {categoryCounts[category.id] || 0}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
