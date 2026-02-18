'use client';

import React, { useState, useEffect } from 'react';
import RamadanHero from './RamadanHero';
import DistrictSelector from './DistrictSelector';
import SehriIftarTable from './SehriIftarTable';
import RamadanHadith from './RamadanHadith';
import RamadanAmol from './RamadanAmol';
import RamadanDuas from './RamadanDuas';

export default function RamadanContainer() {
    const [selectedDistrict, setSelectedDistrict] = useState('ঢাকা');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem('selected-district');
        if (saved) {
            setSelectedDistrict(saved);
        }
    }, []);

    const handleDistrictChange = (district: string) => {
        setSelectedDistrict(district);
        localStorage.setItem('selected-district', district);
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Hero Section */}
            <RamadanHero />

            {/* District Selector (Floating overlap) */}
            <div className="container mx-auto px-4 -mt-20 relative z-30 mb-12">
                <DistrictSelector
                    selectedDistrict={selectedDistrict}
                    onSelect={handleDistrictChange}
                />
            </div>

            {/* Main Content Grid */}
            <main className="container mx-auto px-4 grid lg:grid-cols-12 gap-8">

                {/* Left Column (Table & Hadith) */}
                <div className="lg:col-span-8 space-y-10">
                    <section id="schedule">
                        <SehriIftarTable selectedDistrict={selectedDistrict} />
                    </section>

                    <section id="hadith">
                        <RamadanHadith />
                    </section>
                </div>

                {/* Right Column (Amol & Dua) */}
                <div className="lg:col-span-4 space-y-8">
                    <section id="amol">
                        <RamadanAmol />
                    </section>

                    <section id="duas">
                        <RamadanDuas />
                    </section>
                </div>

            </main>
        </div>
    );
}
