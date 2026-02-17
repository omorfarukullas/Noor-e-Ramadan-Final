'use client';

import { useState } from 'react';

export default function TrackerPage() {
    const [counts, setCounts] = useState({
        fajr: false,
        dhuhr: false,
        asr: false,
        maghrib: false,
        isha: false,
        quran: 0,
    });

    const prayers = [
        { key: 'fajr', name: 'Fajr', icon: '🌅' },
        { key: 'dhuhr', name: 'Dhuhr', icon: '☀️' },
        { key: 'asr', name: 'Asr', icon: '🌤️' },
        { key: 'maghrib', name: 'Maghrib', icon: '🌆' },
        { key: 'isha', name: 'Isha', icon: '🌙' },
    ];

    const togglePrayer = (key: string) => {
        setCounts(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
    };

    const completedPrayers = prayers.filter(p => counts[p.key as keyof typeof counts]).length;

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4 md:p-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <a href="/" className="inline-block text-green-600 hover:text-green-700 mb-4">
                        ← Back to Home
                    </a>
                    <div className="text-5xl mb-4">📊</div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        Worship Tracker
                    </h1>
                    <p className="text-gray-600">
                        Track your daily prayers and worship activities
                    </p>
                </div>

                {/* Today's Date */}
                <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl p-6 mb-6 text-center">
                    <p className="text-sm opacity-90 mb-1">Today's Progress</p>
                    <h2 className="text-3xl font-bold mb-2">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h2>
                    <div className="flex items-center justify-center gap-2">
                        <div className="text-4xl font-bold">{completedPrayers}/5</div>
                        <div className="text-sm opacity-90">prayers completed</div>
                    </div>
                </div>

                {/* Prayer Tracker */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span>🕌</span>
                        <span>Today's Prayers</span>
                    </h3>
                    <div className="space-y-3">
                        {prayers.map((prayer) => (
                            <button
                                key={prayer.key}
                                onClick={() => togglePrayer(prayer.key)}
                                className={`w-full p-4 rounded-xl border-2 transition-all ${counts[prayer.key as keyof typeof counts]
                                        ? 'bg-green-50 border-green-500 shadow-md'
                                        : 'bg-white border-gray-200 hover:border-green-300'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{prayer.icon}</span>
                                        <span className={`font-semibold ${counts[prayer.key as keyof typeof counts] ? 'text-green-700' : 'text-gray-700'
                                            }`}>
                                            {prayer.name}
                                        </span>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${counts[prayer.key as keyof typeof counts]
                                            ? 'bg-green-500 border-green-500'
                                            : 'border-gray-300'
                                        }`}>
                                        {counts[prayer.key as keyof typeof counts] && (
                                            <span className="text-white text-sm">✓</span>
                                        )}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Quran Reading */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span>📖</span>
                        <span>Quran Reading</span>
                    </h3>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-700">Pages read today:</span>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setCounts(prev => ({ ...prev, quran: Math.max(0, prev.quran - 1) }))}
                                className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg text-xl font-bold"
                            >
                                −
                            </button>
                            <span className="text-3xl font-bold text-green-700 w-16 text-center">
                                {counts.quran}
                            </span>
                            <button
                                onClick={() => setCounts(prev => ({ ...prev, quran: prev.quran + 1 }))}
                                className="w-10 h-10 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xl font-bold"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 text-sm text-gray-600">
                        💡 Goal: Complete 1 Juz (20 pages) per day during Ramadan
                    </div>
                </div>

                {/* Coming Soon Features */}
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl p-6 text-center">
                    <h2 className="text-xl font-bold mb-2">🚧 More Features Coming</h2>
                    <p className="text-purple-100 text-sm mb-4">
                        Statistics, charts, streak tracking, and Ramadan summary
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="bg-white/20 rounded-lg p-3">
                            <div className="text-2xl mb-1">📈</div>
                            <div>Weekly Stats</div>
                        </div>
                        <div className="bg-white/20 rounded-lg p-3">
                            <div className="text-2xl mb-1">🔥</div>
                            <div>Streak Counter</div>
                        </div>
                        <div className="bg-white/20 rounded-lg p-3">
                            <div className="text-2xl mb-1">🎯</div>
                            <div>Goals</div>
                        </div>
                        <div className="bg-white/20 rounded-lg p-3">
                            <div className="text-2xl mb-1">🏆</div>
                            <div>Achievements</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
