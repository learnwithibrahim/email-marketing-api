"use client";

import React from "react";
import { Mail, Zap, Users, BarChart3, Palette, Globe, ArrowRight } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Mail,
      title: "Campaign Builder",
      description: "Drag-and-drop editor with raw HTML access for total control over your email marketing.",
    },
    {
      icon: Zap,
      title: "Logic Automation",
      description: "Build complex branching workflows based on user behavior triggers and custom events.",
    },
    {
      icon: Users,
      title: "Audience Segmentation",
      description: "Filter millions of records in milliseconds with our highly optimized SQL-based engine.",
    },
    {
      icon: BarChart3,
      title: "Real-time Telemetry",
      description: "Live data streams for opens, clicks, bounce rates, and total conversion attribution.",
    },
    {
      icon: Palette,
      title: "White Labeling",
      description: "Full customization of the interface, colors, and domains specifically for your agency.",
    },
    {
      icon: Globe,
      title: "Global CDN",
      description: "Distributed infrastructure ensuring <100ms delivery times worldwide for all assets.",
    },
  ];

  return (
    <section id="features" className="py-20 md:py-32 bg-[#f8f9fc] font-sans selection:bg-[#2e2692] selection:text-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">

        {/* --- Header Section --- */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">

          {/* New Premium Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-[#2e2692] bg-white shadow-[2px_2px_0px_0px_#2e2692] text-[#2e2692] text-[13px] font-bold tracking-wide uppercase mb-6">
            <Zap className="w-4 h-4 text-green-500 fill-green-500" />
            Advanced Capabilities
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-bold text-[#2e2692] mb-6 tracking-tight leading-tight">
            System Capabilities
          </h2>
          <p className="text-lg md:text-[22px] text-gray-700 max-w-2xl font-medium">
            Built for scale.{" "}
            <span className="relative inline-block font-bold text-gray-900">
              Engineered for performance.
              {/* Signature Green Underline */}
              <svg className="absolute -bottom-2 left-0 w-full h-2 md:h-2.5 text-green-500" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="transparent" strokeLinecap="round" />
              </svg>
            </span>
          </p>
        </div>

        {/* --- Relatable Dashboard/Tech Visual --- */}
        <div className="w-full max-w-5xl mx-auto mb-24 relative group perspective-1000">
          {/* Subtle Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2e2692]/20 to-green-400/20 blur-3xl -z-10 rounded-full transform group-hover:scale-105 transition-transform duration-700"></div>

          {/* Mac-style Window Mockup */}
          <div className="relative rounded-2xl border-[3px] border-[#2e2692] bg-white shadow-[8px_8px_0px_0px_rgba(46,38,146,1)] overflow-hidden flex flex-col transform hover:-translate-y-2 transition-transform duration-500">

            {/* Window Top Bar */}
            <div className="h-12 border-b-[3px] border-[#2e2692] bg-gray-50 flex items-center px-5 gap-2.5">
              <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] border-[1.5px] border-[#e0443e]"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border-[1.5px] border-[#dea123]"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f] border-[1.5px] border-[#1aab29]"></div>
            </div>

            {/* High-Quality MP4 Video representing Dashboard Analytics */}
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-white flex items-center justify-center overflow-hidden">
              <video
                src="/feacturevedio.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>

        {/* --- Feature Cards Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              /* Applied h-full and flex-col for perfect grid alignment */
              className="group relative bg-white p-8 rounded-2xl border-[2px] border-[#2e2692] shadow-[4px_4px_0px_0px_rgba(46,38,146,1)] hover:shadow-[8px_8px_0px_0px_rgba(46,38,146,1)] transition-all duration-300 flex flex-col h-full hover:-translate-y-1.5 cursor-default"
            >
              {/* Icon Container with Hover Animation */}
              <div className="mb-6 inline-flex items-center justify-center h-14 w-14 rounded-xl bg-gray-50 text-[#2e2692] border-2 border-gray-100 group-hover:border-[#2e2692] group-hover:bg-[#2e2692] group-hover:text-white transition-all duration-300 transform group-hover:rotate-6">
                <feature.icon className="h-6 w-6" strokeWidth={2.5} />
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight group-hover:text-[#2e2692] transition-colors">
                {feature.title}
              </h3>

              {/* flex-grow ensures the description pushes the link to the very bottom */}
              <p className="text-[15px] text-gray-600 leading-relaxed font-medium flex-grow">
                {feature.description}
              </p>

              {/* Interactive Link - mt-auto guarantees flawless bottom alignment */}
              <a
                href="#"
                className="mt-8 inline-flex items-center gap-2 text-[14px] font-bold text-[#2e2692] uppercase tracking-wider hover:text-green-600 transition-colors w-max group/link"
              >
                Explore Docs
                <ArrowRight className="h-4 w-4 transform group-hover/link:translate-x-1.5 transition-transform duration-300" />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}