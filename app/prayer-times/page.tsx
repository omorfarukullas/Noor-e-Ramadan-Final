'use client';

import { useEffect, useState } from 'react';

interface PrayerTimings {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
}

interface PrayerData {
    timings: PrayerTimings;
    date: {
        hijri: {
            date: string;
            month: { en: string };
            year: string;
        };
        readable: string;
    };
    meta: {
        timezone: string;
    };
}

interface LocationState {
    city?: string;
    country?: string;
    lat?: number;
    lng?: number;
    loading: boolean;
    error?: string;
}

export default function PrayerTimesPage() {
    const [prayerData, setPrayerData] = useState<PrayerData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [nextPrayer, setNextPrayer] = useState<{ name: string; timeLeft: string } | null>(null);
    const [location, setLocation] = useState<LocationState>({
        city: 'Dhaka',
        country: 'Bangladesh',
        loading: false
    });

    useEffect(() => {
        // Try to get user's location
        detectLocation();
    }, []);

    useEffect(() => {
        if (!location.loading) {
            fetchPrayerTimes();
        }
    }, [location]);

    useEffect(() => {
        if (prayerData) {
            updateNextPrayer();
            const interval = setInterval(updateNextPrayer, 60000);
            return () => clearInterval(interval);
        }
    }, [prayerData]);

    const detectLocation = () => {
        if ('geolocation' in navigator) {
            setLocation(prev => ({ ...prev, loading: true }));

            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    // Use coordinates for prayer times
                    setLocation({
                        lat: latitude,
                        lng: longitude,
                        loading: false
                    });
                },
                (err) => {
                    console.log('Geolocation denied, using default location:', err);
                    setLocation({
                        city: 'Dhaka',
                        country: 'Bangladesh',
                        loading: false
                    });
                }
            );
        } else {
            setLocation({
                city: 'Dhaka',
                country: 'Bangladesh',
                loading: false
            });
        }
    };

    const fetchPrayerTimes = async () => {
        try {
            setLoading(true);
            let url = '/api/prayer-times?';

            if (location.lat && location.lng) {
                url += `lat=${location.lat}&lng=${location.lng}`;
            } else {
                url += `city=${location.city}&country=${location.country}`;
            }

            const response = await fetch(url);
            const result = await response.json();

            if (result.success) {
                setPrayerData(result.data);
                setError(null);
            } else {
                setError('নামাজের সময় লোড করতে ব্যর্থ হয়েছে');
            }
        } catch (err) {
            setError('নামাজের সময় লোড করতে ব্যর্থ হয়েছে');
        } finally {
            setLoading(false);
        }
    };

    const prayerNamesBn: { [key: string]: string } = {
        'Fajr': 'ফজর',
        'Dhuhr': 'জোহর',
        'Asr': 'আসর',
        'Maghrib': 'মাগরিব',
        'Isha': 'ইশা'
    };

    const updateNextPrayer = () => {
        if (!prayerData) return;

        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();

        const prayers = [
            { name: 'Fajr', time: prayerData.timings.Fajr },
            { name: 'Dhuhr', time: prayerData.timings.Dhuhr },
            { name: 'Asr', time: prayerData.timings.Asr },
            { name: 'Maghrib', time: prayerData.timings.Maghrib },
            { name: 'Isha', time: prayerData.timings.Isha },
        ];

        for (const prayer of prayers) {
            const [hours, minutes] = prayer.time.split(':').map(Number);
            const prayerMinutes = hours * 60 + minutes;

            if (prayerMinutes > currentTime) {
                const minutesLeft = prayerMinutes - currentTime;
                const hoursLeft = Math.floor(minutesLeft / 60);
                const minsLeft = minutesLeft % 60;
                setNextPrayer({
                    name: prayerNamesBn[prayer.name],
                    timeLeft: hoursLeft > 0 ? `${hoursLeft}ঘ ${minsLeft}মি` : `${minsLeft}মি`
                });
                return;
            }
        }

        // Next is Fajr tomorrow
        const [hours, minutes] = prayers[0].time.split(':').map(Number);
        const fajrMinutes = hours * 60 + minutes;
        const minutesLeft = (24 * 60 - currentTime) + fajrMinutes;
        const hoursLeft = Math.floor(minutesLeft / 60);
        const minsLeft = minutesLeft % 60;
        setNextPrayer({
            name: 'ফজর',
            timeLeft: `${hoursLeft}ঘ ${minsLeft}মি`
        });
    };

    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
        // Convert to Bangla digits could be added here
        return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    };

    if (loading || location.loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-8">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="text-6xl mb-4 animate-pulse">⏰</div>
                    <p className="text-xl text-gray-600">
                        {location.loading ? 'আপনার অবস্থান নির্ণয় করা হচ্ছে...' : 'নামাজের সময় লোড হচ্ছে...'}
                    </p>
                </div>
            </div>
        );
    }

    if (error || !prayerData) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-8">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-red-50 rounded-xl p-8 text-center">
                        <div className="text-6xl mb-4">⚠️</div>
                        <p className="text-red-700 text-xl mb-4">{error}</p>
                        <button
                            onClick={() => {
                                setError(null);
                                fetchPrayerTimes();
                            }}
                            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            আবার চেষ্টা করুন
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4 md:p-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="flex justify-center items-center mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        নামাজের সময়সূচী
                    </h1>
                </div>

                {/* Location */}
                <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-xl">📍</span>
                        <p className="text-gray-700 font-semibold">
                            {location.lat && location.lng ? (
                                `আপনার অবস্থান (${location.lat.toFixed(2)}°, ${location.lng.toFixed(2)}°)`
                            ) : (
                                `${location.city}, ${location.country}`
                            )}
                        </p>
                    </div>
                    <p className="text-sm text-gray-500">
                        {prayerData.date.hijri.date} {prayerData.date.hijri.month.en} {prayerData.date.hijri.year}
                    </p>
                    <p className="text-xs text-gray-400">{prayerData.date.readable}</p>
                </div>

                {/* Next Prayer Card */}
                {nextPrayer && (
                    <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white mb-6 shadow-xl">
                        <div className="text-center">
                            <p className="text-sm opacity-90 mb-2">পরবর্তী নামাজ</p>
                            <h2 className="text-4xl font-bold mb-2">{nextPrayer.name}</h2>
                            <p className="text-3xl font-light">{nextPrayer.timeLeft}</p>
                        </div>
                    </div>
                )}

                {/* Prayer Times List */}
                <div className="space-y-3 mb-6">
                    <PrayerCard
                        name="ফজর"
                        time={formatTime(prayerData.timings.Fajr)}
                        isNext={nextPrayer?.name === 'ফজর'}
                    />
                    <PrayerCard
                        name="জোহর"
                        time={formatTime(prayerData.timings.Dhuhr)}
                        isNext={nextPrayer?.name === 'জোহর'}
                    />
                    <PrayerCard
                        name="আসর"
                        time={formatTime(prayerData.timings.Asr)}
                        isNext={nextPrayer?.name === 'আসর'}
                    />
                    <PrayerCard
                        name="মাগরিব"
                        time={formatTime(prayerData.timings.Maghrib)}
                        isNext={nextPrayer?.name === 'মাগরিব'}
                    />
                    <PrayerCard
                        name="ইশা"
                        time={formatTime(prayerData.timings.Isha)}
                        isNext={nextPrayer?.name === 'ইশা'}
                    />
                </div>

                {/* Sunrise */}
                <div className="bg-amber-50 rounded-xl p-4 border-2 border-amber-200 mb-6">
                    <div className="flex justify-between items-center">
                        <span className="text-amber-700 font-semibold">🌅 সূর্যোদয়</span>
                        <span className="text-amber-900 font-bold text-xl">
                            {formatTime(prayerData.timings.Sunrise)}
                        </span>
                    </div>
                </div>

                {/* Refresh Location Button */}
                <button
                    onClick={detectLocation}
                    className="w-full bg-green-100 hover:bg-green-200 text-green-700 py-3 rounded-lg transition-colors"
                >
                    🔄 অবস্থান রিফ্রেশ করুন
                </button>
            </div>
        </div>
    );
}

function PrayerCard({ name, time, isNext }: { name: string; time: string; isNext: boolean }) {
    return (
        <div
            className={`p-4 rounded-xl border-2 transition-all ${isNext
                ? 'bg-green-50 border-green-500 shadow-lg scale-105'
                : 'bg-white border-gray-200 hover:border-green-300'
                }`}
        >
            <div className="flex justify-between items-center">
                <div>
                    <h3 className={`font-semibold ${isNext ? 'text-green-700 text-lg' : 'text-gray-700'}`}>
                        {name}
                    </h3>
                    {isNext && <span className="text-xs text-green-600">পরবর্তী</span>}
                </div>
                <div className={`text-2xl font-bold ${isNext ? 'text-green-700' : 'text-gray-800'}`}>
                    {time}
                </div>
            </div>
        </div>
    );
}
