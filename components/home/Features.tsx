import { Mail, Zap, Users } from "lucide-react"

export default function Features() {
  const featureList = [
    {
      id: "01",
      icon: <Mail size={20} strokeWidth={1.5} />,
      title: "Engineered Campaigns",
      desc: "High-throughput delivery systems built for sub-second latency and absolute reliability."
    },
    {
      id: "02",
      icon: <Zap size={20} strokeWidth={1.5} />,
      title: "Dynamic Automation",
      desc: "Logic-driven trigger protocols that execute with surgical precision across all global nodes."
    },
    {
      id: "03",
      icon: <Users size={20} strokeWidth={1.5} />,
      title: "Core Segmentation",
      desc: "Advanced audience clustering using high-fidelity data points and behavioral mapping."
    }
  ]

  return (
    <section id="features" className="bg-white py-32 px-8 border-t border-black">
      <div className="container mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400 mb-6">
              Capabilities / Infrastructure
            </p>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">
              Built for the <br /> 
              <span className="text-zinc-300 italic font-serif normal-case tracking-tight">Technical Standard.</span>
            </h2>
          </div>
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] border-b border-black pb-2">
            Explore Documentation →
          </div>
        </div>

        {/* Feature Grid - Hairline Structure */}
        <div className="grid md:grid-cols-3 border-l border-t border-black">
          {featureList.map((f) => (
            <div 
              key={f.id} 
              className="p-10 border-r border-b border-black group hover:bg-zinc-50 transition-colors duration-300"
            >
              {/* Header of Feature Card */}
              <div className="flex justify-between items-start mb-12">
                <div className="p-3 border border-black group-hover:bg-black group-hover:text-white transition-all duration-300">
                  {f.icon}
                </div>
                <span className="text-[10px] font-black font-mono text-zinc-300">[{f.id}]</span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold uppercase tracking-tight mb-4">
                {f.title}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed font-medium">
                {f.desc}
              </p>

              {/* Bottom detail for 'Qualityful' feel */}
              <div className="mt-8 flex gap-1">
                <div className="h-1 w-6 bg-black"></div>
                <div className="h-1 w-1 bg-zinc-200"></div>
                <div className="h-1 w-1 bg-zinc-200"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Footer Detail */}
        <div className="mt-12 flex justify-center">
          <div className="px-6 py-2 border border-dashed border-zinc-300 text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-400">
            End-to-End Encryption Protocol Active
          </div>
        </div>
      </div>
    </section>
  )
}