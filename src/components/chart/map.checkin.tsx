'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';
import { defaultIcon } from '@/utils/leaflet-icon';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

type CampaignLocation = {
    campaignName: string;
    latitude: number;
    longitude: number;
    checkinCount: number;
};

const data: CampaignLocation[] = [
    { campaignName: 'Highlands', latitude: 21.017, longitude: 105.8, checkinCount: 120 },
    { campaignName: 'TocoToco', latitude: 21.027, longitude: 105.81, checkinCount: 80 },
    { campaignName: 'Gong Cha', latitude: 21.031, longitude: 105.83, checkinCount: 95 },
];

export default function MapCheckin() {
    const center: LatLngExpression = [21.02, 105.81];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Check-in Map</CardTitle>
                <CardDescription>Visualize campaign performance by location</CardDescription>
            </CardHeader>
            <CardContent>
                <MapContainer center={center} zoom={13} style={{ height: 400, width: '100%' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {data.map((location, index) => (
                        <Marker
                            key={index}
                            position={[location.latitude, location.longitude] as LatLngExpression}
                            icon={defaultIcon}
                        >
                            <Popup>
                                <strong>{location.campaignName}</strong><br />
                                Check-ins: {location.checkinCount}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </CardContent>
        </Card>

    );
}
