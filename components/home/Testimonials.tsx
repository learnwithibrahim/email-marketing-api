"use client";

import React from "react";
import { Quote, Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "VP of Marketing",
      company: "TechFlow",
      content: "MailPilot isn't just a tool; it's infrastructure. We migrated 2M+ leads in a week with zero downtime. The ROI was visible by day three.",
      avatar: "https://i.pravatar.cc/150?u=sarah",
    },
    {
      name: "Marcus Johnson",
      role: "Founder",
      company: "GrowthLab",
      content: "We needed granular control over our SMTP relay settings and automation logic. This is the only platform that actually treats us like engineers.",
      avatar: "https://i.pravatar.cc/150?u=marcus",
    },
    {
      name: "Emily Rodriguez",
      role: "Director",
      company: "Nexus Systems",
      content: "The analytics precision is unmatched. We stopped guessing about attribution models. Clean, fast, perfectly aligned, and incredibly professional.",
      avatar: "https://i.pravatar.cc/150?u=emily",
    },
  ];

  return (
    <section className="py-24 bg-white font-sans selection:bg-[#2e2692] selection:text-white relative overflow-hidden border-t-2 border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">

        {/* --- Header Section --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">

          {/* Title & Subtitle */}
          <div className="max-w-2xl">
            <h2 className="text-[2.25rem] md:text-5xl font-bold text-[#2e2692] mb-4 tracking-tight leading-tight">
              Industry{" "}
              <span className="relative inline-block text-gray-900">
                Validation
                {/* Signature Green Underline */}
                <svg className="absolute -bottom-1.5 left-0 w-full h-2 md:h-2.5 text-green-500" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="transparent" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 font-medium">
              Trusted by high-growth B2B organizations worldwide.
            </p>
          </div>

          {/* Styled Validation Metrics */}
          <div className="flex flex-wrap gap-4 md:gap-6">
            <div className="bg-[#f8f9fc] border-[2px] border-[#2e2692] shadow-[3px_3px_0px_0px_#2e2692] rounded-xl px-6 py-3 flex flex-col justify-center">
              <span className="block text-2xl md:text-3xl font-black text-[#2e2692] tracking-tight mb-0.5">50k+</span>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-600">Active Seats</span>
            </div>
            <div className="bg-[#f8f9fc] border-[2px] border-[#2e2692] shadow-[3px_3px_0px_0px_#2e2692] rounded-xl px-6 py-3 flex flex-col justify-center">
              <span className="block text-2xl md:text-3xl font-black text-[#2e2692] tracking-tight mb-0.5">1B+</span>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-600">API Requests</span>
            </div>
          </div>
        </div>

        {/* --- Testimonials Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="group relative bg-white p-8 md:p-10 rounded-2xl border-[2px] border-[#2e2692] shadow-[4px_4px_0px_0px_rgba(46,38,146,1)] hover:shadow-[8px_8px_0px_0px_rgba(46,38,146,1)] transition-all duration-300 flex flex-col h-full hover:-translate-y-1.5 cursor-default"
            >
              {/* Giant background Quote Icon for styling */}
              <Quote className="h-16 w-16 text-[#2e2692]/5 absolute top-6 right-6 transform -rotate-12 transition-transform duration-500 group-hover:rotate-0 group-hover:text-green-500/10" />

              {/* 5-Star Rating */}
              <div className="flex gap-1 mb-6 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#ffbd2e] fill-[#ffbd2e]" />
                ))}
              </div>

              {/* Quote Text */}
              <p className="text-[16px] text-gray-700 font-medium leading-relaxed mb-8 flex-grow relative z-10">
                "{t.content}"
              </p>

              {/* Author Footer (Forced to bottom via mt-auto) */}
              <div className="flex items-center gap-4 mt-auto pt-6 border-t-[2px] border-gray-50 relative z-10">
                {/* User Avatar */}
                <div className="relative">
                  <div className="absolute inset-0 bg-green-400 rounded-full blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full border-[2px] border-[#2e2692] object-cover relative z-10"
                  />
                </div>

                {/* User Info */}
                <div>
                  <h4 className="font-bold text-[#2e2692] text-[15px]">{t.name}</h4>
                  <div className="text-[13px] font-semibold text-gray-500 mt-0.5">
                    {t.role}, <span className="text-green-600">{t.company}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}