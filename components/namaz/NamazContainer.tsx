'use client';

import React, { useState, useRef, useEffect } from 'react';
import { NAMAZ_SECTIONS } from '@/lib/namaz-data';
import SectionWudu from './SectionWudu';
import SectionRules from './SectionRules';
import SectionDuas from './SectionDuas';
import SectionRakat from './SectionRakat';
import SectionJummah from './SectionJummah';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function NamazContainer() {
    const [activeTab, setActiveTab] = useState('wudu');
    const [isOpen, setIsOpen] = useState(false);
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

    const renderContent = () => {
        switch (activeTab) {
            case 'wudu': return <SectionWudu />;
            case 'rules': return <SectionRules />;
            case 'duas': return <SectionDuas />;
            case 'rakat': return <SectionRakat />;
            case 'jummah': return <SectionJummah />;
            default: return <SectionWudu />;
        }
    };

    const activeSection = NAMAZ_SECTIONS.find(s => s.id === activeTab) || NAMAZ_SECTIONS[0];

    return (
        <div className="flex flex-col gap-6">

            {/* Styled Dropdown Navigation (Top) */}
            <div className="w-full relative z-50 pt-2 pb-2 max-w-xl mx-auto" ref={dropdownRef}>
                <label className="block text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2 text-center shadow-emerald-100">
                    SECTIONS
                </label>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "w-full bg-white/100 border-2 py-3 px-4 rounded-2xl flex items-center justify-between transition-all duration-200 shadow-sm hover:shadow-md",
                        isOpen ? "border-emerald-500 ring-4 ring-emerald-50/50" : "border-gray-100"
                    )}
                >
                    <div className="text-left overflow-hidden">
                        <span className="block text-emerald-900 font-bold text-lg leading-snug mb-1">
                            {activeSection.title}
                        </span>
                        {/* Optional subtitle/description if available in data */}
                        <span className="block text-xs text-emerald-600/80 truncate font-medium">
                            Select Topic
                        </span>
                    </div>
                    <div className={cn("text-emerald-500 transition-transform duration-300", isOpen && "rotate-180")}>
                        <ChevronDown size={20} />
                    </div>
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-emerald-100 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-200 animate-in fade-in zoom-in-95 duration-200 z-50">
                        <div className="p-2 space-y-1">
                            {NAMAZ_SECTIONS.map((section) => {
                                const isActive = activeTab === section.id;
                                return (
                                    <button
                                        key={section.id}
                                        onClick={() => {
                                            setActiveTab(section.id);
                                            setIsOpen(false);
                                        }}
                                        className={cn(
                                            "w-full flex items-center justify-between p-3 rounded-xl transition-all text-left group",
                                            isActive
                                                ? "bg-emerald-50 text-emerald-700"
                                                : "hover:bg-gray-50 text-gray-700"
                                        )}
                                    >
                                        <div className="flex-1 min-w-0 pr-4">
                                            <span className={cn(
                                                "block font-bold text-lg mb-0.5 whitespace-normal",
                                                isActive ? "text-emerald-700" : "text-gray-800"
                                            )}>
                                                {section.title}
                                            </span>
                                        </div>
                                        {isActive && (
                                            <div className="text-emerald-600 bg-emerald-100 p-1 rounded-full">
                                                <Check size={14} strokeWidth={3} />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
                <div className="bg-white/50 backdrop-blur-sm rounded-2xl md:p-1">
                    {renderContent()}
                </div>
            </div>

        </div>
    );
}
