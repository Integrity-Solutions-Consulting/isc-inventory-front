
import {
  Content,
  ContentHeader,
  ContentLabel,
} from '@/components/custom/content';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SelectDatePicker } from '@/components/custom/select-daypicker';
import { CardChartDashboard } from '@/components/card-chart-dashboard';
import { MdPropaneTank, MdPropane } from 'react-icons/md';
import { createFileRoute } from '@tanstack/react-router';
import { TbScubaDivingTankFilled } from 'react-icons/tb';
import { LuShoppingCart, LuTrendingUp } from 'react-icons/lu';
import { Label, Pie, PieChart } from 'recharts';
import { useMemo } from 'react';

const cards = [
  {
    title: 'buy equipament',
    icon: LuShoppingCart,
    amount: '$45,321.89',
    percentage: '+20.1% from last month',
    chartData: [
      { month: 'January', desktop: 186 },
      { month: 'February', desktop: 305 },
      { month: 'March', desktop: 237 },
      { month: 'April', desktop: 73 },
      { month: 'May', desktop: 209 },
      { month: 'June', desktop: 214 },
    ],
    chartConfig: {
      desktop: {
        label: 'Desktop',
        color: 'var(--chart-2)',
      },
    },
  },

  {
    title: 'exchange tanks',
    icon: TbScubaDivingTankFilled,
    amount: '$45,321.89',
    percentage: '+20.1% from last month',
    chartData: [
      { month: 'January', desktop: 186 },
      { month: 'February', desktop: 305 },
      { month: 'March', desktop: 237 },
      { month: 'April', desktop: 73 },
      { month: 'May', desktop: 209 },
      { month: 'June', desktop: 214 },
    ],
    chartConfig: {
      desktop: {
        label: 'Desktop',
        color: 'var(--chart-2)',
      },
    },
  },

  {
    title: 'refill portable',
    icon: MdPropaneTank,
    amount: '$45,321.89',
    percentage: '+20.1% from last month',
    chartData: [
      { month: 'January', desktop: 186 },
      { month: 'February', desktop: 305 },
      { month: 'March', desktop: 237 },
      { month: 'April', desktop: 73 },
      { month: 'May', desktop: 209 },
      { month: 'June', desktop: 214 },
    ],
    chartConfig: {
      desktop: {
        label: 'Desktop',
        color: 'var(--chart-2)',
      },
    },
  },

  {
    title: 'refill stationary',
    icon: MdPropane,
    amount: '$45,321.89',
    percentage: '+20.1% from last month',
    chartData: [
      { month: 'January', desktop: 186 },
      { month: 'February', desktop: 305 },
      { month: 'March', desktop: 237 },
      { month: 'April', desktop: 73 },
      { month: 'May', desktop: 209 },
      { month: 'June', desktop: 214 },
    ],
    chartConfig: {
      desktop: {
        label: 'Desktop',
        color: 'var(--chart-2)',
      },
    },
  },
];


