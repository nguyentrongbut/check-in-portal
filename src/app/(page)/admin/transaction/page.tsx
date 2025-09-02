import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {getTransactions} from "@/lib/actions/transaction";
import {columnsListTransaction} from "@/components/pages/admin/transaction/columns.list.transaction";
import {getPaginatedResult} from "@/utils/pagination";
import {TTransaction} from "@/types/data";
import {SearchParamsProps} from "@/app/(page)/wallet/page";
import {DataTableServer} from "@/components/common/data.table.server";

const TransactionManagement = async ({searchParams}: SearchParamsProps) => {

    const {currentPage, pageSize, items: transactions, total, totalPages} =
        await getPaginatedResult<TTransaction>(searchParams, getTransactions);

    return (
        <div>
            <Card>
                <CardHeader className='flex justify-between items-center'>
                    <CardTitle>Transaction Management</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent>
                    <DataTableServer
                        data={transactions}
                        columns={columnsListTransaction}
                        total={total}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        totalPages={totalPages}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default TransactionManagement;