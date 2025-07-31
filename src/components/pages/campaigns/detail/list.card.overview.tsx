import {TCardOverview} from "@/types/component";
import {Clock, DollarSign, Gift, Users} from "lucide-react";
import {formatNumber} from "@/utils/formatHelpers";
import CardOverview from "@/components/pages/campaigns/detail/card.overview";
import {TCampaign} from "@/types/data";
import {makeCampaignMetrics} from "@/utils/campaignMetrics";

const ListCardOverview = ({campaign}: {campaign : TCampaign}) => {
    const { budgetUsedPercentage, daysRemaining, averageCheckinsPerDay } = makeCampaignMetrics(campaign);

    const overviewCards: TCardOverview[] = [
        {
            title: 'Total Check-ins',
            titleContent: formatNumber(campaign?.checkIns),
            desc: averageCheckinsPerDay.toFixed(1),
            Icon: Users
        },
        {
            title: 'Budget Used',
            titleContent: formatNumber(campaign?.used),
            desc: `${budgetUsedPercentage.toFixed(1)} %`,
            Icon: DollarSign
        },
        {
            title: 'Days Remaining',
            titleContent: Math.max(0, daysRemaining).toString(),
            desc: daysRemaining > 0 ? "days left" : "campaign ended",
            Icon: Clock
        },
        {
            title: 'Reward Rate',
            titleContent: formatNumber(campaign.rewardPerCheckin),
            desc: 'points per check-in',
            Icon: Gift
        }
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {overviewCards.map((card: TCardOverview) => (
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

export default ListCardOverview