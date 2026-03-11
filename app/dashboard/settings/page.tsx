import { redirect } from "next/navigation"
import { getToken } from "@/lib/auth"
import { settingsApi, authApi } from "@/lib/api"
import { SettingsView } from "./settings-view"
import type { ProfileSettings, NotificationSettings, SecuritySettings } from "@/lib/types"

export const metadata = { title: "Settings - Funurex" }

export default async function SettingsPage() {
    const token = await getToken()
    if (!token) redirect("/login")

    let profile: ProfileSettings | null = null
    let notifications: NotificationSettings | null = null
    let security: SecuritySettings | null = null
    let user: { id: string; name: string; email: string; role: string } | null = null

    try {
        const userRes = await authApi.me(token)
        if (userRes?.user) {
            const u = userRes.user
            user = { id: u.id, name: u.name, email: u.email, role: u.role }

            profile = {
                name: u.name,
                email: u.email,
                phone: u.phone || "",
                company: u.company || "",
                timezone: u.settings?.preferences?.timezone || u.timezone || "UTC",
                avatar: u.avatar || ""
            }

            if (u.settings?.notifications) {
                // Map API specific properties to component expected properties
                notifications = {
                    email: u.settings.notifications.marketingEmails ?? true,
                    push: false,
                    sms: false,
                    campaignReports: u.settings.notifications.emailCampaignReports ?? true,
                    weeklyDigest: u.settings.notifications.systemUpdates ?? true,
                    productUpdates: u.settings.notifications.systemUpdates ?? false,
                }
            }

            if (u.settings?.security) {
                security = {
                    twoFactorEnabled: u.settings.security.twoFactorEnabled ?? false,
                    lastPasswordChange: new Date().toISOString(), // Fallback
                    loginHistory: []
                }
            }
        }
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
