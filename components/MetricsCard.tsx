// import type React from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// interface MetricsCardProps {
//   title: string
//   value: string
//   icon: React.ReactNode
// }

// export function MetricsCard({ title, value, icon }: MetricsCardProps) {
//   return (
//     <Card>
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <CardTitle className="text-sm font-medium">{title}</CardTitle>
//         {icon}
//       </CardHeader>
//       <CardContent>
//         <div className="text-2xl font-bold">{value}</div>
//       </CardContent>
//     </Card>
//   )
// }



import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ReactNode } from "react"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

interface MetricsCardProps {
  title: string
  value: string | number
  icon?: ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  subtitle?: string
  valuePrefix?: string
  valueSuffix?: string
}

export function MetricsCard({
  title,
  value,
  icon,
  trend,
  subtitle,
  valuePrefix = "",
  valueSuffix = "",
}: MetricsCardProps) {
  // Format value if it's a number
  const formattedValue = typeof value === "number" ? value.toLocaleString() : value

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          {icon && <div className="mr-2">{icon}</div>}
          <div className="text-2xl font-bold">
            {valuePrefix}
            {formattedValue}
            {valueSuffix}
          </div>
        </div>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
        {trend && (
          <div className={`flex items-center mt-2 text-xs ${trend.isPositive ? "text-green-500" : "text-red-500"}`}>
            {trend.isPositive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
            <span>
              {trend.value}% {trend.isPositive ? "increase" : "decrease"}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
