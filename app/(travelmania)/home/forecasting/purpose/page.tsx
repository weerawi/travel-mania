import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Import the JSON data
import tourismPurposeArrivalData from "../../../../../components/Data/tourism_purpose_predictions_new.json" 
import { TourismCombinedChart } from "@/components/tourism-purpose-base-trend";


export default function PurposeForecasting() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Purpose-Based Tourism Forecasting</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-hidden">
      <TourismCombinedChart data={tourismPurposeArrivalData} height={200} />
      </CardContent>
       
    </Card>
  );
}
