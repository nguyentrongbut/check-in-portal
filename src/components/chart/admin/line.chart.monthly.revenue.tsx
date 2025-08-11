'use client'

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {formatCompactCurrency, formatCurrency} from "@/utils/formatHelpers";

const LineChartMonthlyRevenue = ({monthlyRevenueData}: {monthlyRevenueData: any}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Monthly Revenue Trend</CardTitle>
                <CardDescription>Revenue progression throughout the year</CardDescription>
            </CardHeader>
            <CardContent className='-ml-4'>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyRevenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={formatCompactCurrency} />
                        <Tooltip formatter={(value) => [formatCurrency(Number(value)), "Revenue"]} />
                        <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}

export default LineChartMonthlyRevenue