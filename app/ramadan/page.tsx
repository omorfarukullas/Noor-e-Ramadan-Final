import { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import RamadanContainer from '@/components/ramadan/RamadanContainer';

export const metadata: Metadata = {
    title: 'রমজান ক্যালেন্ডার ২০২৬ বাংলাদেশ | Ramadan Calendar 2026 Bangladesh',
    description: 'বাংলাদেশের ৬৪ জেলার সেহরি ও ইফতারের সময়সূচি, রমজানের ফজিলত, দোয়া ও আমল। Daily Sehri and Iftar timings for Dhaka and all BD districts.',
    keywords: ['Ramadan Calendar 2026', 'Sehri time today', 'Iftar time today', 'Ramadan timetable Bangladesh', 'Dhaka Iftar time'],
};

const ramadanEventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Ramadan 2026 - Bangladesh',
    description: 'The holy month of Ramadan observation, fasting, and prayers in Bangladesh.',
    startDate: '2026-02-18', // Estimated Start date
    endDate: '2026-03-19',   // Estimated End date
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
        '@type': 'Place',
        name: 'Bangladesh',
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'BD'
        }
    }
};

export default function RamadanPage() {
    return (
        <main>
            <JsonLd data={ramadanEventSchema} />
            <RamadanContainer />
        </main>
    );
}
