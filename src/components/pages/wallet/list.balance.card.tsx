import {TCardOverview} from "@/types/component";
import CardOverview from "@/components/common/card.overview";
import {formatNumber, formatPointsToUSD} from "@/utils/formatHelpers";
import { ArrowUpRight, DollarSign, WalletIcon} from "lucide-react";
import {ICalcStats} from "@/utils/calcTransaction";

const ListBalanceCard = async ({wallet} : {wallet: ICalcStats}) => {


    const balanceCards: TCardOverview[] = [
        {
            title: 'Current Balance',
            titleContent: `${formatNumber(wallet?.balance)} pts`,
            desc: formatPointsToUSD(wallet?.balance),
            Icon: WalletIcon,
            color: 'text-blue-600'
        },
        {
            title: 'Total Spent',
            titleContent: `${formatNumber(wallet?.totalSpent)} pts`,
            desc: 'On vouchers and rewards',
            Icon: ArrowUpRight,
            color: 'text-red-600'
        },
        {
            title: 'Total Top-up',
            titleContent: `${formatNumber(wallet?.totalTopup)} pts`,
            desc: formatPointsToUSD(wallet?.totalTopup),
            Icon: DollarSign,
            color: 'text-primary'
        }
    ]

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {balanceCards.map((card: TCardOverview) => (
                <CardOverview
                    key={card.title}
                    title={card.title}
                    desc={card.desc}
                    color={card.color}
                    titleContent={card.titleContent}
                    Icon={card.Icon}/>
            ))}
        </div>
    )
}

export default ListBalanceCard