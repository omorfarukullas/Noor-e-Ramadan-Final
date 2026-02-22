import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'দৈনন্দিন দোয়া ও আমল | Daily Islamic Duas',
    description: 'কুরআন ও সুন্নাহ থেকে সংগৃহীত দৈনন্দিন জীবনের প্রয়োজনীয় দোয়া ও আমল। Essential Masnoon Duas for daily life in Bengali and Arabic.',
    keywords: ['Daily Islamic Duas', 'Essential Masnoon Duas', 'Bangla Dua list', 'Morning evening duas', 'Quranic supplications'],
};

export default function DuasLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
