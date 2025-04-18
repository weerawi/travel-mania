// import React from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import TourismLineChart from "@/components/charts/TourismLineChart";
// import { TourismCountryPurposeArrivalChart } from "@/components/purpose-base-predict-chart";
// import { BarChart3, LineChart , TrendingUp } from "lucide-react";
// import { Button } from "@/components/ui/button"; 
// import Link from "next/link" 

// const Forecasting = () => {
//   return (
//     <div>
//       <h1 className="text-2xl font-bold">Forecasting Dashboard</h1>

//       <div className="flex flex-wrap gap-4 my-3">
//         <Link href="forecasting/general">
//           <Button className="h-10 w-full sm:w-32 gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700">
//             <LineChart className="h-5 w-5" />
//             <span>General</span>
//           </Button>
//         </Link>

//         <Link href="/forecasting/seasonal-patterns">
//           <Button className="h-10 w-full sm:w-32 gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
//             <BarChart3 className="h-5 w-5" />
//             <span>Purpose</span>
//           </Button>
//         </Link>

//         <Link href="/forecasting/future-projections">
//           <Button className="h-10 w-full sm:w-32 gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700">
//             <TrendingUp className="h-5 w-5" />
//             <span>Province</span>
//           </Button>
//         </Link>
//         <Link href="/forecasting/future-projections">
//           <Button className="h-10 w-full sm:w-32 gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700">
//             <TrendingUp className="h-5 w-5" />
//             <span>Airline</span>
//           </Button>
//         </Link>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>City Tourism Activity</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <TourismLineChart />
//         </CardContent>
//         <CardContent>
//           <TourismCountryPurposeArrivalChart />
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Forecasting;
import { redirect } from "next/navigation"

// Redirect from the base forecasting page to the general view
export default function Forecasting() {
  redirect("forecasting/general")
}
