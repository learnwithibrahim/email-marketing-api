import { cn } from "@/lib/utils"

interface SectionCardProps {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
  action?: React.ReactNode
}

export function SectionCard({
  title,
  description,
  children,
  className,
  action
}: SectionCardProps) {
  return (
    <div className={cn(
      "border border-border/50 bg-card overflow-hidden",
      "bg-gradient-to-b from-card to-muted/30",
      "transition-all duration-200 hover:border-border",
      className
    )}>
      {(title || action) && (
        <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
          <div>
            {title && (
              <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            )}
            {description && (
              <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}
