"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getToken } from "./auth"
import { templatesApi } from "./api"

export async function createTemplateAction(_prev: unknown, formData: FormData) {
  const token = await getToken()
  if (!token) redirect("/login")

  const body = {
    name: formData.get("name") as string,
    subject: formData.get("subject") as string,
    body: formData.get("body") as string,
    category: formData.get("category") as string,
  }

  if (!body.name || !body.subject) return { error: "Name and subject are required" }

  try {
    await templatesApi.create(body, token)
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed to create template" }
  }

  revalidatePath("/dashboard/templates")
  redirect("/dashboard/templates")
}

export async function updateTemplateAction(_prev: unknown, formData: FormData) {
  const token = await getToken()
  if (!token) redirect("/login")

  const id = formData.get("id") as string
  const body = {
    name: formData.get("name") as string,
    subject: formData.get("subject") as string,
    body: formData.get("body") as string,
    category: formData.get("category") as string,
  }

  try {
    await templatesApi.update(id, body, token)
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed to update template" }
  }

  revalidatePath("/dashboard/templates")
  redirect("/dashboard/templates")
}

export async function deleteTemplateAction(id: string) {
  const token = await getToken()
  if (!token) redirect("/login")

  try {
    await templatesApi.delete(id, token)
    revalidatePath("/dashboard/templates")
    return { success: true }
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Failed to delete" }
  }
}
