import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 lg:py-40 font-sans selection:bg-green-400 selection:text-[#2e2692]">

      {/* --- Background Setup --- */}
      {/* Deep Blue Brand Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2e2692] via-[#221c6e] to-[#120f3a] z-0" />

      {/* Your Image with a Multiply Blend to texturize the background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15 mix-blend-overlay z-0"
        style={{ backgroundImage: "url('/testmo1.jpg')" }}
      />

      {/* Subtle Green Glow in the background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-400/15 rounded-full blur-[120px] z-0 transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

      {/* --- Main Content --- */}
      <div className="relative container mx-auto px-4 md:px-6 lg:px-8 max-w-[1000px] z-10 text-center flex flex-col items-center">

        {/* Sandbox Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-green-400/30 bg-green-400/10 text-green-400 text-[13px] font-bold tracking-wide uppercase mb-8 shadow-sm">
          <Terminal className="w-4 h-4" />
          Sandbox Environment Available
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight mb-6 text-white leading-[1.1]">
          Ready to scale your{" "}
          <span className="relative inline-block text-green-400">
            outreach?
            {/* Signature Underline */}
            <svg className="absolute -bottom-2 left-0 w-full h-3 text-green-400/40" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="transparent" strokeLinecap="round" />
            </svg>
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-[22px] text-blue-100/80 mb-12 max-w-2xl font-medium leading-relaxed">
          Stop struggling with consumer-grade tools. Upgrade to a platform
          built for professional lead generation and campaign management.
        </p>

        {/* Interactive Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-5 md:gap-6 w-full sm:w-auto">

          <Link href="/register" className="w-full sm:w-auto">
            <button className="w-full group relative inline-flex items-center justify-center gap-3 bg-green-400 text-[#120f3a] text-[17px] font-extrabold px-10 h-16 rounded-xl border-[3px] border-[#0a0822] shadow-[6px_6px_0px_0px_#0a0822] hover:shadow-[2px_2px_0px_0px_#0a0822] hover:translate-y-1 hover:bg-green-300 transition-all duration-200 uppercase tracking-wide">
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </Link>

          <Link href="/contact" className="w-full sm:w-auto">
            <button className="w-full group inline-flex items-center justify-center gap-3 bg-white text-[#2e2692] text-[17px] font-extrabold px-10 h-16 rounded-xl border-[3px] border-[#0a0822] shadow-[6px_6px_0px_0px_#0a0822] hover:shadow-[2px_2px_0px_0px_#0a0822] hover:translate-y-1 hover:bg-gray-50 transition-all duration-200 uppercase tracking-wide">
              Contact Sales
            </button>
          </Link>

        </div>

        {/* Footer Subtext */}
        <p className="mt-12 text-[13px] text-blue-200/60 font-mono tracking-tight flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          // NO CREDIT CARD REQUIRED FOR SANDBOX ENVIRONMENT
        </p>

      </div>
    </section>
  );
}