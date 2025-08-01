import FormCreateCampaign from "@/components/pages/campaign/create/form.create.campaign";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {getUserInfoFromCookie} from "@/utils/getUserInfoFromCookie";

const CreateCampaign = async () => {
    const userInfo =  await getUserInfoFromCookie()
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Add Campaign</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent>
                    <FormCreateCampaign userId={userInfo?.id}/>
                </CardContent>
            </Card>
        </div>
    )
}

export default CreateCampaign