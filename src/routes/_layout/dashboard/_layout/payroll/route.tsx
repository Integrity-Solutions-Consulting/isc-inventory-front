import { Circle, TrendingUp } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { createFileRoute } from '@tanstack/react-router';
import UserCard from '@/components/overview/userCard';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { ChartConfig } from '@/components/ui/chart';
import { AreaChartGradient } from '@/components/charts/area-chart-gradient';
import Header from '@/components/overview/header';
import FromToDatePicker from '@/components/overview/fromToDatePicker';
import { useState } from 'react';

//! MOCKS
import {
  CHARTCONFIGGLOBALPAYROLL,
  CHARTDATAPAYROLL,
  TABLEPAYMENT,
} from '@/lib/overviewMock';
import ErrorMessage from '@/components/ui/errorMessage';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/_layout/dashboard/_layout/payroll')({
  component: RouteComponent,
});

const chartData = CHARTDATAPAYROLL;

const chartConfigGlobal = CHARTCONFIGGLOBALPAYROLL satisfies ChartConfig;
const chartConfig = {
  zelle: {
    label: 'Zelle',
    color: '#a855f7',
  },
  wireTransfer: {
    label: 'Wire Transfer',
    color: '#3b82f6',
  },
  dots: {
    label: 'Dots',
    color: '#22c55e',
  },
} satisfies ChartConfig;

