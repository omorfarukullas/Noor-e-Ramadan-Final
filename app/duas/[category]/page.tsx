'use client';

import React, { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';
import { DUA_CATEGORIES, getDuaCategory, getDuasByCategory, getDuasByIds, getAllDuas } from '@/lib/dua-data';
import DuaCard from '@/components/dua/DuaCard';
import { Dua } from '@/types/dua';

interface PageProps {
    params: {
        category: string;
    };
}

export default function DuaCategoryPage({ params }: PageProps) {
    const { category: slug } = params;
    const [duas, setDuas] = useState<Dua[]>([]);
    const [categoryName, setCategoryName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [favorites, setFavorites] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load favorites
        const saved = localStorage.getItem('dua_favorites');
        const savedFavorites = saved ? JSON.parse(saved) : [];
        setFavorites(savedFavorites);

        let loadedDuas: Dua[] = [];

        if (slug === 'favorites') {
            setCategoryName('আমার প্রিয় দোয়া');
            loadedDuas = getDuasByIds(savedFavorites);
        } else {
            const category = getDuaCategory(slug);
            if (category) {
                setCategoryName(category.name);
                loadedDuas = getDuasByCategory(category.id);
            } else {
                // Handle 404 implicitly by leaving empty or redirecting? 
                // Better to show empty state or return
                setLoading(false);
                return;
            }
        }

        setDuas(loadedDuas);
        setLoading(false);
    }, [slug]);

    const toggleFavorite = (id: number) => {
        const newFavorites = favorites.includes(id)
            ? favorites.filter(fid => fid !== id)
            : [...favorites, id];

        setFavorites(newFavorites);
        localStorage.setItem('dua_favorites', JSON.stringify(newFavorites));

        // If we are in favorites page, immediately update list
        if (slug === 'favorites') {
            setDuas(prev => prev.filter(d => newFavorites.includes(d.id)));
        }
    };

    const filteredDuas = duas.filter(dua =>
        dua.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dua.translation.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!loading && !categoryName && slug !== 'favorites') {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">ক্যাটাগরি পাওয়া যায়নি</h1>
                <Link href="/duas" className="text-emerald-600 hover:underline">
                    ফিরে যান
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-30">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <Link href="/duas" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
                            <ArrowLeft size={24} />
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold text-gray-800">{categoryName}</h1>
                            <p className="text-xs text-gray-500">{filteredDuas.length} টি দোয়া</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6 max-w-3xl">
                {/* Search */}
                <div className="relative mb-6">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-500">
                        <Search size={20} />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="এই ক্যাটাগরিতে খুঁজুন..."
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm"
                    />
                </div>

                {/* List */}
                <div className="space-y-6">
                    {loading ? (
                        <div className="text-center py-20 text-gray-500">লোড হচ্ছে...</div>
                    ) : filteredDuas.length > 0 ? (
                        filteredDuas.map(dua => (
                            <DuaCard
                                key={dua.id}
                                dua={dua}
                                isFavorite={favorites.includes(dua.id)}
                                onToggleFavorite={toggleFavorite}
                            />
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                            <p className="text-gray-500 text-lg">কোনো দোয়া পাওয়া যায়নি</p>
                            {slug === 'favorites' && (
                                <Link href="/duas" className="mt-4 inline-block text-emerald-600 hover:underline">
                                    দোয়া ব্রাউজ করুন
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
