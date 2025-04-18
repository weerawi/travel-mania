import type React from "react"
import { BarChart3, LineChart, TrendingUp, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ForecastingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className=" ">
      {/* <h1 className="text-2xl font-bold">Forecasting Dashboard</h1> */}

      <div className="flex flex-wrap gap-4 my-3">
        <Link href="general">
          <Button className="h-10 w-full sm:w-32 gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700">
            <LineChart className="h-5 w-5" />
            <span>General</span>
          </Button>
        </Link>

        <Link href="purpose">
          <Button className="h-10 w-full sm:w-32 gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
            <BarChart3 className="h-5 w-5" />
            <span>Purpose</span>
          </Button>
        </Link>

        <Link href="province">
          <Button className="h-10 w-full sm:w-32 gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700">
            <TrendingUp className="h-5 w-5" />
            <span>Province</span>
          </Button>
        </Link>

        <Link href="airline">
          <Button className="h-10 w-full sm:w-32 gap-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700">
            <Plane className="h-5 w-5" />
            <span>Airline</span>
          </Button>
        </Link>
      </div>

      {children}
    </div>
  )
}