// "use client"

// import { useMemo } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { type ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/chart"
// import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
// import type { CountryAgeData } from "@/types/tourism-data"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useState } from "react"

// interface AgeDistributionChartProps {
//   data: CountryAgeData[]
//   year: string
// }

// const chartConfig = {
//   "18-24": {
//     label: "18-24",
//     color: "hsl(var(--chart-1))",
//   },
//   "25-34": {
//     label: "25-34",
//     color: "hsl(var(--chart-2))",
//   },
//   "35-44": {
//     label: "35-44",
//     color: "hsl(var(--chart-3))",
//   },
//   "45-54": {
//     label: "45-54",
//     color: "hsl(var(--chart-4))",
//   },
//   "55-64": {
//     label: "55-64",
//     color: "hsl(var(--chart-5))",
//   },
//   "65+": {
//     label: "65+",
//     color: "hsl(var(--chart-6))",
//   },
// } satisfies ChartConfig

// export function AgeDistributionChart({ data, year }: AgeDistributionChartProps) {
//   const [selectedCountry, setSelectedCountry] = useState<string>(data[0]?.country || "")

//   // Get list of countries
//   const countries = useMemo(() => {
//     return data.map((item) => item.country)
//   }, [data])

//   // Get age distribution for selected country
//   const ageData = useMemo(() => {
//     const country = data.find((item) => item.country === selectedCountry)
//     if (!country) return []

//     return Object.entries(country.ageGroups).map(([age, value]) => ({
//       name: age,
//       value,
//     }))
//   }, [data, selectedCountry])

//   // Calculate total for selected country
//   const totalVisitors = useMemo(() => {
//     const country = data.find((item) => item.country === selectedCountry)
//     return country?.total || 0
//   }, [data, selectedCountry])

//   // Colors for the pie chart
//   const COLORS = [
//     "var(--color-18-24)",
//     "var(--color-25-34)",
//     "var(--color-35-44)",
//     "var(--color-45-54)",
//     "var(--color-55-64)",
//     "var(--color-65+)",
//   ]

//   return (
//     <Card>
//       <CardHeader>
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
//           <div>
//             <CardTitle>Age Distribution {year}</CardTitle>
//             <CardDescription>Tourist age groups by country</CardDescription>
//           </div>
//           <Select value={selectedCountry} onValueChange={setSelectedCountry}>
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Select country" />
//             </SelectTrigger>
//             <SelectContent>
//               {countries.map((country) => (
//                 <SelectItem key={country} value={country}>
//                   {country}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="relative w-full h-[350px] flex items-center justify-center">
//           <ChartContainer config={chartConfig}>
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={ageData}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={60}
//                   outerRadius={120}
//                   paddingAngle={2}
//                   dataKey="value"
//                   label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
//                   labelLine={true}
//                 >
//                   {ageData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <ChartTooltip
//                   content={({ active, payload }) => {
//                     if (active && payload && payload.length) {
//                       const data = payload[0].payload
//                       return (
//                         <div className="rounded-lg border bg-background p-2 shadow-sm">
//                           <div className="grid gap-2">
//                             <div className="font-medium">{data.name} age group</div>
//                             <div className="grid grid-cols-2 gap-2">
//                               <div className="flex flex-col">
//                                 <span className="text-[0.70rem] uppercase text-muted-foreground">Tourists</span>
//                                 <span className="font-bold">{data.value.toLocaleString()}</span>
//                               </div>
//                               <div className="flex flex-col">
//                                 <span className="text-[0.70rem] uppercase text-muted-foreground">Percentage</span>
//                                 <span className="font-bold">{((data.value / totalVisitors) * 100).toFixed(1)}%</span>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       )
//                     }
//                     return null
//                   }}
//                 />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </ChartContainer>
//           <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
//             <span className="text-3xl font-bold">{totalVisitors.toLocaleString()}</span>
//             <span className="text-sm text-muted-foreground">Total Visitors</span>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }


"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import type { CountryAgeData } from "@/types/tourism-data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

interface AgeDistributionChartProps {
  data: CountryAgeData[]
  year: string
}

export function AgeDistributionChart({ data, year }: AgeDistributionChartProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>(data[0]?.country || "")

  // Get list of countries
  const countries = useMemo(() => {
    return data.map((item) => item.country)
  }, [data])

  // Get age distribution for selected country
  const ageData = useMemo(() => {
    const country = data.find((item) => item.country === selectedCountry)
    if (!country) return []

    return Object.entries(country.ageGroups).map(([age, value]) => ({
      name: age,
      value,
    }))
  }, [data, selectedCountry])

  // Calculate total for selected country
  const totalVisitors = useMemo(() => {
    const country = data.find((item) => item.country === selectedCountry)
    return country?.total || 0
  }, [data, selectedCountry])

  // Colors for the pie chart using shadcn CSS variables
  const COLORS = [
    "hsl(var(--chart-1))", // Blue
    "hsl(var(--chart-2))", // Green
    "hsl(var(--chart-3))", // Orange
    "hsl(var(--chart-4))", // Cyan
    "hsl(var(--chart-5))", // Pink
    "hsl(var(--chart-6))", // Emerald
  ]

  // Calculate percentages for labels
  const ageDataWithPercentage = useMemo(() => {
    return ageData.map((item) => {
      const percentage = ((item.value / totalVisitors) * 100).toFixed(1)
      return {
        ...item,
        percentage,
      }
    })
  }, [ageData, totalVisitors])

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
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name, props) => {
                  return [`${value.toLocaleString()} (${props.payload.percentage}%)`, name]
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-3xl font-bold">{totalVisitors.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">Total Visitors</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
