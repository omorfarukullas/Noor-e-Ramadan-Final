import React from 'react';
import HadithList from '@/components/hadith/HadithList';

export default function HadithPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-emerald-700 text-center mb-8">
                আল হাদিস সম্ভার
            </h1>
            <HadithList />
        </div>
    );
}
