"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, ArrowUpRight, ArrowDownRight } from "lucide-react"

// Import the data
import tourismData from "../../../../../components/Data/tourism_province_predictions.json"

export default function ProvinceForecasting() {
  const [selectedCountry, setSelectedCountry] = useState("India")
  const [selectedProvince, setSelectedProvince] = useState("Western")
  const [selectedTab, setSelectedTab] = useState("overview")

  // Extract unique countries from the data
  const countries = useMemo(() => {
    return Object.keys(tourismData.predictions)
  }, [])

  // Extract provinces for the selected country
  const provinces = useMemo(() => {
    if (!selectedCountry) return []
    return Object.keys(tourismData.predictions[selectedCountry] || {})
  }, [selectedCountry])

  // Set default province when country changes
  useEffect(() => {
    if (provinces.length > 0) {
      setSelectedProvince(provinces[0])
    }
  }, [provinces])

  // Prepare monthly data for the selected country and province
  const monthlyData = useMemo(() => {
    if (!selectedCountry || !selectedProvince) return []

    const provinceData = tourismData.predictions[selectedCountry]?.[selectedProvince]
    if (!provinceData) return []

    return Object.values(provinceData.monthly).map((month) => ({
      ...month,
      monthYear: `${month.month} ${month.year}`,
    }))
  }, [selectedCountry, selectedProvince])

  // Calculate total tourists for the selected country
  const countryTotal = useMemo(() => {
    if (!selectedCountry) return 0

    const countryData = tourismData.predictions[selectedCountry]
    if (!countryData) return 0

    return Object.values(countryData).reduce((sum, province) => sum + province.total, 0)
  }, [selectedCountry])

  // Prepare data for province comparison within the selected country
  const provinceComparisonData = useMemo(() => {
    if (!selectedCountry) return []

    const countryData = tourismData.predictions[selectedCountry]
    if (!countryData) return []

    return Object.entries(countryData)
      .map(([name, data]) => ({
        name,
        total: data.total,
        percentage: ((data.total / countryTotal) * 100).toFixed(1),
      }))
      .sort((a, b) => b.total - a.total)
  }, [selectedCountry, countryTotal])

  // Prepare data for seasonal trends
  const seasonalData = useMemo(() => {
    if (!monthlyData.length) return []

    // Group by season
    const seasons = {
      "Spring (Mar-May)": 0,
      "Summer (Jun-Aug)": 0,
      "Fall (Sep-Nov)": 0,
      "Winter (Dec-Feb)": 0,
    }

    monthlyData.forEach((month) => {
      if (["Mar", "Apr", "May"].includes(month.month)) {
        seasons["Spring (Mar-May)"] += month.tourists
      } else if (["Jun", "Jul", "Aug"].includes(month.month)) {
        seasons["Summer (Jun-Aug)"] += month.tourists
      } else if (["Sep", "Oct", "Nov"].includes(month.month)) {
        seasons["Fall (Sep-Nov)"] += month.tourists
      } else {
        seasons["Winter (Dec-Feb)"] += month.tourists
      }
    })

    return Object.entries(seasons).map(([name, value]) => ({ name, value }))
  }, [monthlyData])

  // Calculate peak month and growth rate
  const analytics = useMemo(() => {
    if (!monthlyData.length) return { peakMonth: null, growthRate: 0, totalTourists: 0 }

    const peakMonth = [...monthlyData].sort((a, b) => b.tourists - a.tourists)[0]
    const firstMonth = monthlyData[0]
    const lastMonth = monthlyData[monthlyData.length - 1]
    const growthRate = (((lastMonth.tourists - firstMonth.tourists) / firstMonth.tourists) * 100).toFixed(1)
    const totalTourists = monthlyData.reduce((sum, month) => sum + month.tourists, 0)

    return { peakMonth, growthRate, totalTourists }
  }, [monthlyData])

  // Colors for charts
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Province-Based Tourism Forecasting</h1>
          <p className="text-muted-foreground">
            Tourism predictions for {selectedCountry} provinces from {tourismData.metadata.prediction_period}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedProvince} onValueChange={setSelectedProvince}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Province" />
            </SelectTrigger>
            <SelectContent>
              {provinces.map((province) => (
                <SelectItem key={province} value={province}>
                  {province}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="comparison">Province Comparison</TabsTrigger>
          <TabsTrigger value="seasonal">Seasonal Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Tourists</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-muted-foreground mr-2" />
                  <div className="text-2xl font-bold">{analytics.totalTourists.toLocaleString()}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Peak Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                  <div className="text-2xl font-bold">
                    {analytics.peakMonth?.month} {analytics.peakMonth?.year}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {analytics.peakMonth?.tourists.toLocaleString()} tourists
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Growth Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  {Number.parseFloat(analytics.growthRate) >= 0 ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500 mr-2" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500 mr-2" />
                  )}
                  <div
                    className={`text-2xl font-bold ${Number.parseFloat(analytics.growthRate) >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {analytics.growthRate}%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">From May 2025 to Apr 2026</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Tourist Arrivals</CardTitle>
              <CardDescription>
                Predicted tourist arrivals in {selectedProvince} province, {selectedCountry}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 70 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="monthYear" angle={-45} textAnchor="end" height={70} />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [`${value.toLocaleString()} tourists`, "Arrivals"]}
                      labelFormatter={(label) => `${label}`}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="tourists"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                      name="Tourist Arrivals"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Province Comparison</CardTitle>
              <CardDescription>Tourist distribution across provinces in {selectedCountry}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={provinceComparisonData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 70 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip formatter={(value) => [`${value.toLocaleString()} tourists`, "Total"]} />
                      <Legend />
                      <Bar dataKey="total" fill="#8884d8" name="Total Tourists" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={provinceComparisonData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="total"
                        nameKey="name"
                        label={({ name, percentage }) => `${name}: ${percentage}%`}
                      >
                        {provinceComparisonData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value.toLocaleString()} tourists`, "Total"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Province Rankings</CardTitle>
              <CardDescription>Provinces ranked by total predicted tourist arrivals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {provinceComparisonData.map((province, index) => (
                  <Card key={province.name} className={`${selectedProvince === province.name ? "border-primary" : ""}`}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{index + 1}</Badge>
                            <h3 className="font-semibold">{province.name}</h3>
                          </div>
                          <p className="text-2xl font-bold mt-2">{province.total.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">tourists</p>
                        </div>
                        <div className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs font-medium">
                          {province.percentage}%
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seasonal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Seasonal Distribution</CardTitle>
              <CardDescription>
                Tourist arrivals by season in {selectedProvince}, {selectedCountry}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={seasonalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value.toLocaleString()} tourists`, "Total"]} />
                      <Legend />
                      <Bar dataKey="value" fill="#82ca9d" name="Tourist Arrivals" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={seasonalData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, value, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                      >
                        {seasonalData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value.toLocaleString()} tourists`, "Total"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Trends</CardTitle>
              <CardDescription>
                Month-by-month tourist arrivals in {selectedProvince}, {selectedCountry}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 70 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="monthYear" angle={-45} textAnchor="end" height={70} />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value.toLocaleString()} tourists`, "Arrivals"]} />
                    <Legend />
                    <Bar dataKey="tourists" fill="#ffc658" name="Tourist Arrivals" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
