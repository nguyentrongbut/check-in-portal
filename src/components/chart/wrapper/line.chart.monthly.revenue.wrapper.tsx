import LineChartMonthlyRevenue from "@/components/chart/admin/line.chart.monthly.revenue";
import {getMonthlyRevenues} from "@/lib/actions/chart";

const LineChartMonthlyRevenueWrapper = async () => {
    const monthlyRevenues = await getMonthlyRevenues();
    return (
        <LineChartMonthlyRevenue monthlyRevenueData={monthlyRevenues}/>
    )
}

export default LineChartMonthlyRevenueWrapper