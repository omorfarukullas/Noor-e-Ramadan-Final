import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function MorePage({ params }: { params: { locale: string } }) {
    const t = useTranslations('common');

    const menuItems = [
        { icon: '📿', title: t('dhikr.dhikr'), href: `/${params.locale}/dhikr`, status: '🚧' },
        { icon: '🙏', title: t('namaz.namazGuide'), href: `/${params.locale}/namaz`, status: '🚧' },
        { icon: '📅', title: t('calendar.islamicCalendar'), href: `/${params.locale}/calendar`, status: '🚧' },
        { icon: '🧭', title: t('prayer.qibla'), href: `/${params.locale}/qibla`, status: '🚧' },
        { icon: '⚙️', title: t('settings'), href: `/${params.locale}/settings`, status: '🚧' },
    ];

    return (
        <div className="container mx-auto px-4 py-6 max-w-2xl">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                {t('more')}
            </h1>

            <div className="space-y-3">
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="block bg-white dark:bg-gray-800 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 hover:shadow-lg transition-all"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="text-3xl">{item.icon}</div>
                                <div className="font-semibold text-gray-800 dark:text-gray-200">
                                    {item.title}
                                </div>
                            </div>
                            <div className="text-xl">{item.status}</div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* App Info */}
            <div className="mt-8 bg-primary-50 dark:bg-gray-700 rounded-xl p-6 text-center">
                <h2 className="text-xl font-bold text-primary-700 dark:text-primary-400 mb-2 font-arabic">
                    نور رمضان
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {t('appName')}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                    Version 1.0.0 (Beta)
                </p>
            </div>
        </div>
    );
}
