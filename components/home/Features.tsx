import { Mail, Zap, Users, BarChart3, Palette, Globe, ArrowRight } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: Mail,
      title: "Campaign Builder",
      description: "Drag-and-drop editor with raw HTML access for total control.",
    },
    {
      icon: Zap,
      title: "Logic Automation",
      description: "Build complex branching workflows based on user behavior triggers.",
    },
    {
      icon: Users,
      title: "Audience Segmentation",
      description: "Filter millions of records in milliseconds with our SQL-based engine.",
    },
    {
      icon: BarChart3,
      title: "Real-time Telemetry",
      description: "Live data streams for opens, clicks, and conversion attribution.",
    },
    {
      icon: Palette,
      title: "White Labeling",
      description: "Full customization of the interface and domains for your agency.",
    },
    {
      icon: Globe,
      title: "Global CDN",
      description: "Distributed infrastructure ensuring <100ms delivery times worldwide.",
    },
  ]

  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="mb-16">
           <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            System Capabilities
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Built for scale. Engineered for performance.
          </p>
        </div>

        {/* Grid Layout - No Gaps, Shared Borders */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 border-t border-l border-border">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 border-r border-b border-border bg-background hover:bg-muted/30 transition-colors duration-200"
            >
              <div className="mb-6 inline-flex items-center justify-center h-12 w-12 bg-primary/5 text-primary border border-primary/20">
                <feature.icon className="h-6 w-6" />
              </div>

              <h3 className="text-lg font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {feature.description}
              </p>

              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-wide group-hover:underline decoration-1 underline-offset-4"
              >
                Docs <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}