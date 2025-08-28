import {FormLabel} from "@/components/ui/form";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {CircleQuestionMark} from "lucide-react";
import Link from "next/link";

interface FormLabelTooltipProps {
    label: string;
    description: string;
    href?: string;
}

const FormLabelTooltip  = ({label, description, href } : FormLabelTooltipProps) => {
    return (
        <div className='flex gap-2 items-center'>
            <FormLabel>{label}</FormLabel>
            <Tooltip>
                <TooltipTrigger asChild>
                    {
                        href ? (
                            <Link href={href} target="_blank" rel="noopener noreferrer">
                                <CircleQuestionMark className='size-3 text-gray-400 cursor-pointer'/>
                            </Link>
                        ): (
                            <CircleQuestionMark className='size-3 text-gray-400 cursor-pointer'/>
                        )
                    }
                </TooltipTrigger>
                <TooltipContent>
                    <p>{description}</p>
                </TooltipContent>
            </Tooltip>
        </div>
    )
}

export default FormLabelTooltip;