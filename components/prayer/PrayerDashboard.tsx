'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { PrayerTimings, getTimeUntilNextPrayer, formatPrayerTime } from '@/lib/prayer-times';

interface PrayerCardProps {
    name: string;
    time: string;
    isNext: boolean;
    isCurrent: boolean;
}

export function PrayerTimeCard({ name, time, isNext, isCurrent }: PrayerCardProps) {
    const t = useTranslations('prayer');

    return (
        <div
            className={`p-4 rounded-lg border-2 transition-all ${isNext
                    ? 'bg-primary-50 border-primary-500 shadow-lg scale-105'
                    : isCurrent
                        ? 'bg-primary-100 border-primary-400'
                        : 'bg-white border-gray-200 hover:border-primary-300'
                }`}
        >
            <div className="flex justify-between items-center">
                <div>
                    <h3 className={`font-semibold ${isNext ? 'text-primary-700 text-lg' : 'text-gray-700'}`}>
                        {t(name.toLowerCase() as any)}
                    </h3>
                    {isNext && (
                        <span className="text-xs text-primary-600 font-medium">{t('nextPrayer')}</span>
                    )}
                </div>
                <div className={`text-2xl font-bold ${isNext ? 'text-primary-700' : 'text-gray-800'}`}>
                    {formatPrayerTime(time)}
                </div>
            </div>
        </div>
    );
}

interface PrayerDashboardProps {
    timings: PrayerTimings;
    hijriDate?: string;
}

export function PrayerDashboard({ timings, hijriDate }: PrayerDashboardProps) {
    const t = useTranslations('prayer');
    const [timeInfo, setTimeInfo] = useState(getTimeUntilNextPrayer(timings));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeInfo(getTimeUntilNextPrayer(timings));
        }, 60000); // Update every minute

        return () => clearInterval(interval);
    }, [timings]);

    const prayers = [
        { name: 'Fajr', time: timings.Fajr },
        { name: 'Dhuhr', time: timings.Dhuhr },
        { name: 'Asr', time: timings.Asr },
        { name: 'Maghrib', time: timings.Maghrib },
        { name: 'Isha', time: timings.Isha },
    ];

    return (
        <div className="space-y-6">
            {/* Next Prayer Countdown */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 text-white shadow-xl">
                <div className="text-center space-y-2">
                    <p className="text-sm opacity-90">{t('nextPrayer')}</p>
                    <h2 className="text-4xl font-bold">{t(timeInfo.nextPrayer.toLowerCase() as any)}</h2>
                    <div className="text-3xl font-light">{timeInfo.timeUntil}</div>
                    {hijriDate && (
                        <p className="text-sm opacity-75 pt-2 font-arabic">{hijriDate}</p>
                    )}
                </div>
            </div>

            {/* All Prayer Times */}
            <div className="space-y-3">
                {prayers.map((prayer) => (
                    <PrayerTimeCard
                        key={prayer.name}
                        name={prayer.name}
                        time={prayer.time}
                        isNext={prayer.name === timeInfo.nextPrayer}
                        isCurrent={false}
                    />
                ))}
            </div>

            {/* Sunrise Time */}
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex justify-between items-center">
                    <span className="text-amber-700 font-medium">{t('sunrise')}</span>
                    <span className="text-amber-900 font-bold">{formatPrayerTime(timings.Sunrise)}</span>
                </div>
            </div>
        </div>
    );
}