const chartData = [
  { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
  { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
  { browser: 'firefox', visitors: 287, fill: 'var(--color-firefox)' },
  { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
  { browser: 'other', visitors: 190, fill: 'var(--color-other)' },
];
function SalesIndexComponent() {

  const totalVisitors = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <>
      <Content>
        <ContentHeader>
          <section className="flex w-full flex-row justify-between">
            <ContentLabel type="title">Sales</ContentLabel>
            <SelectDatePicker />
          </section>
        </ContentHeader>

        <div className="grid auto-rows-min grid-cols-1 gap-4 py-2 lg:grid-cols-2 2xl:grid-cols-4">
          {cards.map((item) => (
            <CardChartDashboard
              key={item.title}
              icon={item.icon}
              isLoading={false}
              title={item.title}
              amount={item.amount}
              chartData={item.chartData}
              percentage={item.percentage}
              chartConfig={item.chartConfig}
            />
          ))}
        </div>

        <div className="grid auto-rows-min grid-cols-3 gap-4 py-2">
          <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
              <CardTitle>Pie Chart - Donut with Text</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                className="mx-auto aspect-square max-h-[250px]"
                config={{
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
                }}
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={chartData}
                    dataKey="visitors"
                    nameKey="browser"
                    innerRadius={60}
                    strokeWidth={5}>
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle">
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground z-50 text-3xl font-bold">
                                {totalVisitors.toLocaleString()}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground">
                                Visitors
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 leading-none font-medium">
                Trending up by 5.2% this month <LuTrendingUp className="h-4 w-4" />
              </div>
              <div className="text-muted-foreground leading-none">
                Showing total visitors for the last 6 months
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="flex w-full flex-row justify-between">
              <div>
                <CardTitle className='capitalize'>top retailers</CardTitle>
                <CardDescription>Showing user top sellers</CardDescription>

              </div>
              <div className="flex w-full items-start justify-end gap-2 text-sm">
                <div className="grid gap-2">
                  <div className="flex items-center gap-2 leading-none font-medium">
                    Trending up by 5.2% this month{' '}
                    <LuTrendingUp className="text-primary h-4 w-4" />
                  </div>
                  <div className="text-muted-foreground flex items-center gap-2 leading-none">
                    January - June 2024
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[0, 1, 2, 3, 4, 5].map((item) => (
                <section key={item} className="flex items-center">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm leading-none font-medium">
                      Olivia Martin
                    </p>
                    <p className="text-muted-foreground text-sm">
                      olivia.martin@email.com
                    </p>
                  </div>
                  <div className="ml-auto font-medium">+$1,999.00</div>
                </section>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex w-full flex-row justify-between">
              <div>
                <CardTitle className='capitalize'>top sales zones</CardTitle>
                <CardDescription>Showing user top sellers</CardDescription>

              </div>
              <div className="flex w-full items-start justify-end gap-2 text-sm">
                <div className="grid gap-2">
                  <div className="flex items-center gap-2 leading-none font-medium">
                    Trending up by 5.2% this month{' '}
                    <LuTrendingUp className="text-primary h-4 w-4" />
                  </div>
                  <div className="text-muted-foreground flex items-center gap-2 leading-none">
                    January - June 2024
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[0, 1, 2, 3, 4, 5].map((item) => (
                <section key={item} className="flex items-center">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm leading-none font-medium">
                      Olivia Martin
                    </p>
                    <p className="text-muted-foreground text-sm">
                      olivia.martin@email.com
                    </p>
                  </div>
                  <div className="ml-auto font-medium">+$1,999.00</div>
                </section>
              ))}
            </CardContent>
          </Card>
        </div>
      </Content>
    </>
  );
}

export const Route = createFileRoute('/_layout/dashboard/_layout/sales/')({
  component: SalesIndexComponent,
});

// <Card>
// <CardHeader>
//   <CardTitle>Recent Sales</CardTitle>
//   <CardDescription>You made 265 sales this month.</CardDescription>
// </CardHeader>
// <CardContent className="block space-y-4">
//   {[...Array(9)].map((item) => (
//     <div key={item} className="flex items-center">
//       <Avatar>
//         <AvatarImage src="https://ui.shadcn.com/avatars/01.png" />
//         <AvatarFallback>CN</AvatarFallback>
//       </Avatar>
//       <div className="ml-4 space-y-1">
//         <p className="text-sm leading-none font-medium">
//           Olivia Martin
//         </p>
//         <p className="text-muted-foreground text-sm">
//           olivia.martin@email.com
//         </p>
//       </div>
//       <div className="ml-auto">
//         <p className="text-muted-foreground text-right text-sm">
//           02/02/2020
//         </p>
//         <p className="text-right text-sm leading-none font-medium">
//           $45,525.85
//         </p>
//       </div>
//     </div>
//   ))}
// </CardContent>
// </Card>

{
  /* <section className="container flex flex-1 flex-col gap-4 p-4 pt-0">
<div className="flex flex-row items-center justify-between">
  <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
    Sales
  </h1>

  <Select>
    <SelectTrigger className="w-[280px]">
      <SelectValue placeholder="Select a timezone" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>North America</SelectLabel>
        <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
        <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
        <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
        <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
        <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
        <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</div>
<div className="grid auto-rows-min grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-4">
  {cards.map((item) => (
    <CardChartDashboard
      key={item.title}
      isLoading={false}
      title={item.title}
      amount={item.amount}
      imageUrl={item.image}
      chartData={item.chartData}
      percentage={item.percentage}
      chartConfig={item.chartConfig}
    />
  ))}
</div>

<div className="grid auto-rows-min grid-cols-2 gap-4">
  <div>
    <AreaChartStacked />
  </div>

  <div>
    <PieChartDonutText />
  </div>
</div>

</div >
</section > 
<div>
*/
}
{
  /* <DataTable columns={columns} data={data} /> */
}
