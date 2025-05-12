import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChartDonutText } from '@/components/charts/pie-chart-donut-text'
import { Building2, Truck, User2Icon } from 'lucide-react'
import CardChartUsers from '@/components/card-chart-user'
import { createFileRoute } from '@tanstack/react-router'
import { ChartConfig } from '@/components/ui/chart'
import { Content, ContentHeader, ContentLabel } from "@/components/custom/content"


// import { useFlashGasFetchUsers } from '@/hooks/use-flashgas-fetch-users'

const cards = [
  {
    title: 'Users',
    icon: User2Icon,
    amount: '45',
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
    } satisfies ChartConfig,
  },

  {
    title: 'drivers',
    amount: '45',
    icon: Truck,
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
    title: 'retailers',
    amount: '45',
    icon: Building2,
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
    amount: '45',
    icon: User2Icon,
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



function RouteComponent() {

  return (
    <Content>
      <ContentHeader>
        <section className="flex w-full flex-row justify-between">
          <ContentLabel type="title">users</ContentLabel>
        </section>
      </ContentHeader>
      <Tabs defaultValue="Overview" className="">
        <TabsList>
          <TabsTrigger value="Overview">Overview</TabsTrigger>
          <TabsTrigger value="Users">Users</TabsTrigger>
          <TabsTrigger value="Retailers">Retailers</TabsTrigger>
          <TabsTrigger value="Drivers">Drivers</TabsTrigger>

        </TabsList>
        <TabsContent className="space-y-4" value="Overview">

          <div className="grid auto-rows-min grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-4 container">
            {cards.map((item) => (
              <CardChartUsers
                key={item.title}
                isLoading={false}
                icon={item.icon}
                title={item.title}
                amount={item.amount}
                chartData={item.chartData}
                percentage={item.percentage}
                chartConfig={item.chartConfig}
              />
            ))}

          </div>
          <div className='grid auto-rows-min grid-cols-1 gap-4 lg:grid-cols-2 container'>
            <PieChartDonutText />
            <div >
              <div>

              </div>
            </div>
          </div>

        </TabsContent>
        <TabsContent value="Users">  </TabsContent>
        <TabsContent value="Retailers">Make changes to your account here.</TabsContent>
        <TabsContent value="Drivers">Change your password here.</TabsContent>
      </Tabs>


    </Content>
  )
}

export const Route = createFileRoute('/_layout/dashboard/_layout/users')({
  component: RouteComponent,
})

