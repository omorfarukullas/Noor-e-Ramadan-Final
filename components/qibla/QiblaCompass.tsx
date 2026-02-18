'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { calculateQibla } from '@/lib/qibla-utils';
import { cn } from '@/lib/utils';
import { Compass, Navigation, AlertCircle, Loader2 } from 'lucide-react';

export default function QiblaCompass() {
    const [heading, setHeading] = useState<number | null>(null);
    const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [calibrationNeeded, setCalibrationNeeded] = useState<boolean>(true);

    // Get Location and Calculate Qibla Direction
    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const qibla = calculateQibla(latitude, longitude);
                setQiblaDirection(qibla);
                setLoading(false);
            },
            (err) => {
                setError('Location access denied. Please enable location services.');
                setLoading(false);
            }
        );
    }, []);

    // Handle Device Orientation
    const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
        let compassHeading = event.alpha;

        // iOS specific property
        if ((event as any).webkitCompassHeading) {
            compassHeading = (event as any).webkitCompassHeading;
        }

        if (compassHeading !== null) {
            // Invert for rotation logic: we rotate the compass dial opposite to device movement
            setHeading(compassHeading);
            setCalibrationNeeded(false);
        }
    }, []);

    const requestAccess = async () => {
        if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
            try {
                const permission = await (DeviceOrientationEvent as any).requestPermission();
                if (permission === 'granted') {
                    setPermissionGranted(true);
                    window.addEventListener('deviceorientation', handleOrientation);
                } else {
                    setError('Permission to access device orientation was denied');
                }
            } catch (error) {
                setError('Error requesting device orientation permission');
            }
        } else {
            // Non-iOS 13+ devices
            setPermissionGranted(true);
            window.addEventListener('deviceorientation', handleOrientation);
        }
    };

    useEffect(() => {
        // Initial check for non-iOS devices which might not need explicit permission request logic
        // or just start listening if possible.
        // However, best practice for iOS 13+ is to wait for user interaction.
        // We'll auto-start if not iOS 13+
        if (typeof (DeviceOrientationEvent as any).requestPermission !== 'function') {
            setPermissionGranted(true);
            window.addEventListener('deviceorientation', handleOrientation);
        }

        return () => {
            window.removeEventListener('deviceorientation', handleOrientation);
        };
    }, [handleOrientation]);


    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-10 text-center">
                <Loader2 className="animate-spin text-emerald-600 mb-4" size={40} />
                <p className="text-gray-600">অবস্থান নির্ণয় করা হচ্ছে...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-10 text-center bg-red-50 rounded-xl border border-red-100">
                <AlertCircle className="text-red-500 mb-4" size={40} />
                <p className="text-red-700 font-medium">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                    পুনরায় চেষ্টা করুন
                </button>
            </div>
        );
    }

    if (!permissionGranted && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        return (
            <div className="flex flex-col items-center justify-center p-10 text-center bg-emerald-50 rounded-xl border border-emerald-100">
                <Compass className="text-emerald-600 mb-4" size={48} />
                <h3 className="text-xl font-bold text-emerald-900 mb-2 font-bengali">কম্পাস চালু করুন</h3>
                <p className="text-emerald-700 mb-6 font-bengali">
                    কিবলা বা দিক নির্ণয়ের জন্য কম্পাস পারমিশন প্রয়োজন।
                </p>
                <button
                    onClick={requestAccess}
                    className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all font-bengali"
                >
                    অনুমতি দিন Start Compass
                </button>
            </div>
        );
    }

    const rotation = heading ? 360 - heading : 0;
    const kaabaRotation = qiblaDirection !== null ? qiblaDirection : 0;

    return (
        <div className="flex flex-col items-center justify-center py-8">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
                {/* Decoration: Outer Glow */}
                <div className="absolute inset-4 rounded-full bg-emerald-500/20 blur-3xl animate-pulse"></div>

                {/* Compass Container - Rotates with device */}
                <div
                    className="absolute inset-0 w-full h-full transition-transform duration-500 ease-out will-change-transform"
                    style={{ transform: `rotate(${rotation}deg)` }}
                >
                    {/* 1. Outer Gold Bezel */}
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-200 p-2 shadow-[0_0_30px_rgba(234,179,8,0.3)] relative">
                        {/* Inner Bezel Shadow */}
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-600 to-yellow-100 p-1 shadow-inner">
                            {/* 2. Main Dial Face */}
                            <div className="w-full h-full rounded-full bg-[conic-gradient(at_center,_var(--tw-gradient-stops))] from-emerald-900 via-emerald-800 to-emerald-950 shadow-inner relative overflow-hidden border-4 border-yellow-500/50">

                                {/* Background Pattern (Subtle grid/circles) */}
                                <div className="absolute inset-0 opacity-20">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(255,255,255,0.1)_31%,_transparent_32%)] bg-[length:40px_40px]"></div>
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_60%,_rgba(255,255,255,0.05)_61%,_transparent_62%)] bg-[length:100%_100%]"></div>
                                </div>

                                {/* Degree Ticks */}
                                {[...Array(72)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "absolute top-0 left-1/2 -translate-x-1/2 origin-bottom h-[50%] pt-1",
                                            i % 9 === 0 ? "w-1" : "w-0.5 opacity-40"
                                        )}
                                        style={{ transform: `rotate(${i * 5}deg)` }}
                                    >
                                        <div className={cn(
                                            "rounded-full",
                                            i % 9 === 0 ? "h-3 bg-yellow-400 shadow-[0_0_5px_rgba(250,204,21,0.8)]" : "h-1.5 bg-emerald-200"
                                        )}></div>
                                    </div>
                                ))}

                                {/* 3. Qibla Pointer (The Kaaba) */}
                                {qiblaDirection !== null && (
                                    <div
                                        className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-16 origin-center z-20"
                                        style={{ transform: `rotate(${kaabaRotation}deg)` }}
                                    >
                                        {/* The Pointer Arm */}
                                        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
                                            {/* Kaaba Icon */}
                                            <div className="relative group">
                                                <div className="absolute -inset-4 bg-yellow-400/20 rounded-full blur-xl group-hover:bg-yellow-400/40 transition-all duration-500"></div>
                                                <div className="w-14 h-14 bg-black rounded-lg border border-gray-800 relative shadow-[0_0_20px_rgba(0,0,0,0.5)] z-10 flex items-center justify-center">
                                                    {/* Gold Band on Kaaba */}
                                                    <div className="absolute top-3 inset-x-0 h-2 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 opacity-90"></div>
                                                    {/* Door */}
                                                    <div className="absolute bottom-2 right-3 w-3 h-5 bg-yellow-600 rounded-t-sm opacity-60"></div>
                                                </div>
                                                {/* Triangle Pointer below Kaaba */}
                                                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-yellow-400 mx-auto mt-1 filter drop-shadow"></div>
                                            </div>

                                            {/* Beam/Line to Center */}
                                            <div className="w-0.5 h-24 bg-gradient-to-b from-yellow-400/50 to-transparent mt-2"></div>
                                        </div>
                                    </div>
                                )}

                                {/* Center Cap */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-600 to-yellow-300 shadow-[0_4px_10px_rgba(0,0,0,0.3)] z-30 border-2 border-yellow-100 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-emerald-900 rounded-full"></div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Fixed Indicator (User's Forward Direction) */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)] border-2 border-white mb-1"></div>
                    <div className="w-0.5 h-6 bg-gradient-to-b from-red-500 to-transparent"></div>
                </div>
            </div>

            <div className="mt-8 text-center bg-white/80 backdrop-blur rounded-xl p-4 shadow-sm border border-gray-100 max-w-xs mx-auto">
                <div className="flex items-center justify-center gap-2 mb-1">
                    <Navigation className="text-emerald-600" size={20} />
                    <span className="text-gray-600 font-medium font-bengali">কিবলার দিক:</span>
                    <span className="text-xl font-bold text-emerald-700 font-bengali">
                        {Math.round(qiblaDirection || 0)}°
                    </span>
                </div>
                {calibrationNeeded && (
                    <p className="text-xs text-orange-500 mt-2 font-bengali animate-pulse">
                        সঠিক ফলাফলের জন্য ফোনটি ৮ (Eight) আকৃতিতে ঘুরান
                    </p>
                )}
                <p className="text-xs text-gray-400 mt-2 font-bengali">
                    উত্তর দিক থেকে ঘড়ির কাঁটার দিকে হিসাব করা হয়েছে
                </p>
            </div>
        </div>
    );
}
