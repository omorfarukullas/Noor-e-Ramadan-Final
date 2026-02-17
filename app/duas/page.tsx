'use client';

import React, { useState, useEffect } from 'react';
import { DUA_CATEGORIES, getAllDuas } from '@/lib/dua-data';
import DuaCategoryCard from '@/components/dua/DuaCategoryCard';
import { Search } from 'lucide-react';
import { Link } from 'lucide-react'; // Wait, Link is component... using next/link for actual links

export default function DuaPage() {
    const [favoritesCount, setFavoritesCount] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [counts, setCounts] = useState<Record<number, number>>({});

    useEffect(() => {
        // Load favorites
        const saved = localStorage.getItem('dua_favorites');
        if (saved) {
            setFavoritesCount(JSON.parse(saved).length);
        }

        // Calculate counts
        const allDuas = getAllDuas();
        const newCounts: Record<number, number> = {};
        DUA_CATEGORIES.forEach(cat => {
            newCounts[cat.id] = allDuas.filter(d => d.category_id === cat.id).length;
        });
        setCounts(newCounts);

        setIsLoaded(true);
    }, []);

    if (!isLoaded) return null;

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header with Background */}
            <div className="bg-emerald-900 text-white py-16 px-4 text-center relative overflow-hidden">
                <div className="absolute opacity-10 top-0 left-0 w-full h-full pointer-events-none"
                    style={{ backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDQwaDQwVjBIMHY0MHptMjAgMjBWMjBoMjB2MjBIMjB6IiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvZz48L3N2Zz4=")' }}>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-4 relative z-10">দোয়া সম্ভার</h1>
                <p className="text-emerald-100 relative z-10 max-w-xl mx-auto text-lg">
                    জীবনের প্রতিটি মুহূর্তের জন্য প্রয়োজনীয় মাসনূন দোয়া
                </p>

                {/* Global Search Hint */}
                {/* <div className="max-w-md mx-auto mt-8 relative z-10">
            <div className="bg-white/10 backdrop-blur-md rounded-full p-1 pl-4 flex items-center border border-white/20">
                <Search className="text-emerald-200 mr-2" />
                <input 
                    type="text" 
                    placeholder="যেকোনো দোয়া খুঁজুন..." 
                    className="bg-transparent border-none outline-none text-white placeholder-emerald-200/70 w-full"
                />
            </div>
        </div> */}
            </div>

            <div className="container mx-auto px-4 -mt-10 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">

                    {/* Favorites Card */}
                    <a href="/duas/favorites" className="block group h-full">
                        <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all p-6 border-l-4 border-l-rose-500 h-full flex flex-col items-center text-center relative overflow-hidden">
                            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mb-4 group-hover:bg-rose-100 transition-colors text-2xl">
                                ❤️
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-rose-600 transition-colors">
                                আমার প্রিয় দোয়া
                            </h3>
                            <p className="text-sm text-gray-500 mt-auto bg-rose-50 px-3 py-1 rounded-full">
                                {favoritesCount} টি সংরক্ষিত
                            </p>
                        </div>
                    </a>

                    {/* Categories */}
                    {DUA_CATEGORIES.map(category => (
                        <DuaCategoryCard
                            key={category.id}
                            category={category}
                            count={counts[category.id] || 0}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
