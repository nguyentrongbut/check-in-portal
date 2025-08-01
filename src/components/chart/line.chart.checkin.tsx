'use client'

import {LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

const data = [
    { date: '2025-07-20', checkin: 30 },
    { date: '2025-07-21', checkin: 45 },
    { date: '2025-07-22', checkin: 38 },
    { date: '2025-07-23', checkin: 52 },
    { date: '2025-07-24', checkin: 47 },
];

export default function LineChartCheckin() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Check-in Trend</CardTitle>
                <CardDescription>Daily check-in performance across all campaigns</CardDescription>
            </CardHeader>
            <CardContent className='-ml-8'>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="checkin" stroke="var(--primary)" />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
