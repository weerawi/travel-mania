import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TourismLineChart from '@/components/charts/TourismLineChart';

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
        </CardContent>
      </Card>
        </div>
    </div>
  )
}

export default Forecasting