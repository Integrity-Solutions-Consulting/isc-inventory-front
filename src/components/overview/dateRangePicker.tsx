'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ClassValue } from 'clsx';

interface DatePickerWithRangeProps {
  date?: DateRange;
  className: ClassValue[];
  onChange?: (date: DateRange | undefined) => void;
}

export function DatePickerWithRange({
  className,
  date: initialDate,
  onChange,
}: DatePickerWithRangeProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(initialDate);
  const [open, setOpen] = React.useState(false);

  const handleSelect = (newDate: DateRange | undefined) => {
    setDate(newDate);
    onChange?.(newDate);

    // Cerrar el Popover cuando el rango esté completo
    if (newDate?.from && newDate?.to) {
      setOpen(false);
    }
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              'w-[250px] justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}>
            <CalendarIcon className="mr-2" />
            {date?.from ? (
              date.to ? (
                `${format(date.from, 'dd-MM-yyyy')} - ${format(date.to, 'dd-MM-yyyy')}`
              ) : (
                format(date.from, 'dd-MM-yyyy')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
