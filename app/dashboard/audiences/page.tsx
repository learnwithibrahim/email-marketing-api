import { getToken } from "@/lib/auth"
import { audiencesApi } from "@/lib/api"
import { AudiencesView } from "./audiences-view"

export const metadata = { title: "Audiences - MailPilot" }

async function getAudiences() {
  try {
    const token = await getToken()
    if (!token) return []
    const res = await audiencesApi.list({}, token)
    if (Array.isArray(res.data)) return res.data
    if (res.data && typeof res.data === "object" && "audiences" in res.data) {
      return (res.data as any).audiences || []
    }
    return res.data || []
  } catch {
    return []
  }
}

export default async function AudiencesPage() {
  const audiences = await getAudiences()
  return <AudiencesView audiences={audiences} />
}
