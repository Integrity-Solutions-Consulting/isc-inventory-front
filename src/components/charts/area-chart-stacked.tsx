import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { LuShoppingCart } from 'react-icons/lu';

const chartData = [
  { month: 'January', desktop: 186, mobile: 80, web: 200, web2: 200 },
  { month: 'February', desktop: 305, mobile: 200, web: 200, web2: 200 },
  { month: 'March', desktop: 237, mobile: 120, web: 200, web2: 200 },
  { month: 'April', desktop: 73, mobile: 190, web: 200, web2: 200 },
  { month: 'May', desktop: 209, mobile: 130, web: 200, web2: 200 },
  { month: 'June', desktop: 214, mobile: 140, web: 200, web2: 200 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
    icon: LuShoppingCart,
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--chart-2)',
    icon: LuShoppingCart,
  },
  web: {
    label: 'web',
    color: 'var(--chart-2)',
    icon: LuShoppingCart,
  },
  web2: {
    label: 'web2',
    color: 'var(--chart-2)',
    icon: LuShoppingCart,
  },
} satisfies ChartConfig;

export function AreaChartStacked() {
  return (
    <Card>
      <CardHeader className="flex w-full flex-row justify-between">
        <div>
          <CardTitle>Area Chart - Stacked</CardTitle>
          <CardDescription>
            Showing total visitors for the last 6 months
          </CardDescription>
        </div>
        <div className="flex w-full items-start justify-end gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this month{' '}
              <TrendingUp className="text-primary h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              January - June 2024
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-72 w-full" config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="var(--color-mobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="b"
            />

            <Area
              dataKey="web"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="c"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
