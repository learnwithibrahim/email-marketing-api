"use server"

import { revalidatePath } from "next/cache"
import { leadsApi } from "./api"
import { getToken } from "./auth"

export async function scrapeLeadsAction(searchStringsArray: string[]) {
  try {
    const token = await getToken()
    if (!token) return { error: "Not authenticated" }

    const res = await leadsApi.scrape({
      actorId: "compass/crawler-google-places",
      input: {
        searchStringsArray,
        maxCrawledPlacesPerSearch: 30,
        language: "en",
      },
    }, token)

    if (!res.ok) return { error: res.error || "Failed to start scraping" }

    revalidatePath("/dashboard/leads")
    return { success: true, message: "Scraping started successfully" }
  } catch (error: any) {
    return { error: error.message || "Failed to start scraping" }
  }
}

export async function exportLeadsAction(search: string = "") {
  try {
    const token = await getToken()
    if (!token) return { error: "Not authenticated" }

    const res = await leadsApi.list({ search, limit: "10000" }, token)
    return { success: true, data: res.items || [] }
  } catch (error: any) {
    return { error: error.message || "Failed to fetch leads for export" }
  }
}
