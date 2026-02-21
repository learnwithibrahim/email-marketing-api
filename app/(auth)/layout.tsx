import { Mail, ArrowRight, CheckCircle2, BarChart3, Users, Zap } from "lucide-react"
import Link from "next/link"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const features = [
    { icon: BarChart3, text: "Real-time analytics" },
    { icon: Users, text: "Audience segmentation" },
    { icon: Zap, text: "Smart automation" },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Side - Marketing - Hidden on mobile */}
      <div className="hidden lg:flex lg:w-[45%] flex-col justify-between bg-primary p-12 text-primary-foreground relative overflow-hidden">
        {/* Dynamic background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-white/10 blur-[120px]" />
          <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] rounded-full bg-white/5 blur-[80px]" />
        </div>

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl transition-all group-hover:bg-white/15">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">MailPilot</span>
          </Link>
        </div>

        <div className="relative z-10 mt-auto mb-auto max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-xs font-medium mb-6 uppercase tracking-wider text-white/80">
            <Zap className="h-3 w-3 text-yellow-300" />
            Next Generation Marketing
          </div>
          <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight mb-6">
            Engage your audience like never before.
          </h1>
          <p className="text-xl text-primary-foreground/70 leading-relaxed max-w-md mb-10">
            The intelligent email platform that helps you grow faster, automate smarter, and build deeper connections.
          </p>

          <div className="grid gap-4">
            {features.map((feature, index) => (
              <div key={index} className="group flex items-center gap-4 p-4 rounded-xl transition-colors hover:bg-white/5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 backdrop-blur-md border border-white/10 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">{feature.text}</p>
                  <p className="text-sm text-primary-foreground/60">Optimized for high performance.</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 pt-12 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-primary bg-primary-dark flex items-center justify-center text-[10px] font-bold">
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium text-white/80">
                Join 50,000+ companies
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-white" : "bg-white/30"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col relative items-center justify-center bg-background px-6 lg:px-12 py-12">
        {/* Subtle background pattern for professional look */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)', backgroundSize: '32px 32px' }} />

        <div className="relative z-10 w-full max-w-md animate-fade-in-up">
          {/* Mobile Header */}
          <div className="lg:hidden flex flex-col items-center mb-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-2xl shadow-primary/20 mb-4">
              <Mail className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">MailPilot</h2>
          </div>

          <div className="w-full">
            {children}
          </div>

          <footer className="mt-12 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} MailPilot Technologies SG. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  )
}
