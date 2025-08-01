import {TCardOverview} from "@/types/component";
import CardOverview from "@/components/common/card.overview";
import {formatNumber} from "@/utils/formatHelpers";
import {ArrowDownLeft, ArrowUpRight, Calendar, CreditCard, DollarSign, MapPin, WalletIcon} from "lucide-react";

const ListBalanceCard = () => {

    const balanceCards: TCardOverview[] = [
        {
            title: 'Current Balance',
            titleContent: formatNumber(3342),
            desc: '~ 3342 USD',
            Icon: WalletIcon
        },
        {
            title: 'Total Earned',
            titleContent: formatNumber(8350),
            desc: 'From check-ins and bonuses',
            Icon: ArrowDownLeft
        },
        {
            title: 'Total Spent',
            titleContent: formatNumber(8),
            desc: 'On vouchers and rewards',
            Icon: ArrowUpRight
        },
        {
            title: 'Total Top-up',
            titleContent: `${formatNumber(2000)} pts`,
            desc: '$20.00 USD converted',
            Icon: DollarSign
        }
    ]

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
            {balanceCards.map((card: TCardOverview) => (
                <CardOverview
                    key={card.title}
                    title={card.title}
                    desc={card.desc}
                    titleContent={card.titleContent}
                    Icon={card.Icon}/>
            ))}
        </div>
    )
}

export default ListBalanceCard