"use client"

import { useState, useEffect } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// Import the JSON data
import tourismPurposeArrivalData from "./Data/tourism_purpose_predictions.json"

// Define the data structure for the JSON
interface TourismPurposes {
  holiday_pleasure: {
    total: number
    subcategories: {
      sun_and_beach: number
      sightseeing: number
      cultural_events: number
      historical_sites: number
      wildlife: number
    }
  }
  visiting_friends: number
  business: number
  other: number
}

interface TourismEntry {
  year: number
  month: number
  country: string
  total_tourists: number
  purposes: TourismPurposes
}

// Define the data structure for the chart
interface CountryData {
  country: string
  total: number
  sun_and_beach: number
  sightseeing: number
  cultural_events: number
  historical_sites: number
  wildlife: number
  visiting_friends: number
  business: number
  other: number
}

// Update the chartConfig to include all subcategories
const chartConfig = {
  sun_and_beach: {
    label: "Sun and Beach",
    color: "hsl(var(--chart-1))",
  },
  sightseeing: {
    label: "Sightseeing",
    color: "hsl(var(--chart-2))",
  },
  cultural_events: {
    label: "Cultural Events",
    color: "hsl(var(--chart-3))",
  },
  historical_sites: {
    label: "Historical Sites",
    color: "hsl(var(--chart-4))",
  },
  wildlife: {
    label: "Wildlife",
    color: "hsl(var(--chart-5))",
  },
  visiting_friends: {
    label: "Visiting Friends",
    color: "hsl(var(--chart-6))",
  },
  business: {
    label: "Business",
    color: "hsl(var(--chart-7))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-8))",
  },
} satisfies ChartConfig

