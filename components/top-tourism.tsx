import { Card, CardContent } from "@/components/ui/card"

interface CountryData {
  country: string
  visitors: number
}

interface TopTourismCardProps {
  monthName: string
  monthValue: number | string
  year: number | string
  yearValue: number | string
  countries: CountryData[]
}

export function TopTourismCard({ monthName, monthValue, year, yearValue, countries }: TopTourismCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col"> 

        {/* Countries Section */}
        <CardContent className="p-4">
          <h3 className="text-center font-medium mb-2">Top Tourism Coming in {year}</h3>
          <div className="space-y-2">
            {countries.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="font-medium">{item.country}</span>
                <span>{item.visitors.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

