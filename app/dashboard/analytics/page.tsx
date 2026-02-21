import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getToken } from "@/lib/auth"
import { analyticsApi } from "@/lib/api"
import { AnalyticsCharts } from "./analytics-charts"

export const metadata = { title: "Analytics - MailPilot" }

async function getAnalyticsData() {
  try {
    const token = await getToken()
    if (!token) return null

    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    const [overviewRes, timeseriesRes, topRes] = await Promise.all([
      analyticsApi.overview({}, token),
      analyticsApi.timeseries({
        startDate: thirtyDaysAgo.toISOString(),
        endDate: now.toISOString(),
        interval: "daily",
      }, token),
      analyticsApi.topCampaigns({ limit: "5" }, token),
    ])

    return {
      overview: overviewRes.data || null,
      timeseries: timeseriesRes.data || [],
      topCampaigns: topRes.data || [],
    }
  } catch {
    return null
  }
}

export default async function AnalyticsPage() {
  const data = await getAnalyticsData()

  const overview = data?.overview?.overview ?? {
    totalCampaigns: 0,
    totalSent: 0,
    totalDelivered: 0,
    totalOpened: 0,
    totalClicked: 0,
    totalBounced: 0,
    totalUnsubscribed: 0,
  }

  const rates = data?.overview?.rates ?? {
    deliveryRate: 0,
    openRate: 0,
    clickRate: 0,
    bounceRate: 0,
    unsubscribeRate: 0,
  }

  const topCampaigns = data?.topCampaigns ?? []
  const timeseries = data?.timeseries ?? []

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Analytics</h1>
        <p className="text-muted-foreground">Track your email marketing performance</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Delivery Rate</p>
            <p className="text-2xl font-bold text-foreground">{rates.deliveryRate}%</p>
            <p className="text-xs text-muted-foreground">{overview.totalDelivered.toLocaleString()} delivered</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Open Rate</p>
            <p className="text-2xl font-bold text-foreground">{rates.openRate}%</p>
            <p className="text-xs text-muted-foreground">{overview.totalOpened.toLocaleString()} opened</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Click Rate</p>
            <p className="text-2xl font-bold text-foreground">{rates.clickRate}%</p>
            <p className="text-xs text-muted-foreground">{overview.totalClicked.toLocaleString()} clicked</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Bounce Rate</p>
            <p className="text-2xl font-bold text-foreground">{rates.bounceRate}%</p>
            <p className="text-xs text-muted-foreground">{overview.totalBounced.toLocaleString()} bounced</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Unsubscribe</p>
            <p className="text-2xl font-bold text-foreground">{rates.unsubscribeRate}%</p>
            <p className="text-xs text-muted-foreground">{overview.totalUnsubscribed.toLocaleString()} unsubs</p>
          </CardContent>
        </Card>
      </div>

      <AnalyticsCharts timeseries={timeseries} />

      <Card>
        <CardHeader className="border-b border-border">
          <CardTitle className="text-base">Top Campaigns</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {topCampaigns.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4">No campaign data available yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr className="border-b border-border text-left">
                    <th className="p-4 font-medium text-muted-foreground">Campaign</th>
                    <th className="p-4 font-medium text-muted-foreground text-right">Sent</th>
                    <th className="p-4 font-medium text-muted-foreground text-right">Open Rate</th>
                    <th className="p-4 font-medium text-muted-foreground text-right">Click Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {topCampaigns.map((c) => (
                    <tr key={c._id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="p-4 font-medium text-foreground">{c.name}</td>
                      <td className="p-4 text-right text-muted-foreground">{c.sent}</td>
                      <td className="p-4 text-right">
                        <Badge variant="secondary">{c.openRate}%</Badge>
                      </td>
                      <td className="p-4 text-right">
                        <Badge variant="secondary">{c.clickRate}%</Badge>
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
