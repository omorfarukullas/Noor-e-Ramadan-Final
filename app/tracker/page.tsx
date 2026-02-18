'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { Loader2, LogOut, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Save } from 'lucide-react';

export default function TrackerPage() {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [counts, setCounts] = useState({
        fajr_prayed: false,
        dhuhr_prayed: false,
        asr_prayed: false,
        maghrib_prayed: false,
        isha_prayed: false,
        quran_pages: 0,
        fasted: false,
        taraweeh_prayed: false,
        dhikr_count: 0,
        charity_given: false,
        notes: '',
    });
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [weeklyStats, setWeeklyStats] = useState<{ day: string; count: number }[]>([]);

    const router = useRouter();
    const supabase = createClient();

    const prayers = [
        { key: 'fajr_prayed', name: 'Fajr', icon: '🌅' },
        { key: 'dhuhr_prayed', name: 'Dhuhr', icon: '☀️' },
        { key: 'asr_prayed', name: 'Asr', icon: '🌤️' },
        { key: 'maghrib_prayed', name: 'Maghrib', icon: '🌆' },
        { key: 'isha_prayed', name: 'Isha', icon: '🌙' },
    ];

    const fetchDailyLog = useCallback(async (userId: string, selectedDate: string) => {
        setLoading(true);
        const { data, error } = await supabase
            .from('worship_logs')
            .select('*')
            .eq('user_id', userId)
            .eq('date', selectedDate)
            .single();

        if (error && error.code !== 'PGRST116') {
            console.error('Error fetching logs:', error);
        }

        if (data) {
            setCounts({
                fajr_prayed: data.fajr_prayed || false,
                dhuhr_prayed: data.dhuhr_prayed || false,
                asr_prayed: data.asr_prayed || false,
                maghrib_prayed: data.maghrib_prayed || false,
                isha_prayed: data.isha_prayed || false,
                quran_pages: data.quran_pages || 0,
                fasted: data.fasted || false,
                taraweeh_prayed: data.taraweeh_prayed || false,
                dhikr_count: data.dhikr_count || 0,
                charity_given: data.charity_given || false,
                notes: data.notes || '',
            });
        } else {
            // Reset to defaults if no log exists for this date
            setCounts({
                fajr_prayed: false,
                dhuhr_prayed: false,
                asr_prayed: false,
                maghrib_prayed: false,
                isha_prayed: false,
                quran_pages: 0,
                fasted: false,
                taraweeh_prayed: false,
                dhikr_count: 0,
                charity_given: false,
                notes: '',
            });
            // Optionally insert row here, or just wait for first update
        }
        setLoading(false);
    }, [supabase]);

    const fetchWeeklyStats = useCallback(async (userId: string) => {
        const today = new Date();
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 6);

        const { data, error } = await supabase
            .from('worship_logs')
            .select('date, fajr_prayed, dhuhr_prayed, asr_prayed, maghrib_prayed, isha_prayed')
            .eq('user_id', userId)
            .gte('date', lastWeek.toISOString().split('T')[0])
            .lte('date', today.toISOString().split('T')[0])
            .order('date', { ascending: true });

        if (error) {
            console.error('Error fetching stats:', error);
            return;
        }

        // Initialize array for last 7 days
        const stats = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });

            const log = data?.find(l => l.date === dateStr);
            let count = 0;
            if (log) {
                if (log.fajr_prayed) count++;
                if (log.dhuhr_prayed) count++;
                if (log.asr_prayed) count++;
                if (log.maghrib_prayed) count++;
                if (log.isha_prayed) count++;
            }
            stats.push({ day: dayName, count });
        }
        setWeeklyStats(stats);
    }, [supabase]);

    // Check Session and Fetch Data
    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push('/login');
                return;
            }
            setUser(session.user);
            fetchDailyLog(session.user.id, date);
            fetchWeeklyStats(session.user.id);
        };
        checkUser();
    }, [router, date, supabase.auth, fetchDailyLog, fetchWeeklyStats]);



    const updateLog = async (updates: any) => {
        if (!user) return;

        // Optimistic UI update
        setCounts(prev => ({ ...prev, ...updates }));
        setMessage('Saving...');

        // Check if updating a prayer, if so update stats locally too for immediate feedback
        const prayerKeys = ['fajr_prayed', 'dhuhr_prayed', 'asr_prayed', 'maghrib_prayed', 'isha_prayed'];
        const isPrayerUpdate = Object.keys(updates).some(k => prayerKeys.includes(k));

        if (isPrayerUpdate && date === new Date().toISOString().split('T')[0]) {
            // Re-fetch stats to keep chart in sync (simple approach)
            // Or simpler: just let next reload handle it, but realtime is better.
            // We'll opt for refetching stats for simplicity as it's cheap
            setTimeout(() => fetchWeeklyStats(user.id), 500);
        }

        const { error } = await supabase
            .from('worship_logs')
            .upsert({
                user_id: user.id,
                date: date,
                ...counts, // Current state 
                ...updates // New updates overwriting current state
            }, { onConflict: 'user_id, date' });

        if (error) {
            console.error('Error updating log:', error);
            setMessage('Error saving');
        } else {
            setMessage('Saved');
            setTimeout(() => setMessage(null), 1000);
        }
    };

    const togglePrayer = (key: string) => {
        const newValue = !counts[key as keyof typeof counts];
        updateLog({ [key]: newValue });
    };

    const updateCount = (key: string, change: number) => {
        // @ts-ignore
        const currentVal = counts[key] || 0;
        const newValue = Math.max(0, currentVal + change);
        updateLog({ [key]: newValue });
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    const changeDate = (days: number) => {
        const currentDate = new Date(date);
        currentDate.setDate(currentDate.getDate() + days);
        setDate(currentDate.toISOString().split('T')[0]);
    };

    const completedPrayers = prayers.filter(p => counts[p.key as keyof typeof counts]).length;

    if (loading && !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-green-50">
                <Loader2 className="animate-spin text-green-600" size={40} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4 md:p-8 pb-20">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="flex justify-end items-center mb-6">
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 bg-red-50 px-3 py-1 rounded-full"
                    >
                        <LogOut size={14} /> Sign Out
                    </button>
                </div>

                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
                        <span>📊</span> Worship Tracker
                    </h1>
                    {user && (
                        <p className="text-xs text-green-600 mt-1">
                            {user.email}
                        </p>
                    )}
                </div>

                {/* Date Navigation */}
                <div className="flex items-center justify-between bg-white rounded-2xl shadow-sm p-4 mb-6 border border-green-100">
                    <button onClick={() => changeDate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
                        <ChevronLeft className="text-gray-600" />
                    </button>
                    <div className="flex items-center gap-2 font-semibold text-lg text-gray-800">
                        <CalendarIcon className="text-green-600" size={20} />
                        <span>{new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                        {date === new Date().toISOString().split('T')[0] && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full ml-2">Today</span>
                        )}
                    </div>
                    <button
                        onClick={() => changeDate(1)}
                        className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-30"
                        disabled={date >= new Date().toISOString().split('T')[0]}
                    >
                        <ChevronRight className="text-gray-600" />
                    </button>
                </div>

                {/* Weekly Stats Chart */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span>📈</span> Weekly Prayer Consistency
                    </h3>
                    <div className="flex items-end justify-between h-32 gap-2">
                        {weeklyStats.map((stat, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-2 flex-1">
                                <div className="w-full bg-green-100 rounded-t-lg relative group h-full flex items-end">
                                    <div
                                        className="w-full bg-green-500 rounded-t-lg transition-all duration-500"
                                        style={{ height: `${(stat.count / 5) * 100}%` }}
                                    ></div>
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {stat.count}/5
                                    </div>
                                </div>
                                <span className="text-xs text-gray-500 font-medium">{stat.day}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Status Toast */}
                {message && (
                    <div className="fixed bottom-4 right-4 z-50 bg-black/80 text-white px-4 py-2 rounded-full text-xs animate-fade-in-up transition-opacity flex items-center gap-2">
                        <Save size={12} /> {message}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column: Prayers & Ramadan */}
                    <div className="space-y-6">
                        {/* Prayer Tracker */}
                        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                    <span>🕌</span> Fardh Prayers
                                </h3>
                                <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                                    {completedPrayers}/5 Done
                                </span>
                            </div>
                            <div className="space-y-3">
                                {prayers.map((prayer) => (
                                    <button
                                        key={prayer.key}
                                        onClick={() => togglePrayer(prayer.key)}
                                        className={`w-full p-3 rounded-xl border transition-all flex items-center justify-between ${counts[prayer.key as keyof typeof counts]
                                            ? 'bg-green-50 border-green-500 shadow-sm'
                                            : 'bg-white border-gray-200 hover:border-green-300'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">{prayer.icon}</span>
                                            <span className={`font-semibold ${counts[prayer.key as keyof typeof counts] ? 'text-green-700' : 'text-gray-700'}`}>
                                                {prayer.name}
                                            </span>
                                        </div>
                                        {counts[prayer.key as keyof typeof counts] && (
                                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                                <span className="text-white text-xs">✓</span>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Ramadan Specials */}
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-md p-6 border border-indigo-100">
                            <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2">
                                <span>🌙</span> Ramadan Specials
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { key: 'fasted', label: 'Fasted Today (Roza)', icon: '🍽️' },
                                    { key: 'taraweeh_prayed', label: 'Taraweeh Prayer', icon: '📿' },
                                ].map((item) => (
                                    <button
                                        key={item.key}
                                        onClick={() => togglePrayer(item.key)}
                                        className={`w-full p-3 rounded-xl border transition-all flex items-center justify-between ${counts[item.key as keyof typeof counts]
                                            ? 'bg-indigo-100 border-indigo-500 shadow-sm'
                                            : 'bg-white border-indigo-200 hover:border-indigo-300'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">{item.icon}</span>
                                            <span className={`font-semibold ${counts[item.key as keyof typeof counts] ? 'text-indigo-800' : 'text-gray-700'}`}>
                                                {item.label}
                                            </span>
                                        </div>
                                        {counts[item.key as keyof typeof counts] && (
                                            <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                                                <span className="text-white text-xs">✓</span>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Quran, Deeds & Notes */}
                    <div className="space-y-6">
                        {/* Quran Reading */}
                        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span>📖</span> Quran Reading
                            </h3>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-gray-600 text-sm">Pages read:</span>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => updateCount('quran_pages', -1)}
                                        className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg font-bold"
                                    >
                                        −
                                    </button>
                                    <span className="text-2xl font-bold text-green-700 w-12 text-center tabular-nums">
                                        {counts.quran_pages}
                                    </span>
                                    <button
                                        onClick={() => updateCount('quran_pages', 1)}
                                        className="w-8 h-8 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${Math.min((counts.quran_pages / 20) * 100, 100)}%` }}></div>
                            </div>
                            <p className="text-xs text-gray-500 text-right">Target: 20 pages/day</p>
                        </div>

                        {/* Good Deeds */}
                        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span>💖</span> Good Deeds
                            </h3>

                            {/* Charity Toggle */}
                            <div className="mb-4">
                                <button
                                    onClick={() => togglePrayer('charity_given')}
                                    className={`w-full p-3 rounded-xl border transition-all flex items-center justify-between ${counts.charity_given
                                        ? 'bg-rose-50 border-rose-500 shadow-sm'
                                        : 'bg-white border-gray-200 hover:border-rose-300'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">🤝</span>
                                        <span className={`font-semibold ${counts.charity_given ? 'text-rose-700' : 'text-gray-700'}`}>
                                            Gave Charity (Sadaqah)
                                        </span>
                                    </div>
                                    {counts.charity_given && (
                                        <div className="w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center">
                                            <span className="text-white text-xs">✓</span>
                                        </div>
                                    )}
                                </button>
                            </div>

                            {/* Dhikr Counter */}
                            <div className="flex items-center justify-between pt-2 border-t">
                                <span className="text-gray-700 font-medium flex items-center gap-2">
                                    <span>📿</span> Dhikr Count
                                </span>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => updateCount('dhikr_count', -1)}
                                        className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg font-bold"
                                    >
                                        −
                                    </button>
                                    <span className="text-xl font-bold text-blue-600 w-16 text-center tabular-nums">
                                        {counts.dhikr_count}
                                    </span>
                                    <button
                                        onClick={() => updateCount('dhikr_count', 1)}
                                        className="w-8 h-8 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="bg-amber-50 rounded-2xl shadow-sm p-6 border border-amber-100">
                            <h3 className="text-lg font-bold text-amber-900 mb-3 flex items-center gap-2">
                                <span>📝</span> Daily Reflection
                            </h3>
                            <textarea
                                value={counts.notes || ''}
                                onChange={(e) => {
                                    setCounts(prev => ({ ...prev, notes: e.target.value }));
                                }}
                                onBlur={() => updateLog({ notes: counts.notes })}
                                className="w-full h-24 bg-white/50 border border-amber-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                                placeholder="Write your thoughts, duas, or reflections for today..."
                            ></textarea>
                            <p className="text-[10px] text-amber-700/60 text-right mt-1">Saved automatically</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
