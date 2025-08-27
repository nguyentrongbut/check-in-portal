'use client'

import {ChangeEvent, useEffect, useState} from "react";
import {Upload} from "lucide-react";
import {Input} from "@/components/ui/input";
import Image from "next/image";
import {cn} from "@/lib/utils";

const UploadImage = ({value, onChange, className}: { value: string | File | undefined, onChange: (val: string | File) => void, className?: string }) => {
    const [preview, setPreview] = useState<string>("/default-avatar.png");

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const tempUrl = URL.createObjectURL(file);
            setPreview(tempUrl);
            onChange(file);
        }
    };

    useEffect(() => {
        if (typeof value === "string") {
            setPreview(value);
        }
    }, [value]);

    return (
        <div className="flex justify-center p-2">
            <div className={cn("relative size-20 rounded-full overflow-hidden group", className)}>
                <Image
                    src={preview || "/default-avatar.png"}
                    alt="profile"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                />
                <label
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Upload className="text-white size-5"/>
                    <Input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                        onClick={(e) => {
                            (e.target as HTMLInputElement).value = "";
                        }}
                    />
                </label>
            </div>
        </div>
    );
};


export default UploadImage