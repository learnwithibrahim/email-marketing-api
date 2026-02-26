"use client";

import React, { useState, useMemo } from "react";
import { Search, Star, Mail, Phone, User, CheckCircle2, Briefcase } from "lucide-react";

// --- Types ---
interface ProfileCardProps {
  name: string;
  role: string;
  email: string;
  email2?: string;
  phone: string;
  avatarColor: string;
  verified?: boolean;
  className?: string;
}

interface ContactData {
  id: string;
  name: string;
  role: string;
  email: string;
}

// --- Mock Database for Local Search ---
const MOCK_DATABASE: ContactData[] = [
  { id: "1", name: "Christina Griffiths", role: "VP of Marketing @ Group", email: "c.griffiths@group.com" },
  { id: "2", name: "John Murphy", role: "Director of Sales @ Acme", email: "john@acme.com" },
  { id: "3", name: "Mark McMiller", role: "CEO & Founder @ Company", email: "mark@company.com" },
  { id: "4", name: "Shelli Houston", role: "Head of Talent @ Org", email: "s.houston@org.com" },
  { id: "5", name: "Bill Gates", role: "Co-chair @ Foundation", email: "bill.gates@gatesfoundation.org" },
];

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");

  // Local Search Logic
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return MOCK_DATABASE.filter((contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <section className="relative w-full bg-[#fdfdfd] overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32 font-sans selection:bg-[#2e2692] selection:text-white min-h-screen flex items-center">

      {/* --- Main Content Container --- */}
      <div className="container relative z-20 mx-auto px-4 sm:px-6 flex flex-col items-center text-center max-w-6xl">

        {/* Headline */}
        <h1 className="text-[2.25rem] sm:text-[3rem] md:text-6xl lg:text-[4.5rem] font-bold text-[#2e2692] mb-4 md:mb-6 leading-[1.1] tracking-tight max-w-[850px]">
          Unlock the world's most accurate contact data
        </h1>

        {/* Subheadline with signature green underline */}
        <p className="text-lg sm:text-xl md:text-[22px] text-gray-800 mb-8 md:mb-10 font-medium max-w-2xl">
          Find <span className="relative inline-block font-semibold">
            emails & phone
            {/* Hand-drawn style green underline */}
            <svg className="absolute -bottom-1.5 md:-bottom-2 left-0 w-full h-1.5 md:h-2 text-green-500" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="transparent" strokeLinecap="round" />
            </svg>
          </span> for 350M professionals
        </p>

        {/* --- Working Local Search Bar --- */}
        <div className="w-full max-w-[640px] relative mb-10">
          <div className="flex flex-col sm:flex-row bg-white rounded-lg sm:rounded-full border-2 border-[#2e2692] shadow-[0_8px_20px_rgb(0,0,0,0.06)] overflow-hidden transition-all focus-within:ring-4 focus-within:ring-[#2e2692]/15">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g., Bill Gates or CEO"
              className="flex-1 px-6 py-4 md:py-5 text-base md:text-lg outline-none text-gray-800 placeholder:text-gray-400 font-medium w-full"
            />
            <button className="bg-[#2e2692] hover:bg-[#231d6e] transition-colors text-white px-8 py-4 md:py-5 font-semibold text-[16px] md:text-[17px] flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto">
              <Search className="w-5 h-5" /> Try a Free Search
            </button>
          </div>

          {/* Search Results Dropdown */}
          {searchQuery.trim() !== "" && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 text-left">
              {searchResults.length > 0 ? (
                <ul className="py-2">
                  {searchResults.map((result) => (
                    <li key={result.id} className="px-5 py-3 hover:bg-slate-50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#2e2692]/10 flex items-center justify-center shrink-0 mt-1">
                        <User className="w-5 h-5 text-[#2e2692]" />
                      </div>
                      <div>
                        <p className="text-gray-900 font-bold text-[15px]">{result.name}</p>
                        <div className="flex items-center gap-3 text-[13px] text-gray-500 mt-1">
                          <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {result.role}</span>
                          <span className="flex items-center gap-1 text-green-600 font-medium"><Mail className="w-3.5 h-3.5" /> {result.email}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-6 py-8 text-center text-gray-500">
                  <Search className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                  <p>No professionals found for "{searchQuery}"</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Ratings Section */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[14px] md:text-[15px] font-medium text-gray-600 mb-16 md:mb-20">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#f97316] flex items-center justify-center text-white text-[11px] font-bold shadow-sm">G</div>
            <span className="text-gray-800">4.6 stars</span>
            <div className="flex gap-0.5 text-[#fbbf24]">
              {[1, 2, 3, 4, 5].map(i => <Star key={`g-${i}`} className="w-4 h-4 fill-current" />)}
            </div>
          </div>
          <div className="w-[1.5px] h-4 bg-gray-200 hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#3b82f6] flex items-center justify-center text-white text-[11px] font-bold shadow-sm">C</div>
            <span className="text-gray-800">4.4 stars</span>
            <div className="flex gap-0.5 text-[#fbbf24]">
              {[1, 2, 3, 4].map(i => <Star key={`c-${i}`} className="w-4 h-4 fill-current" />)}
              <Star className="w-4 h-4 fill-current text-[#fbbf24]/40" />
            </div>
          </div>
        </div>

        {/* Trust Banner & Logos */}
        <div className="w-full max-w-5xl flex flex-col items-center">
          <p className="text-[14px] md:text-[15px] text-gray-800 mb-6 md:mb-8 font-medium">
            Trusted by <span className="font-bold border-b-[2px] border-green-500 pb-[1px]">1.4M recruiters and sales reps</span> from Fortune 500 companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 md:gap-x-14 md:gap-y-10 opacity-70 grayscale hover:grayscale-0 transition-all duration-500 cursor-default">
            <span className="text-xl md:text-2xl font-semibold text-gray-600">Microsoft</span>
            <span className="text-xl md:text-2xl font-bold text-gray-600">tenstorrent</span>
            <span className="text-2xl md:text-[26px] font-bold tracking-tighter text-gray-600">WarnerMedia</span>
            <span className="text-lg md:text-xl font-bold text-gray-600">SOCIETE GENERALE</span>
            <span className="text-xl md:text-2xl font-bold text-gray-600">Google</span>
            <span className="text-2xl md:text-3xl font-bold text-gray-600 tracking-tighter">yelp<span className="text-red-500">*</span></span>
          </div>
        </div>
      </div>

      {/* --- Floating Decorative Elements (HIDDEN ON MOBILE for Responsiveness) --- */}
      <div className="absolute inset-0 z-10 hidden xl:block max-w-[1440px] mx-auto w-full h-full pointer-events-none">

        {/* Left Side Network */}
        <div className="absolute top-[15%] left-[2%] 2xl:left-[5%]">
          {/* Decorative Sparkle SVG */}
          <svg className="absolute -top-12 left-12 w-10 h-10 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83" />
          </svg>
          <ProfileCard
            name="S M Rahman"
            role="VP of Marketing @ Group"
            email="***@outlook.com"
            email2="***@group.com"
            phone="+***-***-****"
            avatarColor="bg-orange-100"
            className="-rotate-2"
          />
          <div className="absolute top-[160px] left-[60px]">
            <ProfileCard
              name="Mahadi hasan"
              role="Director of Sales @ Acme"
              email="john68@gmail.com"
              email2="john@acme.com"
              phone="+1-234-567-8900"
              avatarColor="bg-blue-100"
              verified
              className="rotate-2 shadow-xl"
            />
          </div>
        </div>

        {/* Right Side Network */}
        <div className="absolute top-[20%] right-[2%] 2xl:right-[5%]">
          {/* Decorative Sparkle SVG */}
          <svg className="absolute -top-8 right-24 w-12 h-12 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83" />
          </svg>
          <ProfileCard
            name="Imran Sayeed"
            role="CEO & Founder @ Company"
            email="***@hotmail.com"
            email2="***@company.com"
            phone="+***-***-****"
            avatarColor="bg-purple-100"
            className="rotate-1"
          />
          <div className="absolute top-[170px] -left-[80px]">
            {/* Connector Squiggle */}
            <svg className="absolute -top-[100px] right-[40px] w-32 h-32 text-green-500 -z-10" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round">
              <path d="M80,10 Q20,50 10,90" />
            </svg>
            <ProfileCard
              name="Md Ibrahim"
              role="Head of Talent @ Org"
              email="shelli1@yahoo.com"
              email2="s.houston@org.com"
              phone="+12-345-679-0000"
              avatarColor="bg-red-100"
              verified
              className="-rotate-2 shadow-xl"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

// --- Strictly Typed Profile Card Component ---
function ProfileCard({
  name,
  role,
  email,
  email2,
  phone,
  avatarColor,
  verified = false,
  className = "",
}: ProfileCardProps) {
  return (
    <div className={`bg-white rounded-2xl border-[2px] border-[#2e2692] p-5 w-full max-w-[270px] shadow-[4px_4px_0px_0px_rgba(46,38,146,1)] hover:-translate-y-1 transition-transform duration-300 flex flex-col relative pointer-events-auto ${className}`}>

      {/* Premium Pop-out Avatar */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2">
        <div className="w-[64px] h-[64px] rounded-full border-[2px] border-[#2e2692] bg-white flex items-center justify-center shadow-sm p-1 z-10 overflow-hidden">
          <div className={`w-full h-full rounded-full ${avatarColor} flex items-center justify-center`}>
            {/* Minimalist User icon instead of complex CSS shapes */}
            <User className="w-6 h-6 text-[#2e2692]" strokeWidth={2} />
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="text-center mt-6 border-b border-gray-100 pb-3 mb-3">
        <div className="flex items-center justify-center gap-1.5 mb-1">
          <h3 className="font-bold text-[14px] text-gray-900 tracking-tight">{name}</h3>
          {verified && <CheckCircle2 className="w-3.5 h-3.5 text-green-500 fill-green-50" />}
        </div>
        <p className="text-[11px] font-medium text-gray-500">{role}</p>
      </div>

      {/* Contact Data Lists */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-3 text-[12px] font-medium">
          <Mail className="w-3.5 h-3.5 text-gray-400 stroke-[2] shrink-0" />
          <span className="text-gray-600 truncate">{email}</span>
        </div>

        {/* Conditional rendering for strictly typed optional email2 */}
        {email2 && (
          <div className="flex items-center gap-3 text-[12px] font-medium">
            <div className="w-3.5 h-3.5 shrink-0" />
            <span className="text-gray-600 truncate">{email2}</span>
            {verified && <div className="w-1.5 h-1.5 rounded-full bg-green-500 ml-auto shrink-0 shadow-[0_0_0_2px_rgba(34,197,94,0.2)]"></div>}
          </div>
        )}

        <div className="flex items-center gap-3 text-[12px] font-medium">
          <Phone className="w-3.5 h-3.5 text-gray-400 stroke-[2] shrink-0" />
          <span className="text-gray-600 truncate">{phone}</span>
        </div>
      </div>
    </div>
  );
}