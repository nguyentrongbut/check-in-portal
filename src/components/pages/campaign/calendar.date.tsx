'use client';

import { ChevronDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import React, { useState } from "react";

interface CalendarDateProps {
    value: Date | undefined;
    onChange: (date: Date | undefined) => void;
    placeholder?: string;
    minDate?: Date;
    disabled?: boolean;
}

const CalendarDate: React.FC<CalendarDateProps> = ({ value, onChange, placeholder, minDate, disabled }) => {
    const [open, setOpen] = useState(false);

    const getToday = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
    };

    return (
        <div className="flex flex-col gap-3">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="w-full justify-between font-normal"
                        disabled={disabled}
                    >
                        {value ? value.toLocaleDateString() : (placeholder || 'Choose day')}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="end">
                    <Calendar
                        mode="single"
                        selected={value}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            onChange(date);
                            setOpen(false);
                        }}
                        disabled={(date) => {
                            if (minDate && date < minDate) return true;
                            return date < getToday();
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default CalendarDate;
