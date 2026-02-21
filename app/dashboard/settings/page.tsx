import { redirect } from "next/navigation"
import { getToken } from "@/lib/auth"
import { settingsApi, authApi } from "@/lib/api"
import { SettingsView } from "./settings-view"
import type { ProfileSettings, NotificationSettings, SecuritySettings } from "@/lib/types"

export const metadata = { title: "Settings - MailPilot" }

export default async function SettingsPage() {
    const token = await getToken()
    if (!token) redirect("/login")

    let profile: ProfileSettings | null = null
    let notifications: NotificationSettings | null = null
    let security: SecuritySettings | null = null
    let user: { id: string; name: string; email: string; role: string } | null = null

    try {
        const [profileRes, notifRes, secRes, userRes] = await Promise.allSettled([
            settingsApi.getProfile(token),
            settingsApi.getNotifications(token),
            settingsApi.getSecurity(token),
            authApi.me(token),
        ])

        if (profileRes.status === "fulfilled") profile = profileRes.value.data ?? null
        if (notifRes.status === "fulfilled") notifications = notifRes.value.data ?? null
        if (secRes.status === "fulfilled") security = secRes.value.data ?? null
        if (userRes.status === "fulfilled") user = userRes.value.data ?? null
    } catch {
        // Fall through — view handles null gracefully
    }

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Settings</h1>
                <p className="text-muted-foreground">Manage your account settings and preferences</p>
            </div>

            <SettingsView
                profile={profile}
                notifications={notifications}
                security={security}
                user={user}
            />
        </div>
    )
}
