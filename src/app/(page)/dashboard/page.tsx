import LineChartCheckin from "@/components/chart/line.chart.checkin";
import PieChartBudget from "@/components/chart/pie.chart.budget";
import {getUserInfoFromCookie} from "@/utils/getUserInfoFromCookie";
import { TUser} from "@/types/data";
import {
    getCampaignPoints,
    getDailyCheckins,
} from "@/lib/actions/chart";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Merchant Dashboard - Local Hunt",
    description:
        "View your Local Hunt dashboard: monitor campaigns, track customer check-ins, analyze budget usage, and measure performance metrics in real-time.",
};

const MerchantDashboard = async () => {
    const userInfo: TUser = await getUserInfoFromCookie();
    const userId = userInfo?.id;

    const dailyCheckins = await getDailyCheckins(userId);
    const campaignPoints = await getCampaignPoints(userId);

    return (
        <div className='space-y-6'>
            <LineChartCheckin dailyCheckins={dailyCheckins}/>
            <PieChartBudget campaignPoints={campaignPoints}/>
        </div>
    )
}

export default MerchantDashboard