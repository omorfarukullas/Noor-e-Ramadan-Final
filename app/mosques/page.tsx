'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { fetchNearbyMosques, Mosque } from '@/lib/mosque-api';
import MosqueList from '@/components/mosque/MosqueList';

// Dynamically import map to avoid SSR issues
const MosqueMap = dynamic(() => import('@/components/mosque/MosqueMap'), {
    ssr: false,
    loading: () => <div className="h-96 w-full bg-slate-100 animate-pulse rounded-2xl flex items-center justify-center text-gray-400">ম্যাপ লোড হচ্ছে...</div>
});

export default function MosqueFinderPage() {
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [mosques, setMosques] = useState<Mosque[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLocateMe = () => {
        setLoading(true);
        setError(null);

        if (!navigator.geolocation) {
            setError('আপনার ব্রাউজার লোকেশন সাপোর্ট করে না');
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation([latitude, longitude]);

                try {
                    const results = await fetchNearbyMosques(latitude, longitude);
                    setMosques(results);
                } catch (err) {
                    setError('মসজিদ লোড করতে সমস্যা হয়েছে');
                } finally {
                    setLoading(false);
                }
            },
            (err) => {
                setLoading(false);
                setError('অনুগ্রহ করে লোকেশন অ্যাক্সেস দিন');
                console.error(err);
            }
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header with Background */}
            <div className="bg-emerald-800 text-white py-12 px-4 text-center relative overflow-hidden">
                <div className="absolute opacity-10 top-0 left-0 w-full h-full pointer-events-none"
                    style={{ backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDQwaDQwVjBIMHY0MHptMjAgMjBWMjBoMjB2MjBIMjB6IiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvZz48L3N2Zz4=")' }}>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold mb-4 relative z-10">নিকটবর্তী মসজিদ খুঁজুন</h1>
                <p className="text-emerald-100 relative z-10">আপনার অবস্থানের উপর ভিত্তি করে কাছের মসজিদগুলো দেখুন</p>
            </div>

            <div className="container mx-auto px-4 -mt-8 relative z-20">
                <div className="bg-white p-6 rounded-2xl shadow-xl max-w-5xl mx-auto">

                    {/* Control Panel */}
                    <div className="text-center mb-8">
                        {!userLocation ? (
                            <div className="py-10">
                                <div className="text-6xl mb-4">📍</div>
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">শুরু করতে আপনার অবস্থান শনাক্ত করুন</h2>
                                <button
                                    onClick={handleLocateMe}
                                    disabled={loading}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg transition-transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                                >
                                    {loading ? (
                                        <>
                                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                            অবস্থান খোঁজা হচ্ছে...
                                        </>
                                    ) : (
                                        <>
                                            <span>📍</span> আমার অবস্থান শনাক্ত করুন
                                        </>
                                    )}
                                </button>
                                {error && <p className="text-red-500 mt-4 bg-red-50 inline-block px-4 py-2 rounded-lg">{error}</p>}
                            </div>
                        ) : (
                            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-emerald-50 p-4 rounded-xl mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-emerald-100 p-2 rounded-full text-emerald-700">✓</div>
                                    <div className="text-left">
                                        <p className="text-sm text-emerald-800 font-medium">আপনার অবস্থান শনাক্ত হয়েছে</p>
                                        <p className="text-xs text-emerald-600">{mosques.length} টি মসজিদ পাওয়া গেছে</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLocateMe}
                                    className="text-sm text-emerald-700 hover:text-emerald-800 underline"
                                >
                                    অবস্থান আপডেট করুন
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Map & List */}
                    {userLocation && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <MosqueMap userLocation={userLocation} mosques={mosques} />

                            <div className="border-t pt-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                    <span className="text-emerald-600">🕌</span> নিকটবর্তী মসজিদের তালিকা
                                </h2>
                                <MosqueList mosques={mosques} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
