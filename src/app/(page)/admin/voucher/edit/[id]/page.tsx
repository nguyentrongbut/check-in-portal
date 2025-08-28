import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import FormEditVoucher from "@/components/pages/voucher/form.edit.voucher";
import {Params} from "@/types/common";
import {TVoucher} from "@/types/data";
import {getVoucher} from "@/lib/actions/voucher";

const EditVoucherPage = async ({params}: { params: Params }) => {

    const {id} = await params
    const voucher: TVoucher = await getVoucher(id)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Voucher</CardTitle>
            </CardHeader>
            <Separator/>
            <CardContent>
                <FormEditVoucher voucher={voucher}/>
            </CardContent>
        </Card>
    )
}

export default EditVoucherPage