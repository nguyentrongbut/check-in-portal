import {Button} from "@/components/ui/button";
import Link from "next/link";
import ListVoucher from "@/components/pages/voucher/list.voucher";
import {Suspense} from "react";
import {ListVoucherSkeleton} from "@/components/skeleton/admin/card.voucher.skeleton";

const VoucherPage = async () => {

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold">Voucher Management</h2>
                    <p className="opacity-60">Create and manage vouchers for your campaigns</p>
                </div>
                <Link href='/admin/voucher/create'>
                    <Button>
                        Add Voucher
                    </Button>
                </Link>
            </div>

            <Suspense fallback={<ListVoucherSkeleton/>}>
                <ListVoucher/>
            </Suspense>
        </div>
    )
}

export default VoucherPage