import { Mail } from "lucide-react"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-primary p-12 text-primary-foreground">
        <div className="flex items-center gap-2">
          <Mail className="h-8 w-8" />
          <span className="text-xl font-bold tracking-tight">MailPilot</span>
        </div>
        <div className="max-w-md">
          <h1 className="text-3xl font-bold leading-tight text-balance">
            Powerful email marketing made simple
          </h1>
          <p className="mt-4 text-primary-foreground/80 leading-relaxed">
            Create beautiful campaigns, grow your audience, and track every metric that matters. All in one place.
          </p>
        </div>
        <p className="text-sm text-primary-foreground/60">
          Trusted by 10,000+ marketers worldwide
        </p>
      </div>
      <div className="flex flex-1 items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  )
}
