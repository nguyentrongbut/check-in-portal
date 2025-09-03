import BarChartTopMerchant from "@/components/chart/admin/bar.chart.top.merchant";
import {getTopMerchants} from "@/lib/actions/chart";

const BarChartTopMerchantWrapper = async () => {
    const topMerchants = await getTopMerchants();
    return (
        <BarChartTopMerchant topMerchantsData={topMerchants}/>
    )
}

export default BarChartTopMerchantWrapper;