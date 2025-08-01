import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {TCardOverview} from "@/types/component";

const CardOverview = ({title, Icon, titleContent, desc} : TCardOverview) => {
    return (
        <Card className='gap-4'>
            <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{titleContent}</div>
                <p className="text-xs text-muted-foreground mt-1">{desc}</p>
            </CardContent>
        </Card>
    )
}

export default CardOverview;