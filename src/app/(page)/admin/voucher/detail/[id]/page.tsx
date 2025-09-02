import {Params} from "@/types/common";
import {TVoucher} from "@/types/data";
import {getVoucher} from "@/lib/actions/voucher";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ArrowLeft, Edit} from "lucide-react";
import ListCardOverviewVoucher from "@/components/pages/voucher/detail/list.card.overview.voucher";
import VoucherInfo from "@/components/pages/voucher/detail/voucher.info";


const VoucherDetailPage = async ({params}: { params: Params }) => {
    const {id} = await params
    const voucher: TVoucher = await getVoucher(id)

    return (
        <div className='space-y-6'>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link href='/admin/voucher'>
                        <Button variant="ghost" className="p-2">
                            <ArrowLeft className="h-4 w-4"/>
                        </Button>
                    </Link>
                    <div>
                        <h2 className="text-3xl font-bold">{voucher?.title}</h2>
                        <p className="text-gray-600">{voucher?.description}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Link href={`/admin/voucher/edit/${id}`}>
                        <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1"/>
                            Edit
                        </Button>
                    </Link>
                </div>
            </div>

            {/* list card overview */}
            <ListCardOverviewVoucher voucher={voucher}/>

            {/* Voucher Information */}
            <VoucherInfo voucher={voucher}/>
        </div>
    )
}

export default VoucherDetailPage