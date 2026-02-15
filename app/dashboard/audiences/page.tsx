import { getToken } from "@/lib/auth"
import { audiencesApi } from "@/lib/api"
import { AudiencesView } from "./audiences-view"

export const metadata = { title: "Audiences - MailPilot" }

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

export default async function AudiencesPage() {
  const audiences = await getAudiences()
  return <AudiencesView audiences={audiences} />
}
