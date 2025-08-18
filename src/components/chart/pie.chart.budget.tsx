'use client'

import {PieChart, Pie, Cell, Tooltip, ResponsiveContainer} from 'recharts';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {TChartCampaignPoint} from "@/types/data";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export default function PieChartBudget({campaignPoints} : {campaignPoints: TChartCampaignPoint[]}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Point Allocation</CardTitle>
                <CardDescription>Distribution of used points across campaigns</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={campaignPoints}
                            dataKey="usedPoint"
                            nameKey="campaignName"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                        >
                            {campaignPoints?.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
