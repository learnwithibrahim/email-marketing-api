import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getToken } from "@/lib/auth"
import { campaignsApi } from "@/lib/api"
import { CampaignAnalyticsCharts } from "./analytics-charts"

export const metadata = { title: "Campaign Analytics - MailPilot" }

export default async function CampaignDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const token = await getToken()
  if (!token) return notFound()

  let campaign
  let analytics
  try {
    const [campRes, analyticsRes] = await Promise.all([
      campaignsApi.get(id, token),
      campaignsApi.analytics(id, token),
    ])
    campaign = campRes.data
    analytics = analyticsRes.data
  } catch {
    // Use just campaign if analytics fail
    try {
      const campRes = await campaignsApi.get(id, token)
      campaign = campRes.data
    } catch {
      return notFound()
    }
  }

  if (!campaign) return notFound()

  const stats = analytics?.stats || campaign.stats
  const rates = analytics?.rates

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/campaigns" className="p-2 hover:bg-accent">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">{campaign.name}</h1>
            <Badge variant="secondary" className="capitalize">{campaign.status}</Badge>
          </div>
          <p className="text-muted-foreground">{campaign.subject}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Sent</p>
            <p className="text-2xl font-bold text-foreground">{stats.sent.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Delivered</p>
            <p className="text-2xl font-bold text-foreground">{stats.delivered.toLocaleString()}</p>
            {rates && <p className="text-xs text-muted-foreground">{rates.deliveryRate}% rate</p>}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Opened</p>
            <p className="text-2xl font-bold text-foreground">{stats.opened.toLocaleString()}</p>
            {rates && <p className="text-xs text-muted-foreground">{rates.openRate}% rate</p>}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Clicked</p>
            <p className="text-2xl font-bold text-foreground">{stats.clicked.toLocaleString()}</p>
            {rates && <p className="text-xs text-muted-foreground">{rates.clickRate}% rate</p>}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Bounced</p>
            <p className="text-xl font-bold text-foreground">{stats.bounced.toLocaleString()}</p>
            {rates && <p className="text-xs text-muted-foreground">{rates.bounceRate}% rate</p>}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Unsubscribed</p>
            <p className="text-xl font-bold text-foreground">{stats.unsubscribed.toLocaleString()}</p>
            {rates && <p className="text-xs text-muted-foreground">{rates.unsubscribeRate}% rate</p>}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Complaints</p>
            <p className="text-xl font-bold text-foreground">{stats.complained.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      <CampaignAnalyticsCharts stats={stats} rates={rates} />

      <Card>
        <CardHeader className="border-b border-border"><CardTitle className="text-base">Campaign Info</CardTitle></CardHeader>
        <CardContent>
          <dl className="grid gap-3 sm:grid-cols-2 text-sm">
            <div>
              <dt className="text-muted-foreground">Type</dt>
              <dd className="font-medium text-foreground capitalize">{campaign.type}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Provider</dt>
              <dd className="font-medium text-foreground">{campaign.provider}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Created</dt>
              <dd className="font-medium text-foreground">{new Date(campaign.createdAt).toLocaleDateString()}</dd>
            </div>
            {campaign.scheduledAt && (
              <div>
                <dt className="text-muted-foreground">Scheduled</dt>
                <dd className="font-medium text-foreground">{new Date(campaign.scheduledAt).toLocaleDateString()}</dd>
              </div>
            )}
            {campaign.tags.length > 0 && (
              <div className="sm:col-span-2">
                <dt className="text-muted-foreground mb-1">Tags</dt>
                <dd className="flex flex-wrap gap-1">
                  {campaign.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </CardContent>
      </Card>
    </div>
  )
}
