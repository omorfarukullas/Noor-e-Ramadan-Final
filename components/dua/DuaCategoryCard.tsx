import React from 'react';
import Link from 'next/link';
import { DuaCategory } from '@/types/dua';
import { toBanglaNumber } from '@/lib/bangla-utils';

interface DuaCategoryCardProps {
    category: DuaCategory;
    count: number;
    icon?: string;
}

export default function DuaCategoryCard({ category, count, icon = '🤲' }: DuaCategoryCardProps) {
    return (
        <Link href={`/duas/${category.slug}`} className="block group h-full">
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all p-6 border border-emerald-100 hover:border-emerald-300 h-full flex flex-col items-center text-center relative overflow-hidden">

                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:scale-110 transition-transform"></div>

                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors relative z-10 text-2xl">
                    {icon}
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-700 transition-colors relative z-10">
                    {category.name}
                </h3>

                <p className="text-sm text-gray-500 mt-auto bg-emerald-50/50 px-3 py-1 rounded-full border border-emerald-100 relative z-10">
                    {toBanglaNumber(count)} টি দোয়া
                </p>
            </div>
        </Link>
    );
}
