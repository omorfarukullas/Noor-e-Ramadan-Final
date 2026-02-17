import { NextResponse } from 'next/server';
import { getQiblaDirection } from '@/lib/prayer-times';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        const lat = searchParams.get('lat');
        const lng = searchParams.get('lng');

        if (!lat || !lng) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Latitude and longitude are required'
                },
                { status: 400 }
            );
        }

        const direction = await getQiblaDirection(
            parseFloat(lat),
            parseFloat(lng)
        );

        return NextResponse.json({
            success: true,
            data: {
                direction,
                latitude: parseFloat(lat),
                longitude: parseFloat(lng)
            }
        });

    } catch (error) {
        console.error('Qibla API error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch Qibla direction'
            },
            { status: 500 }
        );
    }
}
