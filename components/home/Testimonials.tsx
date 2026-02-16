import { Quote } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "VP of Marketing",
      company: "TechFlow",
      content: "MailPilot isn't just a tool; it's infrastructure. We migrated 2M+ leads in a week with zero downtime. The ROI was visible by day three.",
    },
    {
      name: "Marcus Johnson",
      role: "Founder",
      company: "GrowthLab",
      content: "We needed granular control over our SMTP relay settings and automation logic. This is the only platform that treats us like engineers.",
    },
    {
      name: "Emily Rodriguez",
      role: "Director",
      company: "Nexus Systems",
      content: "The analytics precision is unmatched. We stopped guessing about attribution models. Clean, fast, and professional.",
    },
  ]

  return (
    <section className="py-24 bg-muted/10 border-t border-border">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
             <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Industry Validation
            </h2>
            <p className="text-lg text-muted-foreground">
              Trusted by high-growth B2B organizations.
            </p>
          </div>
          
          <div className="flex gap-8 text-sm font-mono text-muted-foreground">
             <div>
                <span className="block text-2xl font-bold text-foreground">50k+</span>
                Active Seats
             </div>
             <div>
                <span className="block text-2xl font-bold text-foreground">1B+</span>
                API Requests
             </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div key={index} className="flex flex-col justify-between border border-border bg-background p-8">
              <div>
                <Quote className="h-8 w-8 text-primary mb-6" />
                <p className="text-lg text-foreground font-medium leading-relaxed mb-8">
                  "{t.content}"
                </p>
              </div>
              <div className="border-t border-border pt-6 mt-auto">
                <p className="font-bold text-foreground">{t.name}</p>
                <div className="text-sm text-muted-foreground mt-1">
                  {t.role}, <span className="text-primary">{t.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}