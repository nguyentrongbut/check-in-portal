import BarChartTopMerchant from "@/components/chart/admin/bar.chart.top.merchant";
import {getDailyRevenues, getDashboardAdmin, getMonthlyRevenues, getTopMerchants} from "@/lib/actions/chart";
import LineChartMonthlyRevenue from "@/components/chart/admin/line.chart.monthly.revenue";
import AreaChartDailyRevenue from "@/components/chart/admin/area.chart.daily.revenue";
import ListDashboardKpiCard from "@/components/pages/admin/dashboard/list.dashboard.kpi.card";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Admin Dashboard - Local Hunt",
    description:
        "Monitor platform performance with Local Hunt Admin Dashboard: view KPIs, track revenues, analyze top merchants, and review daily activities.",
};

const AdminDashboard = async () => {

    const topMerchants = await getTopMerchants();
    const monthlyRevenues = await getMonthlyRevenues();
    const dailyRevenues = await getDailyRevenues();
    const listDashboardKpi = await getDashboardAdmin()

    return (
        <div className='space-y-6'>
            <ListDashboardKpiCard dashboardAdmin={listDashboardKpi}/>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BarChartTopMerchant topMerchantsData={topMerchants}/>
                <LineChartMonthlyRevenue monthlyRevenueData={monthlyRevenues}/>
            </div>
            <AreaChartDailyRevenue dailyRevenueData={dailyRevenues}/>
        </div>
    )
}

export default AdminDashboard;