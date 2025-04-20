"use client"

import { useState, useMemo } from "react"
import { Calendar, DollarSign, Users, Clock } from "lucide-react"


// Types for revenue data
export interface MonthlyRevenueData {
  month: string
  touristCount: number
  averageUSD: number
  averageDuration: number
  totalRevenue: number
}

export interface YearlyTotalData {
  touristCount: number
  totalRevenue: number
}

export interface YearData {
  monthlyData: MonthlyRevenueData[]
  totalData: YearlyTotalData
}

export interface RevenueData {
  years: {
    [year: string]: YearData
  }
}

// Types for age distribution data
export interface AgeGroups {
  "18-24": number
  "25-34": number
  "35-44": number
  "45-54": number
  "55-64": number
  "65+": number
}

export interface CountryAgeData {
  country: string
  ageGroups: AgeGroups
  total: number
}

export interface AgeDistributionData {
  years: {
    [year: string]: {
      countries: CountryAgeData[]
    }
  }
}


// Import components
// import { RevenueOverviewChart } from "@/components/revenue-overview-chart"
// import { MonthlyComparisonChart } from "@/components/monthly-comparison-chart"
// import { AgeDistributionChart } from "@/components/age-distribution-chart"
// import { TopCountriesChart } from "@/components/top-countries-chart"
// import { MetricsCard } from "@/components/metrics-card"
// import { YearSelector } from "@/components/year-selector"


// Import data
import revenueData from "../../../../components/Data/revenue_data.json"
import ageDistributionData from "../../../../components/Data/tourism_age_distribution.json"


import { YearSelector } from "@/components/year-selector"
import { MetricsCard } from "@/components/MetricsCard"
import { RevenueOverviewChart } from "@/components/revenue-overview-chart"
import { MonthlyComparisonChart } from "@/components/monthly-comparison-chart"
import { AgeDistributionChart } from "@/components/age-distribution-chart"
import { TopCountriesChart } from "@/components/top-countries-chart"

export default function Dashboard() {
  // Cast imported data to the correct types
  const typedRevenueData = revenueData as RevenueData
  const typedAgeDistributionData = ageDistributionData as AgeDistributionData

  // Get available years from the data
  const availableYears = useMemo(() => {
    return Object.keys(typedRevenueData.years).sort((a, b) => Number.parseInt(b) - Number.parseInt(a))
  }, [typedRevenueData])

  // State for selected year
  const [selectedYear, setSelectedYear] = useState<string>(availableYears[0] || "2024")

  // Get previous year
  const previousYear = useMemo(() => {
    const currentYearIndex = availableYears.indexOf(selectedYear)
    if (currentYearIndex < availableYears.length - 1) {
      return availableYears[currentYearIndex + 1]
    }
    return null
  }, [selectedYear, availableYears])

  // Get current year data
  const currentYearData = useMemo(() => {
    return typedRevenueData.years[selectedYear] || { monthlyData: [], totalData: { touristCount: 0, totalRevenue: 0 } }
  }, [typedRevenueData, selectedYear])

  // Get previous year data
  const previousYearData = useMemo(() => {
    if (!previousYear) return { monthlyData: [], totalData: { touristCount: 0, totalRevenue: 0 } }
    return typedRevenueData.years[previousYear] || { monthlyData: [], totalData: { touristCount: 0, totalRevenue: 0 } }
  }, [typedRevenueData, previousYear])

  // Get age distribution data for selected year
  const ageData = useMemo(() => {
    return typedAgeDistributionData.years[selectedYear]?.countries || []
  }, [typedAgeDistributionData, selectedYear])

  // Calculate metrics and trends
  const metrics = useMemo(() => {
    const currentTotal = currentYearData.totalData.touristCount
    const currentRevenue = currentYearData.totalData.totalRevenue

    let touristTrend = 0
    let revenueTrend = 0
    let isTouristTrendPositive = true
    let isRevenueTrendPositive = true

    if (previousYear) {
      const previousTotal = previousYearData.totalData.touristCount
      const previousRevenue = previousYearData.totalData.totalRevenue

      if (previousTotal > 0) {
        touristTrend = Math.round(((currentTotal - previousTotal) / previousTotal) * 100)
        isTouristTrendPositive = touristTrend >= 0
      }

      if (previousRevenue > 0) {
        revenueTrend = Math.round(((currentRevenue - previousRevenue) / previousRevenue) * 100)
        isRevenueTrendPositive = revenueTrend >= 0
      }
    }

    // Calculate average duration and spending
    let totalDuration = 0
    let totalSpending = 0

    currentYearData.monthlyData.forEach((month) => {
      totalDuration += month.averageDuration
      totalSpending += month.averageUSD
    })

    const avgDuration =
      currentYearData.monthlyData.length > 0 ? (totalDuration / currentYearData.monthlyData.length).toFixed(1) : 0

    const avgSpending =
      currentYearData.monthlyData.length > 0 ? Math.round(totalSpending / currentYearData.monthlyData.length) : 0

    return {
      touristCount: currentTotal,
      totalRevenue: currentRevenue,
      touristTrend: Math.abs(touristTrend),
      isTouristTrendPositive,
      revenueTrend: Math.abs(revenueTrend),
      isRevenueTrendPositive,
      avgDuration,
      avgSpending,
    }
  }, [currentYearData, previousYearData, previousYear])

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Tourism Dashboard</h1>
        <YearSelector years={availableYears} selectedYear={selectedYear} onYearChange={setSelectedYear} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricsCard
          title="Total Tourists"
          value={metrics.touristCount}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          subtitle={`Total for ${selectedYear}`}
          trend={
            previousYear
              ? {
                  value: metrics.touristTrend,
                  isPositive: metrics.isTouristTrendPositive,
                }
              : undefined
          }
        />

        <MetricsCard
          title="Total Revenue"
          value={Math.round(metrics.totalRevenue)}
          valuePrefix="$"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          subtitle={`Total for ${selectedYear}`}
          trend={
            previousYear
              ? {
                  value: metrics.revenueTrend,
                  isPositive: metrics.isRevenueTrendPositive,
                }
              : undefined
          }
        />

        <MetricsCard
          title="Average Stay Duration"
          value={metrics.avgDuration}
          valueSuffix=" days"
          icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
          subtitle={`Average for ${selectedYear}`}
        />

        <MetricsCard
          title="Average Daily Spending"
          value={metrics.avgSpending}
          valuePrefix="$"
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
          subtitle={`Per tourist in ${selectedYear}`}
        />
      </div>

      <RevenueOverviewChart data={currentYearData.monthlyData} year={selectedYear} />

      {previousYear && (
        <MonthlyComparisonChart
          currentYearData={currentYearData.monthlyData}
          previousYearData={previousYearData.monthlyData}
          currentYear={selectedYear}
          previousYear={previousYear}
        />
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {ageData.length > 0 && <AgeDistributionChart data={ageData} year={selectedYear} />}

        {ageData.length > 0 && <TopCountriesChart data={ageData} year={selectedYear} />}
      </div>
    </div>
  )
}
