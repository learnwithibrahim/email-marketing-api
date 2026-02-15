"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getToken } from "./auth"
import { subscribersApi } from "./api"

export async function createSubscriberAction(_prev: unknown, formData: FormData) {
  const token = await getToken()
  if (!token) redirect("/login")

  const body = {
    email: formData.get("email") as string,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    phone: (formData.get("phone") as string) || undefined,
    audienceId: (formData.get("audienceId") as string) || undefined,
    tags: (formData.get("tags") as string)?.split(",").map((t) => t.trim()).filter(Boolean) || [],
  }

  if (!body.email || !body.firstName) {
    return { error: "Email and first name are required" }
  }

  try {
    await subscribersApi.create(body, token)
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed to create subscriber" }
  }

  revalidatePath("/dashboard/subscribers")
  redirect("/dashboard/subscribers")
}

export async function deleteSubscriberAction(id: string) {
  const token = await getToken()
  if (!token) redirect("/login")

  try {
    await subscribersApi.delete(id, token)
    revalidatePath("/dashboard/subscribers")
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed to delete" }
  }
}

export async function bulkImportAction(_prev: unknown, formData: FormData) {
  const token = await getToken()
  if (!token) redirect("/login")

  const csvData = formData.get("csvData") as string
  const audienceId = (formData.get("audienceId") as string) || undefined
  const tags = (formData.get("tags") as string)?.split(",").map((t) => t.trim()).filter(Boolean) || []

  if (!csvData) return { error: "Please paste CSV data" }

  const lines = csvData.trim().split("\n").filter(Boolean)
  const subscribers = lines.map((line) => {
    const parts = line.split(",").map((p) => p.trim())
    return { email: parts[0], firstName: parts[1] || "", lastName: parts[2] || "" }
  }).filter((s) => s.email)

  if (subscribers.length === 0) return { error: "No valid data found" }

  try {
    const res = await subscribersApi.bulkCreate({ subscribers, audienceId, tags }, token)
    revalidatePath("/dashboard/subscribers")
    return { success: true, data: res.data }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Bulk import failed" }
  }
}
