'use client';

import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export function InstallPrompt() {
    const [isInstallable, setIsInstallable] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        // Check if user dismissed prompt previously
        if (typeof window !== 'undefined') {
            const dismissed = localStorage.getItem('pwa_prompt_dismissed');
            if (dismissed === 'true') {
                setIsDismissed(true);
            }
        }

        // Detect if app is already running in standalone/installed mode
        const checkStandalone = () => {
            const isInstalled = window.matchMedia('(display-mode: standalone)').matches
                || (window.navigator as any).standalone
                || document.referrer.includes('android-app://');
            setIsStandalone(isInstalled);
        };
        checkStandalone();

        // Detect iOS (iOS doesn't support beforeinstallprompt)
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
        setIsIOS(isIosDevice);

        // Listen for the install prompt event (Android/Chrome/Edge)
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setIsInstallable(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        // Listen for successful installation
        window.addEventListener('appinstalled', () => {
            setIsInstallable(false);
            setIsStandalone(true);
        });

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            setIsInstallable(false);
        }
        setDeferredPrompt(null);
    };

    const handleDismiss = () => {
        setIsDismissed(true);
        setIsInstallable(false); // Hide the Android prompt
        localStorage.setItem('pwa_prompt_dismissed', 'true');
    };

    // Do not show if already installed or permanently dismissed
    if (isStandalone || isDismissed) return null;

    // Show Android/Chrome Install Button
    if (isInstallable) {
        return (
            <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-green-200 shadow-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in-up">
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="bg-green-100 p-2 rounded-xl">
                        <span className="text-2xl">🌙</span>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800">নূর এ রমজান অ্যাপ</h4>
                        <p className="text-sm text-gray-600">দ্রুত ব্যবহারের জন্য ইন্সটল করুন</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                    <button
                        onClick={handleDismiss}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-full"
                    >
                        <X size={20} />
                    </button>
                    <button
                        onClick={handleInstallClick}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-bold transition-colors shadow-md shadow-green-200"
                    >
                        <Download size={18} />
                        Install App
                    </button>
                </div>
            </div>
        );
    }

    // Show iOS Guide (Custom fallback since iOS blocks the native prompt event)
    if (isIOS) {
        return (
            <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-green-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-4 flex flex-col animate-fade-in-up pb-safe">
                <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-xl">
                            <span className="text-2xl">🌙</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800">অ্যাপ হিসেবে ব্যবহার করুন</h4>
                            <p className="text-xs text-gray-600">আইফোনে (iPhone) ইন্সটল করতে:</p>
                        </div>
                    </div>
                    <button
                        onClick={handleDismiss}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-full"
                    >
                        <X size={20} />
                    </button>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-sm text-green-800 flex items-center justify-center gap-2">
                    Tap <span className="bg-white px-2 py-1 rounded border shadow-sm text-blue-500 font-bold">Share ➦</span> then <span className="font-bold">&quot;Add to Home Screen&quot; ➕</span>
                </div>
            </div>
        );
    }

    return null;
}
