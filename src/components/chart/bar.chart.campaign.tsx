'use client'

import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

const data = [
    {campaignName: 'Highlands', checkinCount: 120},
    {campaignName: 'TocoToco', checkinCount: 80},
    {campaignName: 'Gong Cha', checkinCount: 95},
];

export default function BarChartCampaign() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Campaign Engagement</CardTitle>
                <CardDescription>Total check-ins per campaign</CardDescription>
            </CardHeader>
            <CardContent className='-ml-10'>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
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
