"use client";

import TourismLineChart from "@/components/charts/TourismLineChart";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react"
import { Users } from "lucide-react";
import { MetricsCard } from "@/components/MetricsCard";
import TouristCountryChart from "@/components/tourist-country-charts";
import AgeStaticsCard from "@/components/age-statics-card";
import { TopTourismCard } from "@/components/top-tourism";
import { TourismCategoryChart } from "@/components/previous-years-chart";
import { Button } from "@/components/ui/button";
import { FilterComponent } from "@/components/filter-dropdown";

const Dashboard = () => {

  const [tourismCategory, setTourismCategory] = useState("Business")
  const [ageGroup, setAgeGroup] = useState("20 - 30")
  const [country, setCountry] = useState("Brazil")
  const [year, setYear] = useState("2025")
  const [month, setMonth] = useState("February")

  // Filter options data
  const tourismCategories: FilterOption[] = [
    { label: "Business", value: "Business" },
    { label: "Leisure", value: "Leisure" },
    { label: "Family", value: "Family" },
    { label: "Adventure", value: "Adventure" },
  ]

  const ageGroups: FilterOption[] = [
    { label: "Under 20", value: "Under 20" },
    { label: "20 - 30", value: "20 - 30" },
    { label: "31 - 40", value: "31 - 40" },
    { label: "41 - 50", value: "41 - 50" },
    { label: "51+", value: "51+" },
  ]

  const countries: FilterOption[] = [
    { label: "Brazil", value: "Brazil" },
    { label: "USA", value: "USA" },
    { label: "Canada", value: "Canada" },
    { label: "UK", value: "UK" },
    { label: "Australia", value: "Australia" },
  ]

  const years: FilterOption[] = [
    { label: "2023", value: "2023" },
    { label: "2024", value: "2024" },
    { label: "2025", value: "2025" },
    { label: "2026", value: "2026" },
  ]

  const months: FilterOption[] = [
    { label: "January", value: "January" },
    { label: "February", value: "February" },
    { label: "March", value: "March" },
    { label: "April", value: "April" },
    { label: "May", value: "May" },
    { label: "June", value: "June" },
    { label: "July", value: "July" },
    { label: "August", value: "August" },
    { label: "September", value: "September" },
    { label: "October", value: "October" },
    { label: "November", value: "November" },
    { label: "December", value: "December" },
  ]

  // Sample tourism data that matches the image
  const previousTourismData = [
    {
      year: "2019",
      allCategories: 120000,
      business: 800000,
      pleasure: 150000,
      mice: 700000,
      visiting: 0,
    },
    {
      year: "2020",
      allCategories: 70000,
      business: 300000,
      pleasure: 150000,
      mice: 27890,
      visiting: 20000,
    },
    {
      year: "2021",
      allCategories: 600000,
      business: 700000,
      pleasure: 120000,
      mice: 1100000,
      visiting: 0,
    },
    {
      year: "2022",
      allCategories: 80000,
      business: 700000,
      pleasure: 300000,
      mice: 0,
      visiting: 120000,
    },
    {
      year: "2023",
      allCategories: 200000,
      business: 300000,
      pleasure: 309040,
      mice: 1237980,
      visiting: 300000,
    },
    {
      year: "2024",
      allCategories: 400000,
      business: 150000,
      pleasure: 220000,
      mice: 120000,
      visiting: 0,
    },
    {
      year: "2025",
      allCategories: 550000,
      business: 220000,
      pleasure: 124440,
      mice: 150000,
      visiting: 50000,
    },
  ];

  const tourismData = {
    monthName: "February",
    monthValue: 126570,
    year: 2025,
    yearValue: 1218273,
    countries: [
      { country: "Brasil", visitors: 50000 },
      { country: "England", visitors: 30000 },
      { country: "Switzerland", visitors: 10000 },
    ],
  };
  

  return (
    // <div>dashboard

    //   <div></div>
    //   <div><TourismLineChart/></div>
    //   <div></div>
    // </div>

    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <Button className="w-20" variant="default">
            Filter
          </Button>
        </CardHeader>
        <CardContent>
        <CardContent>
          <FilterComponent
            tourismCategory={tourismCategory}
            setTourismCategory={setTourismCategory}
            ageGroup={ageGroup}
            setAgeGroup={setAgeGroup}
            country={country}
            setCountry={setCountry}
            year={year}
            setYear={setYear}
            month={month}
            setMonth={setMonth}
            tourismCategories={tourismCategories}
            ageGroups={ageGroups}
            countries={countries}
            years={years}
            months={months}
          />
        </CardContent>

        </CardContent>
        <div className="container mx-auto p-4">
          <div className="grid gap-4">
            <TourismCategoryChart data={previousTourismData} />
          </div>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Age Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <AgeStaticsCard />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Country Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <TouristCountryChart />
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-rows-2 ">
          <div className="grid gap-4 md:grid-rows-2 ">
            <MetricsCard
              title="Month"
              value="45,600"
              icon={<Users className="h-4 w-4 text-muted-foreground" />}
            />
            <MetricsCard
              title="Yearly"
              value="245,600"
              icon={<Users className="h-4 w-4 text-muted-foreground" />}
            />
          </div>
          {/* <MetricsCard
            title="All Tourist"
            value="245,600"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          /> */}

          {/* Add the new TopTourismCard component */}
          <div className="md:col-span-1 lg:col-span-1">
            <TopTourismCard
              monthName={tourismData.monthName}
              monthValue={tourismData.monthValue}
              year={tourismData.year}
              yearValue={tourismData.yearValue}
              countries={tourismData.countries}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
