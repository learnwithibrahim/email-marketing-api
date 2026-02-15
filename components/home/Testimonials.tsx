import { Mail, Zap, Users, ArrowUpRight } from "lucide-react"

export default function Features() {
  const features = [
    {
      code: "EM-01",
      title: "Engineered Campaigns",
      icon: <Mail size={18} strokeWidth={1.2} />,
      desc: "High-throughput infrastructure built for sub-second latency and absolute deliverability."
    },
    {
      code: "AU-02",
      title: "Logic Automations",
      icon: <Zap size={18} strokeWidth={1.2} />,
      desc: "Event-driven trigger protocols that execute with surgical precision across global nodes."
    },
    {
      code: "AM-03",
      title: "Core Segmentation",
      icon: <Users size={18} strokeWidth={1.2} />,
      desc: "Advanced audience clustering using high-fidelity data points and behavioral mapping."
    }
  ]

  return (
    <section id="features" className="bg-white py-32 px-8 border-t border-black">
      <div className="container mx-auto">
        
        {/* Header: Editorial Style */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 bg-black"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">
                Core Capabilities v4.0
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
              Technical <br />
              <span className="text-zinc-200 italic font-serif normal-case tracking-tight">Authority.</span>
            </h2>
          </div>
          <div className="hidden lg:block text-right">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-4">Systems Status</p>
            <div className="px-4 py-2 border border-black text-[10px] font-mono">
              ALL NODES OPERATIONAL [100%]
            </div>
          </div>
        </div>

        {/* Feature Grid: Structural & Sharp */}
        <div className="grid md:grid-cols-3 border-l border-t border-black">
          {features.map((f, i) => (
            <div 
              key={i} 
              className="group relative p-12 border-r border-b border-black hover:bg-zinc-50 transition-colors duration-500"
            >
              {/* Feature Meta */}
              <div className="flex justify-between items-start mb-16">
                <span className="text-[10px] font-mono font-bold text-zinc-400">{f.code}</span>
                <div className="p-3 border border-black group-hover:bg-black group-hover:text-white transition-all duration-300">
                  {f.icon}
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-6">
                <h3 className="text-2xl font-black uppercase tracking-tighter group-hover:translate-x-2 transition-transform duration-300">
                  {f.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed font-medium max-w-[260px]">
                  {f.desc}
                </p>
              </div>

              {/* Bottom Interactive Element */}
              <div className="mt-12 pt-6 border-t border-zinc-100 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-black uppercase tracking-widest">View Documentation</span>
                <ArrowUpRight size={14} />
              </div>
            </div>
          ))}
        </div>

        {/* Technical Label */}
        <div className="mt-16 flex justify-between items-center text-[9px] font-bold uppercase tracking-[0.4em] text-zinc-300">
          <span>Enterprise Grade</span>
          <div className="flex gap-2">
            <div className="w-1 h-1 bg-zinc-200"></div>
            <div className="w-1 h-1 bg-zinc-200"></div>
            <div className="w-1 h-1 bg-black"></div>
          </div>
          <span>Secure Protocol Active</span>
        </div>
      </div>
    </section>
  )
}