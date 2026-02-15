import { Mail, Zap, Users, BarChart3, Palette, Globe, ArrowRight } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: Mail,
      title: "Campaign Builder",
      description: "Create stunning emails with our drag-and-drop editor. No coding required, just beautiful results.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Zap,
      title: "Smart Automation",
      description: "Set up triggers and workflows that send the right message at the right time, automatically.",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: Users,
      title: "Audience Management",
      description: "Organize subscribers with tags, segments, and custom fields. Target precisely who matters.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Track opens, clicks, and conversions in real-time. Make data-driven decisions with confidence.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Palette,
      title: "Template Library",
      description: "Choose from hundreds of professionally designed templates or create your own brand-aligned designs.",
      gradient: "from-rose-500 to-red-500",
    },
    {
      icon: Globe,
      title: "Global Delivery",
      description: "Enterprise-grade infrastructure ensures your emails land in inboxes, not spam folders.",
      gradient: "from-indigo-500 to-violet-500",
    },
  ]

  return (
    <section id="features" className="py-24 md:py-32 bg-background relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <div className="container mx-auto px-4 md:px-8 relative">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Features
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Everything you need to{" "}
            <span className="text-gradient">grow your audience</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful tools that work together seamlessly. Build, automate, and scale your email marketing.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl border border-border/50 bg-card hover:bg-card/80 hover:border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg mb-5`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {feature.description}
              </p>

              {/* Link */}
              <a
                href="#"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all duration-200"
              >
                Learn more <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            View all features <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
