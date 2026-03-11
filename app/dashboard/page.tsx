import { Users, Send, UsersRound, Mail } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StatCard } from "@/components/dashboard/stat-card"
import { DashboardCharts } from "./dashboard-charts"
import { getToken } from "@/lib/auth"
import { dashboardApi } from "@/lib/api"

export const metadata = { title: "Dashboard - Funurex" }

async function getDashboardData() {
  try {
    const token = await getToken()
    if (!token) return null
    const res = await dashboardApi.overview(token)
    return res.data || null
  } catch {
    return null
  }
}

export default async function DashboardPage() {
  const data = await getDashboardData()

  const stats = data?.overview ?? {
    totalSubscribers: 0,
    totalCampaigns: 0,
    totalAudiences: 0,
    sentThisMonth: 0,
  }

  const recentCampaigns = data?.recentCampaigns ?? []

  return (
    <div className="flex flex-col gap-8 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            Detailed overview of your email marketing performance and reach.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">System Live</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
        <StatCard
          title="Total Subscribers"
          value={stats.totalSubscribers}
          icon={Users}
          description="Total active contacts"
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title="Total Campaigns"
          value={stats.totalCampaigns}
          icon={Send}
          description="Campaigns delivered"
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatCard
          title="Active Audiences"
          value={stats.totalAudiences}
          icon={UsersRound}
          description="Segmented user groups"
          trend={{ value: 3.1, isPositive: false }}
        />
        <StatCard
          title="Sent This Month"
          value={stats.sentThisMonth}
          icon={Mail}
          description="Emails successfully sent"
          trend={{ value: 24.8, isPositive: true }}
        />
      </div>

      {/* Charts */}
      <DashboardCharts />

      {/* Recent Campaigns Table */}
      <Card className="premium-card-static border-none shadow-sm overflow-hidden animate-fade-in" style={{ animationDelay: '400ms' }}>
        <CardHeader className="bg-white dark:bg-slate-900 px-6 py-5 flex flex-row items-center justify-between border-b">
          <div>
            <CardTitle className="text-lg font-bold">Recent Campaigns</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">Quick look at your latest campaign activities</p>
          </div>
          <Badge variant="outline" className="h-7 text-[10px] font-bold">Updated Just Now</Badge>
        </CardHeader>
        <CardContent className="p-0">
          {recentCampaigns.length === 0 ? (
            <div className="p-16 text-center flex flex-col items-center">
              <div className="h-20 w-20 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                <Send className="h-10 w-10 text-primary/40" />
              </div>
              <p className="text-lg font-semibold text-foreground">No active campaigns</p>
              <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">You haven&apos;t started any campaigns yet. Launch one today to see your results.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/30 border-b">
                    <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-wider text-muted-foreground text-left">Campaign Details</th>
                    <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-wider text-muted-foreground text-left">Current Status</th>
                    <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-wider text-muted-foreground text-right">Sent Count</th>
                    <th className="px-6 py-4 text-[12px] font-bold uppercase tracking-wider text-muted-foreground text-right pr-8">Open Metrics</th>
                  </tr>
                </thead>
                <tbody className="divide-y border-t-0">
                  {recentCampaigns.map((c) => (
                    <tr key={c._id} className="hover:bg-muted/20 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-bold text-foreground text-[15px] group-hover:text-primary transition-colors">{c.name}</span>
                          <span className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                            <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                            ID: {c._id.substring(0, 8)}...
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <Badge variant={c.status === "sent" ? "default" : "secondary"} className="h-6 text-[10px] font-black">
                          {c.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-5 text-right font-semibold text-foreground/80 tabular-nums">
                        {c.sent?.toLocaleString() || 0}
                      </td>
                      <td className="px-6 py-5 text-right pr-8 tabular-nums font-bold text-primary">
                        {c.opened?.toLocaleString() || 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  )
}