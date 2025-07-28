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
}

const CalendarDate: React.FC<CalendarDateProps> = ({ value, onChange, placeholder }) => {
    const [open, setOpen] = useState(false);

    const getMinDate = () => {
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
                    >
                        {value ? value.toLocaleDateString() : (placeholder || 'Select Date')}
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
                        disabled={(date) => date < getMinDate()}
                        fromDate={getMinDate()}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default CalendarDate;
