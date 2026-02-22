import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'আজকের নামাজের সময়সূচী | Prayer Times Bangladesh',
    description: 'বাংলাদেশের যেকোনো স্থানের আজকের ৫ ওয়াক্ত নামাজের সঠিক সময়সূচী। Today\'s Namaz and Prayer times for Dhaka and Bangladesh.',
    keywords: ['Namaz times Bangladesh', 'Prayer times Dhaka', 'Islamic prayer schedule', 'Fajr time today', 'Maghrib time today'],
};

export default function PrayerTimesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
