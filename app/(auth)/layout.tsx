import { Mail, Zap, BarChart3, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const features = [
    { icon: BarChart3, text: "Real-time analytics & reporting" },
    { icon: Users, text: "Advanced audience segmentation" },
    { icon: Zap, text: "Smart automated workflows" },
  ];

  return (
    <div className="flex min-h-screen w-full font-sans selection:bg-[#2e2692] selection:text-white">

      {/* --- Left Side - Marketing (Hidden on mobile) --- */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between relative overflow-hidden bg-[#2e2692] p-12 lg:p-16">

        {/* Background Gradients & Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2e2692] via-[#221c6e] to-[#120f3a] z-0" />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat mix-blend-overlay opacity-30 z-0"
          style={{ backgroundImage: "url('/testmo1.jpg')" }}
        />
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] z-10 pointer-events-none"></div>

        {/* Top: Logo */}
        <div className="relative z-50">
          <Link href="/" className="flex items-center gap-3 w-max group">
            <Image src="/logo.png" alt="Logo" width={200} height={150} />
          </Link>
        </div>

        {/* Middle: Value Proposition */}
        <div className="relative z-20 mt-auto mb-auto max-w-lg pt-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-green-400/30 bg-green-400/10 text-green-400 text-[13px] font-bold tracking-wide uppercase mb-8 shadow-sm">
            <Zap className="h-4 w-4 text-green-400" />
            Next Generation Marketing
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] tracking-tight mb-6 text-white">
            Engage your audience like{" "}
            <span className="relative inline-block text-green-400 mt-2">
              never before.
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-green-400/40" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="transparent" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-[20px] text-blue-100/80 leading-relaxed mb-10 font-medium">
            The intelligent email platform that helps you grow faster, automate smarter, and build deeper connections.
          </p>

          {/* Features List */}
          <div className="grid gap-4">
            {features.map((feature, index) => (
              <div key={index} className="group flex items-center gap-4 p-4 rounded-xl border-[2px] border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-200">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2e2692] border-[2px] border-[#22c55e] shadow-[2px_2px_0px_0px_#22c55e] group-hover:shadow-[1px_1px_0px_0px_#22c55e] group-hover:translate-y-0.5 transition-all">
                  <feature.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-extrabold text-white text-[15px] uppercase tracking-wide">{feature.text}</p>
                  <p className="text-[14px] text-blue-200/60 font-medium">Optimized for high performance.</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Social Proof */}
        <div className="relative z-20 pt-12 border-t-[2px] border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-10 w-10 rounded-full border-[3px] border-[#2e2692] bg-[#22c55e] flex items-center justify-center text-[12px] text-[#120f3a] font-black z-10 shadow-sm">
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <p className="text-[15px] font-bold text-white uppercase tracking-wider">
                Join 50,000+ companies
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Right Side - Form Container --- */}
      <div className="flex-1 flex flex-col relative items-center justify-center bg-[#f8f9fc] px-6 lg:px-12 py-12">

        {/* Subtle dot grid for the form side */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)', backgroundSize: '24px 24px' }}
        />

        <div className="relative z-10 w-full max-w-[420px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">

          {/* Mobile Header (Only visible on small screens) */}
          <div className="lg:hidden flex flex-col items-center mb-10 text-center">
            <Image src="/logo.png" alt="Logo" width={100} height={100} />
          </div>

          {/* Form Content Injected Here */}
          <div className="w-full">
            {children}
          </div>

          <footer className="mt-12 text-center text-[13px] font-bold text-gray-400 uppercase tracking-widest">
            <p>&copy; {new Date().getFullYear()} MailPilot Technologies. All rights reserved.</p>
          </footer>
        </div>
      </div>

    </div>
  );
}