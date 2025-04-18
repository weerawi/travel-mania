import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TourismLineChart from '@/components/charts/TourismLineChart';
import { TourismCountryPurposeArrivalChart } from '@/components/purpose-base-predict-chart';

const Forecasting = () => {
  return (
    <div>Forecasting



        <div>

        <Card>
        <CardHeader>
          <CardTitle>City Tourism Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <TourismLineChart />
          <TourismCountryPurposeArrivalChart/>
        </CardContent>
      </Card>
        </div>
    </div>
  )
}

export default Forecasting