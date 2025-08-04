'use client'

import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {TChartCampaignCheckin} from "@/types/data";

export default function BarChartCampaign({campaignCheckins} : {campaignCheckins: TChartCampaignCheckin[]}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Campaign Engagement</CardTitle>
                <CardDescription>Total check-ins per campaign</CardDescription>
            </CardHeader>
            <CardContent className='-ml-10'>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={campaignCheckins}>
                        <XAxis dataKey="campaignName"/>
                        <YAxis/>
                        <Tooltip/>
                        <Bar
                            dataKey="checkinCount"
                            fill="var(--primary)"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
