'use client';

import React, { useState, useEffect } from 'react';
import { DAILY_AMOL } from '@/lib/ramadan-data';
import { CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function RamadanAmol() {
    const [completed, setCompleted] = useState<string[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem('ramadan-amol');
        if (saved) {
            try {
                // Determine if we need to reset (e.g., new day). 
                // For simplicity, we just load for now. 
                // Enhanced: Check date stored.
                const parse = JSON.parse(saved);
                const today = new Date().toDateString();
                if (parse.date === today) {
                    setCompleted(parse.list);
                }
            } catch (e) {
                console.error(e);
            }
        }
    }, []);

    const toggleAmol = (id: string) => {
        const newList = completed.includes(id)
            ? completed.filter(c => c !== id)
            : [...completed, id];

        setCompleted(newList);
        localStorage.setItem('ramadan-amol', JSON.stringify({
            date: new Date().toDateString(),
            list: newList
        }));
    };

    if (!mounted) return null;

    const progress = Math.round((completed.length / DAILY_AMOL.length) * 100);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-5 md:p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold font-bengali text-emerald-800">
                        আজকের আমল
                    </h2>
                    <p className="text-sm text-emerald-600">
                        আপনার প্রতিদিনের ইবাদত ট্র্যাকার
                    </p>
                </div>
                <div className="text-right">
                    <span className="text-3xl font-bold text-emerald-500 font-bengali">
                        {progress.toString().replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[parseInt(d)])}%
                    </span>
                </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
                {DAILY_AMOL.map((amol) => {
                    const isDone = completed.includes(amol.id);
                    return (
                        <button
                            key={amol.id}
                            onClick={() => toggleAmol(amol.id)}
                            className={cn(
                                "flex items-center gap-3 p-3 rounded-xl border transition-all text-left group",
                                isDone
                                    ? "bg-emerald-50 border-emerald-200"
                                    : "bg-gray-50 border-transparent hover:bg-emerald-50/50"
                            )}
                        >
                            <div className={cn(
                                "transition-colors",
                                isDone ? "text-emerald-500" : "text-gray-300 group-hover:text-emerald-300"
                            )}>
                                {isDone ? <CheckCircle2 size={24} className="text-white fill-emerald-600" /> : <Circle size={24} />}
                            </div>
                            <span className={cn(
                                "font-medium font-bengali text-lg",
                                isDone ? "text-emerald-900" : "text-gray-600"
                            )}>
                                {amol.label}
                            </span>
                        </button>
                    );
                })}
            </div>

            {progress === 100 && (
                <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg text-center text-sm font-medium animate-in fade-in slide-in-from-bottom-2">
                    আলহামদুলিল্লাহ! আপনি আজকের সব আমল সম্পন্ন করেছেন।
                </div>
            )}
        </div>
    );
}
