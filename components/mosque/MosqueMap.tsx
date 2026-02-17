'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Mosque } from '@/lib/mosque-api';
import { estimateWalkingTime } from '@/lib/geo-utils';

// Fix for default marker icon in Next.js
const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';

// Custom Icons
const userIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const mosqueIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Component to update map center
function MapUpdater({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, 14);
    }, [center, map]);
    return null;
}

interface MosqueMapProps {
    userLocation: [number, number] | null;
    mosques: Mosque[];
}

export default function MosqueMap({ userLocation, mosques }: MosqueMapProps) {
    if (!userLocation) return null;

    return (
        <div className="h-96 w-full rounded-2xl overflow-hidden shadow-lg border-2 border-green-100 z-0">
            <MapContainer
                center={userLocation}
                zoom={14}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapUpdater center={userLocation} />

                {/* User Location */}
                <Marker position={userLocation} icon={userIcon}>
                    <Popup>আপনার অবস্থান</Popup>
                </Marker>
                <Circle
                    center={userLocation}
                    radius={5000}
                    pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.1 }}
                />

                {/* Mosques */}
                {mosques.map((mosque) => (
                    <Marker
                        key={mosque.id}
                        position={[mosque.lat, mosque.lng]}
                        icon={mosqueIcon}
                    >
                        <Popup>
                            <div className="text-center min-w-[150px]">
                                <h3 className="font-bold text-emerald-800 text-base mb-1">{mosque.name}</h3>
                                <div className="space-y-1 mb-2">
                                    <p className="text-xs text-gray-600 bg-gray-100 rounded px-2 py-0.5 inline-block">
                                        দূরত্ব: {mosque.distance} কিমি
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        হাঁটার সময়: {estimateWalkingTime(mosque.distance)}
                                    </p>
                                </div>
                                <a
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${mosque.lat},${mosque.lng}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-emerald-600 text-white px-4 py-1.5 rounded-full text-xs font-bold hover:bg-emerald-700 block w-full transition-colors"
                                >
                                    নেভিগেট করুন
                                </a>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
