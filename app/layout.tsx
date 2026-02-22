import type { Metadata } from 'next';
import { Inter, Hind_Siliguri, Amiri } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/navigation/Header';
import { InstallPrompt } from '@/components/pwa/InstallPrompt';
import { JsonLd, websiteSchema, organizationSchema } from '@/components/seo/JsonLd';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const hindSiliguri = Hind_Siliguri({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['bengali'],
    variable: '--font-bengali'
});
const amiri = Amiri({
    weight: ['400', '700'],
    subsets: ['arabic'],
    variable: '--font-arabic'
});

export const metadata: Metadata = {
    metadataBase: new URL('https://noor-e-ramadan-bd.vercel.app'),
    title: {
        default: 'Noor e Ramadan - নূর এ রমজান',
        template: '%s | Noor e Ramadan'
    },
    description: 'Your Digital Islamic Companion - Quran, Prayer Times, Hadith, Tasbih & more | আপনার ডিজিটাল ইসলামিক সঙ্গী',
    keywords: ['Islamic App', 'Ramadan Calendar', 'Quran Online', 'Prayer Times Bangladesh', 'Qibla Direction', 'Hadith Bangla', 'Namaz Timing'],
    authors: [{ name: 'Noor e Ramadan Team' }],
    manifest: '/manifest.json',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'black-translucent',
        title: 'Noor e Ramadan',
    },
    formatDetection: {
        telephone: false,
    },
    openGraph: {
        type: 'website',
        title: 'Noor e Ramadan - নূর এ রমজান',
        description: 'Your Digital Islamic Companion for Ramadan',
        siteName: 'Noor e Ramadan',
        url: 'https://noor-e-ramadan-bd.vercel.app',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Noor e Ramadan - নূর এ রমজান',
        description: 'Your Digital Islamic Companion for Ramadan',
    },
    alternates: {
        canonical: '/',
        languages: {
            'bn': '/bn',
            'en': '/en',
        }
    }
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="bn">
            <head>
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#059669" />
                <link rel="apple-touch-icon" href="/icon-192x192.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
                <meta name="mobile-web-app-capable" content="yes" />
            </head>
            <body className={`${inter.variable} ${hindSiliguri.variable} ${amiri.variable} antialiased`}>
                <div className="min-h-screen">
                    {/* Header with Back Button */}
                    <Header />

                    {/* Main Content */}
                    <main>{children}</main>
                </div>

                {/* Global PWA Install Prompt */}
                <InstallPrompt />

                {/* Global SEO Schemas */}
                <JsonLd data={websiteSchema} />
                <JsonLd data={organizationSchema} />
            </body>
        </html>
    );
}
