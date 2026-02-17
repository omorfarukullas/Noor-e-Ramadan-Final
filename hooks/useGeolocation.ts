// Geolocation hook for getting user's current position

import { useState, useEffect } from 'react';

export interface GeolocationState {
    latitude: number | null;
    longitude: number | null;
    accuracy: number | null;
    error: string | null;
    loading: boolean;
}

export interface GeolocationOptions {
    enableHighAccuracy?: boolean;
    timeout?: number;
    maximumAge?: number;
}

export function useGeolocation(options: GeolocationOptions = {}) {
    const [state, setState] = useState<GeolocationState>({
        latitude: null,
        longitude: null,
        accuracy: null,
        error: null,
        loading: true,
    });

    useEffect(() => {
        if (!navigator.geolocation) {
            setState({
                latitude: null,
                longitude: null,
                accuracy: null,
                error: 'Geolocation is not supported by your browser',
                loading: false,
            });
            return;
        }

        const onSuccess = (position: GeolocationPosition) => {
            setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
                error: null,
                loading: false,
            });
        };

        const onError = (error: GeolocationPositionError) => {
            let errorMessage = 'Failed to get location';

            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = 'Location permission denied. Please enable location access.';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = 'Location information is unavailable.';
                    break;
                case error.TIMEOUT:
                    errorMessage = 'Location request timed out.';
                    break;
            }

            setState({
                latitude: null,
                longitude: null,
                accuracy: null,
                error: errorMessage,
                loading: false,
            });
        };

        const geoOptions: PositionOptions = {
            enableHighAccuracy: options.enableHighAccuracy ?? true,
            timeout: options.timeout ?? 10000,
            maximumAge: options.maximumAge ?? 0,
        };

        navigator.geolocation.getCurrentPosition(onSuccess, onError, geoOptions);
    }, [options.enableHighAccuracy, options.timeout, options.maximumAge]);

    return state;
}

// Get city name from coordinates using reverse geocoding
export async function getCityFromCoordinates(
    latitude: number,
    longitude: number
): Promise<string> {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=bn`,
            {
                headers: {
                    'User-Agent': 'NoorERamadan/1.0 (Ramadan companion app for Bangladesh)',
                },
            }
        );

        const data = await response.json();
        return data.address?.city || data.address?.town || data.address?.village || 'Dhaka';
    } catch (error) {
        console.error('Failed to get city name:', error);
        return 'Dhaka';
    }
}

// Calculate distance between two coordinates (Haversine formula)
export function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}
