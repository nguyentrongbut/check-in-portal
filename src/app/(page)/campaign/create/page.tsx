import FormCreateCampaign from "@/components/pages/campaign/create/form.create.campaign";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Create Campaign - Local Hunt",
    description:
        "Create a new Local Hunt campaign to attract customers with check-in marketing, reward points, and digital vouchers.",
};

const CreateCampaign = async () => {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add Campaign</CardTitle>
            </CardHeader>
            <Separator/>
            <CardContent>
                <FormCreateCampaign />
            </CardContent>
        </Card>
    )
}

export default CreateCampaign