import { getToken } from "@/lib/auth"
import { templatesApi } from "@/lib/api"
import { TemplatesView } from "./templates-view"

export const metadata = { title: "Templates - MailPilot" }

async function getTemplates() {
  try {
    const token = await getToken()
    if (!token) return []
    const res = await templatesApi.list({}, token)
    return res.data || []
  } catch {
    return []
  }
}

export default async function TemplatesPage() {
  const templates = await getTemplates()
  return <TemplatesView templates={templates} />
}
