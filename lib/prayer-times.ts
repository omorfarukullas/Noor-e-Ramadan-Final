// Prayer times API utilities using Aladhan API

export interface PrayerTimings {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
    Midnight: string;
}

export interface HijriDate {
    date: string;
    format: string;
    day: string;
    month: {
        number: number;
        en: string;
        ar: string;
    };
    year: string;
}

export interface PrayerTimesResponse {
    timings: PrayerTimings;
    date: {
        readable: string;
        hijri: HijriDate;
    };
}

// Get prayer times by coordinates
export async function getPrayerTimesByCoordinates(
    latitude: number,
    longitude: number,
    method: number = 1, // 1 = Karachi (best for Bangladesh)
    madhab: number = 1  // 1 = Hanafi (default for Bangladesh)
): Promise<PrayerTimesResponse> {
    const today = new Date();
    const timestamp = Math.floor(today.getTime() / 1000);

    const url = `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${latitude}&longitude=${longitude}&method=${method}&school=${madhab}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch prayer times');
    }

    const data = await response.json();
    return data.data;
}

// Get prayer times by city
export async function getPrayerTimesByCity(
    city: string,
    country: string = 'Bangladesh',
    method: number = 1,
    madhab: number = 1
): Promise<PrayerTimesResponse> {
    const today = new Date();
    const timestamp = Math.floor(today.getTime() / 1000);

    const url = `https://api.aladhan.com/v1/timingsByCity/${timestamp}?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${method}&school=${madhab}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch prayer times');
    }

    const data = await response.json();
    return data.data;
}

// Get Qibla direction
export async function getQiblaDirection(
    latitude: number,
    longitude: number
): Promise<number> {
    const url = `https://api.aladhan.com/v1/qibla/${latitude}/${longitude}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch Qibla direction');
    }

    const data = await response.json();
    return data.data.direction; // Returns direction in degrees
}

// Get monthly prayer times calendar
export async function getMonthlyPrayerTimes(
    latitude: number,
    longitude: number,
    month: number,
    year: number,
    method: number = 1,
    madhab: number = 1
): Promise<PrayerTimesResponse[]> {
    const url = `https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${latitude}&longitude=${longitude}&method=${method}&school=${madhab}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch monthly prayer times');
    }

    const data = await response.json();
    return data.data;
}

// Calculate time until next prayer
export function getTimeUntilNextPrayer(timings: PrayerTimings): {
    nextPrayer: string;
    timeUntil: string;
    minutesUntil: number;
} {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const prayers = [
        { name: 'Fajr', time: timings.Fajr },
        { name: 'Dhuhr', time: timings.Dhuhr },
        { name: 'Asr', time: timings.Asr },
        { name: 'Maghrib', time: timings.Maghrib },
        { name: 'Isha', time: timings.Isha },
    ];

    // Convert prayer times to minutes
    const prayerMinutes = prayers.map(prayer => {
        const [hours, minutes] = prayer.time.split(':').map(Number);
        return {
            name: prayer.name,
            minutes: hours * 60 + minutes
        };
    });

    // Find next prayer
    let nextPrayer = prayerMinutes.find(prayer => prayer.minutes > currentTime);

    // If no prayer found today, next is Fajr tomorrow
    if (!nextPrayer) {
        nextPrayer = prayerMinutes[0];
        const minutesUntil = (24 * 60 - currentTime) + nextPrayer.minutes;
        return {
            nextPrayer: nextPrayer.name,
            timeUntil: formatTimeUntil(minutesUntil),
            minutesUntil
        };
    }

    const minutesUntil = nextPrayer.minutes - currentTime;
    return {
        nextPrayer: nextPrayer.name,
        timeUntil: formatTimeUntil(minutesUntil),
        minutesUntil
    };
}

function formatTimeUntil(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours > 0) {
        return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
}

// Format time to 12-hour format
export function formatPrayerTime(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}
