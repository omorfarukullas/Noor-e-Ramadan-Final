import type { Metadata } from 'next';
import { Inter, Hind_Siliguri, Amiri } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/navigation/Header';
import { InstallPrompt } from '@/components/pwa/InstallPrompt';

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
    title: 'Noor e Ramadan - নূর এ রমজান',
    description: 'Your Digital Islamic Companion - Quran, Prayer Times, Hadith, Tasbih & more | আপনার ডিজিটাল ইসলামিক সঙ্গী',
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
    },
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
            </body>
        </html>
    );
}
