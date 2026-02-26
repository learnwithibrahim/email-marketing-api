"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
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
  Target,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { logoutAction } from "@/lib/actions"

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/campaigns", label: "Campaigns", icon: Send },
  { href: "/dashboard/subscribers", label: "Subscribers", icon: Users },
  { href: "/dashboard/audiences", label: "Audiences", icon: UsersRound },
  { href: "/dashboard/leads", label: "Leads", icon: Target },
  { href: "/dashboard/templates", label: "Templates", icon: FileText },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-border/50 bg-gradient-to-b from-card to-background min-h-screen sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-border/50">

        <div className="flex flex-col">
          <Image src="/logo.png" alt="Logo" width={200} height={150} />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1 p-4" role="navigation" aria-label="Dashboard navigation">
        <div className="mb-2 px-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">Menu</p>
        </div>
        {navItems.map((item) => {
          const isActive = item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-primary/10 to-primary/5 text-primary border border-primary/20"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive && "text-primary")} />
              {item.label}
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 bg-primary" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border/50">
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors w-full"
          >
            <LogOut className="h-5 w-5" />
            Sign out
          </button>
        </form>
      </div>
    </aside>
  )
}