export function TourismCountryPurposeArrivalChart() {
  // Get current month (1-12) as string
  const getCurrentMonth = () => {
    const currentDate = new Date()
    return (currentDate.getMonth() + 1).toString() // getMonth() returns 0-11, so add 1
  }

  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth())
  const [selectedCountry, setSelectedCountry] = useState("") // Empty means all countries
  const [chartData, setChartData] = useState<CountryData[]>([])
  const [months, setMonths] = useState<number[]>([])
  const [countries, setCountries] = useState<string[]>([])

  // Process the data when component mounts or filters change
  useEffect(() => {
    // Type assertion to ensure TypeScript recognizes the data as an array of TourismEntry
    const data = tourismPurposeArrivalData as unknown as TourismEntry[]

    if (!data || !Array.isArray(data) || data.length === 0) {
      console.error("Tourism data is not available or not in the expected format")
      return
    }

    // Extract unique months and countries
    const uniqueMonths = Array.from(new Set(data.map((item) => item.month)))
    const uniqueCountries = Array.from(new Set(data.map((item) => item.country)))

    setMonths(uniqueMonths)
    setCountries(uniqueCountries)

    // Filter data by selected month
    let filteredData = data.filter((item) => item.month.toString() === selectedMonth)

    // Further filter by country if one is selected
    if (selectedCountry) {
      filteredData = filteredData.filter((item) => item.country === selectedCountry)
    }

    // Transform data for the chart
    const transformedData: CountryData[] = filteredData.map((item) => ({
      country: item.country,
      total: item.total_tourists,
      sun_and_beach: item.purposes.holiday_pleasure.subcategories.sun_and_beach,
      sightseeing: item.purposes.holiday_pleasure.subcategories.sightseeing,
      cultural_events: item.purposes.holiday_pleasure.subcategories.cultural_events,
      historical_sites: item.purposes.holiday_pleasure.subcategories.historical_sites,
      wildlife: item.purposes.holiday_pleasure.subcategories.wildlife,
      visiting_friends: item.purposes.visiting_friends,
      business: item.purposes.business,
      other: item.purposes.other,
    }))

    setChartData(transformedData)
  }, [selectedMonth, selectedCountry])

  // Format large numbers with k and M suffixes
  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `${value / 1000000}M`
    if (value >= 1000) return `${value / 1000}k`
    return value
  }

  // Calculate the maximum value for the Y-axis
  const maxValue =
    chartData.length > 0
      ? Math.max(
          ...chartData.flatMap((item) => [
            item.sun_and_beach,
            item.sightseeing,
            item.cultural_events,
            item.historical_sites,
            item.wildlife,
            item.visiting_friends,
            item.business,
            item.other,
          ]),
        )
      : 10000 // Default value if no data

  // Calculate the Y-axis domain and ticks
  const yAxisMax = Math.ceil(maxValue / 1000) * 1000
  const yAxisTicks = [
    0,
    ...Array(5)
      .fill(0)
      .map((_, i) => (i + 1) * (yAxisMax / 5)),
  ]

  // Get month name from month number
  const getMonthName = (monthNum: string) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    return monthNames[Number.parseInt(monthNum) - 1]
  }

  // If no data is available, show a loading or empty state
  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tourism Statistics by Category</CardTitle>
          <CardDescription>No data available for the selected filters</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[400px]">
          <p className="text-muted-foreground">Try selecting a different month or country</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Tourism Statistics by Category</CardTitle>
            <CardDescription>
              {getMonthName(selectedMonth)} 2025
              {selectedCountry && ` - ${selectedCountry}`}
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Month:</span>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger id="month-select" className="w-[180px]">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  {months
                    .sort((a, b) => a - b)
                    .map((month) => (
                      <SelectItem key={month} value={month.toString()}>
                        {getMonthName(month.toString())}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Country:</span>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger id="country-select" className="w-[180px]">
                  <SelectValue placeholder="All Countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {countries.sort().map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} opacity={0.2} />
              <XAxis
                dataKey="country"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tick={{ fontSize: 12 }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={formatYAxis}
                domain={[0, yAxisMax]}
                ticks={yAxisTicks}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
              <Bar dataKey="sun_and_beach" fill="var(--color-sun_and_beach)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="sightseeing" fill="var(--color-sightseeing)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="cultural_events" fill="var(--color-cultural_events)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="historical_sites" fill="var(--color-historical_sites)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="wildlife" fill="var(--color-wildlife)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="visiting_friends" fill="var(--color-visiting_friends)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="business" fill="var(--color-business)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="other" fill="var(--color-other)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-3">
        <Badge variant="outline" className="flex items-center gap-2 px-3 py-1.5 rounded-full">
          <span className="h-3 w-3 rounded-full bg-[hsl(var(--chart-1))]"></span>
          <span>Sun and Beach</span>
        </Badge>
        <Badge variant="outline" className="flex items-center gap-2 px-3 py-1.5 rounded-full">
          <span className="h-3 w-3 rounded-full bg-[hsl(var(--chart-2))]"></span>
          <span>Sightseeing</span>
        </Badge>
        <Badge variant="outline" className="flex items-center gap-2 px-3 py-1.5 rounded-full">
          <span className="h-3 w-3 rounded-full bg-[hsl(var(--chart-3))]"></span>
          <span>Cultural Events</span>
        </Badge>
        <Badge variant="outline" className="flex items-center gap-2 px-3 py-1.5 rounded-full">
          <span className="h-3 w-3 rounded-full bg-[hsl(var(--chart-4))]"></span>
          <span>Historical Sites</span>
        </Badge>
        <Badge variant="outline" className="flex items-center gap-2 px-3 py-1.5 rounded-full">
          <span className="h-3 w-3 rounded-full bg-[hsl(var(--chart-5))]"></span>
          <span>Wildlife</span>
        </Badge>
        <Badge variant="outline" className="flex items-center gap-2 px-3 py-1.5 rounded-full">
          <span className="h-3 w-3 rounded-full bg-[hsl(var(--chart-6))]"></span>
          <span>Visiting Friends</span>
        </Badge>
        <Badge variant="outline" className="flex items-center gap-2 px-3 py-1.5 rounded-full">
          <span className="h-3 w-3 rounded-full bg-[hsl(var(--chart-7))]"></span>
          <span>Business</span>
        </Badge>
        <Badge variant="outline" className="flex items-center gap-2 px-3 py-1.5 rounded-full">
          <span className="h-3 w-3 rounded-full bg-[hsl(var(--chart-8))]"></span>
          <span>Other</span>
        </Badge>
      </CardFooter>
    </Card>
  )
}
