"use client";

import { useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define the data structure for the JSON
interface TourismPurposes {
  holiday_pleasure: {
    total: number;
    subcategories: {
      sun_and_beach: number;
      sightseeing: number;
      cultural_events: number;
      historical_sites: number;
      wildlife: number;
    };
  };
  visiting_friends: number;
  business: number;
  other: number;
}

interface TourismEntry {
  year: number;
  month: number;
  country: string;
  total_tourists: number;
  purposes: TourismPurposes;
}

// Define the data structure for the chart
interface CountryData {
  country: string;
  total: number;
  sun_and_beach: number;
  sightseeing: number;
  cultural_events: number;
  historical_sites: number;
  wildlife: number;
  visiting_friends: number;
  business: number;
  other: number;
}

interface TrendData {
  month: string;
  [key: string]: string | number;
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
} satisfies ChartConfig;

interface TourismCombinedChartProps {
  data?: TourismEntry[];
  className?: string;
  height?: number;
}

export function TourismCombinedChart({
  data = [],
  className = "",
  height = 200,
}: TourismCombinedChartProps) {
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedView, setSelectedView] = useState("categories");
  const [months, setMonths] = useState<number[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [categoryData, setCategoryData] = useState<CountryData[]>([]);
  const [trendData, setTrendData] = useState<TrendData[]>([]);

  // Get current month (1-12) as string
  function getCurrentMonth() {
    const currentDate = new Date();
    return (currentDate.getMonth() + 1).toString(); // getMonth() returns 0-11, so add 1
  }

  // Get month name from month number
  const getMonthName = (monthNum: number | string) => {
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
    ];
    const index =
      typeof monthNum === "string"
        ? Number.parseInt(monthNum) - 1
        : monthNum - 1;
    return monthNames[index];
  };

  // Get abbreviated month name
  const getShortMonthName = (monthNum: number) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return monthNames[monthNum - 1];
  };

  // Process data when component mounts or filters change
  useEffect(() => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      console.error(
        "Tourism data is not available or not in the expected format"
      );
      return;
    }

    // Extract unique months and countries
    const uniqueMonths = Array.from(new Set(data.map((item) => item.month)));
    const uniqueCountries = Array.from(
      new Set(data.map((item) => item.country))
    );

    setMonths(uniqueMonths);
    setCountries(uniqueCountries);

    // Set default country if none selected
    if (!selectedCountry && uniqueCountries.length > 0) {
      setSelectedCountry(uniqueCountries[0]);
    }

    // Process data for category view (bar chart)
    if (selectedView === "categories") {
      // Filter data by selected month
      let filteredData = data.filter(
        (item) => item.month.toString() === selectedMonth
      );

      // Further filter by country if one is selected
      if (selectedCountry && selectedCountry !== "all") {
        filteredData = filteredData.filter(
          (item) => item.country === selectedCountry
        );
      }

      // Transform data for the chart
      const transformedData: CountryData[] = filteredData.map((item) => ({
        country: item.country,
        total: item.total_tourists,
        sun_and_beach:
          item.purposes.holiday_pleasure.subcategories.sun_and_beach,
        sightseeing: item.purposes.holiday_pleasure.subcategories.sightseeing,
        cultural_events:
          item.purposes.holiday_pleasure.subcategories.cultural_events,
        historical_sites:
          item.purposes.holiday_pleasure.subcategories.historical_sites,
        wildlife: item.purposes.holiday_pleasure.subcategories.wildlife,
        visiting_friends: item.purposes.visiting_friends,
        business: item.purposes.business,
        other: item.purposes.other,
      }));

      setCategoryData(transformedData);
    }
    // Process data for trends view (line chart)
    else if (selectedView === "trends") {
      // Filter data by selected country
      const countryData = data.filter(
        (item) => item.country === selectedCountry
      );

      // Sort by month
      const sortedData = [...countryData].sort((a, b) => a.month - b.month);

      // Transform data for the trend chart
      const transformedData: TrendData[] = sortedData.map((item) => ({
        month: getShortMonthName(item.month),
        sun_and_beach:
          item.purposes.holiday_pleasure.subcategories.sun_and_beach,
        sightseeing: item.purposes.holiday_pleasure.subcategories.sightseeing,
        cultural_events:
          item.purposes.holiday_pleasure.subcategories.cultural_events,
        historical_sites:
          item.purposes.holiday_pleasure.subcategories.historical_sites,
        wildlife: item.purposes.holiday_pleasure.subcategories.wildlife,
        visiting_friends: item.purposes.visiting_friends,
        business: item.purposes.business,
        other: item.purposes.other,
      }));

      setTrendData(transformedData);
    }
    // Process data for countries view (line chart)
    else if (selectedView === "countries") {
      // Group data by month
      const monthlyData: Record<string, Record<string, number>> = {};

      // Initialize monthly data structure for all 12 months
      for (let i = 1; i <= 12; i++) {
        monthlyData[getShortMonthName(i)] = {};
      }

      // Populate with data for all countries
      data.forEach((item) => {
        const month = getShortMonthName(item.month);
        const country = item.country;

        if (!monthlyData[month][country]) {
          monthlyData[month][country] = 0;
        }

        monthlyData[month][country] += item.total_tourists;
      });

      // Convert to array format for chart
      const transformedData: TrendData[] = Object.entries(monthlyData).map(
        ([month, countries]) => {
          const entry: TrendData = { month };

          // Add all countries
          Object.entries(countries).forEach(([country, value]) => {
            entry[country] = value;
          });

          return entry;
        }
      );

      setTrendData(transformedData);
    }
  }, [data, selectedMonth, selectedCountry, selectedView]);

  const handleTabChange = (newTab) => {
    // If switching to trends or countries tab while "all" is selected
    if (
      (newTab === "trends" || newTab === "countries") &&
      selectedCountry === "all"
    ) {
      // Auto-select the first country in the list if available
      if (countries.length > 0) {
        setSelectedCountry(countries[0]);
      }
    }

    // Update the selected view
    setSelectedView(newTab);
  };

  // Format large numbers with k and M suffixes
  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `${value / 1000000}M`;
    if (value >= 1000) return `${value / 1000}k`;
    return value;
  };

  // Calculate the maximum value for the Y-axis for category data
  const maxCategoryValue =
    categoryData.length > 0
      ? Math.max(
          ...categoryData.flatMap((item) => [
            item.sun_and_beach,
            item.sightseeing,
            item.cultural_events,
            item.historical_sites,
            item.wildlife,
            item.visiting_friends,
            item.business,
            item.other,
          ])
        )
      : 10000; // Default value if no data

  // Calculate the Y-axis domain and ticks for category data
  const yAxisMax = Math.ceil(maxCategoryValue / 1000) * 1000;
  const yAxisTicks = [
    0,
    ...Array(5)
      .fill(0)
      .map((_, i) => (i + 1) * (yAxisMax / 5)),
  ];

  // If no data is available, show a loading or empty state
  const noDataAvailable =
    (selectedView === "categories" && categoryData.length === 0) ||
    ((selectedView === "trends" || selectedView === "countries") &&
      trendData.length === 0);

  if (noDataAvailable) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Tourism Statistics</CardTitle>
          <CardDescription>
            No data available for the selected filters
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <p className="text-muted-foreground">
            Try selecting different filters
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Tourism Statistics (2025)</CardTitle>
            <CardDescription>
              {selectedView === "categories"
                ? `${getMonthName(selectedMonth)} 2025${
                    selectedCountry ? ` - ${selectedCountry}` : ""
                  }`
                : selectedView === "trends"
                ? `Monthly trends for ${selectedCountry}`
                : "Monthly trends by country"}
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 grid lg:grid-rows-2">
            <Tabs
              value={selectedView}
              onValueChange={handleTabChange}
              className="w-[300px]"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger
                  value="categories"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Categories
                </TabsTrigger>
                <TabsTrigger
                  value="trends"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Trends
                </TabsTrigger>
                <TabsTrigger
                  value="countries"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Countries
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {selectedView === "categories" && (
              <>
                <div className="flex items-center gap-6">
                  <span className="text-sm font-medium">Month:</span>
                  <Select
                    value={selectedMonth}
                    onValueChange={setSelectedMonth}
                  >
                    <SelectTrigger id="month-select" className="w-[140px]">
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months
                        .sort((a, b) => a - b)
                        .map((month) => (
                          <SelectItem key={month} value={month.toString()}>
                            {getMonthName(month)}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Country:</span>
                  <Select
                    value={selectedCountry}
                    onValueChange={setSelectedCountry}
                  >
                    <SelectTrigger id="country-select" className="w-[140px]">
                      <SelectValue placeholder="Select Country" />
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
              </>
            )}

            {selectedView === "trends" && (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Country:</span>
                <Select
                  value={selectedCountry}
                  onValueChange={setSelectedCountry}
                >
                  <SelectTrigger id="country-select" className="w-[180px]">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.sort().map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          {selectedView === "categories" && (
            <ResponsiveContainer
              width="90%"
              height={height}
              style={{ maxHeight: `${height}px` }}
            >
              <BarChart
                data={categoryData}
                margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
              >
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
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar
                  dataKey="sun_and_beach"
                  fill="var(--color-sun_and_beach)"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="sightseeing"
                  fill="var(--color-sightseeing)"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="cultural_events"
                  fill="var(--color-cultural_events)"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="historical_sites"
                  fill="var(--color-historical_sites)"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="wildlife"
                  fill="var(--color-wildlife)"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="visiting_friends"
                  fill="var(--color-visiting_friends)"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="business"
                  fill="var(--color-business)"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="other"
                  fill="var(--color-other)"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}

          {selectedView === "trends" && (
            <ResponsiveContainer
              width="90%"
              height={height}
              style={{ maxHeight: `${height}px` }}
            >
              <LineChart
                data={trendData}
                margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={formatYAxis}
                />
                <Tooltip
                  formatter={(value) => [formatYAxis(value as number), ""]}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sun_and_beach"
                  stroke="var(--color-sun_and_beach)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="sightseeing"
                  stroke="var(--color-sightseeing)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="cultural_events"
                  stroke="var(--color-cultural_events)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="historical_sites"
                  stroke="var(--color-historical_sites)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="wildlife"
                  stroke="var(--color-wildlife)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="visiting_friends"
                  stroke="var(--color-visiting_friends)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="business"
                  stroke="var(--color-business)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="other"
                  stroke="var(--color-other)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
          {selectedView === "countries" && (
            <ResponsiveContainer
              width="90%"
              height={height}
              style={{ maxHeight: `${height}px` }}
            >
              <LineChart
                data={trendData}
                margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={formatYAxis}
                />
                <Tooltip
                  formatter={(value) => [formatYAxis(value as number), ""]}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Legend />
                {Object.keys(trendData[0])
                  .filter((key) => key !== "month")
                  .map((country, index) => (
                    <Line
                      key={country}
                      type="monotone"
                      dataKey={country}
                      stroke={`hsl(var(--chart-${(index % 8) + 1}))`}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  ))}
              </LineChart>
            </ResponsiveContainer>
          )}
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        <Badge
          variant="outline"
          className="flex items-center gap-1 px-2 py-1 rounded-full text-xs"
        >
          <span className="h-2 w-2 rounded-full bg-[hsl(var(--chart-1))]"></span>
          <span>Sun/Beach</span>
        </Badge>
        <Badge
          variant="outline"
          className="flex items-center gap-1 px-2 py-1 rounded-full text-xs"
        >
          <span className="h-2 w-2 rounded-full bg-[hsl(var(--chart-2))]"></span>
          <span>Sightseeing</span>
        </Badge>
        <Badge
          variant="outline"
          className="flex items-center gap-1 px-2 py-1 rounded-full text-xs"
        >
          <span className="h-2 w-2 rounded-full bg-[hsl(var(--chart-3))]"></span>
          <span>Cultural</span>
        </Badge>
        <Badge
          variant="outline"
          className="flex items-center gap-1 px-2 py-1 rounded-full text-xs"
        >
          <span className="h-2 w-2 rounded-full bg-[hsl(var(--chart-4))]"></span>
          <span>Historical</span>
        </Badge>
        <Badge
          variant="outline"
          className="flex items-center gap-1 px-2 py-1 rounded-full text-xs"
        >
          <span className="h-2 w-2 rounded-full bg-[hsl(var(--chart-5))]"></span>
          <span>Wildlife</span>
        </Badge>
        <Badge
          variant="outline"
          className="flex items-center gap-1 px-2 py-1 rounded-full text-xs"
        >
          <span className="h-2 w-2 rounded-full bg-[hsl(var(--chart-6))]"></span>
          <span>Visiting</span>
        </Badge>
        <Badge
          variant="outline"
          className="flex items-center gap-1 px-2 py-1 rounded-full text-xs"
        >
          <span className="h-2 w-2 rounded-full bg-[hsl(var(--chart-7))]"></span>
          <span>Business</span>
        </Badge>
        <Badge
          variant="outline"
          className="flex items-center gap-1 px-2 py-1 rounded-full text-xs"
        >
          <span className="h-2 w-2 rounded-full bg-[hsl(var(--chart-8))]"></span>
          <span>Other</span>
        </Badge>
      </CardFooter>
    </Card>
  );
}
