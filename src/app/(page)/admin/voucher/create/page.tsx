import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import FormCreateVoucher from "@/components/pages/voucher/form.create.voucher";

const CreateVoucherPage = async () => {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add Voucher</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent>
                <FormCreateVoucher/>
            </CardContent>
        </Card>
    )
}

export default CreateVoucherPage