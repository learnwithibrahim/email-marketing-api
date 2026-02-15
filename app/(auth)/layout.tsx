import { Mail, ArrowRight, CheckCircle2, BarChart3, Users, Zap } from "lucide-react"
import Link from "next/link"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const features = [
    { icon: BarChart3, text: "Real-time analytics" },
    { icon: Users, text: "Audience segmentation" },
    { icon: Zap, text: "Smart automation" },
  ]

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Marketing */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-12 text-primary-foreground relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 -left-40 w-80 h-80 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 -right-40 w-80 h-80 bg-white rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
              <Mail className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">MailPilot</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-lg">
          <h1 className="text-4xl font-bold leading-tight text-balance mb-4">
            Email marketing that actually works
          </h1>
          <p className="text-lg text-primary-foreground/80 leading-relaxed mb-8">
            Create beautiful campaigns, grow your audience, and track every metric that matters. 
            All in one powerful platform.
          </p>
          
          {/* Features list */}
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 backdrop-blur">
                  <feature.icon className="h-4 w-4" />
                </div>
                <span className="text-primary-foreground/90">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="mt-10 p-4 rounded-xl bg-white/10 backdrop-blur">
            <p className="text-sm text-primary-foreground/80 italic mb-3">
              "MailPilot transformed how we communicate with our customers. Our open rates increased by 45% in just two months."
            </p>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center text-sm font-semibold">
                SC
              </div>
              <div>
                <p className="text-sm font-medium">Sarah Chen</p>
                <p className="text-xs text-primary-foreground/60">Marketing Director, TechFlow</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <p className="text-sm text-primary-foreground/60">
            Trusted by 50,000+ marketers worldwide
          </p>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-2 w-2 rounded-full bg-white/30" />
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-1 items-center justify-center p-6 lg:p-12 bg-background relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        
        <div className="relative z-10 w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/25">
              <Mail className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">MailPilot</span>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  )
}
