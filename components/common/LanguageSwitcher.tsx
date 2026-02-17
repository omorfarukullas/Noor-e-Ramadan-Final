'use client';

import { Globe } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function LanguageSwitcher() {
    const pathname = usePathname();

    const getOtherLocale = () => {
        if (pathname.startsWith('/bn')) {
            return { locale: 'en', label: '🇬🇧 English' };
        }
        return { locale: 'bn', label: '🇧🇩 বাংলা' };
    };

    const { locale, label } = getOtherLocale();
    const newPathname = pathname.replace(/^\/(bn|en)/, `/${locale}`);

    return (
        <Link
            href={newPathname}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-50 hover:bg-primary-100 text-primary-700 transition-colors border border-primary-200"
        >
            <Globe className="w-4 h-4" />
            <span className="font-medium">{label}</span>
        </Link>
    );
}
