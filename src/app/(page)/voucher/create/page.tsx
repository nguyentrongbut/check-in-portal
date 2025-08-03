import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import FormCreateVoucher from "@/components/pages/voucher/form.create.voucher";
import {getUserInfoFromCookie} from "@/utils/getUserInfoFromCookie";

const CreateVoucherPage = async () => {

    const userInfo = await getUserInfoFromCookie()

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add Voucher</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
                <FormCreateVoucher userId={userInfo?.id}/>
            </CardContent>
        </Card>
    )
}

export default CreateVoucherPage