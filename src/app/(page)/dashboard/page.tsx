import BarChartCampaign from "@/components/chart/bar.chart.campaign";
import LineChartCheckin from "@/components/chart/line.chart.checkin";
import PieChartBudget from "@/components/chart/pie.chart.budget";
import ListKpiCard from "@/components/pages/dashboard/list.kpi.card";
import MapCheckinWrapper from "@/components/chart/map.checkin.wrapper";
import {getUserInfoFromCookie} from "@/utils/getUserInfoFromCookie";
import {TCampaignPoint, TCampaignCheckin, TDailyCheckin, TDashboardMetric, TMapCheckin, TUser} from "@/types/data";
import {
    getCampaignCheckins,
    getCampaignPoints,
    getDailyCheckins,
    getDashboardMetrics,
    getMapCheckins
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

    // const campaignCheckins: TCampaignCheckin = await getCampaignCheckins(userId);
    const dailyCheckins: TDailyCheckin = await getDailyCheckins(userId);
    const mapCheckins: TMapCheckin = await getMapCheckins(userId);
    const campaignPoints: TCampaignPoint = await getCampaignPoints(userId);
    const dashboardMetrics: TDashboardMetric = await getDashboardMetrics(userId);

    return (
        <div className='space-y-6'>
            <ListKpiCard dashboardMetrics={dashboardMetrics?.data}/>
            <LineChartCheckin dailyCheckins={dailyCheckins?.chart}/>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/*<BarChartCampaign campaignCheckins={campaignCheckins?.chart}/>*/}
                <PieChartBudget campaignPoints={campaignPoints?.chart}/>
            </div>
            <MapCheckinWrapper mapCheckins={mapCheckins?.chart}/>
        </div>
    )
}

export default MerchantDashboard