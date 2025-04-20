"use client"

import type React from "react"
import { BarChart3, LineChart, TrendingUp, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function ForecastingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Function to check if a path is active
  const isActive = (path: string) => {
    return pathname.endsWith(path)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 my-3 p-1">
        <Link href="general">
          <Button
            variant="outline"
            className={`h-10 w-full sm:w-32 gap-2 border-0 ${
              isActive("general")
                ? "bg-black text-white hover:bg-black/90 hover:text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
          >
            <LineChart className="h-5 w-5" />
            <span>General</span>
          </Button>
        </Link>

        <Link href="purpose">
          <Button
            variant="outline"
            className={`h-10 w-full sm:w-32 gap-2 border-0 ${
              isActive("purpose")
                ? "bg-black text-white hover:bg-black/90 hover:text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
          >
            <BarChart3 className="h-5 w-5" />
            <span>Purpose</span>
          </Button>
        </Link>

        <Link href="province">
          <Button
            variant="outline"
            className={`h-10 w-full sm:w-32 gap-2 border-0 ${
              isActive("province")
                ? "bg-black text-white hover:bg-black/90 hover:text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
          >
            <TrendingUp className="h-5 w-5" />
            <span>Province</span>
          </Button>
        </Link>

        <Link href="airline">
          <Button
            variant="outline"
            className={`h-10 w-full sm:w-32 gap-2 border-0 ${
              isActive("airline")
                ? "bg-black text-white hover:bg-black/90 hover:text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
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
