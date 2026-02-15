"use client"

import Link from "next/link"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-zinc-200">
      <div className="container mx-auto px-8 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <Link 
          href="/" 
          className="text-lg font-black tracking-tighter uppercase"
        >
          MAILPILOT
        </Link>

        {/* Navigation - Enhanced spacing and typography */}
        <nav className="hidden md:flex items-center gap-10">
          {["Features", "Pricing", "Integrations"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[13px] font-medium uppercase tracking-widest text-zinc-600 hover:text-black transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-6">
          <Link 
            href="/login" 
            className="text-[13px] font-bold uppercase tracking-widest hover:opacity-70 transition-opacity"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="px-6 py-3 text-[13px] font-bold uppercase tracking-widest text-white bg-black hover:bg-zinc-800 transition-colors border border-black"
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  )
}