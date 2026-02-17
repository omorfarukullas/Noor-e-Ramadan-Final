'use client';

import React, { useRef, useEffect } from 'react';
import { Dhikr } from '@/lib/dhikr-data';

interface DhikrSelectorProps {
    dhikrs: Dhikr[];
    selectedId: number;
    onSelect: (id: number) => void;
}

export default function DhikrSelector({ dhikrs, selectedId, onSelect }: DhikrSelectorProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to active item
    useEffect(() => {
        if (scrollRef.current) {
            const activeElement = scrollRef.current.querySelector('[data-active="true"]');
            if (activeElement) {
                activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    }, [selectedId]);

    return (
        <div className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-30">
            <div
                ref={scrollRef}
                className="flex overflow-x-auto py-4 px-4 gap-3 hide-scrollbar snap-x"
                style={{ scrollBehavior: 'smooth' }}
            >
                {dhikrs.map((dhikr) => (
                    <button
                        key={dhikr.id}
                        data-active={selectedId === dhikr.id}
                        onClick={() => onSelect(dhikr.id)}
                        className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap snap-center ${selectedId === dhikr.id
                                ? 'bg-emerald-600 text-white shadow-emerald-200 shadow-lg scale-105'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {dhikr.uchcharon}
                    </button>
                ))}
            </div>
        </div>
    );
}
