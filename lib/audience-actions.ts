"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getToken } from "./auth"
import { audiencesApi } from "./api"

export async function createAudienceAction(_prev: unknown, formData: FormData) {
  const token = await getToken()
  if (!token) redirect("/login")

  const body = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    tags: (formData.get("tags") as string)?.split(",").map((t) => t.trim()).filter(Boolean) || [],
  }

  if (!body.name) return { error: "Audience name is required" }

  try {
    await audiencesApi.create(body, token)
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed to create audience" }
  }

  revalidatePath("/dashboard/audiences")
  redirect("/dashboard/audiences")
}

export async function updateAudienceAction(_prev: unknown, formData: FormData) {
  const token = await getToken()
  if (!token) redirect("/login")

  const id = formData.get("id") as string
  const body = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    tags: (formData.get("tags") as string)?.split(",").map((t) => t.trim()).filter(Boolean) || [],
  }

  try {
    await audiencesApi.update(id, body, token)
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed to update audience" }
  }

  revalidatePath("/dashboard/audiences")
  redirect("/dashboard/audiences")
}

export async function deleteAudienceAction(id: string) {
  const token = await getToken()
  if (!token) redirect("/login")

  try {
    await audiencesApi.delete(id, token)
    revalidatePath("/dashboard/audiences")
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed to delete" }
  }
}

export async function syncAudienceAction(id: string) {
  const token = await getToken()
  if (!token) redirect("/login")

  try {
    const res = await audiencesApi.sync(id, token)
    revalidatePath("/dashboard/audiences")
    return { success: true, data: res.data }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Sync failed" }
  }
}
