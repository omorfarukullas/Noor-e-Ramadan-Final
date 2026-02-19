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

    // Safe Client-side Permission Check
    useEffect(() => {
        // Protect against server-side execution where DeviceOrientationEvent is undefined
        if (typeof window !== 'undefined' && typeof DeviceOrientationEvent !== 'undefined') {
            // Check if iOS 13+ permission API exists
            if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
                // We need to ask for permission
                // Don't set permissionGranted=true here.
            } else {
                // Non-iOS 13+ or Android - typically can just listen
                setPermissionGranted(true);
                window.addEventListener('deviceorientation', handleOrientation);
            }
        }

        return () => {
            window.removeEventListener('deviceorientation', handleOrientation);
        };
    }, [handleOrientation]);

    // ... (rest of render)

    // Check for iOS 13+ Permission Requirement state safely
    const [isIOSPermissionRequired, setIsIOSPermissionRequired] = useState(false);
    useEffect(() => {
        if (typeof window !== 'undefined' && typeof DeviceOrientationEvent !== 'undefined'
            && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
            setIsIOSPermissionRequired(true);
        }
    }, []);

    // ...

    // Permission request needed (iOS) - Show explicit button only if we can't auto-start
    if (!permissionGranted && isIOSPermissionRequired && !heading) {
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
            <div className="relative w-80 h-80 md:w-[400px] md:h-[400px]">
                {/* Decoration: Outer Glow that changes color on alignment */}
                <div className={cn(
                    "absolute inset-0 rounded-full blur-3xl transition-all duration-700",
                    isAligned ? "bg-emerald-400/30 scale-110" : "bg-emerald-500/10"
                )}></div>

                {/* Fixed Forward Indicator (Phone Top) */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
                    <div className={cn(
                        "w-5 h-5 rounded-full border-2 border-white shadow-lg transition-colors duration-300",
                        isAligned ? "bg-emerald-500 shadow-emerald-500/50 scale-110" : "bg-red-500 shadow-red-500/50"
                    )}></div>
                    <div className={cn(
                        "w-0.5 h-8 bg-gradient-to-b transition-colors duration-300",
                        isAligned ? "from-emerald-500 to-transparent" : "from-red-500 to-transparent"
                    )}></div>
                </div>

                {/* Compass Container - Rotates with device */}
                <div
                    className="absolute inset-0 w-full h-full transition-transform duration-500 ease-out will-change-transform"
                    style={{ transform: `rotate(${rotation}deg)` }}
                >
                    {/* Outer Bezel */}
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-200 via-gray-400 to-gray-100 p-1.5 shadow-2xl relative">
                        {/* Inner Bezel with Success State Glow */}
                        <div className={cn(
                            "w-full h-full rounded-full p-2 relative transition-all duration-500",
                            isAligned
                                ? "bg-gradient-to-br from-emerald-600 to-teal-700 shadow-[0_0_40px_rgba(16,185,129,0.4)]"
                                : "bg-gradient-to-br from-emerald-900 to-emerald-950"
                        )}>

                            {/* Direction Markers (N, E, S, W) - Fixed on dial */}
                            <div className="absolute inset-4 text-emerald-100/30 font-bold text-lg select-none">
                                <span className="absolute top-0 left-1/2 -translate-x-1/2">N</span>
                                <span className="absolute right-0 top-1/2 -translate-y-1/2">E</span>
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2">S</span>
                                <span className="absolute left-0 top-1/2 -translate-y-1/2">W</span>
                            </div>

                            {/* Degree Ticks */}
                            {[...Array(72)].map((_, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "absolute top-0 left-1/2 -translate-x-1/2 origin-bottom h-[50%] pt-2",
                                        i % 9 === 0 ? "w-1" : "w-0.5 opacity-20"
                                    )}
                                    style={{ transform: `rotate(${i * 5}deg)` }}
                                >
                                    <div className={cn(
                                        "rounded-full transition-colors duration-500",
                                        i % 9 === 0
                                            ? (isAligned ? "h-4 bg-white shadow-sm" : "h-4 bg-emerald-400")
                                            : "h-2 bg-emerald-100"
                                    )}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Qibla Direction Arrow - Rotates with dial + offset */}
                {qiblaDirection !== null && (
                    <div
                        className="absolute inset-0 w-full h-full z-40 transition-transform duration-500 ease-out will-change-transform pointer-events-none"
                        style={{ transform: `rotate(${rotation + kaabaRotation}deg)` }}
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1/2 flex flex-col items-center justify-start pt-6">
                            {/* Modern Arrow Needle */}
                            <div className="relative flex flex-col items-center">
                                {/* Success Glow */}
                                {isAligned && (
                                    <div className="absolute -inset-8 bg-emerald-400/30 rounded-full blur-2xl animate-pulse"></div>
                                )}

                                {/* Arrow Head */}
                                <div className={cn(
                                    "w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[40px] transition-all duration-300 drop-shadow-lg",
                                    isAligned ? "border-b-emerald-400 scale-110" : "border-b-yellow-400"
                                )}></div>

                                {/* Arrow Body */}
                                <div className={cn(
                                    "w-2 h-[85px] -mt-1 bg-gradient-to-b from-yellow-400/80 to-transparent rounded-b-full",
                                    isAligned ? "from-emerald-400/80" : "from-yellow-400/80"
                                )}></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Center Kaaba Logo (Fixed Upright) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
                    <div className={cn(
                        "relative w-20 h-20 bg-black rounded-2xl border-2 border-gray-700 shadow-2xl flex items-center justify-center transition-transform duration-500",
                        isAligned ? "scale-110 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.5)]" : "scale-100"
                    )}>
                        {/* Gold Band */}
                        <div className="absolute top-3 inset-x-0 h-3 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 opacity-90"></div>
                        {/* Door */}
                        <div className="absolute bottom-2 right-4 w-4 h-7 bg-yellow-600 rounded-t-sm opacity-80 border border-yellow-400/30"></div>

                        {/* Center Pivot Dot */}
                        <div className="w-2 h-2 bg-yellow-500 rounded-full z-10 shadow-sm"></div>
                    </div>
                </div>
            </div>

            <div className={cn(
                "mt-8 text-center backdrop-blur-md rounded-2xl p-6 shadow-xl border transition-all duration-500 max-w-xs mx-auto",
                isAligned
                    ? "bg-emerald-600/90 border-emerald-400 text-white translate-y-[-4px]"
                    : "bg-white/90 border-emerald-100 text-gray-800"
            )}>
                <div className="flex items-center justify-center gap-3 mb-2">
                    <Navigation className={cn(
                        "transition-colors",
                        isAligned ? "text-white animate-bounce" : "text-emerald-600"
                    )} size={24} />
                    <span className="font-bold font-bengali text-lg">কিবলার দিক:</span>
                    <span className="text-3xl font-black tabular-nums">
                        {Math.round(qiblaDirection || 0)}°
                    </span>
                </div>

                <p className={cn(
                    "text-sm font-medium font-bengali transition-colors",
                    isAligned ? "text-emerald-50" : "text-emerald-700"
                )}>
                    {loading
                        ? "অবস্থান নির্ণয় করা হচ্ছে..."
                        : isAligned
                            ? "✨ আপনি সঠিক দিকে আছেন (কিবলা) ✨"
                            : "কম্পাসটি কিবলার দিকে ঘোরান"}
                </p>

                {calibrationNeeded && (
                    <p className="text-[10px] uppercase tracking-widest text-orange-400 mt-4 font-bold animate-pulse">
                        Phone Calibration Recommended [8-pattern]
                    </p>
                )}
            </div>
        </div>
    );
}
