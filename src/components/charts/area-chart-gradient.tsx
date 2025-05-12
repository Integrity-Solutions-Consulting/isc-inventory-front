'use client';

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

type AreaChartGradientProps = {
  chartData: {
    label: string;
    zelle: number;
    wireTransfer: number;
    dots: number;
  }[];
  chartConfig: ChartConfig;
};

export function AreaChartGradient({
  chartData,
  chartConfig,
}: AreaChartGradientProps) {
  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

        <defs>
          {Object.entries(chartConfig).map(([key, { color }]) => (
            <linearGradient
              key={key}
              id={`fill${key}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={color} stopOpacity={0.1} />
            </linearGradient>
          ))}
        </defs>

        {Object.keys(chartConfig).map((key) => (
          <Area
            key={key}
            dataKey={key}
            type="natural"
            fill={`url(#fill${key})`}
            fillOpacity={0.4}
            stroke={chartConfig[key].color}
            stackId="a"
          />
        ))}
      </AreaChart>
    </ChartContainer>
  );
}
