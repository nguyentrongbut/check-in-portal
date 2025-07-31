import FormCreateCampaign from "@/components/pages/campaigns/form.create.campaign";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";

const CreateCampaigns = () => {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Add Campaign</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent>
                    <FormCreateCampaign/>
                </CardContent>
            </Card>
        </div>
    )
}

export default CreateCampaigns