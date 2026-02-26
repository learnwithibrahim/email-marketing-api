"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
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
  Search,
  User,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

interface DashboardHeaderProps {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const userInitials = user?.name
    ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : "U"

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-4 lg:px-6 h-16 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden p-2 hover:bg-accent transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Mobile logo */}
        <div className="flex items-center gap-2 lg:hidden">
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
        </div>

        {/* Search bar - hidden on mobile */}
        <div className="hidden md:flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="h-9 w-64 border border-input bg-background pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
        </Button>

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2 h-auto py-1.5">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.image ?? ""} alt={user?.name ?? ""} />
                <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:block text-sm font-medium">{user?.name ?? "User"}</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>{user?.name ?? "User"}</span>
                <span className="text-xs font-normal text-muted-foreground">{user?.email ?? ""}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex w-full items-center gap-2 px-2 py-1.5 text-sm text-destructive hover:bg-destructive/10 cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </button>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <nav className="absolute left-0 top-0 bottom-0 w-72 bg-gradient-to-b from-card to-background border-r border-border/50 flex flex-col" role="navigation" aria-label="Mobile navigation">
            {/* Mobile logo */}
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="Logo" width={250} height={250} />

            </div>

            <div className="flex-1 flex flex-col gap-1 p-4">
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
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-primary/10 to-primary/5 text-primary border border-primary/20"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                )
              })}
            </div>

            <div className="p-4 border-t border-border/50">
              <div className="flex items-center gap-3 px-3 py-2 mb-2">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user?.name ?? "User"}</span>
                  <span className="text-xs text-muted-foreground">{user?.email ?? ""}</span>
                </div>
              </div>
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
          </nav>
        </div>
      )}
    </header>
  )
}
