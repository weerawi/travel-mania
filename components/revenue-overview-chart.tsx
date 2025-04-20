"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import type { MonthlyRevenueData } from "@/types/tourism-data"

interface RevenueOverviewChartProps {
  data: MonthlyRevenueData[]
  year: string
}

const chartConfig = {
  touristCount: {
    label: "Tourist Count",
    color: "hsl(var(--chart-1))",
  },
  totalRevenue: {
    label: "Total Revenue (USD)",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function RevenueOverviewChart({ data, year }: RevenueOverviewChartProps) {
  // Format large numbers with k and M suffixes
  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `${(value / 1000).toFixed(0)}k`
    return value
  }

  // Prepare data for the chart
  const chartData = useMemo(() => {
    return data.map((item) => ({
      month: item.month.substring(0, 3), // Abbreviate month names
      touristCount: item.touristCount,
      totalRevenue: Math.round(item.totalRevenue),
      averageUSD: item.averageUSD,
      averageDuration: item.averageDuration,
    }))
  }, [data])

  // Calculate total tourists and revenue
  const totalTourists = useMemo(() => {
    return data.reduce((sum, item) => sum + item.touristCount, 0)
  }, [data])

  const totalRevenue = useMemo(() => {
    return data.reduce((sum, item) => sum + item.totalRevenue, 0)
  }, [data])

  // Calculate the maximum values for the Y-axes
  const maxTouristCount = Math.max(...data.map((item) => item.touristCount))
  const maxRevenue = Math.max(...data.map((item) => item.totalRevenue))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tourism Revenue Overview {year}</CardTitle>
        <CardDescription>Monthly tourist arrivals and revenue</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis
                yAxisId="left"
                axisLine={false}
                tickLine={false}
                tickFormatter={formatYAxis}
                domain={[0, Math.ceil(maxTouristCount / 50000) * 50000]}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                axisLine={false}
                tickLine={false}
                tickFormatter={formatYAxis}
                domain={[0, Math.ceil(maxRevenue / 100000) * 100000]}
              />
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid gap-2">
                          <div className="font-medium">{payload[0].payload.month}</div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">Tourists</span>
                              <span className="font-bold">{payload[0].payload.touristCount.toLocaleString()}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">Revenue</span>
                              <span className="font-bold">${payload[0].payload.totalRevenue.toLocaleString()}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">Avg. USD</span>
                              <span className="font-bold">${payload[0].payload.averageUSD}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">Avg. Stay</span>
                              <span className="font-bold">{payload[0].payload.averageDuration} days</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="touristCount"
                stroke="var(--color-touristCount)"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="totalRevenue"
                stroke="var(--color-totalRevenue)"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-3">
        <Badge variant="outline" className="flex items-center gap-2 px-3 py-1.5 rounded-full">
          <span className="h-3 w-3 rounded-full bg-[hsl(var(--chart-1))]"></span>
          <span>Tourist Count</span>
          <span className="text-muted-foreground">{totalTourists.toLocaleString()}</span>
        </Badge>
        <Badge variant="outline" className="flex items-center gap-2 px-3 py-1.5 rounded-full">
          <span className="h-3 w-3 rounded-full bg-[hsl(var(--chart-2))]"></span>
          <span>Total Revenue</span>
          <span className="text-muted-foreground">${Math.round(totalRevenue).toLocaleString()}</span>
        </Badge>
      </CardFooter>
    </Card>
  )
}
