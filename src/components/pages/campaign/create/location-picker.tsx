'use client';

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { LatLngExpression, Map } from 'leaflet';
import { useEffect, useState, useCallback, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { defaultIcon } from '@/utils/leaflet-icon';
import { MapPin, Search } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

type LocationValue = {
    lat: number;
    lng: number;
} | null;

type Props = {
    value: LocationValue;
    onChange: (value: LocationValue) => void;
    placeholder?: string;
};

export default function LocationPicker({
                                           value,
                                           onChange,
                                           placeholder = "Enter address or coordinates (lat,lng)",
                                       }: Props) {
    const [position, setPosition] = useState<LatLngExpression>([21.0285, 105.8542]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mapKey, setMapKey] = useState(0);
    const mapRef = useRef<Map | null>(null);

    const locationToString = useCallback((location: LocationValue): string => {
        if (!location) return '';
        return `${location.lat},${location.lng}`;
    }, []);

    const parseCoordinates = useCallback((coordString: string): LocationValue => {
        if (!coordString.trim()) return null;

        const coords = coordString.split(',').map(coord => parseFloat(coord.trim()));
        if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
            if (coords[0] >= -90 && coords[0] <= 90 && coords[1] >= -180 && coords[1] <= 180) {
                return { lat: coords[0], lng: coords[1] };
            }
        }
        return null;
    }, []);

    useEffect(() => {
        const newInputValue = locationToString(value);
        if (newInputValue && newInputValue !== inputValue) {
            setInputValue(newInputValue);
            if (value) {
                const newPosition: LatLngExpression = [value.lat, value.lng];
                setPosition(newPosition);
                setMapKey(prev => prev + 1);
                setError(null);
            }
        }
    }, [value, inputValue, locationToString]);

    useEffect(() => {
        if (value && !inputValue) {
            setInputValue(locationToString(value));
            setPosition([value.lat, value.lng]);
        }
    }, []);

    const handleMapReady = useCallback(() => {
        setTimeout(() => {
            if (mapRef.current) {
                mapRef.current.invalidateSize();
            }
        }, 100);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        setError(null);

        const coords = parseCoordinates(newValue);
        if (coords) {
            setPosition([coords.lat, coords.lng]);
            setMapKey(prev => prev + 1);
            onChange(coords);
        } else if (newValue.trim() === '') {
            onChange(null);
        }
    };

    const searchAddress = async () => {
        if (!inputValue.trim() || parseCoordinates(inputValue)) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(inputValue)}&limit=1`
            );

            if (!response.ok) throw new Error('Geocoding service unavailable');

            const data = await response.json();

            if (data && data.length > 0) {
                const lat = parseFloat(data[0].lat);
                const lng = parseFloat(data[0].lon);
                const locationObj = { lat, lng };

                setPosition([lat, lng]);
                setInputValue(`${lat},${lng}`);
                setMapKey(prev => prev + 1);
                onChange(locationObj);
            } else {
                setError('Address not found. Please try a different keyword.');
            }
        } catch (err) {
            setError('Unable to search for address. Please enter coordinates manually.');
            console.error('Geocoding error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser.');
            return;
        }

        setIsLoading(true);
        setError(null);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const locationObj = { lat: latitude, lng: longitude };

                setPosition([latitude, longitude]);
                setInputValue(`${latitude},${longitude}`);
                setMapKey(prev => prev + 1);
                onChange(locationObj);
                setIsLoading(false);
            },
            (error) => {
                setError('Unable to retrieve your current location. Please check your permissions.');
                console.error('Geolocation error:', error);
                setIsLoading(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000,
            }
        );
    };

    function LocationMarker() {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                const locationObj = { lat, lng };

                setPosition([lat, lng]);
                setInputValue(`${lat},${lng}`);
                onChange(locationObj);
                setError(null);
            },
        });

        return <Marker position={position} icon={defaultIcon} />;
    }

    return (
        <div className="space-y-3">
            <div className="flex gap-2">
                <div className="flex-1">
                    <Input
                        placeholder={placeholder}
                        value={inputValue}
                        onChange={handleInputChange}
                        className={error ? "border-red-500" : ""}
                    />
                    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
                </div>
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={searchAddress}
                    disabled={isLoading || !inputValue.trim() || !!parseCoordinates(inputValue)}
                    title="Search for address"
                >
                    <Search className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={getCurrentLocation}
                    disabled={isLoading}
                    title="Use current location"
                >
                    <MapPin className="h-4 w-4" />
                </Button>
            </div>

            <div className="rounded-lg border overflow-hidden shadow-sm" style={{ height: '300px' }}>
                <MapContainer
                    center={position}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                    key={mapKey}
                    whenReady={handleMapReady}
                    ref={mapRef}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <LocationMarker />
                </MapContainer>
            </div>

            <div className="text-sm text-muted-foreground">
                <p>• Click on the map to select a location</p>
                <p>• Enter coordinates in the format &quot;latitude,longitude&quot; (e.g., 21.0285,105.8542)</p>
                <p>• Use the search button to find an address</p>
                <p>• Use the location button to detect your current location</p>
            </div>
        </div>
    );
}