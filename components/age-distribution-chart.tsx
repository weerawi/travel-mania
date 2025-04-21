"use client";

import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { CountryAgeData } from "@/types/tourism-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface AgeDistributionChartProps {
  data: CountryAgeData[];
  year: string;
}

export function AgeDistributionChart({
  data,
  year,
}: AgeDistributionChartProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>(
    data[0]?.country || ""
  );

  // Get list of countries
  const countries = useMemo(() => {
    return data.map((item) => item.country);
  }, [data]);

  // Get age distribution for selected country
  const ageData = useMemo(() => {
    const country = data.find((item) => item.country === selectedCountry);
    if (!country) return [];

    return Object.entries(country.ageGroups).map(([age, value]) => ({
      name: age,
      value,
    }));
  }, [data, selectedCountry]);

  // Calculate total for selected country
  const totalVisitors = useMemo(() => {
    const country = data.find((item) => item.country === selectedCountry);
    return country?.total || 0;
  }, [data, selectedCountry]);

  // Colors for the pie chart using shadcn CSS variables
  const COLORS = [
    "hsl(var(--chart-1))", // Blue
    "hsl(var(--chart-2))", // Green
    "hsl(var(--chart-3))", // Orange
    "hsl(var(--chart-4))", // Cyan
    "hsl(var(--chart-5))", // Pink
    "hsl(var(--chart-6))", // Emerald
  ];

  // Calculate percentages for labels
  const ageDataWithPercentage = useMemo(() => {
    return ageData.map((item) => {
      const percentage = ((item.value / totalVisitors) * 100).toFixed(1);
      return {
        ...item,
        percentage,
      };
    });
  }, [ageData, totalVisitors]);

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <CardTitle>Age Distribution {year}</CardTitle>
            <CardDescription>Tourist age groups by country</CardDescription>
          </div>
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[250px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={ageDataWithPercentage}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percentage }) => `${name}: ${percentage}%`}
                labelLine={true}
              >
                {ageDataWithPercentage.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name, props) => {
                  return [
                    `${value.toLocaleString()} (${props.payload.percentage}%)`,
                    name,
                  ];
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-3xl font-bold">
              {totalVisitors.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground">
              Total Visitors
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
