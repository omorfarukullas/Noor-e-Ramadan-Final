export function calculateQibla(latitude: number, longitude: number): number {
    const KAABA_LAT = 21.422487;
    const KAABA_LONG = 39.826206;

    const phiK = (KAABA_LAT * Math.PI) / 180.0;
    const lambdaK = (KAABA_LONG * Math.PI) / 180.0;
    const phi = (latitude * Math.PI) / 180.0;
    const lambda = (longitude * Math.PI) / 180.0;

    const psi = (lambdaK - lambda);

    const y = Math.sin(psi) * Math.cos(phiK);
    const x = Math.cos(phi) * Math.sin(phiK) - Math.sin(phi) * Math.cos(phiK) * Math.cos(psi);

    let bearing = Math.atan2(y, x);
    bearing = (bearing * 180.0) / Math.PI;

    return (bearing + 360) % 360;
}
