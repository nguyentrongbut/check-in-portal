import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {DataTable} from "@/components/common/data.table";
import {getTransactions} from "@/lib/actions/transaction";
import {columnsListTransaction} from "@/components/pages/admin/transaction/columns.list.transaction";

const TransactionManagement = async () => {

    const data = await getTransactions();
    const transactions = data?.items

    return (
        <div>
            <Card>
                <CardHeader className='flex justify-between items-center'>
                    <CardTitle>Transaction Management</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent>
                    <DataTable data={transactions} columns={columnsListTransaction}></DataTable>
                </CardContent>
            </Card>
        </div>
    )
}

export default TransactionManagement;