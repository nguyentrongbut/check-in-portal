import {getDailyRevenues} from "@/lib/actions/chart";
import AreaChartDailyRevenue from "@/components/chart/admin/area.chart.daily.revenue";

const AreaChartDailyRevenueWrapper = async () => {
    const dailyRevenues = await getDailyRevenues();
    return (
        <AreaChartDailyRevenue dailyRevenueData={dailyRevenues}/>
    )
}

export default AreaChartDailyRevenueWrapper;