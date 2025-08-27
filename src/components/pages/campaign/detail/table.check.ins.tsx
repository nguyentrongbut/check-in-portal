import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {DataTable} from "@/components/common/data.table";
import {columnsCheckin} from "@/components/pages/campaign/detail/columns.checkin";
import {getCheckIn} from "@/lib/actions/checkin";

const TableCheckIns = async ({campaignId}: {campaignId: number}) => {
    const data = await getCheckIn(campaignId)
    const checkin = data?.items
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Check-ins</CardTitle>
                <CardDescription>Latest customer check-ins for this campaign</CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable data={checkin} columns={columnsCheckin} />
            </CardContent>
        </Card>
    )
}

export default TableCheckIns