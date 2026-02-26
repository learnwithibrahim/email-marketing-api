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
    <Card className="group hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#2e2692] transition-all duration-200 cursor-default">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1 flex-1">
            <p className="text-[13px] font-extrabold uppercase tracking-wider text-gray-500">{title}</p>
            <p className="text-3xl md:text-4xl font-black text-[#2e2692] tracking-tight mt-1">
              {typeof value === "number" ? value.toLocaleString() : value}
            </p>

            <div className="flex items-center gap-2 mt-3">
              {trend && (
                <div
                  className={cn(
                    "flex items-center gap-1 text-[13px] font-bold px-2 py-0.5 rounded-md border-[2px]",
                    trend.isPositive
                      ? "bg-[#d1fae5] text-[#065f46] border-[#059669]"
                      : "bg-[#fee2e2] text-[#991b1b] border-[#dc2626]"
                  )}
                >
                  {trend.isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span>{Math.abs(trend.value)}%</span>
                </div>
              )}
              {description && (
                <p className="text-[13px] font-medium text-gray-500">{description}</p>
              )}
            </div>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-xl border-[2px] border-[#2e2692] bg-[#f8f9fc] shadow-[2px_2px_0px_0px_rgba(46,38,146,0.15)] group-hover:bg-[#22c55e] group-hover:shadow-[2px_2px_0px_0px_#2e2692] transition-all duration-200">
            <Icon className="h-7 w-7 text-[#2e2692]" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}