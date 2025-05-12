import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface AreaChartStackedCustomProps {
  chartConfig: ChartConfig;
  chartData: Array<{ label: string; [key: string]: number }>;
}

export function AreaChartStackedCustom({
  chartConfig,
  chartData,
}: AreaChartStackedCustomProps) {
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
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        {Object.keys(chartConfig).map((key) => (
          <Area
            key={key}
            dataKey={key}
            type="natural"
            fill={chartConfig[key].color}
            fillOpacity={0.4}
            stroke={chartConfig[key].color}
            stackId="a"
          />
        ))}
      </AreaChart>
    </ChartContainer>
  );
}
