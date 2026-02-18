'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Search, MapPin, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DISTRICT_DATA, DISTRICT_NAMES_MAPPING } from '@/lib/ramadan-data';

interface DistrictSelectorProps {
    selectedDistrict: string;
    onSelect: (district: string) => void;
}

export default function DistrictSelector({ selectedDistrict, onSelect }: DistrictSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

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

    const districts = useMemo(() => Object.keys(DISTRICT_DATA).sort(), []);

    const filteredDistricts = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return districts;

        return districts.filter(d => {
            // Match Bangla directly
            if (d.includes(query)) return true;

            // Match English via mapping
            for (const [eng, bang] of Object.entries(DISTRICT_NAMES_MAPPING)) {
                if (bang === d && eng.includes(query)) return true;
            }
            return false;
        });
    }, [districts, searchQuery]);

    return (
        <div className="w-full max-w-sm mx-auto relative z-40" ref={dropdownRef}>
            <label className="block text-sm font-medium text-white/90 mb-2 text-center drop-shadow-sm">
                আপনার জেলা নির্বাচন করুন
            </label>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full bg-white backdrop-blur-md border border-gray-100 py-3 px-4 rounded-xl flex items-center justify-between transition-all duration-200 shadow-xl shadow-black/5 hover:bg-gray-50 text-gray-800",
                    isOpen ? "ring-4 ring-emerald-500/20 border-emerald-500" : ""
                )}
            >
                <div className="flex items-center gap-3">
                    <div className="bg-emerald-100 p-2 rounded-full">
                        <MapPin size={18} className="text-emerald-600" />
                    </div>
                    <span className="font-bold text-lg font-bengali text-gray-900">
                        {selectedDistrict}
                    </span>
                </div>
                <div className={cn("text-gray-400 transition-transform duration-300", isOpen && "rotate-180")}>
                    <ChevronDown size={20} />
                </div>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 max-h-[300px] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">

                    {/* Search Input */}
                    <div className="p-3 border-b border-gray-100">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="জেলা খুঁজুন... (Search in English)"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-gray-50 text-gray-900 pl-9 pr-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 placeholder:text-gray-400 text-sm"
                                autoFocus
                            />
                        </div>
                    </div>

                    {/* List */}
                    <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                        {filteredDistricts.length > 0 ? (
                            <div className="p-1">
                                {filteredDistricts.map((district) => {
                                    const isSelected = selectedDistrict === district;
                                    return (
                                        <button
                                            key={district}
                                            onClick={() => {
                                                onSelect(district);
                                                setIsOpen(false);
                                                setSearchQuery('');
                                            }}
                                            className={cn(
                                                "w-full flex items-center justify-between p-3 rounded-lg transition-colors text-left font-bengali",
                                                isSelected
                                                    ? "bg-emerald-50 text-emerald-700 font-semibold"
                                                    : "text-gray-700 hover:bg-gray-50 hover:text-emerald-600"
                                            )}
                                        >
                                            <span>{district}</span>
                                            {isSelected && <Check size={16} className="text-emerald-600" />}
                                        </button>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="p-4 text-center text-gray-500 text-sm">
                                কোন জেলা পাওয়া যায়নি
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
