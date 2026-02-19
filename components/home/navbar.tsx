"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Mail } from "lucide-react"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center bg-primary text-primary-foreground transition-colors duration-300">
            <Mail className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            MailPilot
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "Features", href: "/fratures" },
            { label: "Pricing", href: "/pricing" },
            { label: "Integrations", href: "/integrations" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 uppercase tracking-wide"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="rounded-none text-sm font-medium hover:bg-muted">
                Log in
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="rounded-none text-sm font-medium px-6">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}