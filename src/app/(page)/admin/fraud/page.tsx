import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {getSuspiciousCheckins} from "@/lib/actions/fraud.detection";
import {columnsFraudDetection} from "@/components/pages/admin/fraud/columns.fraud.detection";
import {DataTable} from "@/components/common/data.table";
import {AlertTriangle} from "lucide-react";

const FraudDetectionPage = async () => {

    const suspiciousCheckins = await getSuspiciousCheckins();

    return (
        <div className="space-y-6">
            {/* Table */}
            <Card>
                <CardHeader>
                    <div className='flex justify-between items-center'>
                        <div>
                            <CardTitle>Suspicious Check-ins</CardTitle>
                            <CardDescription>Review check-ins flagged by our fraud detection system</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable data={suspiciousCheckins} columns={columnsFraudDetection}/>
                </CardContent>
            </Card>
        </div>
    )
}

export default FraudDetectionPage