import FormCreateCampaign from "@/components/pages/campaign/form.create.campaign";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";

const CreateCampaign = () => {
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

export default CreateCampaign