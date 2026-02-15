"use server"

import { redirect } from "next/navigation"
import { authApi } from "./api"
import { setToken, removeToken, getToken } from "./auth"

export async function loginAction(_prev: unknown, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  try {
    const res = await authApi.login({ email, password })
    if (res.ok && res.token) {
      await setToken(res.token)
    } else {
      return { error: "Invalid credentials" }
    }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Login failed"
    return { error: msg }
  }

  redirect("/dashboard")
}

export async function registerAction(_prev: unknown, formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!name || !email || !password) {
    return { error: "All fields are required" }
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters" }
  }

  try {
    const res = await authApi.register({ name, email, password })
    if (!res.ok) return { error: res.message || "Registration failed" }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Registration failed"
    return { error: msg }
  }

  redirect(`/verify-email?email=${encodeURIComponent(email)}`)
}

export async function verifyEmailAction(_prev: unknown, formData: FormData) {
  const email = formData.get("email") as string
  const otp = formData.get("otp") as string

  if (!email || !otp) {
    return { error: "Email and OTP are required" }
  }

  try {
    const res = await authApi.verifyEmail({ email, otp })
    if (!res.ok) return { error: res.message || "Verification failed" }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Verification failed"
    return { error: msg }
  }

  redirect("/login?verified=true")
}

export async function forgotPasswordAction(_prev: unknown, formData: FormData) {
  const email = formData.get("email") as string

  if (!email) {
    return { error: "Email is required" }
  }

  try {
    await authApi.forgotPassword(email)
  } catch {
    // Always return success for security
  }

  return { success: true, email }
}

export async function resetPasswordAction(_prev: unknown, formData: FormData) {
  const email = formData.get("email") as string
  const otp = formData.get("otp") as string
  const newPassword = formData.get("newPassword") as string

  if (!email || !otp || !newPassword) {
    return { error: "All fields are required" }
  }

  if (newPassword.length < 6) {
    return { error: "Password must be at least 6 characters" }
  }

  try {
    const res = await authApi.resetPassword({ email, otp, newPassword })
    if (!res.ok) return { error: res.message || "Reset failed" }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Reset failed"
    return { error: msg }
  }

  redirect("/login?reset=true")
}

export async function logoutAction() {
  const token = await getToken()
  if (token) {
    try {
      await authApi.logout(token)
    } catch {
      // Ignore errors
    }
  }
  await removeToken()
  redirect("/login")
}

export async function resendOtpAction(email: string) {
  try {
    await authApi.resendVerification(email)
    return { success: true }
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Failed to resend"
    return { error: msg }
  }
}
