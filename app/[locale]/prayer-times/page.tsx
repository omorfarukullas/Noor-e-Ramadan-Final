import { useTranslations } from 'next-intl';
import { PrayerDashboard } from '@/components/prayer/PrayerDashboard';
import { getPrayerTimesByCity } from '@/lib/prayer-times';

export default async function PrayerTimesPage() {
    const t = useTranslations('prayer');

    // Fetch prayer times for Dhaka (default)
    let prayerData;
    try {
        prayerData = await getPrayerTimesByCity('Dhaka', 'Bangladesh');
    } catch (error) {
        console.error('Failed to fetch prayer times:', error);
    }

    return (
        <div className="container mx-auto px-4 py-6 max-w-2xl">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    {t('prayerTimes')}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    📍 Dhaka, Bangladesh
                </p>
            </div>

            {prayerData ? (
                <PrayerDashboard
                    timings={prayerData.timings}
                    hijriDate={prayerData.date.hijri.date}
                />
            ) : (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <p className="text-red-700">Failed to load prayer times. Please check your internet connection.</p>
                </div>
            )}

            {/* Settings placeholder */}
            <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    ⚙️ Settings coming soon: Change location, calculation method, notifications
                </p>
            </div>
        </div>
    );
}
