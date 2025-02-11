"use client";

import TourismLineChart from "@/components/charts/TourismLineChart";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { DollarSign, Users } from "lucide-react";
import { MetricsCard } from "@/components/MetricsCard";
import TouristCountryChart from "@/components/tourist-country-charts";
import AgeStaticsCard from "@/components/age-statics-card";

const Dashboard = () => {
  return (
    // <div>dashboard

    //   <div></div>
    //   <div><TourismLineChart/></div>
    //   <div></div>
    // </div>

    <div className="p-6 space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Country Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <TouristCountryChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Age Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <AgeStaticsCard />
          </CardContent>
        </Card>
        <div className="grid gap-4 md:grid-rows-2 ">
          <MetricsCard
            title="Revenue"
            value="$45,600"
            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          />
          <MetricsCard
            title="All Tourist"
            value="245,600"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>City Tourism Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <TourismLineChart />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
