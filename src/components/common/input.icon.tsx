import {Input} from "@/components/ui/input";
import type React from "react";

type InputPasswordProps = {
    icon?: React.ReactNode;
    placeholder: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    name?: string;
    type?: string;
};

const InputIcon: React.FC<InputPasswordProps> =
    ({
         icon,
         placeholder,
         type = "text",
         value,
         onChange,
         onBlur,
         name
     }) => {
        return (
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        {icon}
                    </div>
                )}
                <Input
                    placeholder={placeholder}
                    type={type}
                    value={value ?? ""}
                    onChange={onChange}
                    onBlur={onBlur}
                    name={name}
                    className={icon ? "pl-10" : ""}
                />
            </div>
        )
    }

export default InputIcon;