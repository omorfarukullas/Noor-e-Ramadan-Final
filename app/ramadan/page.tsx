import { Metadata } from 'next';
import RamadanContainer from '@/components/ramadan/RamadanContainer';

export const metadata: Metadata = {
    title: 'রমজান ক্যালেন্ডার ২০২৬ | নূর-ই-রমজান',
    description: 'বাংলাদেশের ৬৪ জেলার সেহরি ও ইফতারের সময়সূচি, রমজানের ফজিলত, দোয়া ও আমল।',
};

export default function RamadanPage() {
    return (
        <main>
            <RamadanContainer />
        </main>
    );
}
