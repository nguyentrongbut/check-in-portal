'use client'

import dynamic from 'next/dynamic'

const LocationPicker = dynamic(() => import('@/components/pages/campaign/create/location-picker'), {
    ssr: false
})

type LocationValue = {
    lat: number;
    lng: number;
} | null;

type Props = {
    value: LocationValue;
    onChange: (value: LocationValue) => void;
    placeholder?: string;
};

const LocationPickerWrapper = ({
                                   value,
                                   onChange,
                                   placeholder = "Enter address or coordinates (lat,lng)",
                               }: Props) => {
    return (
        <LocationPicker value={value} onChange={onChange} placeholder={placeholder}/>
    )
}

export default LocationPickerWrapper