"use client";

import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plane, MapPin, Users } from "lucide-react";
import {
  Bar,
  BarChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Import the data
import departureData from "../../../../../components/Data/departure_forecast_2025.json";
import airlineData from "../../../../../components/Data/hybrid_predictions.json";

// Define chart colors using shadcn/ui CSS variables
const chartConfig = {
  airline1: {
    label: "SriLankan Airlines",
    color: "hsl(var(--chart-1))",
  },
  airline2: {
    label: "Qatar Airways",
    color: "hsl(var(--chart-2))",
  },
  airline3: {
    label: "Emirates",
    color: "hsl(var(--chart-3))",
  },
  airline4: {
    label: "Indigo",
    color: "hsl(var(--chart-4))",
  },
  airline5: {
    label: "Other Airlines",
    color: "hsl(var(--chart-5))",
  },
  airport1: {
    label: "Dubai",
    color: "hsl(var(--chart-1))",
  },
  airport2: {
    label: "Doha Qatar",
    color: "hsl(var(--chart-2))",
  },
  airport3: {
    label: "Chennai",
    color: "hsl(var(--chart-3))",
  },
  airport4: {
    label: "Abu Dhabi",
    color: "hsl(var(--chart-4))",
  },
  airport5: {
    label: "Other Airports",
    color: "hsl(var(--chart-5))",
  },
  region1: {
    label: "Middle East",
    color: "hsl(var(--chart-1))",
  },
  region2: {
    label: "India",
    color: "hsl(var(--chart-2))",
  },
  region3: {
    label: "East Asia",
    color: "hsl(var(--chart-3))",
  },
  region4: {
    label: "Europe",
    color: "hsl(var(--chart-4))",
  },
  region5: {
    label: "Other Regions",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export default function AirlineForecasting() {
  // Format large numbers with k and M suffixes
  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `${value / 1000000}M`;
    if (value >= 1000) return `${value / 1000}k`;
    return value;
  };

  // Process airline data for charts
  const airlineChartData = useMemo(() => {
    const topAirlines = Object.entries(airlineData.predictions)
      .map(([airline, data]) => ({
        name: airline,
        tourists: data.tourists,
        share: data.share,
      }))
      .sort((a, b) => b.tourists - a.tourists);

    // Get top 4 airlines and group the rest as "Other"
    const top4 = topAirlines.slice(0, 4);
    const others = topAirlines.slice(4);

    const otherTourists = others.reduce(
      (sum, airline) => sum + airline.tourists,
      0
    );
    const otherShare = others.reduce((sum, airline) => sum + airline.share, 0);

    if (others.length > 0) {
      top4.push({
        name: "Other Airlines",
        tourists: otherTourists,
        share: otherShare,
      });
    }

    return top4;
  }, []);

  // Process departure airport data for charts
  const departureChartData = useMemo(() => {
    const allAirports = departureData
      .map((item) => ({
        name: item.airport,
        tourists: item.predicted_tourists,
        share: item.share,
      }))
      .sort((a, b) => b.tourists - a.tourists);

    // Filter out "other" for the main chart
    const filteredAirports = allAirports.filter(
      (airport) => airport.name.toLowerCase() !== "other"
    );

    // Get top 4 airports and group the rest as "Other"
    const top4 = filteredAirports.slice(0, 4);
    const others = filteredAirports.slice(4);

    const otherTourists = others.reduce(
      (sum, airport) => sum + airport.tourists,
      0
    );
    const otherShare = others.reduce((sum, airport) => sum + airport.share, 0);

    // Add the original "other" category from the data
    const originalOther = allAirports.find(
      (airport) => airport.name.toLowerCase() === "other"
    );

    if (others.length > 0 || originalOther) {
      top4.push({
        name: "Other Airports",
        tourists: otherTourists + (originalOther?.tourists || 0),
        share: otherShare + (originalOther?.share || 0),
      });
    }

    return top4;
  }, [departureData]);

  // Get top departure airport (excluding "other")
  const topDepartureAirport = useMemo(() => {
    const filteredAirports = departureData
      .filter((airport) => airport.airport.toLowerCase() !== "other")
      .sort((a, b) => b.predicted_tourists - a.predicted_tourists);

    return filteredAirports.length > 0 ? filteredAirports[0] : departureData[0];
  }, [departureData]);

  // Group departure airports by region for simplified analysis
  const regionData = useMemo(() => {
    const regions = {
      "Middle East": [
        "Dubai",
        "Abu Dhabi",
        "Doha Qatar",
        "Sharjah",
        "Dubai/Male",
      ],
      India: ["Chennai", "Mumbai", "Delhi", "Bangalore", "Hyderabad"],
      "East Asia": [
        "Shanghai",
        "Chengdu",
        "Bangkok",
        "Singapore",
        "Kuala Lumpur",
      ],
      Europe: ["London", "Moscow", "Istanbul"],
      "Other Regions": ["Male", "Melbourne", "other"],
    };

    const regionTotals = {};

    departureData.forEach((airport) => {
      const region =
        Object.entries(regions).find(([_, airports]) =>
          airports.includes(airport.airport)
        )?.[0] || "Other Regions";

      if (!regionTotals[region]) {
        regionTotals[region] = {
          tourists: 0,
          share: 0,
        };
      }

      regionTotals[region].tourists += airport.predicted_tourists;
      regionTotals[region].share += airport.share;
    });

    return Object.entries(regionTotals)
      .map(([region, data]) => ({
        name: region,
        tourists: data.tourists,
        share: data.share,
      }))
      .sort((a, b) => b.tourists - a.tourists);
  }, [departureData]);

  // Calculate the maximum value for the Y-axis for airline chart
  const airlineMaxValue = Math.max(
    ...airlineChartData.map((item) => item.tourists)
  );
  const airlineYAxisMax = Math.ceil(airlineMaxValue / 100000) * 100000;
  const airlineYAxisTicks = [
    0,
    ...Array(5)
      .fill(0)
      .map((_, i) => (i + 1) * (airlineYAxisMax / 5)),
  ];

  // Calculate the maximum value for the Y-axis for departure chart
  const departureMaxValue = Math.max(
    ...departureChartData.map((item) => item.tourists)
  );
  const departureYAxisMax = Math.ceil(departureMaxValue / 100000) * 100000;
  const departureYAxisTicks = [
    0,
    ...Array(5)
      .fill(0)
      .map((_, i) => (i + 1) * (departureYAxisMax / 5)),
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Airline-Based Tourism Forecasting</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div>
            <p className="text-muted-foreground">
              Predicted tourist arrivals by airlines and departure airports for
              2025
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* <Badge variant="outline" className="text-sm">
              Prediction Date: {airlineData.metadata.prediction_date}
            </Badge> */}
            {/* <Badge variant="outline" className="text-sm">
              Total Tourists:{" "}
              {airlineData.metadata.total_tourists.toLocaleString()}
            </Badge> */}
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Predicted Tourists
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-4 w-4 text-muted-foreground mr-2" />
                <div className="text-2xl font-bold">
                  {airlineData.metadata.total_tourists.toLocaleString()}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Forecasted for 2025
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Top Airline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Plane className="h-4 w-4 text-muted-foreground mr-2" />
                <div className="text-2xl font-bold">
                  {airlineChartData[0].name}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {airlineChartData[0].tourists.toLocaleString()} tourists (
                {airlineChartData[0].share}%)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Top Departure Airport
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                <div className="text-2xl font-bold">
                  {topDepartureAirport.airport}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {topDepartureAirport.predicted_tourists.toLocaleString()}{" "}
                tourists ({topDepartureAirport.share.toFixed(2)}
                %)
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="airlines" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="airlines">
              <Plane className="h-4 w-4 mr-2" />
              Airlines
            </TabsTrigger>
            <TabsTrigger value="airports">
              <MapPin className="h-4 w-4 mr-2" />
              Departure Airports
            </TabsTrigger>
          </TabsList>

          {/* Airlines Tab */}
          <TabsContent value="airlines" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Airlines by Tourist Contribution</CardTitle>
                <CardDescription>
                  Market share of airlines bringing tourists in 2025
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Top Airlines Bar Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">
                        Tourist Volume by Airline
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={chartConfig}>
                        <ResponsiveContainer width="100%" height={350}>
                          <BarChart data={airlineChartData}>
                            <CartesianGrid vertical={false} opacity={0.2} />
                            <XAxis
                              dataKey="name"
                              tickLine={false}
                              tickMargin={10}
                              axisLine={false}
                            />
                            <YAxis
                              axisLine={false}
                              tickLine={false}
                              tickFormatter={formatYAxis}
                              domain={[0, airlineYAxisMax]}
                              ticks={airlineYAxisTicks}
                            />
                            <ChartTooltip
                              cursor={false}
                              content={
                                <ChartTooltipContent indicator="dashed" />
                              }
                            />
                            <Bar dataKey="tourists" radius={[4, 4, 0, 0]}>
                              {airlineChartData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={`var(--color-airline${index + 1})`}
                                />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  {/* Airlines Pie Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">
                        Airline Market Share
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={chartConfig}>
                        <ResponsiveContainer width="100%" height={350}>
                          <PieChart>
                            <Pie
                              data={airlineChartData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={140}
                              dataKey="tourists"
                              nameKey="name"
                              label={({ name, percent }) =>
                                `${(percent * 100).toFixed(1)}%`
                              }
                            >
                              {airlineChartData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={`var(--color-airline${index + 1})`}
                                />
                              ))}
                            </Pie>
                            <ChartTooltip content={<ChartTooltipContent />} />
                          </PieChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-3">
                {airlineChartData.map((airline, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                  >
                    <span
                      className={`h-3 w-3 rounded-full bg-[hsl(var(--chart-${
                        index + 1
                      }))]`}
                    ></span>
                    <span>{airline.name}</span>
                    <span className="text-muted-foreground">
                      {airline.share.toFixed(1)}%
                    </span>
                  </Badge>
                ))}
              </CardFooter>
            </Card>

            {/* Airlines Table */}
            <Card>
              <CardHeader>
                <CardTitle>Airline Performance Metrics</CardTitle>
                <CardDescription>
                  Top airlines by predicted tourist contribution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="p-2 text-left">Airline</th>
                        <th className="p-2 text-right">Tourists</th>
                        <th className="p-2 text-right">Market Share (%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(airlineData.predictions)
                        .map(([airline, data]) => ({
                          name: airline,
                          tourists: data.tourists,
                          share: data.share,
                        }))
                        .sort((a, b) => b.tourists - a.tourists)
                        .map((airline, index) => (
                          <tr
                            key={index}
                            className={index % 2 === 0 ? "bg-muted/50" : ""}
                          >
                            <td className="p-2 font-medium">{airline.name}</td>
                            <td className="p-2 text-right">
                              {airline.tourists.toLocaleString()}
                            </td>
                            <td className="p-2 text-right">
                              {airline.share.toFixed(2)}%
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Departure Airports Tab */}
          <TabsContent value="airports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tourist Origins by Airport</CardTitle>
                <CardDescription>
                  Distribution of departure airports for tourists
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Top Departure Airports Bar Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">
                        Top Departure Airports
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={chartConfig}>
                        <ResponsiveContainer width="100%" height={350}>
                          <BarChart data={departureChartData}>
                            <CartesianGrid vertical={false} opacity={0.2} />
                            <XAxis
                              dataKey="name"
                              tickLine={false}
                              tickMargin={10}
                              axisLine={false}
                            />
                            <YAxis
                              axisLine={false}
                              tickLine={false}
                              tickFormatter={formatYAxis}
                              domain={[0, departureYAxisMax]}
                              ticks={departureYAxisTicks}
                            />
                            <ChartTooltip
                              cursor={false}
                              content={
                                <ChartTooltipContent indicator="dashed" />
                              }
                            />
                            <Bar dataKey="tourists" radius={[4, 4, 0, 0]}>
                              {departureChartData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={`var(--color-airport${index + 1})`}
                                />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  {/* Regional Distribution Pie Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">
                        Regional Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={chartConfig}>
                        <ResponsiveContainer width="100%" height={350}>
                          <PieChart>
                            <Pie
                              data={regionData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={140}
                              dataKey="tourists"
                              nameKey="name"
                              label={({ name, percent }) =>
                                `${(percent * 100).toFixed(1)}%`
                              }
                            >
                              {regionData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={`var(--color-region${index + 1})`}
                                />
                              ))}
                            </Pie>
                            <ChartTooltip content={<ChartTooltipContent />} />
                          </PieChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-3">
                {departureChartData.map((airport, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                  >
                    <span
                      className={`h-3 w-3 rounded-full bg-[hsl(var(--chart-${
                        index + 1
                      }))]`}
                    ></span>
                    <span>{airport.name}</span>
                    <span className="text-muted-foreground">
                      {airport.share.toFixed(1)}%
                    </span>
                  </Badge>
                ))}
              </CardFooter>
            </Card>

            {/* Departure Airports Table */}
            <Card>
              <CardHeader>
                <CardTitle>Top Departure Airports</CardTitle>
                <CardDescription>
                  Major tourist origin points by predicted volume
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="p-2 text-left">Airport</th>
                        <th className="p-2 text-right">Tourists</th>
                        <th className="p-2 text-right">Market Share (%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departureData
                        .filter(
                          (airport) => airport.airport.toLowerCase() !== "other"
                        )
                        .sort(
                          (a, b) => b.predicted_tourists - a.predicted_tourists
                        )
                        .slice(0, 10)
                        .map((airport, index) => (
                          <tr
                            key={index}
                            className={index % 2 === 0 ? "bg-muted/50" : ""}
                          >
                            <td className="p-2 font-medium">
                              {airport.airport}
                            </td>
                            <td className="p-2 text-right">
                              {airport.predicted_tourists.toLocaleString()}
                            </td>
                            <td className="p-2 text-right">
                              {airport.share.toFixed(2)}%
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
