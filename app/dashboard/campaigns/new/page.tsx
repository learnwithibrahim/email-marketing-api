import { getToken } from "@/lib/auth"
import { audiencesApi } from "@/lib/api"
import { CampaignForm } from "@/components/dashboard/campaign-form"
import { createCampaignAction } from "@/lib/campaign-actions"

export const metadata = { title: "New Campaign - Funurex" }

async function getAudiences() {
  try {
    const token = await getToken()
    if (!token) return []
    const res = await audiencesApi.list({}, token)
    return res.data || []
  } catch {
    return []
  }
}

export default async function NewCampaignPage() {
  const audiences = await getAudiences()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Create Campaign</h1>
        <p className="text-muted-foreground">Set up a new email campaign</p>
      </div>
      <CampaignForm audiences={audiences} action={createCampaignAction} submitLabel="Create Campaign" />
    </div>
  )
}
