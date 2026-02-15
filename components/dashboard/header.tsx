"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Menu,
  X,
  LayoutDashboard,
  Send,
  Users,
  UsersRound,
  FileText,
  BarChart3,
  Settings,
  Mail,
  LogOut,
  Bell,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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

export function DashboardHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="flex items-center justify-between px-4 lg:px-6 h-16 border-b border-border bg-card">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="lg:hidden p-2 rounded-lg hover:bg-accent"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <div className="flex items-center gap-2 lg:hidden">
          <Mail className="h-5 w-5 text-primary" />
          <span className="font-bold text-foreground">MailPilot</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/20" onClick={() => setOpen(false)} />
          <nav className="absolute left-0 top-0 bottom-0 w-72 bg-card border-r border-border flex flex-col" role="navigation" aria-label="Mobile navigation">
            <div className="flex items-center gap-2 px-6 py-5 border-b border-border">
              <Mail className="h-7 w-7 text-primary" />
              <span className="text-lg font-bold text-foreground">MailPilot</span>
            </div>
            <div className="flex-1 flex flex-col gap-1 p-4">
              {navItems.map((item) => {
                const isActive = item.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
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
            </div>
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
          </nav>
        </div>
      )}
    </header>
  )
}
