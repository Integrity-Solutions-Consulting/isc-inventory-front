import type React from 'react';
// import { useState, useMemo, useCallback } from "react";
// import { addDays, format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from "@/components/ui/select";
import { Triangle } from 'lucide-react';
// import { Button } from "@/components/ui/button";
import clsx from 'clsx';
// import { DatePickerWithRange } from "./dateRangePicker";
// import FromToDatePicker from "./fromToDatePicker";

// Formatear fecha a dd-mm-aaaa
// const formatDate = (date: Date): string => format(date, "dd-MM-yyyy");

// Interfaz para los datos
interface DataItem {
  title: string;
  amount: string;
  percentage: string;
  isProfit: boolean;
}

interface DateInsightProps {
  title: string;
  subTitle?: string;
  data: DataItem[];
}

const DateInsight: React.FC<DateInsightProps> = ({ title, subTitle, data }) => {
  // Date Range Select
  // const [dateRange, setDateRange] = useState<{ from: string; to: string } | null>(null);

  // const handleDateChange = (range: { from: string; to: string }) => {
  // 	setDateRange(range);
  // 	console.log("Rango seleccionado:", range);
  // };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {subTitle && <CardDescription>{subTitle}</CardDescription>}
          </div>
          {/* FromToDatePicker -> Componente de proyección en el Header */}
          {/* <FromToDatePicker onChange={handleDateChange} /> */}
        </div>
        {/* <p className="text-sm text-gray-500 mt-2">
          Selected range: {dateRange.from} - {dateRange.to}
        </p> */}
      </CardHeader>
      <CardContent>
        <div
          className={clsx(
            'grid gap-4',
            'grid-cols-2 sm:grid-cols-2 lg:grid-cols-4',
          )}>
          {data.map(({ title, amount, percentage, isProfit }) => (
            <div key={title} className="col-span-1">
              <p className="text-sm">{title}</p>
              <p className="text-2xl font-bold">{amount}</p>
              <p
                className={clsx(
                  'flex items-center gap-2 text-sm',
                  isProfit ? 'text-green-500' : 'text-red-500',
                )}>
                <Triangle
                  size={14}
                  className={clsx(
                    'size-3 fill-current',
                    isProfit ? 'text-green-500' : 'rotate-180 text-red-500',
                  )}
                />
                {percentage}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DateInsight;
