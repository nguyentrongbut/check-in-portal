import {TCardOverview} from "@/types/component";
import {formatNumber} from "@/utils/formatHelpers";
import {Calendar, CreditCard, DollarSign, LucideIcon, Store, Users} from "lucide-react";
import CardOverview from "@/components/common/card.overview";
import {TDashboardAdmin} from "@/types/data";

const iconMap: Record<string, LucideIcon> = {
    "Total Revenue": DollarSign,
    "Current Month Revenue": CreditCard,
    "Total Users": Users,
    "Total Merchants": Store,
};

const colorMap: Record<string, string> = {
    "Total Revenue": "text-primary",
    "Current Month Revenue": "text-red-600",
    "Total Users": "text-green-600",
    "Total Merchants": "text-blue-600",
};

const ListDashboardKpiCard = ({dashboardAdmin} : {dashboardAdmin : TDashboardAdmin[]}) => {

    const kpiCards: TCardOverview[] = dashboardAdmin.map((item) => ({
        title: item.title,
        titleContent: formatNumber(item.value),
        desc: item.desc,
        Icon: iconMap[item.title] || Calendar,
        color: colorMap[item.title] || "text-muted-foreground",
    }));
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {kpiCards.map((card: TCardOverview) => (
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

export default ListDashboardKpiCard;