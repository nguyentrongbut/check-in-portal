import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import FormEditCampaign from "@/components/pages/campaign/form.edit.campaign";
import {Params} from "@/types/common";
import {TCampaign} from "@/types/data";
import {getCampaign} from "@/lib/actions/campaign";

const EditCampaign = async ({params}: { params: Params }) => {

    const {id} = await params
    const campaign: TCampaign = await getCampaign(id)

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Edit Campaign</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent>
                    <FormEditCampaign campaign={campaign} />
                </CardContent>
            </Card>
        </div>
    )
}

export default EditCampaign