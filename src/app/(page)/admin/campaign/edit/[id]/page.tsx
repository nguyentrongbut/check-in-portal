import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import FormEditCampaign from "@/components/pages/campaign/form.edit.campaign";
import {Params} from "@/types/common";
import {TCampaign} from "@/types/data";
import {getCampaign} from "@/lib/actions/campaign";

export async function generateMetadata({ params }: { params: Params }) {

    const {id} = await params
    const campaign: TCampaign = await getCampaign(id)

    return {
        title: `${campaign?.name} - Admin Edit Campaign | Local Hunt`,
        description: "Edit your Local Hunt campaign details: update name, description, rewards, and campaign settings.",
    };
}


const EditCampaign = async ({params}: { params: Params }) => {

    const {id} = await params
    const campaign: TCampaign = await getCampaign(id)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Campaign</CardTitle>
            </CardHeader>
            <Separator/>
            <CardContent>
                <FormEditCampaign campaign={campaign}/>
            </CardContent>
        </Card>
    )
}

export default EditCampaign