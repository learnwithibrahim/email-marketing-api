import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export default function CTA() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/10 to-primary/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-8 relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Content */}
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            Ready to grow your{" "}
            <span className="text-gradient">business?</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
            Join thousands of marketers who use MailPilot to connect with their audience 
            and drive real results.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link href="/register">
              <Button size="lg" className="h-12 px-8 text-base font-semibold gap-2">
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="h-12 px-8 text-base font-semibold">
                Talk to Sales
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Free 14-day trial</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
