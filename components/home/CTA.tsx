import Link from "next/link"

export default function Hero() {
  return (
    <section className="bg-white text-black min-h-screen flex flex-col border-b border-black">
      {/* Technical Header Strip */}
      <div className="border-b border-black py-4 px-8 flex justify-between items-center bg-zinc-50/50">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 bg-green-500"></div>
          <span className="text-[10px] font-mono font-bold tracking-[0.2em]">ENGINE_STATUS: OPERATIONAL</span>
        </div>
        <div className="text-[10px] font-mono text-zinc-400">UUID: 882-99-MP</div>
      </div>

      <div className="flex-grow grid lg:grid-cols-12 overflow-hidden">
        
        {/* Left Column: The "Scraper" Logic */}
        <div className="lg:col-span-7 p-8 lg:p-20 flex flex-col justify-center border-r border-black relative">
          <div className="absolute top-10 left-10 opacity-5 pointer-events-none uppercase text-[80px] font-black leading-none select-none">
            Extraction
          </div>
          
          <div className="z-10">
            <div className="mb-8 inline-block border border-black px-4 py-1">
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">v4.0 Scrape & Send</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
              Scrape. <br />
              <span className="text-zinc-200">Refine.</span> <br />
              Deliver.
            </h1>

            <p className="max-w-md text-lg text-zinc-500 font-medium leading-relaxed mb-12">
              The ultimate high-velocity engine for lead extraction and campaign execution. 
              Zero fluff. Total data sovereignty.
            </p>

            <div className="flex flex-col sm:flex-row gap-0 border border-black w-fit group">
              <Link 
                href="/register" 
                className="px-12 py-6 bg-black text-white text-[12px] font-bold uppercase tracking-[0.3em] hover:bg-zinc-800 transition-none"
              >
                Launch Scraper
              </Link>
              <Link 
                href="/demo" 
                className="px-12 py-6 bg-white text-black text-[12px] font-bold uppercase tracking-[0.3em] hover:bg-zinc-50 transition-none border-t sm:border-t-0 sm:border-l border-black"
              >
                Campaign Docs
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Connection (The Delivery) */}
        <div className="lg:col-span-5 relative bg-zinc-50">
          <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
            alt="Cyber Security & Data" 
            className="w-full h-full object-cover grayscale contrast-150 brightness-75 transition-all duration-700 hover:grayscale-0"
          />
          
          {/* Real-time Data Feed Simulation (Visual Detail) */}
          <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
            <div className="bg-black/80 backdrop-blur-sm border border-zinc-700 p-6 space-y-4 max-w-xs">
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Scrape Rate</span>
                <span className="text-[11px] font-mono">1.2k/min</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-2">
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Delivery Accuracy</span>
                <span className="text-[11px] font-mono text-green-400">99.82%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">Encryption</span>
                <span className="text-[11px] font-mono">AES-256</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Stat Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-t border-black">
        {[
          { label: "Extraction Nodes", value: "48 Global" },
          { label: "In-Inbox Rate", value: "98.4%" },
          { label: "IP Rotation", value: "Dynamic" },
          { label: "API Latency", value: "4ms" },
        ].map((stat, i) => (
          <div key={i} className="p-8 border-r border-black last:border-r-0 text-center lg:text-left">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-2">{stat.label}</p>
            <p className="text-xl font-black italic tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}