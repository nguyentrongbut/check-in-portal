import {FormLabel} from "@/components/ui/form";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {CircleQuestionMark} from "lucide-react";

interface FormLabelTooltipProps {
    label: string;
    description: string;
}

const FormLabelTooltip  = ({label, description} : FormLabelTooltipProps) => {
    return (
        <div className='flex gap-2 items-center'>
            <FormLabel>{label}</FormLabel>
            <Tooltip>
                <TooltipTrigger>
                    <CircleQuestionMark className='size-3 text-gray-400 cursor-pointer'/>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{description}</p>
                </TooltipContent>
            </Tooltip>
        </div>
    )
}

export default FormLabelTooltip;