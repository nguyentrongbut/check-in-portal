'use client';

import {useEffect} from "react";
import {useWatch, UseFormReturn} from "react-hook-form";

export function useDateValidation<T extends Record<string, any>>(
    form: UseFormReturn<T>
) {
    const startDate = useWatch({control: form.control, name: "startDate" as any});
    const endDate = useWatch({control: form.control, name: "endDate" as any});
    const startTime = useWatch({control: form.control, name: "startTime" as any});

    useEffect(() => {
        if (!startDate) {
            form.setValue("endDate" as any, undefined as any);
            form.setValue("endTime" as any, "" as any);
            return;
        }

        if (endDate && startDate > endDate) {
            form.setValue("endDate" as any, startDate as any);
        }

        if (startDate && endDate && startDate.getTime() === endDate.getTime() && startTime) {
            const [h, m] = startTime.split(":").map(Number);
            const newDate = new Date(0, 0, 0, h, m + 1);
            const hh = String(newDate.getHours()).padStart(2, "0");
            const mm = String(newDate.getMinutes()).padStart(2, "0");
            form.setValue("endTime" as any, `${hh}:${mm}` as any);
        }
    }, [startDate, endDate, startTime, form]);
}
