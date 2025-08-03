import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {TCampaign} from "@/types/data";
import {formatNumber} from "@/utils/formatHelpers";
import {makeCampaignMetrics} from "@/utils/campaignMetrics";
import {Progress} from "@/components/ui/progress";

const PerformanceSummary = ({campaign}: {campaign : TCampaign}) => {

    const remainingBudget = campaign?.pointBudget - campaign?.used;

    const { budgetUsedPercentage, daysRemaining } = makeCampaignMetrics(campaign);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Budget Utilization</span>
                        <span className="font-medium">{budgetUsedPercentage.toFixed(1)}%</span>
                    </div>
                    <Progress value={budgetUsedPercentage}/>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-600">{campaign?.checkIns}</div>
                        <div className="text-xs text-gray-600">Total Check-ins</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                        <div className="text-2xl font-bold text-red-600">{formatNumber(campaign?.used)}</div>
                        <div className="text-xs text-red-600">Points Spent</div>
                    </div>
                </div>

                <div className="pt-4 border-t">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Remaining Budget</span>
                        <span className="font-medium text-yellow-600">{formatNumber(remainingBudget)} pts</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                        <span className="text-gray-600">Estimated Duration</span>
                        <span className="font-medium text-red-600">{daysRemaining} days</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default PerformanceSummary;