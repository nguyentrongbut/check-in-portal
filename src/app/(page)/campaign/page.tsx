import {getCampaigns} from "@/lib/actions/campaign";
import {columnsCampaign} from "@/components/pages/campaign/columns.campaign";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {Metadata} from "next";
import {getPaginatedResult} from "@/utils/pagination";
import {TCampaign} from "@/types/data";
import {SearchParamsProps} from "@/app/(page)/wallet/page";
import {DataTableServer} from "@/components/common/data.table.server";

export const metadata: Metadata = {
    title: "Campaign Management - Local Hunt",
    description:
        "Manage your Local Hunt campaigns: create, edit, and track check-in marketing campaigns to engage customers effectively.",
};

const Campaign = async ({searchParams}: SearchParamsProps) => {

    const {currentPage, pageSize, items: listCampaign, total, totalPages} =
        await getPaginatedResult<TCampaign>(searchParams, getCampaigns);

    return (
        <div>
            <Card>
                <CardHeader className='flex justify-between items-center'>
                    <CardTitle>Campaign Management</CardTitle>
                    <Link href='/campaign/create'>
                        <Button>Add Campaign</Button>
                    </Link>
                </CardHeader>
                <Separator/>
                <CardContent>
                    <DataTableServer
                        data={listCampaign}
                        columns={columnsCampaign}
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

export default Campaign