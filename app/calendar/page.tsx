'use client';

import React from 'react';

import IslamicCalendar from '@/components/calendar/IslamicCalendar';

export default function CalendarPage() {
    return (
        <div className="min-h-screen bg-slate-50">


            {/* Content */}
            <IslamicCalendar />
        </div>
    );
}
