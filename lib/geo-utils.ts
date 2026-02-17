export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return Number(d.toFixed(2));
}

export function calculateBearing(lat1: number, lon1: number, lat2: number, lon2: number): string {
    const y = Math.sin(deg2rad(lon2 - lon1)) * Math.cos(deg2rad(lat2));
    const x = Math.cos(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) -
        Math.sin(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(lon2 - lon1));
    const θ = Math.atan2(y, x);
    const bearing = (rad2deg(θ) + 360) % 360;

    const directions = ['উত্তর', 'উত্তর-পূর্ব', 'পূর্ব', 'দক্ষিণ-পূর্ব', 'দক্ষিণ', 'দক্ষিণ-পশ্চিম', 'পশ্চিম', 'উত্তর-পশ্চিম'];
    const index = Math.round(bearing / 45) % 8;
    return directions[index];
}

function deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
}

function rad2deg(rad: number): number {
    return rad * (180 / Math.PI);
}

export function estimateWalkingTime(distanceKm: number): string {
    const speedKmH = 4.5; // Average walking speed
    const timeHours = distanceKm / speedKmH;
    const timeMinutes = Math.round(timeHours * 60);

    if (timeMinutes < 60) {
        return `${timeMinutes} মিনিট`;
    } else {
        const hours = Math.floor(timeMinutes / 60);
        const mins = timeMinutes % 60;
        return `${hours} ঘণ্টা ${mins} মিনিট`;
    }
}
