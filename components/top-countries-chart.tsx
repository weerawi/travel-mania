"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Cell } from "recharts"
import type { CountryAgeData } from "@/types/tourism-data"

interface TopCountriesChartProps {
  data: CountryAgeData[]
  year: string
  limit?: number
}

const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function TopCountriesChart({ data, year, limit = 10 }: TopCountriesChartProps) {
  // Format large numbers with k and M suffixes
  const formatXAxis = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `${(value / 1000).toFixed(0)}k`
    return value
  }

  // Prepare data for the chart - top countries by visitor count
  const chartData = useMemo(() => {
    return [...data]
      .sort((a, b) => b.total - a.total)
      .slice(0, limit)
      .map((item, index) => ({
        country: item.country,
        visitors: item.total,
        color: `hsl(var(--chart-${(index % 10) + 1}))`,
      }))
  }, [data, limit])

  // Calculate total visitors
  const totalVisitors = useMemo(() => {
    return data.reduce((sum, item) => sum + item.total, 0)
  }, [data])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Tourist Source Countries {year}</CardTitle>
        <CardDescription>Top {limit} countries by visitor count</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
              <CartesianGrid horizontal strokeDasharray="3 3" opacity={0.2} />
              <XAxis type="number" tickFormatter={formatXAxis} axisLine={false} tickLine={false} />
              <YAxis
                type="category"
                dataKey="country"
                axisLine={false}
                tickLine={false}
                width={70}
                tick={{ fontSize: 12 }}
              />
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid gap-2">
                          <div className="font-medium">{data.country}</div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">Visitors</span>
                              <span className="font-bold">{data.visitors.toLocaleString()}</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">Share</span>
                              <span className="font-bold">{((data.visitors / totalVisitors) * 100).toFixed(1)}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="visitors" radius={[0, 4, 4, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
