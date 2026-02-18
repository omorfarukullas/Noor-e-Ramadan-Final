'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Dhikr } from '@/lib/dhikr-data';
import { ChevronDown, Check } from 'lucide-react';
import { toBanglaNumber } from '@/lib/bangla-utils';

interface DhikrSelectorProps {
    dhikrs: Dhikr[];
    selectedId: number;
    onSelect: (id: number) => void;
}

export default function DhikrSelector({ dhikrs, selectedId, onSelect }: DhikrSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedDhikr = dhikrs.find(d => d.id === selectedId) || dhikrs[0];

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="w-full relative z-50 px-4 pt-4 pb-2 max-w-xl mx-auto" ref={dropdownRef}>
            <label className="block text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2 text-center">
                Select Dhikr
            </label>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full bg-white/100 border-2 py-3 px-4 rounded-2xl flex items-center justify-between transition-all duration-200 shadow-sm hover:shadow-md
                    ${isOpen ? 'border-emerald-500 ring-4 ring-emerald-50/50' : 'border-gray-100'}`}
            >
                <div className="text-left overflow-hidden">
                    <span className="block text-emerald-900 font-bold truncate font-amiri text-lg leading-none mb-1">
                        {selectedDhikr.arabic}
                    </span>
                    <span className="block text-xs text-gray-500 truncate font-medium">
                        {selectedDhikr.uchcharon}
                    </span>
                </div>
                <div className={`text-emerald-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown size={20} />
                </div>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full left-4 right-4 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-emerald-100 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-200 animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-2 space-y-1">
                        {dhikrs.map((dhikr) => (
                            <button
                                key={dhikr.id}
                                onClick={() => {
                                    onSelect(dhikr.id);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all text-left group
                                    ${selectedId === dhikr.id
                                        ? 'bg-emerald-50 text-emerald-700'
                                        : 'hover:bg-gray-50 text-gray-700'
                                    }`}
                            >
                                <div className="flex-1 min-w-0 pr-4">
                                    <span className={`block font-bold text-lg font-amiri mb-0.5 truncate ${selectedId === dhikr.id ? 'text-emerald-700' : 'text-gray-800'}`}>
                                        {dhikr.arabic}
                                    </span>
                                    <span className={`block text-xs truncate ${selectedId === dhikr.id ? 'text-emerald-600' : 'text-gray-500'}`}>
                                        {dhikr.uchcharon}
                                    </span>
                                </div>
                                {selectedId === dhikr.id && (
                                    <div className="text-emerald-600 bg-emerald-100 p-1 rounded-full">
                                        <Check size={14} strokeWidth={3} />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
