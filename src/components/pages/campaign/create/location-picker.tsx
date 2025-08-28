'use client';

import {MapContainer, TileLayer, Marker, useMapEvents} from 'react-leaflet';
import {Map} from 'leaflet';
import React, {useState, useRef, useEffect} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {defaultIcon} from '@/utils/leaflet-icon';
import {Loader2, MapPin} from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import {FormLabel, FormMessage} from "@/components/ui/form";

type LocationValue = {
    lat: number;
    lng: number;
} | null;

type Props = {
    value: LocationValue;
    onChange?: (value: LocationValue) => void;
    placeholder?: string;
    view?: boolean;
};

//  click map
function ClickHandler({onSelect}: { onSelect: (lat: number, lng: number) => void }) {
    useMapEvents({
        click(e) {
            onSelect(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
}

export default function LocationPicker({
                                           value,
                                           onChange,
                                           placeholder = "Enter location or address",
                                           view = false,
                                       }: Props) {

    const [position, setPosition] = useState<[number, number]>([21.0285, 105.8542]); // default Hanoi
    const [inputValue, setInputValue] = useState('');
    const [addressLabel, setAddressLabel] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const mapRef = useRef<Map | null>(null);
    const initialCenteredRef = useRef(false);

    // reverse geocode để lấy địa chỉ text
    const fetchAddressLabel = async (lat: number, lng: number) => {
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            if (!res.ok) throw new Error("Failed to fetch address");
            const data = await res.json();
            setAddressLabel(data.display_name || null);
        } catch (err) {
            console.error("Reverse geocoding error:", err);
            setAddressLabel(null);
        }
    };

    // search when Enter
    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter' || !inputValue.trim()) return;

        setError(null);
        setIsLoading(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                    inputValue
                )}&limit=1`
            );
            if (!response.ok) throw new Error('Geocoding service unavailable');
            const data = await response.json();

            if (data && data.length > 0) {
                const lat = parseFloat(data[0].lat);
                const lng = parseFloat(data[0].lon);

                setPosition([lat, lng]);
                onChange?.({lat, lng});
                fetchAddressLabel(lat, lng);
                mapRef.current?.setView([lat, lng], 15);
            } else {
                setError('Location not found. Try another keyword.');
            }
        } catch (err) {
            console.error('Geocoding error:', err);
            setError('Unable to search location. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // btn get current position
    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser.');
            return;
        }

        setIsLoading(true);
        setError(null);

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const {latitude, longitude} = pos.coords;

                setPosition([latitude, longitude]);
                onChange?.({lat: latitude, lng: longitude});
                fetchAddressLabel(latitude, longitude);
                mapRef.current?.setView([latitude, longitude], 15);
                setIsLoading(false);
            },
            (err) => {
                console.error('Geolocation error:', err);
                setError('Unable to retrieve your location.');
                setIsLoading(false);
            },
            {enableHighAccuracy: true, timeout: 10000, maximumAge: 60000}
        );
    };

    // Click map → update position
    const handleMapClick = async (lat: number, lng: number) => {
        setIsLoading(true);
        setPosition([lat, lng]);
        onChange?.({lat, lng});

        try {
            await fetchAddressLabel(lat, lng);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    // lần đầu nếu có value thì hiển thị
    useEffect(() => {
        if (value) {
            setPosition([value.lat, value.lng]);
            fetchAddressLabel(value.lat, value.lng);
        }
    }, [value]);

    // center map
    useEffect(() => {
        if (mapRef.current && position) {
            if (view) {
                mapRef.current.setView(position, mapRef.current.getZoom(), { animate: false });
            } else if (!view && !initialCenteredRef.current) {
                mapRef.current.setView(position, mapRef.current.getZoom(), { animate: false });
                initialCenteredRef.current = true; // đánh dấu đã căn giữa lần đầu
            }
        }
    }, [view, position]);

    return (
        <div className="space-y-3">
            {!view && (
                <div className="flex gap-2">
                    <div className="relative w-full">
                        <Input
                            placeholder={placeholder}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className={error ? "border-red-500 pr-8" : "pr-8"}
                            disabled={isLoading}
                        />
                        <FormMessage className='min-h-0'/>
                        {isLoading && (
                            <Loader2 className="absolute right-2 top-1/2 -translate-y-1/2 size-4 animate-spin text-primary"/>
                        )}
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={getCurrentLocation}
                        disabled={isLoading}
                        title="Use current location"
                    >
                        <MapPin className="h-4 w-4"/>
                    </Button>
                </div>
            )}

            {error && <p className="text-sm text-red-500">{error}</p>}

            {
                !view && (
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <FormLabel className="text-sm mb-1">Latitude</FormLabel>
                            <Input
                                value={position[0]}
                                disabled
                                className="bg-gray-50"
                                placeholder="Latitude"
                            />
                        </div>
                        <div className="flex-1">
                            <FormLabel className="text-sm mb-1">Longitude</FormLabel>
                            <Input
                                value={position[1]}
                                disabled
                                className="bg-gray-50"
                                placeholder="Longitude"
                            />
                        </div>
                    </div>
                )
            }

            <p className="text-sm text-muted-foreground mt-1 h-5">
                {isLoading ? (
                    <span>⏳ Loading...</span>
                ) : (
                    addressLabel && <span>📍 {addressLabel}</span>
                )}
            </p>

            <div className="rounded-lg border overflow-hidden shadow-sm" style={{height: '300px'}}>
                <MapContainer
                    center={position}
                    zoom={13}
                    style={{height: '100%', width: '100%'}}
                    ref={mapRef}
                    className="z-0"
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={position} icon={defaultIcon}/>
                    {!view && <ClickHandler onSelect={handleMapClick} />}
                </MapContainer>
            </div>

            {!view && (
                <div className="text-sm text-muted-foreground">
                    <p>• Enter an address in the search box and press <b>Enter</b> to find it.</p>
                    <p>• Click the map button <b>📍</b> to detect your current location.</p>
                    <p>• Or click directly on the map to move the marker.</p>
                </div>
            )}
        </div>
    );
}
