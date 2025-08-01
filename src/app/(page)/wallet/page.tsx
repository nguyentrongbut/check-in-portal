import ListBalanceCard from "@/components/pages/wallet/list.balance.card";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {getTransactions} from "@/lib/actions/transaction";
import {getUserInfoFromCookie} from "@/utils/getUserInfoFromCookie";
import {DataTable} from "@/components/common/data.table";
import {columnsHistoryTransaction} from "@/components/pages/wallet/columns.history.transaction";

const WalletPage = async () => {
    const userInfo = await getUserInfoFromCookie()
    const transactions = await getTransactions(userInfo?.id);

    return (
        <div className='space-y-6'>
            <ListBalanceCard/>
            <Card>
                <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>Your recent point transactions and activities</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable data={transactions} columns={columnsHistoryTransaction}/>
                </CardContent>
            </Card>
        </div>
    )
}

export default WalletPage