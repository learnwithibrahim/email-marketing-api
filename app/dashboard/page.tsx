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
      <div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#2e2692]">Dashboard Overview</h1>
        <p className="text-[16px] font-medium text-gray-600 mt-2">
          Welcome back. Here is the latest data on your email marketing performance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Subscribers" value={stats.totalSubscribers} icon={Users} />
        <StatCard title="Campaigns" value={stats.totalCampaigns} icon={Send} />
        <StatCard title="Audiences" value={stats.totalAudiences} icon={UsersRound} />
        <StatCard title="Sent This Month" value={stats.sentThisMonth} icon={Mail} />
      </div>

      {/* Charts */}
      <DashboardCharts />

      {/* Recent Campaigns Table */}
      <Card>
        <CardHeader className="border-b-[3px] border-[#2e2692] bg-[#f8f9fc] rounded-t-xl">
          <CardTitle>Recent Campaigns</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {recentCampaigns.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center">
              <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 border-[2px] border-gray-200">
                <Send className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-[16px] font-bold text-[#2e2692]">No campaigns yet</p>
              <p className="text-[14px] text-gray-500 font-medium mt-1">Create your first campaign to get started.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-white">
                  <tr className="border-b-[3px] border-[#2e2692] text-left">
                    <th className="p-5 text-[13px] font-extrabold uppercase tracking-widest text-[#2e2692]">Campaign Name</th>
                    <th className="p-5 text-[13px] font-extrabold uppercase tracking-widest text-[#2e2692]">Status</th>
                    <th className="p-5 text-[13px] font-extrabold uppercase tracking-widest text-[#2e2692] text-right">Sent</th>
                    <th className="p-5 text-[13px] font-extrabold uppercase tracking-widest text-[#2e2692] text-right">Opened</th>
                  </tr>
                </thead>
                <tbody>
                  {recentCampaigns.map((c) => (
                    <tr key={c._id} className="border-b-[2px] border-gray-100 last:border-0 hover:bg-[#f8f9fc] transition-colors group">
                      <td className="p-5 font-bold text-[#120f3a] text-[15px]">{c.name}</td>
                      <td className="p-5">
                        <Badge variant={c.status === "sent" ? "default" : "secondary"}>
                          {c.status}
                        </Badge>
                      </td>
                      <td className="p-5 text-right font-medium text-gray-600">{c.sent}</td>
                      <td className="p-5 text-right font-bold text-[#2e2692]">{c.opened}</td>
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