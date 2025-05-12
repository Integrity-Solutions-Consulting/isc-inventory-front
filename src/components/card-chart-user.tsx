import { Card, CardHeader, CardContent } from '@/components/ui/card';

import { LucideProps, Triangle } from 'lucide-react';
import { PropsWithChildren } from 'react';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import { Line, LineChart } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';

interface CardChartUsersProps {
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  title: string;
  amount: string;
  percentage: string;
  chartConfig: ChartConfig;
  chartData: unknown[];
  isLoading: boolean;
}

function CardChartUsers({
  title,
  icon: Icon,
  chartConfig,
  chartData,
  isLoading,
  percentage,
}: PropsWithChildren<CardChartUsersProps>) {
  const index = 1;
  return (
    <Card className="bg-gradient-to-r from-transparent to-orange-900/15">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h2 className="text-sm font-medium tracking-tight capitalize">
          {title}
        </h2>
        <Icon size={24} className="card-icon" />
      </CardHeader>
      <CardContent className="grid grid-cols-2">
        {isLoading ? (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-36 rounded-full" />
            <Skeleton className="h-4 w-40 rounded-full" />
          </div>
        ) : (
          <div>
            <span className="text-2xl font-bold">$45,321.89</span>
            <p className="text-muted-foreground flex items-center gap-1 text-xs">
              {index % 2 === 0 ? (
                <Triangle className="size-3 fill-green-700 text-green-700" />
              ) : (
                <Triangle className="size-3 rotate-180 fill-red-700 text-red-700" />
              )}
              {percentage}
            </p>
          </div>
        )}
        <div>
          <ChartContainer className="h-9 w-full" config={chartConfig}>
            <LineChart accessibilityLayer data={chartData}>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="desktop"
                type="natural"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}

CardChartUsers.DisplayName = 'CardChartUsers';

export default CardChartUsers;
