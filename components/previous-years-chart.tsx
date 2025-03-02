// "use client"

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
// import { Badge } from "@/components/ui/badge"

// // Define the data structure
// interface TourismData {
//   year: string
//   allCategories: number
//   business: number
//   pleasure: number
//   mice: number
//   visiting: number
// }

// interface TourismCategoryChartProps {
//   data: TourismData[]
// }

// export function TourismCategoryChart({ data }: TourismCategoryChartProps) {
//   // Define colors for each category
//   const colors = {
//     allCategories: "#8b5cf6", // Purple
//     business: "#10b981", // Green
//     pleasure: "#3b82f6", // Blue
//     mice: "#ec4899", // Pink
//     visiting: "#a855f7", // Light purple
//   }

//   // Format large numbers with k and M suffixes
//   const formatYAxis = (value: number) => {
//     if (value >= 1000000) return `${value / 1000000}M`
//     if (value >= 1000) return `${value / 1000}k`
//     return value
//   }

//   // Calculate percentages for the legend
//   const percentages = {
//     business: 37,
//     pleasure: 23,
//     mice: 29,
//     visiting: 21,
//   }

//   return (
//     <Card className="w-full">
//       <CardHeader>
//         <CardTitle className="text-lg font-medium">Statistics</CardTitle>
//         <CardDescription className="text-base font-semibold">Total Category of Tourism</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <div className="h-[300px]">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart
//               data={data}
//               margin={{
//                 top: 20,
//                 right: 30,
//                 left: 20,
//                 bottom: 5,
//               }}
//               barGap={2}
//               barSize={15}
//             >
//               <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
//               <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
//               <YAxis
//                 axisLine={false}
//                 tickLine={false}
//                 tick={{ fontSize: 12 }}
//                 tickFormatter={formatYAxis}
//                 domain={[0, 1500000]}
//                 ticks={[0, 50000, 100000, 200000, 500000, 1000000, 1500000]}
//               />
//               <Tooltip
//                 formatter={(value: number) => [
//                   value >= 1000000
//                     ? `${(value / 1000000).toFixed(1)}M`
//                     : value >= 1000
//                       ? `${(value / 1000).toFixed(0)}k`
//                       : value,
//                   "",
//                 ]}
//               />
//               <Bar dataKey="allCategories" name="All Categories" radius={[2, 2, 0, 0]}>
//                 {data.map((entry, index) => (
//                   <Cell key={`cell-all-${index}`} fill={colors.allCategories} />
//                 ))}
//               </Bar>
//               <Bar dataKey="business" name="Business" radius={[2, 2, 0, 0]}>
//                 {data.map((entry, index) => (
//                   <Cell key={`cell-business-${index}`} fill={colors.business} />
//                 ))}
//               </Bar>
//               <Bar dataKey="pleasure" name="Pleasure/Leisure" radius={[2, 2, 0, 0]}>
//                 {data.map((entry, index) => (
//                   <Cell key={`cell-pleasure-${index}`} fill={colors.pleasure} />
//                 ))}
//               </Bar>
//               <Bar dataKey="mice" name="MICE" radius={[2, 2, 0, 0]}>
//                 {data.map((entry, index) => (
//                   <Cell key={`cell-mice-${index}`} fill={colors.mice} />
//                 ))}
//               </Bar>
//               <Bar dataKey="visiting" name="Visiting friends and relatives" radius={[2, 2, 0, 0]}>
//                 {data.map((entry, index) => (
//                   <Cell key={`cell-visiting-${index}`} fill={colors.visiting} />
//                 ))}
//               </Bar>
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Custom Legend */}
//         <div className="mt-6 flex flex-wrap gap-3">
//           <Badge variant="outline" className="flex items-center gap-2 px-3 py-1.5 rounded-full">
//             <span className="h-3 w-3 rounded-full" style={{ backgroundColor: colors.allCategories }}></span>
//             <span>All Categories</span>
//           </Badge>
//           <Badge variant="outline" className="flex items-center gap-2 px-3 py-1.5 rounded-full">
//             <span className="h-3 w-3 rounded-full" style={{ backgroundColor: colors.business }}></span>
//             <span>Business</span>
//             <span className="text-muted-foreground text-xs">- {percentages.business}%</span>
//           </Badge>
//           <Badge variant="outline" className="flex items-center gap-2 px-3 py-1.5 rounded-full">
//             <span className="h-3 w-3 rounded-full" style={{ backgroundColor: colors.pleasure }}></span>
//             <span>Pleasure/Leisure</span>
//             <span className="text-muted-foreground text-xs">- {percentages.pleasure}%</span>
//           </Badge>
//           <Badge variant="outline" className="flex items-center gap-2 px-3 py-1.5 rounded-full">
//             <span className="h-3 w-3 rounded-full" style={{ backgroundColor: colors.mice }}></span>
//             <span>MICE</span>
//             <span className="text-muted-foreground text-xs">- {percentages.mice}%</span>
//           </Badge>
//           <Badge variant="outline" className="flex items-center gap-2 px-3 py-1.5 rounded-full">
//             <span className="h-3 w-3 rounded-full" style={{ backgroundColor: colors.visiting }}></span>
//             <span>Visiting friends and relatives</span>
//             <span className="text-muted-foreground text-xs">- {percentages.visiting}%</span>
//           </Badge>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }



