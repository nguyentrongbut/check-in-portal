import {getCampaigns} from "@/lib/actions/campaign";
import {DataTable} from "@/components/common/data.table";
import {columnsCampaign} from "@/components/pages/campaign/columns.campaign";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Campaign Management - Local Hunt",
    description:
        "Manage your Local Hunt campaigns: create, edit, and track check-in marketing campaigns to engage customers effectively.",
};

const Campaign = async () => {

    const data = await getCampaigns()

    const listCampaign = data?.items

    return (
        <div>
            <Card>
                <CardHeader className='flex justify-between items-center'>
                    <CardTitle>Campaign Management</CardTitle>
                    <Link href='/campaign/create'>
                        <Button>Add Campaign</Button>
                    </Link>
                </CardHeader>
                <Separator />
                <CardContent>
                    <DataTable data={listCampaign} columns={columnsCampaign}></DataTable>
                </CardContent>
            </Card>
        </div>
)
}

export default Campaign