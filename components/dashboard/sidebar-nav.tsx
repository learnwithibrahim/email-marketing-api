"use client"

import { useState, useEffect } from "react"
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
  Menu,
  X,
  CreditCard,
  Coins,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { logoutAction } from "@/lib/actions"
import { useAuthStore } from "@/lib/store"

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
  const [isOpen, setIsOpen] = useState(false)
  const user = useAuthStore((state) => state.user)
  const isAdmin = user?.role === "admin" || (user as any)?.role === "superadmin"

  // Auto-close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <>

      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 px-4 flex items-center justify-between z-40">
        <div className="relative h-8 w-28">
          <Image src="/logo.png" alt="Logo" fill className="object-contain" />
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-md hover:bg-slate-100"
        >
          <Menu className="h-6 w-6 text-slate-600" />
        </button>
      </div>


      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Sidebar Header (Logo) */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
          <div className="relative h-8 w-32">
            <Image src="/logo.png" alt="Logo" fill className="object-contain" priority />
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden p-1 text-slate-400">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
            Main Menu
          </p>
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive ? "text-indigo-600" : "text-slate-400")} />
                {item.label}
              </Link>
            )
          })}

          {/* Admin section */}
          {isAdmin && (
            <>
              <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-6 mb-4">
                Admin
              </p>
              <Link
                href="/dashboard/payment-requests"
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  pathname === "/dashboard/payment-requests" || pathname.startsWith("/dashboard/payment-requests/")
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <CreditCard className={cn("h-5 w-5", pathname.startsWith("/dashboard/payment-requests") ? "text-indigo-600" : "text-slate-400")} />
                Payment Requests
              </Link>
            </>
          )}
        </nav>

        {/* Credits Widget */}
        {user && (
          <div className="px-4 py-3 border-t border-slate-100">
            <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-xl p-3 border border-indigo-100">
              <div className="flex items-center gap-2 mb-1">
                <Coins className="h-4 w-4 text-indigo-600" />
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">Credits</span>
              </div>
              <p className="text-xl font-extrabold text-[#140D36]">{user.credits ?? 300}</p>
              {!user.isPremium && (
                <p className="text-[10px] text-amber-600 font-bold mt-1">Free Trial • {Math.max(0, 3 - (user.scrapeCount || 0))}/3 scrapes left</p>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-slate-100">
          <form action={logoutAction}>
            <button className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-700 transition-colors">
              <LogOut className="h-5 w-5 text-slate-400" />
              Sign out
            </button>
          </form>
        </div>
      </aside>
    </>
  )
}