import {Button} from "@/components/ui/button";
import Link from "next/link";
import ListVoucher from "@/components/pages/voucher/list.voucher";
import {getVouchers} from "@/lib/actions/voucher";
import {getUserInfoFromCookie} from "@/utils/getUserInfoFromCookie";

const VoucherPage = async () => {
    const userInfo = await getUserInfoFromCookie()
    const vouchers = await getVouchers(userInfo?.id);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Voucher Management</h1>
                    <p className="opacity-60">Create and manage vouchers for your campaigns</p>
                </div>
               <Link href='/voucher/create'>
                   <Button>
                       Add Voucher
                   </Button>
               </Link>
            </div>

            <ListVoucher vouchers={vouchers}/>
        </div>
    )
}

export default VoucherPage