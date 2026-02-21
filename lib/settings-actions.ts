"use server"

import { getToken } from "./auth"
import { settingsApi, authApi } from "./api"
import { revalidatePath } from "next/cache"

export async function updateProfileAction(_prev: unknown, formData: FormData) {
  const token = await getToken()
  if (!token) return { error: "Not authenticated" }

  const name = formData.get("name") as string
  const phone = formData.get("phone") as string
  const company = formData.get("company") as string
  const timezone = formData.get("timezone") as string

  if (!name) return { error: "Name is required" }

  try {
    const res = await settingsApi.updateProfile({ name, phone, company, timezone }, token)
    if (!res.ok) return { error: res.message || "Failed to update profile" }
    revalidatePath("/dashboard/settings")
    return { success: true }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to update profile"
    return { error: msg }
  }
}

export async function updateNotificationsAction(_prev: unknown, formData: FormData) {
  const token = await getToken()
  if (!token) return { error: "Not authenticated" }

  const email = formData.get("email") === "on"
  const push = formData.get("push") === "on"
  const sms = formData.get("sms") === "on"
  const campaignReports = formData.get("campaignReports") === "on"
  const weeklyDigest = formData.get("weeklyDigest") === "on"
  const productUpdates = formData.get("productUpdates") === "on"

  try {
    const res = await settingsApi.updateNotifications(
      { email, push, sms, campaignReports, weeklyDigest, productUpdates },
      token
    )
    if (!res.ok) return { error: res.message || "Failed to update notifications" }
    revalidatePath("/dashboard/settings")
    return { success: true }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to update notifications"
    return { error: msg }
  }
}

export async function changePasswordAction(_prev: unknown, formData: FormData) {
  const token = await getToken()
  if (!token) return { error: "Not authenticated" }

  const currentPassword = formData.get("currentPassword") as string
  const newPassword = formData.get("newPassword") as string
  const confirmPassword = formData.get("confirmPassword") as string

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { error: "All fields are required" }
  }

  if (newPassword.length < 6) {
    return { error: "New password must be at least 6 characters" }
  }

  if (newPassword !== confirmPassword) {
    return { error: "Passwords do not match" }
  }

  try {
    const res = await authApi.changePassword({ currentPassword, newPassword }, token)
    if (!res.ok) return { error: res.message || "Failed to change password" }
    revalidatePath("/dashboard/settings")
    return { success: true }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to change password"
    return { error: msg }
  }
}
