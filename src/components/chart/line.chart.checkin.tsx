'use client'

import {LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {TChartDailyCheckin} from "@/types/data";

export default function LineChartCheckin({dailyCheckins} : {dailyCheckins: TChartDailyCheckin[]}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Check-in Trend</CardTitle>
                <CardDescription>Daily check-in performance across all campaigns</CardDescription>
            </CardHeader>
            <CardContent className='-ml-8'>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dailyCheckins}>
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
