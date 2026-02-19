'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

// Maps each path pattern to its direct parent page
function getParentPath(pathname: string): string {
    // Hadith sub-pages → /hadith
    if (pathname.startsWith('/hadith/')) return '/hadith';
    // Duas sub-pages → /duas
    if (pathname.startsWith('/duas/')) return '/duas';
    // Quran surah page → /quran
    if (pathname.startsWith('/quran/')) return '/quran';
    // All top-level pages → home
    return '/';
}

import NotificationManager from '../notifications/NotificationManager';

// ... imports remain the same

export function Header() {
    const router = useRouter();
    const pathname = usePathname();
    const isHome = pathname === '/';

    const handleBack = () => {
        const parent = getParentPath(pathname);
        router.push(parent);
    };

    return (
        <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center">
                    {!isHome && (
                        <button
                            onClick={handleBack}
                            className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                    )}
                    <Link href="/" className="text-xl font-bold text-primary-700 dark:text-primary-400 font-bengali">
                        নূর এ রমজান
                    </Link>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <NotificationManager />
                </div>
            </div>
        </header>
    );
}
