import {TVoucher} from "@/types/data";
import CardVoucher from "@/components/pages/voucher/card.voucher";

const ListVoucher = ({vouchers} : {vouchers: TVoucher[]}) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {vouchers.map((voucher: TVoucher) => (
                <CardVoucher key={voucher.id} voucher={voucher} />
            ))}
        </div>
    )
}

export default ListVoucher;