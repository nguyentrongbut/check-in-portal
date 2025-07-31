import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {DataTable} from "@/components/common/data.table";
import {columnsCheckin} from "@/components/pages/campaigns/detail/columns.checkin";
import {getCheckIn} from "@/lib/actions/checkin";

const TableCheckIns = async ({campaignId}: {campaignId: number}) => {
    const checkin = await getCheckIn(campaignId)
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