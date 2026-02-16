import Link from "next/link"
import { Mail, Twitter, Github, Linkedin } from "lucide-react"

export default function Footer() {
  const footerLinks = {
    product: [
      { label: "Features", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "API", href: "#" },
      { label: "Changelog", href: "#" },
    ],
    company: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Legal", href: "#" },
      { label: "Contact", href: "#" },
    ],
    resources: [
      { label: "Documentation", href: "#" },
      { label: "Status", href: "#" },
      { label: "Community", href: "#" },
      { label: "Help Center", href: "#" },
    ],
  }

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 md:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="flex h-8 w-8 items-center justify-center bg-foreground text-background">
                <Mail className="h-4 w-4" />
              </div>
              <span className="text-xl font-bold tracking-tight">MailPilot</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-8 max-w-xs leading-relaxed">
              Enterprise-grade email marketing and lead generation infrastructure for data-driven teams.
            </p>
            <div className="flex gap-4">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="p-2 border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-bold text-foreground uppercase tracking-wider text-sm mb-6">
                  {category}
                </h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline underline-offset-4">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-mono">
          <p>© {new Date().getFullYear()} MAILPILOT SYSTEMS INC.</p>
          <div className="flex gap-6">
             <a href="#" className="hover:text-foreground">PRIVACY</a>
             <a href="#" className="hover:text-foreground">TERMS</a>
             <a href="#" className="hover:text-foreground">SLA</a>
          </div>
        </div>
      </div>
    </footer>
  )
}