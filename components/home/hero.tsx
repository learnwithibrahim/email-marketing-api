import Link from "next/link"

/**
 * ELITE PROFESSIONAL DESIGN PRINCIPLES USED:
 * 1. Pure White (#FFFFFF) - No muddy greys.
 * 2. Hairline Borders (1px) - For architectural structure.
 * 3. Extreme Tracking - Wide letter spacing for headers.
 * 4. Zero Radius - No rounded corners for a "Custom Built" look.
 */

export default function ProfessionalLanding() {
  return (
    <div className="bg-white text-black min-h-screen font-sans antialiased">
      

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 border-b border-black">
        <div className="container mx-auto px-8 grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="mb-6 flex items-center gap-3">
              <span className="w-10 h-px bg-black"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">Available v4.0</span>
            </div>
            <h1 className="text-7xl md:text-[100px] font-black leading-[0.85] tracking-tighter uppercase mb-10">
              Technical <br />
              <span className="text-zinc-300">Authority.</span>
            </h1>
            <p className="max-w-md text-lg text-zinc-600 mb-12 leading-relaxed">
              The world's most precise email infrastructure. Designed for high-frequency 
              delivery with zero decorative overhead.
            </p>
            <div className="flex border border-black w-fit">
              <button className="px-12 py-6 bg-black text-white text-[12px] font-bold uppercase tracking-[0.3em] hover:bg-zinc-800 transition-none">
                Start Deployment
              </button>
              <button className="px-12 py-6 bg-white text-black text-[12px] font-bold uppercase tracking-[0.3em] hover:bg-zinc-100 transition-none border-l border-black">
                View Specs
              </button>
            </div>
          </div>
          
          {/* Decorative Technical Image Area */}
          <div className="lg:col-span-5 border border-black p-4 bg-zinc-50 flex items-center justify-center grayscale">
             <img 
               src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop" 
               alt="Architecture" 
               className="w-full h-[500px] object-cover border border-black"
             />
          </div>
        </div>
      </section>

      {/* --- STATS / TRUST BAR --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-black">
        {[
          { label: "Deliverability", value: "99.9%" },
          { label: "Latency", value: "12ms" },
          { label: "Nodes", value: "48/Global" },
          { label: "Uptime", value: "SLA Guaranteed" }
        ].map((stat, i) => (
          <div key={i} className="px-8 py-10 border-r border-black last:border-r-0 flex flex-col gap-2">
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-400">{stat.label}</span>
            <span className="text-xl font-bold tracking-tight italic">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* --- CTA SECTION (The "Final Quality" Touch) --- */}
      <section className="py-40 px-8 text-center bg-white">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">
          Ready for Transition?
        </h2>
        <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-zinc-400 mb-12">
          Strictly Professional. No Hidden Fees. No Complexity.
        </p>
        <Link 
          href="/register" 
          className="inline-block px-20 py-8 border-2 border-black text-[13px] font-black uppercase tracking-[0.4em] hover:bg-black hover:text-white transition-all duration-300"
        >
          Initialize Account
        </Link>
      </section>

    </div>
  )
}