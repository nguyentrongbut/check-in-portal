import {getDashboardAdmin} from "@/lib/actions/chart";
import ListDashboardKpiCard from "@/components/pages/admin/dashboard/list.dashboard.kpi.card";

const ListDashboardKpiCardWrapper = async () => {
    const listDashboardKpi = await getDashboardAdmin()
    return (
        <ListDashboardKpiCard dashboardAdmin={listDashboardKpi}/>
    )
}

export default ListDashboardKpiCardWrapper;