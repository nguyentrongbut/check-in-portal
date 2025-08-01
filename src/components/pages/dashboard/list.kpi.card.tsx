import {TCardOverview} from "@/types/component";
import {formatNumber} from "@/utils/formatHelpers";
import {Calendar, CreditCard, MapPin} from "lucide-react";
import CardOverview from "@/components/common/card.overview";

const ListKpiCard = () => {

    const kpiCards: TCardOverview[] = [
        {
            title: 'Total Check-ins',
            titleContent: formatNumber(1247),
            desc: '+12% from last month',
            Icon: MapPin
        },
        {
            title: 'Points Spent',
            titleContent: formatNumber(8350),
            desc: '+8% from last month',
            Icon: CreditCard
        },
        {
            title: 'Active Campaigns',
            titleContent: formatNumber(8),
            desc: '3 pending approval',
            Icon: Calendar
        }
    ]
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {kpiCards.map((card: TCardOverview) => (
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

export default ListKpiCard;