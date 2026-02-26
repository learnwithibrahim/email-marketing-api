import { notFound } from "next/navigation"
import { getToken } from "@/lib/auth"
import { campaignsApi, audiencesApi } from "@/lib/api"
import { CampaignForm } from "@/components/dashboard/campaign-form"
import { updateCampaignAction } from "@/lib/campaign-actions"

export const metadata = { title: "Edit Campaign - Funurex" }

export default async function EditCampaignPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const token = await getToken()
  if (!token) return notFound()

  let campaign
  let audiences
  try {
    const [campRes, audRes] = await Promise.all([
      campaignsApi.get(id, token),
      audiencesApi.list({}, token),
    ])
    campaign = campRes.data
    audiences = audRes.data || []
  } catch {
    return notFound()
  }

  if (!campaign) return notFound()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Edit Campaign</h1>
        <p className="text-muted-foreground">Update your campaign details</p>
      </div>
      <CampaignForm campaign={campaign} audiences={audiences} action={updateCampaignAction} submitLabel="Save Changes" />
    </div>
  )
}
