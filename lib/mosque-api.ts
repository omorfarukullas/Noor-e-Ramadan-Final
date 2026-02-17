import { calculateDistance, calculateBearing } from './geo-utils';

export interface Mosque {
    id: number;
    name: string;
    lat: number;
    lng: number;
    distance: number;
    bearing: string;
}

export async function fetchNearbyMosques(lat: number, lng: number, radius: number = 5000): Promise<Mosque[]> {
    const query = `
    [out:json];
    node["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${lat},${lng});
    out body;
  `;

    try {
        const response = await fetch('https://overpass-api.de/api/interpreter', {
            method: 'POST',
            body: query,
        });

        if (!response.ok) {
            throw new Error('Failed to fetch mosques');
        }

        const data = await response.json();

        return data.elements.map((element: any) => {
            const distance = calculateDistance(lat, lng, element.lat, element.lon);
            const bearing = calculateBearing(lat, lng, element.lat, element.lon);

            return {
                id: element.id,
                name: element.tags.name || element.tags['name:bn'] || element.tags['name:en'] || 'নামবিহীন মসজিদ',
                lat: element.lat,
                lng: element.lon,
                distance,
                bearing
            };
        }).sort((a: Mosque, b: Mosque) => a.distance - b.distance);

    } catch (error) {
        console.error('Error fetching mosques:', error);
        return [];
    }
}
