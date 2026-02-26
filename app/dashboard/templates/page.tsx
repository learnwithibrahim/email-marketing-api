import { getToken } from "@/lib/auth"
import { templatesApi } from "@/lib/api"
import { TemplatesView } from "./templates-view"

export const metadata = { title: "Templates - Funurex" }

async function getTemplates() {
  try {
    const token = await getToken()
    if (!token) return []
    const res = await templatesApi.list({}, token)
    if (Array.isArray(res.data)) return res.data
    if (res.data && typeof res.data === "object" && "templates" in res.data) {
      return (res.data as any).templates || []
    }
    return []
  } catch {
    return []
  }
}

export default async function TemplatesPage() {
  const templates = await getTemplates()
  return <TemplatesView templates={templates} />
}
