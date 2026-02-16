import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckSquare, Zap, Shield, BarChart3, TrendingUp } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Technical Grid Background */}
      <div className="absolute inset-0" />
       <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: "url('/hero1.jpg')" }}
  />
      <div className="container mx-auto px-4 md:px-8 py-20 md:py-32 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Copy */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider mb-8">
              <span className="w-2 h-2 bg-primary"></span>
              Enterprise Ready v2.0
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
              Precision Lead <br />
              <span className="text-primary">Generation Engines</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-lg">
              Architect complex B2B campaigns with absolute control. 
              Automate outreach, track conversion vectors, and scale without chaos.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/register">
                <Button size="lg" className="h-14 px-8 rounded-none text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
                  Start Deployment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#demo">
                <Button variant="outline" size="lg" className="h-14 px-8 rounded-none text-base font-semibold border-2 w-full sm:w-auto hover:bg-muted">
                  View Architecture
                </Button>
              </Link>
            </div>

            {/* Trust indicators - tabular style */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-border pt-8">
              <div className="flex items-center gap-3">
                <CheckSquare className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">SOC2 Compliant</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckSquare className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">99.99% Uptime</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckSquare className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">GDPR Ready</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dashboard Interface (Geometric/Flat) */}
          <div className="relative">
             {/* Decorative back square */}
            <div className="absolute -inset-4 border border-border bg-muted/20 -z-10 translate-x-4 translate-y-4" />
            
            {/* Main Interface Window */}
            <div className="border border-border bg-background relative">
              {/* Window Header */}
              <div className="border-b border-border bg-muted/30 px-4 py-3 flex items-center justify-between">
                <div className="flex gap-4 text-xs font-mono text-muted-foreground">
                   <span>cmd: /campaign-status</span>
                   <span>user: admin@mailpilot</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-muted-foreground/30"></div>
                  <div className="w-3 h-3 bg-muted-foreground/30"></div>
                </div>
              </div>

              {/* Window Body */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="border border-border p-4 bg-muted/5">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Active Leads</div>
                    <div className="text-3xl font-bold font-mono">24,589</div>
                    <div className="flex items-center text-xs text-green-600 mt-2">
                      <TrendingUp className="h-3 w-3 mr-1" /> +12.5%
                    </div>
                  </div>
                  <div className="border border-border p-4 bg-muted/5">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Conversion Rate</div>
                    <div className="text-3xl font-bold font-mono">4.2%</div>
                    <div className="flex items-center text-xs text-green-600 mt-2">
                      <TrendingUp className="h-3 w-3 mr-1" /> +0.8%
                    </div>
                  </div>
                </div>

                {/* Graph Placeholder */}
                <div className="border border-border h-48 relative bg-muted/5 flex flex-col justify-end p-4">
                  <div className="flex items-end gap-2 h-32 w-full justify-between px-2">
                    {[40, 65, 45, 80, 55, 90, 70, 85].map((h, i) => (
                      <div key={i} className="w-full bg-primary/80 hover:bg-primary transition-colors" style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                  <div className="border-t border-border mt-2 pt-2 flex justify-between text-[10px] text-muted-foreground font-mono">
                    <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}