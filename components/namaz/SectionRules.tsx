import React from 'react';
import { NAMAZ_RULES } from '@/lib/namaz-data';
import { AlertCircle, BookOpen, ListChecks, ShieldAlert } from 'lucide-react';

export default function SectionRules() {

    const RuleCard = ({ title, items, icon: Icon, color }: any) => (
        <div className={`bg-white rounded-xl shadow-sm border border-${color}-100 overflow-hidden`}>
            <div className={`bg-${color}-50 px-4 py-3 flex items-center gap-2 border-b border-${color}-100`}>
                <Icon size={18} className={`text-${color}-600`} />
                <h3 className={`font-bold text-lg text-${color}-800`}>{title}</h3>
            </div>
            <div className="p-4">
                <ul className="space-y-2">
                    {items.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700 text-sm md:text-base">
                            <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-${color}-400`} />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RuleCard
                    title="নামাজের বাইরের ফরজ (আহকাম)"
                    items={NAMAZ_RULES.farz_external}
                    icon={ListChecks}
                    color="emerald"
                />
                <RuleCard
                    title="নামাজের ভেতরের ফরজ (আরকান)"
                    items={NAMAZ_RULES.farz_internal}
                    icon={ListChecks}
                    color="emerald"
                />
            </div>

            <RuleCard
                title="নামাজের ওয়াজিব (১৪টি)"
                items={NAMAZ_RULES.wajib}
                icon={BookOpen}
                color="teal"
            />

            <RuleCard
                title="নামাজের সুন্নতে মুয়াক্কাদা"
                items={NAMAZ_RULES.sunnah_muakkada}
                icon={BookOpen}
                color="blue"
            />

            <div className="grid grid-cols-1 gap-6">
                <RuleCard
                    title="নামাজ ভঙ্গের কারণ"
                    items={NAMAZ_RULES.breakers}
                    icon={ShieldAlert}
                    color="rose"
                />
            </div>

        </div>
    );
}
