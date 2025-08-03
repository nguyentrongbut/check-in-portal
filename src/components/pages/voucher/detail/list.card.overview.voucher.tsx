import {TCardOverview} from "@/types/component";
import {formatNumber} from "@/utils/formatHelpers";
import {Clock, Gift, Package} from "lucide-react";
import CardOverview from "@/components/common/card.overview";
import {TVoucher} from "@/types/data";

const ListCardOverviewVoucher = ({voucher} : {voucher : TVoucher}) => {

    const daysUntilExpiry = Math.ceil((new Date(voucher.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    const quantityUsedPercentage = ((voucher?.quantity - voucher?.claimed) / voucher.quantity) * 100

    const overviewVouchers: TCardOverview[] = [
        {
            title: 'Stock Used',
            titleContent: voucher?.claimed.toString(),
            desc: `${quantityUsedPercentage} %`,
            Icon: Package,
            color: 'text-gray-500'
        },
        {
            title: 'Days Until Expiry',
            titleContent: daysUntilExpiry.toString(),
            desc: daysUntilExpiry > 0 ? "days left" : "expired",
            Icon: Clock,
            color: 'text-red-600'
        },
        {
            title: 'Point Cost',
            titleContent: formatNumber(voucher?.pointCost),
            desc: "points per redemption",
            Icon: Gift,
            color: 'text-primary'
        }
    ]

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {overviewVouchers.map((card: TCardOverview) => (
                <CardOverview
                    key={card.title}
                    title={card.title}
                    desc={card.desc}
                    titleContent={card.titleContent}
                    color={card.color}
                    Icon={card.Icon}/>
            ))}
        </div>
    )
}

export default ListCardOverviewVoucher