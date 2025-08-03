import {formatNumber} from "@/utils/formatHelpers";
import React from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

const WalletSummary = ({amount, pointsToReceive, exchangeRate}
                       : {amount: number, pointsToReceive: number, exchangeRate: number}) => {
    return (
        <Card className="bg-primary/10">
            <CardHeader>
                <CardTitle className="text-sm">Transaction Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span>Amount to pay:</span>
                    <span className="font-medium">${amount}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span>Exchange rate:</span>
                    <span>1 USD = {exchangeRate} points</span>
                </div>
                <div className="flex justify-between text-sm pb-2">
                    <span>Processing fee:</span>
                    <span className="text-green-600">Free</span>
                </div>
                <div className="border-t border-gray-300 pt-2 flex justify-between font-medium">
                    <span>Points to receive:</span>
                    <span className="text-primary">{formatNumber(pointsToReceive)} points</span>
                </div>
            </CardContent>
        </Card>
    )
}

export default WalletSummary