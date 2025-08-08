import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {getSuspiciousCheckins} from "@/lib/actions/fraud.detection";
import {columnsFraudDetection} from "@/components/pages/admin/fraud/columns.fraud.detection";
import {DataTable} from "@/components/common/data.table";
import {AlertTriangle} from "lucide-react";

const FraudDetectionPage = async () => {

    const suspiciousCheckins = await getSuspiciousCheckins();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Fraud Detection</h1>
                    <p className="text-gray-600">Monitor and investigate suspicious check-in activities</p>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                        <AlertTriangle className='text-red-500 size-4'/>
                        <span>Alerts: 3</span>
                    </div>
                </div>
            </div>

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