import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'হাদিস শরীফ | Read Sahih Hadith in Bangla',
    description: 'সহিহ বুখারী, মুসলিম এবং অন্যান্য সুন্নাহ গ্রন্থ থেকে বাংলা হাদিস পড়ুন। Read Sahih Hadith books in Bengali including Bukhari, Muslim, Abu Dawood, Tirmidhi, Nasai, and Ibn Majah.',
    keywords: ['Sahih Hadith Bangla', 'Bukhari Sharif online', 'Muslim Sharif Bangla', 'Bangla Hadith list', 'Al Hadith BD', 'Read Hadith Online'],
};

export default function HadithLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
