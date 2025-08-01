'use client'

import dynamic from 'next/dynamic'

const MapCheckin = dynamic(() => import('@/components/chart/map.checkin'), {
    ssr: false
})

const MapCheckinWrapper = () => {
    return (
        <MapCheckin/>
    )
}

export default MapCheckinWrapper