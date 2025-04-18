import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import TourismLineChart from "@/components/charts/TourismLineChart" 

export default function GeneralForecasting() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Tourism Forecasting</CardTitle>
      </CardHeader>
      <CardContent>
        <TourismLineChart />
      </CardContent> 
    </Card>
  )
}
