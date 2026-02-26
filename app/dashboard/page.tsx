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
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back. Here is an overview of your email marketing.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Subscribers" value={stats.totalSubscribers} icon={Users} />
        <StatCard title="Campaigns" value={stats.totalCampaigns} icon={Send} />
        <StatCard title="Audiences" value={stats.totalAudiences} icon={UsersRound} />
        <StatCard title="Sent This Month" value={stats.sentThisMonth} icon={Mail} />
      </div>

      <DashboardCharts />

      <Card>
        <CardHeader className="border-b border-border">
          <CardTitle className="text-base">Recent Campaigns</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {recentCampaigns.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4">No campaigns yet. Create your first campaign to get started.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr className="border-b border-border text-left">
                    <th className="p-4 font-medium text-muted-foreground">Name</th>
                    <th className="p-4 font-medium text-muted-foreground">Status</th>
                    <th className="p-4 font-medium text-muted-foreground text-right">Sent</th>
                    <th className="p-4 font-medium text-muted-foreground text-right">Opened</th>
                  </tr>
                </thead>
                <tbody>
                  {recentCampaigns.map((c) => (
                    <tr key={c._id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="p-4 font-medium text-foreground">{c.name}</td>
                      <td className="p-4">
                        <Badge variant={c.status === "sent" ? "default" : "secondary"} className="capitalize">
                          {c.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-right text-muted-foreground">{c.sent}</td>
                      <td className="p-4 text-right text-muted-foreground">{c.opened}</td>
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
