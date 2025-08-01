import BarChartCampaign from "@/components/chart/bar.chart.campaign";
import LineChartCheckin from "@/components/chart/line.chart.checkin";
import PieChartBudget from "@/components/chart/pie.chart.budget";
import ListKpiCard from "@/components/pages/dashboard/list.kpi.card";
import MapCheckinWrapper from "@/components/chart/map.checkin.wrapper";

const MerchantDashboard = () => {
    return (
        <div className='space-y-6'>
            <ListKpiCard/>
            <LineChartCheckin/>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BarChartCampaign/>
                <PieChartBudget/>
            </div>
            <MapCheckinWrapper/>
        </div>
    )
}

export default MerchantDashboard