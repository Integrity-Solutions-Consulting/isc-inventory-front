import { createFileRoute } from '@tanstack/react-router';
import DateInsight from '@/components/overview/dateInsught';
import type { ChartConfig } from '@/components/ui/chart';
import Header from '@/components/overview/header';
import { useState } from 'react';
import {
  CHARTWEEK,
  DATAADMIN,
  DATADRIVER,
  DATAGAS,
  DATAGENERAL,
  DATARETAIL,
} from '@/lib/overviewMock';
import { AreaChartStackedCustom } from '@/components/overview/area-chart-stacked-custom';
import FromToDatePicker from '@/components/overview/fromToDatePicker';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Circle, TrendingUp } from 'lucide-react';

export const Route = createFileRoute('/_layout/dashboard/_layout/')({
  component: RouteComponent,
});

const chartConfig = {
  captured: {
    label: 'Captured',
    color: '#eab308',
  },
  authorized: {
    label: 'Authorized',
    color: '#22c55e',
  },
  refunded: {
    label: 'Refunded',
    color: '#ef4444',
  },
  voided: {
    label: 'Voided',
    color: '#3b82f6',
  },
} satisfies ChartConfig;

function RouteComponent() {
  // Request Mock
  const dataGeneral = DATAGENERAL;
  const dataGas = DATAGAS;
  const dataDriver = DATADRIVER;
  const dataRetail = DATARETAIL;
  const dataAdmin = DATAADMIN;

  // Chart
  const chartData = CHARTWEEK;

  // Date Range Select
  const [dateRange, setDateRange] = useState<{
    from: string;
    to: string;
  } | null>(null);
  console.log(dateRange);

  const handleDateChange = (range: { from: string; to: string }) => {
    setDateRange(range);
    console.log('Rango seleccionado:', range);
  };

  return (
    <div>
      {/* Header */}
      <Header title="Overview">
        {/* FromToDatePicker -> Componente de proyección en el Header */}
        <FromToDatePicker onChange={handleDateChange} />
      </Header>

      {/* Layout */}
      <div className="flex flex-wrap gap-4 p-4 pt-0">
        {/* Card F-General */}
        <div className="w-full">
          <DateInsight title="Flash General" subTitle="" data={dataGeneral} />
        </div>

        {/* Chart */}
        <Card className="w-full">
          <CardHeader className="flex w-full flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Sales Analytics</CardTitle>
            <FromToDatePicker onChange={handleDateChange} />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap">
              <div className="md:1/2 w-full lg:w-2/3">
                <AreaChartStackedCustom
                  chartConfig={chartConfig}
                  chartData={chartData}
                />
              </div>
              <div className="md:1-2 my-auto w-full pt-4 lg:w-1/3">
                <div>
                  <p className="flex justify-center text-2xl font-bold">
                    $52,112
                  </p>
                  <p className="flex justify-center">Total Fuel Earnings</p>
                </div>
                <div className="mt-4 flex justify-between">
                  <div className="flex items-center gap-2">
                    <Circle className="size-3 fill-yellow-500 text-yellow-500" />
                    <p>Captured</p>
                  </div>
                  <p>$48,081</p>
                </div>
                <div className="mt-4 flex justify-between">
                  <div className="flex items-center gap-2">
                    <Circle className="size-3 fill-green-500 text-green-500" />
                    <p>Authorized</p>
                  </div>
                  <p>$5,841</p>
                </div>
                <div className="mt-4 flex justify-between">
                  <div className="flex items-center gap-2">
                    <Circle className="size-3 fill-red-500 text-red-500" />
                    <p>Refunded</p>
                  </div>
                  <p>$1,810</p>
                </div>
                <div className="mt-4 flex justify-between">
                  <div className="flex items-center gap-2">
                    <Circle className="size-3 fill-blue-500 text-blue-500" />
                    <p>Voided</p>
                  </div>
                  <p>$510</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full flex-col items-center gap-2 md:items-start">
              <p className="flex gap-2 font-medium">
                Trending up by 5.2% this week <TrendingUp className="h-4 w-4" />
              </p>
              <p className="text-muted-foreground leading-none">
                14-02-2025 - 21-02-2025
              </p>
            </div>
          </CardFooter>
        </Card>

        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <div className="">
            <DateInsight
              title="Flash Gas"
              subTitle="User group metrics"
              data={dataGas}
            />
          </div>
          <div className="">
            <DateInsight
              title="Flash Drivers"
              subTitle="User group metrics"
              data={dataDriver}
            />
          </div>
          <div className="">
            <DateInsight
              title="Flash Retailers"
              subTitle="User group metrics"
              data={dataRetail}
            />
          </div>
          <div className="">
            <DateInsight
              title="Flash Admins"
              subTitle="User group metrics"
              data={dataAdmin}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
