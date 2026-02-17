import React, { useState } from 'react';
import { toEnglishNumber } from '@/lib/bangla-utils';
import { Search } from 'lucide-react';

interface HadithSearchProps {
    onSearch: (hadithNumber: string) => void;
}

export default function HadithSearch({ onSearch }: HadithSearchProps) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const englishNumber = toEnglishNumber(query.trim());
        if (englishNumber) {
            onSearch(englishNumber);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-500 group-focus-within:text-emerald-700 transition-colors">
                    <Search size={20} />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="হাদিস নং..."
                    className="w-full pl-10 pr-24 py-2.5 rounded-full border border-emerald-200 bg-emerald-50/50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all placeholder:text-emerald-300/70 text-emerald-900"
                />
                <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 rounded-full text-sm font-medium transition-colors shadow-sm"
                >
                    খুঁজুন
                </button>
            </div>
        </form>
    );
}
