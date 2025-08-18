import {TCardOverview} from "@/types/component";
import {formatNumber} from "@/utils/formatHelpers";
import {Calendar, CreditCard, LucideIcon, MapPin} from "lucide-react";
import CardOverview from "@/components/common/card.overview";
import {TDataDashboard} from "@/types/data";


const iconMap: Record<string, LucideIcon> = {
    "Total Check-ins": MapPin,
    "Points Spent": CreditCard,
    "Active Campaigns": Calendar,
};

const colorMap: Record<string, string> = {
    "Total Check-ins": "text-primary",
    "Points Spent": "text-red-600",
    "Active Campaigns": "text-green-600",
};

const ListKpiCard = ({dashboardMetrics} : {dashboardMetrics : TDataDashboard[]}) => {

    const kpiCards: TCardOverview[] = dashboardMetrics?.map((item) => ({
        title: item.title,
        titleContent: formatNumber(item.value),
        desc: item.desc,
        Icon: iconMap[item.title] || Calendar,
        color: colorMap[item.title] || "text-muted-foreground",
    }));
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {kpiCards?.map((card: TCardOverview) => (
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

export default ListKpiCard;