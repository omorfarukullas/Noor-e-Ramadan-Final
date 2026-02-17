import { NextResponse } from 'next/server';
import { getPrayerTimesByCoordinates, getPrayerTimesByCity } from '@/lib/prayer-times';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        // Get parameters
        const lat = searchParams.get('lat');
        const lng = searchParams.get('lng');
        const city = searchParams.get('city');
        const country = searchParams.get('country') || 'Bangladesh';
        const method = parseInt(searchParams.get('method') || '1'); // 1 = Karachi
        const madhab = parseInt(searchParams.get('madhab') || '1'); // 1 = Hanafi

        let prayerData;

        // Get by coordinates if provided, otherwise by city
        if (lat && lng) {
            prayerData = await getPrayerTimesByCoordinates(
                parseFloat(lat),
                parseFloat(lng),
                method,
                madhab
            );
        } else if (city) {
            prayerData = await getPrayerTimesByCity(city, country, method, madhab);
        } else {
            // Default to Dhaka if no location provided
            prayerData = await getPrayerTimesByCity('Dhaka', 'Bangladesh', method, madhab);
        }

        return NextResponse.json({
            success: true,
            data: prayerData
        });

    } catch (error) {
        console.error('Prayer times API error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch prayer times'
            },
            { status: 500 }
        );
    }
}
