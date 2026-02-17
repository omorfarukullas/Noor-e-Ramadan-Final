'use client';

import React from 'react';
import { Search } from 'lucide-react';

interface DuaSearchProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

export default function DuaSearch({ searchTerm, onSearchChange }: DuaSearchProps) {
    return (
        <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Search size={20} />
            </div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="দোয়া খুঁজুন (নাম, অর্থ বা উচ্চারণ দিয়ে)..."
                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow shadow-sm hover:shadow-md"
            />
        </div>
    );
}
