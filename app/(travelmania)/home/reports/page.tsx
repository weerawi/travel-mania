"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

const Report = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Top row charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* First Chart Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-base font-normal text-muted-foreground">CHART TITLE</CardTitle>
              <div className="text-2xl font-bold">5.000,00</div>
              <div className="text-sm text-muted-foreground">50 Orders</div>
            </div>
            <Select defaultValue="this-week">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="last-week">Last Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">{/* Line Chart Component will go here */}</div>
          </CardContent>
        </Card>

        {/* Second Chart Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-base font-normal text-muted-foreground">CHART TITLE</CardTitle>
              <div className="text-2xl font-bold">5.000,00</div>
              <div className="text-sm text-muted-foreground">50 Orders</div>
            </div>
            <Select defaultValue="this-week">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="last-week">Last Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">{/* Bar Chart Component will go here */}</div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Report Download Section */}
        <Card>
          <CardHeader>
            <CardTitle>Report Download</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales">Sales Report</SelectItem>
                <SelectItem value="customers">Customer Report</SelectItem>
                <SelectItem value="orders">Order Report</SelectItem>
              </SelectContent>
            </Select>
            <Button className="w-full" variant="default">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </CardContent>
        </Card>

        {/* Third Chart Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-base font-normal text-muted-foreground">CHART TITLE</CardTitle>
              <div className="text-2xl font-bold">5.000,00</div>
              <div className="text-sm text-muted-foreground">50 Orders</div>
            </div>
            <Select defaultValue="this-week">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="last-week">Last Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">{/* Donut Chart Component will go here */}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}









export default Report