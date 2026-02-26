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
    <aside className="sticky top-0 z-40 hidden h-screen w-64 flex-col border-r border-slate-200 bg-white lg:flex shadow-sm">

      {/* Logo Area */}
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-slate-100">
        <Image
          src="/logo.png"
          alt="Logo"
          width={140}
          height={36}
          className="object-contain"
          priority
        />
      </div>

      {/* Navigation Area */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6 scrollbar-thin scrollbar-thumb-slate-200" role="navigation">
        <div className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Main Menu
        </div>

        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 shrink-0 transition-colors",
                    isActive
                      ? "text-indigo-700"
                      : "text-slate-400 group-hover:text-slate-600"
                  )}
                  aria-hidden="true"
                />
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Footer Area */}
      <div className="mt-auto border-t border-slate-200 p-4 bg-slate-50/50">
        <form action={logoutAction}>
          <button
            type="submit"
            className="group flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-700"
          >
            <LogOut
              className="h-5 w-5 shrink-0 text-slate-400 transition-colors group-hover:text-red-600"
              aria-hidden="true"
            />
            Sign out
          </button>
        </form>
      </div>

    </aside>
  )
}