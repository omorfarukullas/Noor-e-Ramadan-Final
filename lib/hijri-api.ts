export interface AladhanDate {
    gregorian: {
        date: string;
        format: string;
        day: string;
        weekday: { en: string };
        month: { number: number; en: string };
        year: string;
        designation: { abbreviated: string; expanded: string };
    };
    hijri: {
        date: string;
        format: string;
        day: string;
        weekday: { en: string; ar: string };
        month: { number: number; en: string; ar: string };
        year: string;
        designation: { abbreviated: string; expanded: string };
        holidays: string[];
    };
}

export interface HijriCalendarResponse {
    code: number;
    status: string;
    data: AladhanDate[];
}

// Bangladesh is typically 1 day behind Saudi/Global calculation.
// API gave 2nd Ramadan for 19th Feb, user wants 1st. So we manually shift dates by -1.
const ADJUSTMENT = -1;

async function fetchRawMonth(year: number, month: number): Promise<AladhanDate[]> {
    try {
        const response = await fetch(`https://api.aladhan.com/v1/gToHCalendar/${month}/${year}`, {
            next: { revalidate: 86400 }
        });
        if (!response.ok) throw new Error('Failed');
        const json: HijriCalendarResponse = await response.json();
        return json.data;
    } catch (e) {
        console.error(e);
        return [];
    }
}

export async function getHijriMonth(year: number, month: number): Promise<AladhanDate[]> {
    const currentData = await fetchRawMonth(year, month);



    try {
        let prevData: AladhanDate[] = [];
        let nextData: AladhanDate[] = [];

        if (ADJUSTMENT < 0) {
            // Need previous month data to pull from
            const prevM = month === 1 ? 12 : month - 1;
            const prevY = month === 1 ? year - 1 : year;
            prevData = await fetchRawMonth(prevY, prevM);
        } else {
            // Need next month data (if ADJUSTMENT > 0)
            const nextM = month === 12 ? 1 : month + 1;
            const nextY = month === 12 ? year + 1 : year;
            nextData = await fetchRawMonth(nextY, nextM);
        }

        // Apply Shift
        // For each day in CurrentMonth, replace its Hijri object with the one from (Index + Adjustment)

        const adjustedData = currentData.map((day, i) => {
            let sourceHijri: AladhanDate['hijri'] | undefined;
            const targetIndex = i + ADJUSTMENT;

            if (targetIndex < 0) {
                // Pull from end of prevData
                // e.g. target -1 corresponds to prevData[len-1]
                if (prevData.length > 0) {
                    sourceHijri = prevData[prevData.length + targetIndex]?.hijri;
                }
            } else if (targetIndex >= currentData.length) {
                // Pull from start of nextData
                if (nextData.length > 0) {
                    sourceHijri = nextData[targetIndex - currentData.length]?.hijri;
                }
            } else {
                // Pull from currentData
                sourceHijri = currentData[targetIndex]?.hijri;
            }

            // Fallback if boundary fetch failed: use original
            if (!sourceHijri) sourceHijri = day.hijri;

            return {
                ...day,
                hijri: sourceHijri
            };
        });

        return adjustedData;

    } catch (error) {
        console.error("Adjustment failed", error);
        return currentData;
    }
}

export async function getHijriDate(date: Date): Promise<AladhanDate['hijri'] | null> {
    try {
        // Shift the date object itself
        const targetDate = new Date(date);
        targetDate.setDate(date.getDate() + ADJUSTMENT);

        const d = targetDate.getDate().toString().padStart(2, '0');
        const m = (targetDate.getMonth() + 1).toString().padStart(2, '0');
        const y = targetDate.getFullYear();

        const response = await fetch(`https://api.aladhan.com/v1/gToH/${d}-${m}-${y}`);
        const data = await response.json();

        if (data.code === 200) {
            return data.data.hijri;
        }
        return null;
    } catch (e) {
        console.error('Error fetching Hijri Date:', e);
        return null;
    }
}
