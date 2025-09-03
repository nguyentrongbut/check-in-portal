import {Metadata} from "next";
import {Suspense} from "react";
import LineChartMonthlyRevenueWrapper from "@/components/chart/wrapper/line.chart.monthly.revenue.wrapper";
import BarChartTopMerchantWrapper from "@/components/chart/wrapper/bar.chart.top.merchant.wrapper";
import AreaChartDailyRevenueWrapper from "@/components/chart/wrapper/area.chart.daily.revenue.wrapper";
import ListDashboardKpiCardWrapper from "@/components/pages/admin/dashboard/list.dashboard.kpi.card.wrapper";
import SkeletonListDashboardKpiCard from "@/components/skeleton/admin/skeleton.list.dashboard.kpi.card";
import SkeletonBarChartTopMerchant from "@/components/skeleton/chart/skeleton.bar.chart.top.merchant";
import SkeletonLineChartMonthlyRevenue from "@/components/skeleton/chart/skeleton.line.chart.monthly.revenue";
import SkeletonAreaChartDailyRevenue from "@/components/skeleton/chart/skeleton.area.chart.daily.revenue";

export const metadata: Metadata = {
    title: "Admin Dashboard - Local Hunt",
    description:
        "Monitor platform performance with Local Hunt Admin Dashboard: view KPIs, track revenues, analyze top merchants, and review daily activities.",
};

const AdminDashboard = async () => {

    return (
        <div className='space-y-6'>
            <Suspense fallback={<SkeletonListDashboardKpiCard/>}>
                <ListDashboardKpiCardWrapper/>
            </Suspense>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Suspense fallback={<SkeletonBarChartTopMerchant/>}>
                    <BarChartTopMerchantWrapper/>
                </Suspense>
                <Suspense fallback={<SkeletonLineChartMonthlyRevenue/>}>
                    <LineChartMonthlyRevenueWrapper/>
                </Suspense>
            </div>
            <Suspense fallback={<SkeletonAreaChartDailyRevenue/>}>
                <AreaChartDailyRevenueWrapper/>
            </Suspense>
        </div>
    )
}

export default AdminDashboard;