function RouteComponent() {
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

  // TABLE PAYMENT
  const tablePaymenetService = TABLEPAYMENT;

  const [errorSimulator, setErrorSimulator] = useState(false);

  const test = () => {
    setErrorSimulator((prev) => !prev);
  };

  return (
    <section className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {/* Header */}
      <Header title="Payroll">
        {/* FromToDatePicker -> Componente de proyección en el Header */}
        <FromToDatePicker onChange={handleDateChange} />
      </Header>

      <div className="rounded-md border">
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              {tablePaymenetService.tableHead.map(({ label, style }) => (
                <TableHead key={label} className={style}>
                  {label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tablePaymenetService.tableBody.map(
              ({ reference, sense, beneficiary, transaction }) => (
                <TableRow>
                  <TableCell className="font-medium">{reference}</TableCell>
                  <TableCell>
                    <UserCard
                      name={sense.fullName}
                      rol={sense.role}
                      image={sense.img}
                      variant="left"
                    />
                  </TableCell>
                  <TableCell>
                    <UserCard
                      name={beneficiary.fullName}
                      rol={beneficiary.role}
                      image={beneficiary.img}
                      variant="left"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <p>{transaction.amount}</p>
                    <p>{transaction.transactionDate}</p>
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* PAYMENTS OVERVIEW */}
        <Card className="w-full md:col-span-3">
          <CardHeader>
            <CardTitle>
              <h2>Payments Overview</h2>
            </CardTitle>
            <CardDescription>
              <p>User group metrics</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AreaChartGradient
              chartData={chartData}
              chartConfig={chartConfigGlobal}
            />
            <div className="w-full pt-4">
              <div>
                <p className="flex justify-center text-2xl font-bold">
                  $52,112
                </p>
                <p className="flex justify-center">Total disbursed</p>
              </div>

              {/* Flash Admins */}
              <div className="mt-4 flex justify-between">
                <div className="flex items-center gap-2">
                  <Circle className="size-3 fill-red-500 text-red-500" />
                  <p>Flash Admins</p>
                </div>
                <p>$48,081</p>
              </div>

              {/* Flash Drivers */}
              <div className="mt-4 flex justify-between">
                <div className="flex items-center gap-2">
                  <Circle className="size-3 fill-orange-500 text-orange-500" />
                  <p>Flash Drivers</p>
                </div>
                <p>$510</p>
              </div>

              {/* Flash Retailers */}
              <div className="mt-4 flex justify-between">
                <div className="flex items-center gap-2">
                  <Circle className="size-3 fill-green-500 text-green-500" />
                  <p>Flash Retailers</p>
                </div>
                <p>$5,841</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 leading-none font-medium">
                  Trending up by 5.2% this month{' '}
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground flex items-center gap-2 leading-none">
                  January - June 2024
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>

        {/* FLASH ADMINS */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <h2>Flash Admins</h2>
            </CardTitle>
            <CardDescription>
              <p>User group metrics</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AreaChartGradient
              chartData={chartData}
              chartConfig={chartConfig}
            />
            <div className="w-full pt-4">
              <div>
                <p className="flex justify-center text-2xl font-bold">
                  $52,112
                </p>
                <p className="flex justify-center">Total disbursed</p>
              </div>

              {/* ZELLE */}
              <div className="mt-4 flex justify-between">
                <div className="flex items-center gap-2">
                  <Circle className="size-3 fill-purple-500 text-purple-500" />
                  <p>Zelle</p>
                </div>
                <p>$48,081</p>
              </div>

              {/* WIRE TRANSFER */}
              <div className="mt-4 flex justify-between">
                <div className="flex items-center gap-2">
                  <Circle className="size-3 fill-blue-500 text-blue-500" />
                  <p>Wire transfer</p>
                </div>
                <p>$510</p>
              </div>

              {/* DOTS */}
              <div className="mt-4 flex justify-between">
                <div className="flex items-center gap-2">
                  <Circle className="size-3 fill-green-500 text-green-500" />
                  <p>Dots</p>
                </div>
                <p>$5,841</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 leading-none font-medium">
                  Trending up by 5.2% this month{' '}
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground flex items-center gap-2 leading-none">
                  January - June 2024
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>

        {/* FLASH Drivers */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <h2>Flash Drivers</h2>
            </CardTitle>
            <CardDescription>
              <p>User group metrics</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AreaChartGradient
              chartData={chartData}
              chartConfig={chartConfig}
            />
            <div className="w-full pt-4">
              <div>
                <p className="flex justify-center text-2xl font-bold">
                  $52,112
                </p>
                <p className="flex justify-center">Total disbursed</p>
              </div>

              {/* ZELLE */}
              <div className="mt-4 flex justify-between">
                <div className="flex items-center gap-2">
                  <Circle className="size-3 fill-purple-500 text-purple-500" />
                  <p>Zelle</p>
                </div>
                <p>$48,081</p>
              </div>

              {/* WIRE TRANSFER */}
              <div className="mt-4 flex justify-between">
                <div className="flex items-center gap-2">
                  <Circle className="size-3 fill-blue-500 text-blue-500" />
                  <p>Wire transfer</p>
                </div>
                <p>$510</p>
              </div>

              {/* DOTS */}
              <div className="mt-4 flex justify-between">
                <div className="flex items-center gap-2">
                  <Circle className="size-3 fill-green-500 text-green-500" />
                  <p>Dots</p>
                </div>
                <p>$5,841</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 leading-none font-medium">
                  Trending up by 5.2% this month{' '}
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground flex items-center gap-2 leading-none">
                  January - June 2024
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>

        {/* FLASH RETAILERS */}
        <Card className="w-full">
          {errorSimulator ? (
            <>
              <CardHeader>
                <CardTitle>
                  <h2>Flash Retailers</h2>
                </CardTitle>
                <CardDescription>
                  <p>User group metrics</p>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AreaChartGradient
                  chartData={chartData}
                  chartConfig={chartConfig}
                />
                <div className="w-full pt-4">
                  <div>
                    <p className="flex justify-center text-2xl font-bold">
                      $52,112
                    </p>
                    <p className="flex justify-center">Total disbursed</p>
                  </div>

                  {/* ZELLE */}
                  <div className="mt-4 flex justify-between">
                    <div className="flex items-center gap-2">
                      <Circle className="size-3 fill-purple-500 text-purple-500" />
                      <p>Zelle</p>
                    </div>
                    <p>$48,081</p>
                  </div>

                  {/* WIRE TRANSFER */}
                  <div className="mt-4 flex justify-between">
                    <div className="flex items-center gap-2">
                      <Circle className="size-3 fill-blue-500 text-blue-500" />
                      <p>Wire transfer</p>
                    </div>
                    <p>$510</p>
                  </div>

                  {/* DOTS */}
                  <div className="mt-4 flex justify-between">
                    <div className="flex items-center gap-2">
                      <Circle className="size-3 fill-green-500 text-green-500" />
                      <p>Dots</p>
                    </div>
                    <p>$5,841</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2 leading-none font-medium">
                      Trending up by 5.2% this month{' '}
                      <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2 leading-none">
                      January - June 2024
                    </div>
                  </div>
                </div>
              </CardFooter>
            </>
          ) : (
            <CardContent>
              <ErrorMessage>
                <Button onClick={test}>Reintentar</Button>
              </ErrorMessage>
            </CardContent>
          )}
        </Card>
      </div>
    </section>
  );
}
