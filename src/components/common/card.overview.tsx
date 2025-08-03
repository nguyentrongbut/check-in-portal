import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {TCardOverview} from "@/types/component";
import {cn} from "@/lib/utils";

const CardOverview = ({title, Icon, titleContent, desc, color} : TCardOverview) => {
    return (
        <Card className='gap-4'>
            <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className={cn("size-4 text-muted-foreground", color)} />
            </CardHeader>
            <CardContent>
                <div className={cn("text-2xl font-bold", color)}>{titleContent}</div>
                <p className="text-xs text-muted-foreground mt-1">{desc}</p>
            </CardContent>
        </Card>
    )
}

export default CardOverview;