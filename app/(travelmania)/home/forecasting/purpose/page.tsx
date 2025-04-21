import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Import the JSON data
import tourismPurposeArrivalData from "../../../../../components/Data/tourism_purpose_predictions.json" 
import { TourismCombinedChart } from "@/components/tourism-purpose-base-trend";


export default function PurposeForecasting() {
  return (
    <Card className="w-full xl:w-[62vw]  lg:max-w-5xl " >
      <CardHeader>
        <CardTitle>Purpose-Based Tourism Forecasting</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-hidden">
      <TourismCombinedChart   className="w-full xl:w-[60vw]  lg:max-w-4xl " data={tourismPurposeArrivalData} height={200} />
      </CardContent>
       
    </Card>
  );
}