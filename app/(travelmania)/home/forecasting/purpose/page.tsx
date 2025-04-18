import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Import the JSON data
import tourismPurposeArrivalData from "../../../../../components/Data/tourism_purpose_predictions.json" 
import { TourismCombinedChart } from "@/components/tourism-purpose-base-trend";


export default function PurposeForecasting() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Purpose-Based Tourism Forecasting</CardTitle>
      </CardHeader>
      <CardContent>
      <TourismCombinedChart data={tourismPurposeArrivalData} height={500} />
      </CardContent>
       
    </Card>
  );
}
