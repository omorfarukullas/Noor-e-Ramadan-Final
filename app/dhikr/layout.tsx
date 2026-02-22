import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'ডিজিটাল তাসবিহ | Online Tasbih Counter',
    description: 'আপনার প্রতিদিনের জিকির এবং দোয়া হিসাব রাখার জন্য ডিজিটাল তাসবিহ কাউন্টার। Digital Tasbih and Dhikr counter to track your daily Zikr.',
    keywords: ['Online Tasbih counter', 'Digital Dhikr App', 'Tasbeeh counter online', 'Islamic Zikr track', 'Tasbih App BD'],
};

export default function DhikrLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
