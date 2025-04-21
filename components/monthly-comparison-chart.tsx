"use client";

import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { MonthlyRevenueData } from "@/types/tourism-data";

interface MonthlyComparisonChartProps {
  currentYearData: MonthlyRevenueData[];
  previousYearData: MonthlyRevenueData[];
  currentYear: string;
  previousYear: string;
}

const chartConfig = {
  currentYear: {
    label: "Current Year",
    color: "hsl(var(--chart-1))",
  },
  previousYear: {
    label: "Previous Year",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function MonthlyComparisonChart({
  currentYearData,
  previousYearData,
  currentYear,
  previousYear,
}: MonthlyComparisonChartProps) {
  // Format large numbers with k and M suffixes
  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
    return value;
  };

  // Prepare data for the chart
  const chartData = useMemo(() => {
    return currentYearData.map((item, index) => {
      const prevItem = previousYearData[index] || { touristCount: 0 };
      return {
        month: item.month.substring(0, 3), // Abbreviate month names
        [currentYear]: item.touristCount,
        [previousYear]: prevItem.touristCount,
        fullMonth: item.month,
      };
    });
  }, [currentYearData, previousYearData, currentYear, previousYear]);

  // Calculate the maximum value for the Y-axis
  const maxTouristCount = Math.max(
    ...currentYearData.map((item) => item.touristCount),
    ...previousYearData.map((item) => item.touristCount)
  );

  return (
    <Card className="w-full xl:w-[40vw]  lg:max-w-xl">
      <CardHeader>
        <CardTitle>Monthly Tourist Comparison</CardTitle>
        <CardDescription>
          {currentYear} vs {previousYear} tourist arrivals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.2}
              />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={formatYAxis}
                domain={[0, Math.ceil(maxTouristCount / 50000) * 50000]}
              />
              <ChartTooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const fullMonth = payload[0].payload.fullMonth;
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid gap-2">
                          <div className="font-medium">{fullMonth}</div>
                          <div className="grid gap-2">
                            {payload.map((entry, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2"
                              >
                                <div
                                  className="h-2 w-2 rounded-full"
                                  style={{ backgroundColor: entry.color }}
                                ></div>
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  {entry.name} Tourists
                                </span>
                                <span className="font-bold">
                                  {entry.value.toLocaleString()}
                                </span>
                              </div>
                            ))}
                            {payload.length === 2 && (
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Difference
                                </span>
                                <span
                                  className={`font-bold ${
                                    payload[0].value - payload[1].value > 0
                                      ? "text-emerald-500"
                                      : "text-destructive"
                                  }`}
                                >
                                  {(
                                    payload[0].value - payload[1].value
                                  ).toLocaleString()}{" "}
                                  (
                                  {payload[1].value
                                    ? (
                                        ((payload[0].value - payload[1].value) /
                                          payload[1].value) *
                                        100
                                      ).toFixed(1)
                                    : "100"}
                                  %)
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey={currentYear}
                fill="var(--color-currentYear)"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey={previousYear}
                fill="var(--color-previousYear)"
                radius={[4, 4, 0, 0]}
              />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