"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"

// Define the data structure
export interface TourismData {
  year: string
  allCategories: number
  business: number
  pleasure: number
  mice: number
  visiting: number
}

interface TourismCategoryChartProps {
  data: TourismData[]
}

const chartConfig = {
  allCategories: {
    label: "All Categories",
    color: "hsl(var(--chart-1))",
  },
  business: {
    label: "Business",
    color: "hsl(var(--chart-2))",
  },
  pleasure: {
    label: "Pleasure/Leisure",
    color: "hsl(var(--chart-3))",
  },
  mice: {
    label: "MICE",
    color: "hsl(var(--chart-4))",
  },
  visiting: {
    label: "Visiting friends and relatives",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function TourismCategoryChart({ data }: TourismCategoryChartProps) {
  // Format large numbers with k and M suffixes
  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `${value / 1000000}M`
    if (value >= 1000) return `${value / 1000}k`
    return value
  }

  // Calculate the maximum value for the Y-axis
  const maxValue = Math.max(
    ...data.flatMap((item) => [item.allCategories, item.business, item.pleasure, item.mice, item.visiting]),
  )

  // Calculate the Y-axis domain and ticks
  const yAxisMax = Math.ceil(maxValue / 1000000) * 1000000
  const yAxisTicks = [
    0,
    ...Array(5)
      .fill(0)
      .map((_, i) => (i + 1) * (yAxisMax / 5)),
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistics: Total Category of Tourism</CardTitle>
        <CardDescription>
          {data[0].year} - {data[data.length - 1].year}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
              <CartesianGrid vertical={false} opacity={0.2} />
              <XAxis dataKey="year" tickLine={false} tickMargin={10} axisLine={false} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={formatYAxis}
                domain={[0, yAxisMax]}
                ticks={yAxisTicks}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
              <Bar dataKey="allCategories" fill="var(--color-allCategories)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="business" fill="var(--color-business)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="pleasure" fill="var(--color-pleasure)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="mice" fill="var(--color-mice)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="visiting" fill="var(--color-visiting)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-3">
        <Badge variant="outline" className="flex items-center gap-2 px-3 py-1.5 rounded-full">
          <span className="h-3 w-3 rounded-full bg-[hsl(var(--chart-1))]"></span>
          <span>All Categories</span>
        </Badge>
        <Badge variant="outline" className="flex items-center gap-2 px-3 py-1.5 rounded-full">
          <span className="h-3 w-3 rounded-full bg-[hsl(var(--chart-2))]"></span>
          <span>Business</span>
          <span className="text-muted-foreground">- 37%</span>
        </Badge>
        <Badge variant="outline" className="flex items-center gap-2 px-3 py-1.5 rounded-full">
          <span className="h-3 w-3 rounded-full bg-[hsl(var(--chart-3))]"></span>
          <span>Pleasure/Leisure</span>
          <span className="text-muted-foreground">- 23%</span>
        </Badge>
        <Badge variant="outline" className="flex items-center gap-2 px-3 py-1.5 rounded-full">
          <span className="h-3 w-3 rounded-full bg-[hsl(var(--chart-4))]"></span>
          <span>MICE</span>
          <span className="text-muted-foreground">- 29%</span>
        </Badge>
        <Badge variant="outline" className="flex items-center gap-2 px-3 py-1.5 rounded-full">
          <span className="h-3 w-3 rounded-full bg-[hsl(var(--chart-5))]"></span>
          <span>Visiting friends and relatives</span>
          <span className="text-muted-foreground">- 21%</span>
        </Badge>
      </CardFooter>
    </Card>
  )
}

