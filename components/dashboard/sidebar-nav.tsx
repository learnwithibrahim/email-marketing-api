"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Send,
  Users,
  UsersRound,
  FileText,
  BarChart3,
  Settings,
  Mail,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { logoutAction } from "@/lib/actions"

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/campaigns", label: "Campaigns", icon: Send },
  { href: "/dashboard/subscribers", label: "Subscribers", icon: Users },
  { href: "/dashboard/audiences", label: "Audiences", icon: UsersRound },
  { href: "/dashboard/templates", label: "Templates", icon: FileText },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-border bg-card min-h-screen">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-border">
        <Mail className="h-7 w-7 text-primary" />
        <span className="text-lg font-bold text-foreground">Adbiys Campaign</span>
      </div>
      <nav className="flex-1 flex flex-col gap-1 p-4" role="navigation" aria-label="Dashboard navigation">
        {navItems.map((item) => {
          const isActive = item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <item.icon className="h-4.5 w-4.5" />
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-border">
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors w-full"
          >
            <LogOut className="h-4.5 w-4.5" />
            Sign out
          </button>
        </form>
      </div>
    </aside>
  )
}
