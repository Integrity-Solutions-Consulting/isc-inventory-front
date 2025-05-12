import type React from 'react';
import { useState, useCallback, useMemo } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { DatePickerWithRange } from './dateRangePicker';

interface DateRange {
  from: string;
  to: string;
}

interface FromToDatePickerProps {
  onChange?: (range: DateRange) => void;
}

const FromToDatePicker: React.FC<FromToDatePickerProps> = ({ onChange }) => {
  const [selectedOption, setSelectedOption] = useState<string>('day');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [customRange, setCustomRange] = useState<DateRange | null>(null);

  const getDateRange = (option: string): DateRange => {
    const today = new Date();
    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    switch (option) {
      case 'day':
        return {
          from: formatDate(new Date(today.setDate(today.getDate() - 1))),
          to: formatDate(new Date()),
        };
      case 'week':
        return {
          from: formatDate(new Date(today.setDate(today.getDate() - 7))),
          to: formatDate(new Date()),
        };
      case 'month':
        return {
          from: formatDate(new Date(today.setMonth(today.getMonth() - 1))),
          to: formatDate(new Date()),
        };
      case 'year':
        return {
          from: formatDate(
            new Date(today.setFullYear(today.getFullYear() - 1)),
          ),
          to: formatDate(new Date()),
        };
      default:
        return { from: formatDate(new Date()), to: formatDate(new Date()) };
    }
  };

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
    setIsCustom(value === 'custom');
    if (value !== 'custom') {
      const range = getDateRange(value);
      setCustomRange(range);
      onChange?.(range);
    }
  };

  const handleBack = () => {
    setIsCustom(false);
    setSelectedOption('day');
    const range = getDateRange('day');
    setCustomRange(range);
    onChange?.(range);
  };

  const handleCustomRangeChange = useCallback(
    (range: { from: Date; to: Date }) => {
      if (!range.from || !range.to) {
        return;
      }
      const formattedRange = {
        from: range.from.toISOString().split('T')[0],
        to: range.to.toISOString().split('T')[0],
      };

      setCustomRange(formattedRange);
      onChange?.(formattedRange);
    },
    [onChange],
  );

  const dateRange = useMemo(
    () => customRange ?? getDateRange(selectedOption),
    [customRange, selectedOption],
  );
  console.log(dateRange);

  return (
    <div className="flex gap-2">
      {!isCustom ? (
        <Select value={selectedOption} onValueChange={handleSelectChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Today</SelectItem>
            <SelectItem value="week">This week</SelectItem>
            <SelectItem value="month">This month</SelectItem>
            <SelectItem value="year">This year</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      ) : (
        <>
          <Button variant="outline" size="icon" onClick={handleBack}>
            <ChevronLeft />
          </Button>
          <div className="w-3xs">
            <DatePickerWithRange onChange={handleCustomRangeChange} />
          </div>
        </>
      )}
    </div>
  );
};

export default FromToDatePicker;
