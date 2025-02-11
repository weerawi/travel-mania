import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { LayoutDashboard, FolderKanban, BarChart3, FileText, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface NavItem {
  title: string
  href: string
  icon: LucideIcon
}

const items: NavItem[] = [
  {
    title: "Dashboard",
    href: "/home/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Categorize",
    href: "/home/categorize",
    icon: FolderKanban,
  },
  {
    title: "Forecasting",
    href: "/home/forecasting",
    icon: BarChart3,
  },
  {
    title: "Reports",
    href: "/home/reports",
    icon: FileText,
  },
  {
    title: "Setting",
    href: "/home/setting",
    icon: Settings,
  },
]

export function MainNav() {
  return (
    <nav className="flex flex-col gap-2">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "justify-start gap-2 px-2",
            "hover:bg-accent hover:text-accent-foreground",
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

