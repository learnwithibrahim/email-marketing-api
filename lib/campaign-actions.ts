"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getToken } from "./auth"
import { campaignsApi } from "./api"

export async function createCampaignAction(_prev: unknown, formData: FormData) {
  const token = await getToken()
  if (!token) redirect("/login")

  const body = {
    name: formData.get("name") as string,
    subject: formData.get("subject") as string,
    body: formData.get("body") as string,
    type: formData.get("type") as "newsletter" | "promotional" | "transactional" | "welcome",
    provider: formData.get("provider") as string,
    audienceId: formData.get("audienceId") as string,
    templateId: (formData.get("templateId") as string) || undefined,
    tags: (formData.get("tags") as string)?.split(",").map((t) => t.trim()).filter(Boolean) || [],
  }

  if (!body.name || !body.subject || !body.type || !body.provider || !body.audienceId) {
    return { error: "Please fill in all required fields" }
  }

  try {
    await campaignsApi.create(body, token)
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed to create campaign" }
  }

  revalidatePath("/dashboard/campaigns")
  redirect("/dashboard/campaigns")
}

export async function updateCampaignAction(_prev: unknown, formData: FormData) {
  const token = await getToken()
  if (!token) redirect("/login")

  const id = formData.get("id") as string
  const body = {
    name: formData.get("name") as string,
    subject: formData.get("subject") as string,
    body: formData.get("body") as string,
    type: formData.get("type") as "newsletter" | "promotional" | "transactional" | "welcome",
    provider: formData.get("provider") as string,
    audienceId: formData.get("audienceId") as string,
    tags: (formData.get("tags") as string)?.split(",").map((t) => t.trim()).filter(Boolean) || [],
  }

  try {
    await campaignsApi.update(id, body, token)
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed to update campaign" }
  }

  revalidatePath("/dashboard/campaigns")
  redirect("/dashboard/campaigns")
}

export async function deleteCampaignAction(id: string) {
  const token = await getToken()
  if (!token) redirect("/login")

  try {
    await campaignsApi.delete(id, token)
    revalidatePath("/dashboard/campaigns")
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed to delete" }
  }
}

export async function sendCampaignAction(id: string) {
  const token = await getToken()
  if (!token) redirect("/login")

  try {
    await campaignsApi.send(id, token)
    revalidatePath("/dashboard/campaigns")
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed to send" }
  }
}

export async function scheduleCampaignAction(id: string, scheduledAt: string) {
  const token = await getToken()
  if (!token) redirect("/login")

  try {
    await campaignsApi.schedule(id, scheduledAt, token)
    revalidatePath("/dashboard/campaigns")
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed to schedule" }
  }
}

export async function pauseCampaignAction(id: string) {
  const token = await getToken()
  if (!token) redirect("/login")

  try {
    await campaignsApi.pause(id, token)
    revalidatePath("/dashboard/campaigns")
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed to pause" }
  }
}

export async function duplicateCampaignAction(id: string) {
  const token = await getToken()
  if (!token) redirect("/login")

  try {
    await campaignsApi.duplicate(id, token)
    revalidatePath("/dashboard/campaigns")
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed to duplicate" }
  }
}
