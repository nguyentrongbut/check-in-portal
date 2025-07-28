import FormCreateCampaign from "@/components/pages/campaigns/form.create.campaign";
import Heading from "@/components/typography/heading";
import Description from "@/components/typography/description";

const CreateCampaigns = () => {
    return (
        <div>
            <Heading>Create New Campaign</Heading>
            <Description className='mt-1'>Set up a new check-in campaign for your business location</Description>
            <FormCreateCampaign/>
        </div>
    )
}

export default CreateCampaigns