'use client'

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {formatCompactCurrency, formatCurrency} from "@/utils/formatHelpers";

const AreaChartDailyRevenue = ({dailyRevenueData} : {dailyRevenueData: any}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Daily Revenue - Current Month</CardTitle>
                <CardDescription>Daily revenue breakdown for December 2024</CardDescription>
            </CardHeader>
            <CardContent  className='-ml-6'>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={dailyRevenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis tickFormatter={formatCompactCurrency} />
                        <Tooltip formatter={(value) => [formatCurrency(Number(value)), "Revenue"]} />
                        <Area type="monotone" dataKey="revenue" stroke="#f59e0b" fill="#fef3c7" />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}

export default AreaChartDailyRevenue