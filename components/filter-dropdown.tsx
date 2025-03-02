import { Check, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export interface FilterOption {
  label: string
  value: string
}

export interface FilterDropdownProps {
  label: string
  options: FilterOption[]
  value: string
  onChange: (value: string) => void
}

export function FilterDropdown({ label, options, value, onChange }: FilterDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between border-primary/20 bg-white">
          {value}
          <ChevronDown className="ml-2 h-4 w-4 text-primary" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px]">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onChange(option.value)}
            className="flex items-center justify-between"
          >
            {option.label}
            {value === option.value && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export interface FilterComponentProps {
  tourismCategory: string
  setTourismCategory: (value: string) => void
  ageGroup: string
  setAgeGroup: (value: string) => void
  country: string
  setCountry: (value: string) => void
  year: string
  setYear: (value: string) => void
  month: string
  setMonth: (value: string) => void
  tourismCategories: FilterOption[]
  ageGroups: FilterOption[]
  countries: FilterOption[]
  years: FilterOption[]
  months: FilterOption[]
}

export function FilterComponent({
  tourismCategory,
  setTourismCategory,
  ageGroup,
  setAgeGroup,
  country,
  setCountry,
  year,
  setYear,
  month,
  setMonth,
  tourismCategories,
  ageGroups,
  countries,
  years,
  months,
}: FilterComponentProps) {
  return (
    <div className="w-full bg-gray-100 p-4 rounded-lg">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <div className="bg-gray-300 rounded-md px-4 py-2 w-[90px] text-center">
          <span className="text-gray-700">Filter</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 w-full">
          <FilterDropdown
            label="Tourism Category"
            options={tourismCategories}
            value={tourismCategory}
            onChange={setTourismCategory}
          />

          <FilterDropdown label="Age Group" options={ageGroups} value={ageGroup} onChange={setAgeGroup} />

          <FilterDropdown label="Country" options={countries} value={country} onChange={setCountry} />

          <FilterDropdown label="Year" options={years} value={year} onChange={setYear} />

          <FilterDropdown label="Month" options={months} value={month} onChange={setMonth} />
        </div>
      </div>
    </div>
  )
}

