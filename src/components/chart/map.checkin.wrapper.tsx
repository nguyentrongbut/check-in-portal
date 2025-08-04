'use client'

import dynamic from 'next/dynamic'
import {TChartMapCheckin} from "@/types/data";

const MapCheckin = dynamic(() => import('@/components/chart/map.checkin'), {
    ssr: false
})

const MapCheckinWrapper = ({mapCheckins} : {mapCheckins: TChartMapCheckin[]}) => {
    return (
        <MapCheckin mapCheckins={mapCheckins}/>
    )
}

export default MapCheckinWrapper