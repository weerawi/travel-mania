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
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 my-3 p-1 rounded-lg">
        <Link href="general">
          <Button
            variant="outline"
            className="h-10 w-full sm:w-32 gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 border-0"
          >
            <LineChart className="h-5 w-5" />
            <span>General</span>
          </Button>
        </Link>

        <Link href="purpose">
          <Button
            variant="outline"
            className="h-10 w-full sm:w-32 gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 border-0"
          >
            <BarChart3 className="h-5 w-5" />
            <span>Purpose</span>
          </Button>
        </Link>

        <Link href="province">
          <Button
            variant="outline"
            className="h-10 w-full sm:w-32 gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 border-0"
          >
            <TrendingUp className="h-5 w-5" />
            <span>Province</span>
          </Button>
        </Link>

        <Link href="airline">
          <Button
            variant="outline"
            className="h-10 w-full sm:w-32 gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 border-0"
          >
            <Plane className="h-5 w-5" />
            <span>Airline</span>
          </Button>
        </Link>
      </div>

      {children}
    </div>
  )
}
