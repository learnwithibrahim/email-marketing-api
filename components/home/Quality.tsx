"use client";

import React from "react";
import {
    ArrowRight, Plus, Settings, Box, Cloud, Database,
    Layers, Monitor, Smartphone, Globe, Cpu, Hash, Quote
} from "lucide-react";

export default function IntegrationsAndMetrics() {
    return (
        <section className="py-20 md:py-32 bg-[#f8f9fc] font-sans selection:bg-[#2e2692] selection:text-white relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 max-w-[1200px] relative z-10">

                {/* =========================================
            SECTION 1: INTEGRATIONS BOX
        ========================================= */}
                <div className="w-full bg-white rounded-3xl border-[3px] border-[#2e2692] shadow-[8px_8px_0px_0px_rgba(46,38,146,1)] p-8 md:p-14 mb-32 flex flex-col items-center text-center relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500">

                    <h2 className="text-3xl md:text-[2.75rem] font-bold text-[#2e2692] mb-6 tracking-tight leading-tight max-w-2xl">
                        Connect seamlessly to your{" "}
                        <span className="relative inline-block text-gray-900">
                            full lead-gen stack
                            {/* Signature Green Underline */}
                            <svg className="absolute -bottom-2 left-0 w-full h-2 md:h-2.5 text-green-500" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="transparent" strokeLinecap="round" />
                            </svg>
                        </span>
                    </h2>

                    <p className="text-[16px] md:text-[18px] text-gray-600 max-w-3xl mb-6 font-medium leading-relaxed">
                        No coding experience necessary. Simply connect and synchronize your workflow across platforms. From CRMs to customer support apps, our platform integrates with thousands of tools.
                    </p>

                    <a href="#" className="inline-flex items-center gap-2 text-[15px] font-bold text-[#2e2692] uppercase tracking-wider hover:text-green-600 transition-colors mb-12 group/link">
                        View all Integrations
                        <ArrowRight className="h-4 w-4 transform group-hover/link:translate-x-1.5 transition-transform duration-300" />
                    </a>

                    {/* App Icons Grid Simulation */}
                    <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl w-full">
                        {[
                            { icon: Box, color: "text-blue-500", bg: "bg-blue-50" },
                            { icon: Cloud, color: "text-sky-500", bg: "bg-sky-50" },
                            { icon: Database, color: "text-orange-500", bg: "bg-orange-50" },
                            { icon: Layers, color: "text-purple-500", bg: "bg-purple-50" },
                            { icon: Monitor, color: "text-green-500", bg: "bg-green-50" },
                            { icon: Settings, color: "text-gray-700", bg: "bg-gray-100" },
                            { icon: Smartphone, color: "text-pink-500", bg: "bg-pink-50" },
                            { icon: Globe, color: "text-indigo-500", bg: "bg-indigo-50" },
                            { icon: Cpu, color: "text-yellow-500", bg: "bg-yellow-50" },
                            { icon: Hash, color: "text-red-500", bg: "bg-red-50" },
                        ].map((app, i) => (
                            <div
                                key={i}
                                className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${app.bg} border-[2px] border-gray-100 flex items-center justify-center shadow-sm hover:border-[#2e2692] hover:shadow-[4px_4px_0px_0px_#2e2692] hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
                            >
                                <app.icon className={`w-7 h-7 ${app.color}`} strokeWidth={2} />
                            </div>
                        ))}
                    </div>
                </div>


                {/* =========================================
            SECTION 2: METRICS & SOCIAL PROOF GRID
        ========================================= */}
                <div className="flex flex-col items-center text-center mb-16">
                    <h2 className="text-3xl md:text-[2.5rem] font-bold text-[#2e2692] mb-4 tracking-tight leading-tight">
                        Over <span className="text-gray-900">3,000,000</span> users<br />choose us for a reason
                    </h2>
                    <a href="#" className="inline-flex items-center gap-2 text-[14px] font-bold text-gray-500 uppercase tracking-wider hover:text-[#2e2692] transition-colors group/link">
                        Explore how we change automated lead generation
                        <ArrowRight className="h-4 w-4 transform group-hover/link:translate-x-1.5 transition-transform duration-300" />
                    </a>
                </div>

                {/* Masonry-style Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[220px]">

                    {/* Card 1 - SpotOn */}
                    <div className="bg-[#fff0e6] rounded-2xl border-[2px] border-[#2e2692] shadow-[4px_4px_0px_0px_#2e2692] hover:shadow-[6px_6px_0px_0px_#2e2692] transition-all duration-300 p-6 flex flex-col justify-between hover:-translate-y-1">
                        <div className="font-bold text-lg text-orange-600 flex items-center gap-2"><MapPin className="w-5 h-5" /> SpotOn</div>
                        <div>
                            <h3 className="text-5xl font-bold text-[#2e2692] mb-1">40%</h3>
                            <p className="text-sm font-medium text-gray-700">more leads collected</p>
                        </div>
                        <button className="w-8 h-8 rounded-full bg-[#2e2692] text-white flex items-center justify-center hover:bg-green-500 transition-colors mt-auto">
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Card 2 - LiteLog */}
                    <div className="bg-[#e6f4ff] rounded-2xl border-[2px] border-[#2e2692] shadow-[4px_4px_0px_0px_#2e2692] hover:shadow-[6px_6px_0px_0px_#2e2692] transition-all duration-300 p-6 flex flex-col justify-between hover:-translate-y-1">
                        <div className="font-bold text-lg text-blue-500 flex items-center gap-2"><Cloud className="w-5 h-5" /> LiteLog</div>
                        <div>
                            <h3 className="text-5xl font-bold text-[#2e2692] mb-1">3x</h3>
                            <p className="text-sm font-medium text-gray-700">increased ROI</p>
                        </div>
                        <button className="w-8 h-8 rounded-full bg-[#2e2692] text-white flex items-center justify-center hover:bg-green-500 transition-colors mt-auto">
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Card 3 - PVcase (Dark Image Background - Taller) */}
                    <div className="lg:row-span-2 relative rounded-2xl border-[2px] border-[#2e2692] shadow-[4px_4px_0px_0px_#2e2692] hover:shadow-[6px_6px_0px_0px_#2e2692] transition-all duration-300 overflow-hidden flex flex-col justify-between hover:-translate-y-1">
                        {/* Background Image & Overlay */}
                        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" alt="Team working" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>

                        <div className="relative z-10 p-6 flex flex-col h-full justify-between">
                            <div className="font-bold text-lg text-white flex items-center gap-2"><Monitor className="w-5 h-5" /> PVcase</div>
                            <div className="mt-auto mb-6">
                                <h3 className="text-5xl font-bold text-white mb-1">60k</h3>
                                <p className="text-sm font-medium text-gray-200">leads found</p>
                            </div>
                            <button className="w-8 h-8 rounded-full bg-white text-[#2e2692] flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors">
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Card 4 - populus */}
                    <div className="bg-[#fce5cd] rounded-2xl border-[2px] border-[#2e2692] shadow-[4px_4px_0px_0px_#2e2692] hover:shadow-[6px_6px_0px_0px_#2e2692] transition-all duration-300 p-6 flex flex-col justify-between hover:-translate-y-1">
                        <div className="font-bold text-lg text-orange-700 flex items-center gap-2"><Layers className="w-5 h-5" /> populus</div>
                        <div>
                            <h3 className="text-5xl font-bold text-[#2e2692] mb-1">110%</h3>
                            <p className="text-sm font-medium text-gray-700">increase in revenue</p>
                        </div>
                        <button className="w-8 h-8 rounded-full bg-[#2e2692] text-white flex items-center justify-center hover:bg-green-500 transition-colors mt-auto">
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Card 5 - Digital Media Stream (Dark Image Background) */}
                    <div className="relative rounded-2xl border-[2px] border-[#2e2692] shadow-[4px_4px_0px_0px_#2e2692] hover:shadow-[6px_6px_0px_0px_#2e2692] transition-all duration-300 overflow-hidden flex flex-col justify-between hover:-translate-y-1">
                        <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800" alt="Professional" className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20"></div>

                        <div className="relative z-10 p-6 flex flex-col h-full justify-between">
                            <div className="font-bold text-lg text-white flex items-center gap-2"><Globe className="w-5 h-5 text-red-500" /> Digital Media</div>
                            <div className="mt-auto mb-6">
                                <h3 className="text-5xl font-bold text-white mb-1">30%</h3>
                                <p className="text-sm font-medium text-gray-200">more meetings</p>
                            </div>
                            <button className="w-8 h-8 rounded-full bg-white text-[#2e2692] flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors">
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Card 6 - Testimonial (Spans 2 Columns) */}
                    <div className="md:col-span-2 bg-white rounded-2xl border-[2px] border-[#2e2692] shadow-[4px_4px_0px_0px_#2e2692] hover:shadow-[6px_6px_0px_0px_#2e2692] transition-all duration-300 p-6 md:p-8 flex flex-col justify-between hover:-translate-y-1">
                        <div className="flex justify-between items-start mb-4">
                            <div className="font-bold text-xl text-gray-900 flex items-center gap-2">
                                <div className="flex gap-1">
                                    <span className="w-2 h-4 bg-green-500 rounded-sm"></span>
                                    <span className="w-2 h-4 bg-yellow-400 rounded-sm"></span>
                                    <span className="w-2 h-4 bg-red-400 rounded-sm"></span>
                                </div>
                                Forecastio
                            </div>
                            <Quote className="w-8 h-8 text-gray-200" />
                        </div>

                        <p className="text-[15px] font-medium text-gray-700 leading-relaxed mb-6">
                            "Their new automation tool is top. I easily find prospects and their emails on LinkedIn, then build sequences that combine outreach and emails. It all works on autopilot, from a single platform."
                        </p>

                        <div className="flex items-center gap-3 mt-auto">
                            <img src="https://i.pravatar.cc/150?img=11" alt="User" className="w-10 h-10 rounded-full border-2 border-[#2e2692]" />
                            <div>
                                <h4 className="font-bold text-sm text-[#2e2692]">Dmytro Chervonyi</h4>
                                <p className="text-xs font-medium text-gray-500">CMO and Co-Founder</p>
                            </div>
                        </div>
                    </div>

                    {/* Card 7 - Neadoo */}
                    <div className="bg-[#eef2ff] rounded-2xl border-[2px] border-[#2e2692] shadow-[4px_4px_0px_0px_#2e2692] hover:shadow-[6px_6px_0px_0px_#2e2692] transition-all duration-300 p-6 flex flex-col justify-between hover:-translate-y-1">
                        <div className="font-bold text-lg text-[#2e2692] flex items-center gap-2"><ArrowRight className="w-5 h-5" /> neadoo</div>
                        <div>
                            <h3 className="text-5xl font-bold text-[#2e2692] mb-1">80%</h3>
                            <p className="text-sm font-medium text-gray-700">average response rate</p>
                        </div>
                        <button className="w-8 h-8 rounded-full bg-[#2e2692] text-white flex items-center justify-center hover:bg-green-500 transition-colors mt-auto">
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}

// Helper icon component since MapPin isn't imported at top
function MapPin(props: any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
        </svg>
    )
}