import {TCardOverview} from "@/types/component";
import {Clock, DollarSign, Gift, Users} from "lucide-react";
import {formatNumber} from "@/utils/formatHelpers";
import {TCampaign} from "@/types/data";
import {makeCampaignMetrics} from "@/utils/campaignMetrics";
import CardOverview from "@/components/common/card.overview";

const ListCardOverview = ({campaign}: {campaign : TCampaign}) => {
    const { budgetUsedPercentage, daysRemaining, averageCheckinsPerDay } = makeCampaignMetrics(campaign);

    const overviewCards: TCardOverview[] = [
        {
            title: 'Total Check-ins',
            titleContent: formatNumber(campaign?.checkIns),
            desc: averageCheckinsPerDay.toFixed(1),
            Icon: Users,
            color: 'text-gray-500'
        },
        {
            title: 'Budget Used',
            titleContent: formatNumber(campaign?.used),
            desc: `${budgetUsedPercentage.toFixed(1)} %`,
            Icon: DollarSign,
            color: 'text-yellow-600'
        },
        {
            title: 'Days Remaining',
            titleContent: Math.max(0, daysRemaining).toString(),
            desc: daysRemaining > 0 ? "days left" : "campaign ended",
            Icon: Clock,
            color: 'text-red-600'
        },
        {
            title: 'Reward Rate',
            titleContent: formatNumber(campaign.rewardPerCheckin),
            desc: 'points per check-in',
            Icon: Gift,
            color: 'text-primary'
        }
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {overviewCards.map((card: TCardOverview) => (
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

export default ListCardOverview