'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/db';
import { getSurahById } from '@/lib/quran-api';
import { SurahDetail } from '@/types/quran';
import { Download, Check, Loader2, WifiOff } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';

interface DownloadButtonProps {
    surahId: number;
    initialData?: SurahDetail; // Optional: If we want to save what's already loaded
}

export default function DownloadButton({ surahId, initialData }: DownloadButtonProps) {
    const [downloading, setDownloading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Check if surah is already in DB
    const existingSurah = useLiveQuery(
        () => db.surahs.get(surahId),
        [surahId]
    );

    const handleDownload = async () => {
        setDownloading(true);
        setError(null);
        try {
            // Use existing data if valid, otherwise fetch
            let dataToSave = initialData;

            if (!dataToSave) {
                // Note: getSurahById might fail if offline and not in cache
                dataToSave = await getSurahById(surahId);
            }

            await db.surahs.put(dataToSave);
        } catch (err) {
            console.error('Download failed:', err);
            setError('Failed to download');
        } finally {
            setDownloading(false);
        }
    };

    if (existingSurah) {
        return (
            <button
                disabled
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-emerald-800 bg-white/90 backdrop-blur-sm rounded-lg cursor-default shadow-sm"
                title="Available Offline"
            >
                <Check className="w-4 h-4" />
                <span>Downloaded</span>
            </button>
        );
    }

    return (
        <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-emerald-900 bg-white hover:bg-emerald-50 rounded-lg transition-all shadow-sm hover:shadow-md"
            title="Download for Offline Reading"
        >
            {downloading ? (
                <>
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                    <span>Saving...</span>
                </>
            ) : error ? (
                <>
                    <WifiOff className="w-4 h-4 text-red-500" />
                    <span className="text-red-500">Retry</span>
                </>
            ) : (
                <>
                    <Download className="w-4 h-4 text-emerald-700" />
                    <span>Download</span>
                </>
            )}
        </button>
    );
}
