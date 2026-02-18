'use client';

import React from 'react';
import TasbihCounter from '@/components/dhikr/TasbihCounter';
import { DHIKR_DATA } from '@/lib/dhikr-data';


export default function DhikrPage() {
    return (
        <div className="min-h-screen bg-slate-50 pb-20 md:pb-0">


            <TasbihCounter dhikrs={DHIKR_DATA} />
        </div>
    );
}
