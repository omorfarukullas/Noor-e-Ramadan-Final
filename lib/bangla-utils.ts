export function toBanglaNumber(number: number | string | undefined | null): string {
    if (number === undefined || number === null) return '';
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return number
        .toString()
        .split('')
        .map((digit) => (/\d/.test(digit) ? banglaDigits[parseInt(digit)] : digit))
        .join('');
}

export function toEnglishNumber(number: string): string {
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return number
        .split('')
        .map((digit) => {
            const index = banglaDigits.indexOf(digit);
            return index > -1 ? index : digit;
        })
        .join('');
}
