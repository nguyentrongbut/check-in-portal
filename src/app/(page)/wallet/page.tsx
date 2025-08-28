import ListBalanceCard from "@/components/pages/wallet/list.balance.card";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {getTransactions} from "@/lib/actions/transaction";
import {getUserInfoFromCookie} from "@/utils/getUserInfoFromCookie";
import {DataTable} from "@/components/common/data.table";
import {columnsHistoryTransaction} from "@/components/pages/wallet/columns.history.transaction";
import DialogTopUp from "@/components/pages/wallet/dialog.top.up";
import {formatNumber} from "@/utils/formatHelpers";
import {Metadata} from "next";
import {calcStats} from "@/utils/calcTransaction";

export const metadata : Metadata = {
    title: "Wallet - Local Hunt",
    description:
        "Manage your Local Hunt transaction: view balance, exchange rates, top-up points, and track your transaction history.",
};

const WalletPage = async () => {
    const userInfo = await getUserInfoFromCookie()
    const data = await getTransactions();
    const transactions = data?.items
    const wallet = calcStats(transactions);


    console.log(transactions)
    return (
        <div className='space-y-6'>

            {/* Balance Overview */}
            <ListBalanceCard wallet={wallet}/>

            {/* Exchange Rate Info */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <span>Exchange Rate Information</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 0 bg-blue-50 rounded-lg text-blue-600">
                                <span className="font-medium">Current Rate</span>
                                <span className="font-bold">1 USD = 100 points</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg text-yellow-600">
                                <span className="font-medium">Processing Fee</span>
                                <span className="font-bold">Free</span>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg text-primary">
                                <span className="font-medium">Minimum Top-up</span>
                                <span className="font-bold">1 USD (100 points)</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg text-primary">
                                <span className="font-medium">Maximum Top-up</span>
                                <span className="font-bold">{formatNumber(10000)} USD (1M points)</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Transaction History */}
            <Card>
                <CardHeader>
                    <div className='flex justify-between'>
                        <div>
                            <CardTitle>Transaction History</CardTitle>
                            <CardDescription>Your recent point transactions and activities</CardDescription>
                        </div>
                        <DialogTopUp
                            userId={userInfo?.id}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable data={transactions} columns={columnsHistoryTransaction}/>
                </CardContent>
            </Card>
        </div>
    )
}

export default WalletPage