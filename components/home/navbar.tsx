"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/theme-toggle"; // Assuming you have this
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Integrations", href: "/integrations" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b-[3px] border-[#2e2692] shadow-sm font-sans selection:bg-[#2e2692] selection:text-white transition-all duration-300">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* --- Logo Section --- */}
        <Link
          href="/"
          className="flex items-center gap-3 group relative z-50"
          onClick={closeMenu}
        >
          {/* We keep your image, but constrain the height so it doesn't break the navbar */}
          <div className="relative h-10 w-32 md:w-40 flex items-center">
            <Image
              src="/logo.png"
              alt="Funurex Logo"
              width={200}
              height={150}
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* --- Desktop Navigation --- */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[15px] font-bold text-[#2e2692] hover:text-[#22c55e] transition-colors duration-200 uppercase tracking-wide relative group"
            >
              {item.label}
              {/* Animated Underline */}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#22c55e] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* --- Desktop Action Buttons --- */}
        <div className="hidden md:flex items-center gap-5">
          <ThemeToggle />

          <div className="flex items-center gap-4">
            <Link href="/login">
              <button className="text-[15px] font-bold text-[#2e2692] hover:text-[#22c55e] transition-colors uppercase tracking-wide">
                Log in
              </button>
            </Link>

            <Link href="/register">
              <button className="bg-[#22c55e] text-[#120f3a] text-[15px] font-extrabold px-6 py-2.5 rounded-xl border-[2px] border-[#2e2692] shadow-[4px_4px_0px_0px_#2e2692] hover:translate-y-1 hover:shadow-[1px_1px_0px_0px_#2e2692] hover:bg-[#4ade80] transition-all duration-200 uppercase tracking-wide">
                Get Started
              </button>
            </Link>
          </div>
        </div>

        {/* --- Mobile Menu Toggle Button --- */}
        <div className="flex md:hidden items-center gap-4 relative z-50">
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            className="p-2 bg-gray-50 border-[2px] border-[#2e2692] rounded-lg text-[#2e2692] shadow-[2px_2px_0px_0px_#2e2692] active:translate-y-0.5 active:shadow-[0px_0px_0px_0px_#2e2692] transition-all"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" strokeWidth={2.5} />
            ) : (
              <Menu className="w-6 h-6" strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>

      {/* --- Mobile Menu Overlay & Dropdown --- */}
      <div
        className={`absolute top-[100%] left-0 w-full bg-white border-b-[3px] border-[#2e2692] shadow-xl md:hidden transition-all duration-300 origin-top overflow-hidden ${isMobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0 border-b-0"
          }`}
      >
        <div className="flex flex-col px-4 py-6 gap-6">
          {/* Mobile Links */}
          <nav className="flex flex-col gap-4">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="text-lg font-bold text-[#2e2692] hover:text-[#22c55e] transition-colors uppercase tracking-wide pb-2 border-b border-gray-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Actions */}
          <div className="flex flex-col gap-4 pt-2">
            <Link href="/login" onClick={closeMenu} className="w-full">
              <button className="w-full py-3 text-[16px] font-bold text-[#2e2692] bg-gray-50 border-[2px] border-[#2e2692] rounded-xl uppercase tracking-wide">
                Log in
              </button>
            </Link>

            <Link href="/register" onClick={closeMenu} className="w-full">
              <button className="w-full py-3 bg-[#22c55e] text-[#120f3a] text-[16px] font-extrabold rounded-xl border-[2px] border-[#2e2692] shadow-[4px_4px_0px_0px_#2e2692] active:translate-y-1 active:shadow-[1px_1px_0px_0px_#2e2692] uppercase tracking-wide transition-all">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}