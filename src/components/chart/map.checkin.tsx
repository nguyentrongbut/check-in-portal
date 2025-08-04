'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';
import { defaultIcon } from '@/utils/leaflet-icon';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {TChartMapCheckin} from "@/types/data";


export default function MapCheckin({mapCheckins} : {mapCheckins: TChartMapCheckin[]}) {
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
                    {mapCheckins.map((location, index) => (
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
