'use client'

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {formatCompactCurrency, formatCurrency} from "@/utils/formatHelpers";

const BarChartTopMerchant = ({topMerchantsData} : {topMerchantsData: any}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Top 5 Merchants by Investment</CardTitle>
                <CardDescription>Highest investment amounts in USD</CardDescription>
            </CardHeader>
            <CardContent className='-ml-4'>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={topMerchantsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={formatCompactCurrency} />
                        <Tooltip formatter={(value) => [formatCurrency(Number(value)), "Investment"]} />
                        <Bar dataKey="investment"  fill="var(--primary)" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}

export default BarChartTopMerchant;