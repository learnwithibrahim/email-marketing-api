import type { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
  trend?: { value: number; isPositive: boolean }
}

export function StatCard({ title, value, icon: Icon, description, trend }: StatCardProps) {
  return (
    <Card className="premium-card group hover-lift border-none">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1 flex-1">
            <p className="text-[12px] font-bold uppercase tracking-wider text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground tracking-tight mt-1">
              {typeof value === "number" ? value.toLocaleString() : value}
            </p>

            <div className="flex items-center gap-2 mt-4">
              {trend && (
                <div
                  className={cn(
                    "flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full border",
                    trend.isPositive
                      ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                      : "bg-red-500/10 text-red-600 border-red-500/20"
                  )}
                >
                  {trend.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  <span>{Math.abs(trend.value)}%</span>
                </div>
              )}
              {description && (
                <p className="text-[12px] font-medium text-muted-foreground">{description}</p>
              )}
            </div>
          </div>

          <div className="stat-card-icon shadow-sm bg-primary/5">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}