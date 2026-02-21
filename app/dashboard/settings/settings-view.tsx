"use client"

import { useActionState, useState, useEffect } from "react"
import { User, Bell, Shield, Key, Globe, Building2, Phone, Mail, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import type { ProfileSettings, NotificationSettings, SecuritySettings } from "@/lib/types"
import { updateProfileAction, updateNotificationsAction, changePasswordAction } from "@/lib/settings-actions"
import { toast } from "sonner"

interface Props {
    profile: ProfileSettings | null
    notifications: NotificationSettings | null
    security: SecuritySettings | null
    user: { id: string; name: string; email: string; role: string } | null
}

const timezones = [
    "UTC", "America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles",
    "Europe/London", "Europe/Berlin", "Europe/Paris", "Asia/Tokyo", "Asia/Shanghai",
    "Asia/Kolkata", "Asia/Dhaka", "Asia/Dubai", "Australia/Sydney", "Pacific/Auckland",
]

function SuccessBanner({ message }: { message: string }) {
    return (
        <div className="flex items-center gap-2 border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-700 dark:text-green-400">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            {message}
        </div>
    )
}

function ErrorBanner({ message }: { message: string }) {
    return (
        <div className="border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
            {message}
        </div>
    )
}

// ============ Profile Section ============
function ProfileSection({ profile, user }: { profile: ProfileSettings | null; user: Props["user"] }) {
    const [state, formAction, pending] = useActionState(updateProfileAction, null)

    useEffect(() => {
        if (state?.success) toast.success("Profile updated successfully")
    }, [state])

    const defaultName = profile?.name || user?.name || ""
    const defaultEmail = profile?.email || user?.email || ""
    const defaultPhone = profile?.phone || ""
    const defaultCompany = profile?.company || ""
    const defaultTimezone = profile?.timezone || "UTC"

    return (
        <Card>
            <CardHeader className="border-b border-border">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center bg-primary/10">
                        <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-base">Profile Information</CardTitle>
                        <p className="text-sm text-muted-foreground">Update your personal details and preferences</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-6">
                {state?.success && <SuccessBanner message="Profile updated successfully" />}
                {state?.error && <ErrorBanner message={state.error} />}

                <form action={formAction} className="flex flex-col gap-5 mt-4">
                    <div className="grid gap-5 sm:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name" className="flex items-center gap-2">
                                <User className="h-3.5 w-3.5 text-muted-foreground" />
                                Full Name *
                            </Label>
                            <Input id="name" name="name" defaultValue={defaultName} required placeholder="John Doe" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email" className="flex items-center gap-2">
                                <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                                Email Address
                            </Label>
                            <Input id="email" value={defaultEmail} disabled className="bg-muted/50 cursor-not-allowed" />
                            <p className="text-xs text-muted-foreground">Contact support to change your email</p>
                        </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="phone" className="flex items-center gap-2">
                                <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                                Phone Number
                            </Label>
                            <Input id="phone" name="phone" defaultValue={defaultPhone} placeholder="+1 (555) 000-0000" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="company" className="flex items-center gap-2">
                                <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                                Company
                            </Label>
                            <Input id="company" name="company" defaultValue={defaultCompany} placeholder="Acme Inc." />
                        </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="timezone" className="flex items-center gap-2">
                                <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                                Timezone
                            </Label>
                            <Select name="timezone" defaultValue={defaultTimezone}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {timezones.map((tz) => (
                                        <SelectItem key={tz} value={tz}>{tz.replace(/_/g, " ")}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex justify-end pt-2 border-t border-border">
                        <Button type="submit" disabled={pending}>
                            {pending ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

// ============ Notifications Section ============
function NotificationsSection({ notifications }: { notifications: NotificationSettings | null }) {
    const [state, formAction, pending] = useActionState(updateNotificationsAction, null)

    useEffect(() => {
        if (state?.success) toast.success("Notification preferences updated")
    }, [state])

    const defaults = {
        email: notifications?.email ?? true,
        push: notifications?.push ?? false,
        sms: notifications?.sms ?? false,
        campaignReports: notifications?.campaignReports ?? true,
        weeklyDigest: notifications?.weeklyDigest ?? true,
        productUpdates: notifications?.productUpdates ?? false,
    }

    const notificationItems = [
        { name: "email", label: "Email Notifications", description: "Receive notifications via email", defaultChecked: defaults.email, icon: Mail },
        { name: "push", label: "Push Notifications", description: "Receive browser push notifications", defaultChecked: defaults.push, icon: Bell },
        { name: "sms", label: "SMS Notifications", description: "Receive critical alerts via SMS", defaultChecked: defaults.sms, icon: Phone },
        { name: "campaignReports", label: "Campaign Reports", description: "Get reports after campaigns complete", defaultChecked: defaults.campaignReports, icon: CheckCircle2 },
        { name: "weeklyDigest", label: "Weekly Digest", description: "A weekly summary of your metrics", defaultChecked: defaults.weeklyDigest, icon: Globe },
        { name: "productUpdates", label: "Product Updates", description: "Stay informed about new features", defaultChecked: defaults.productUpdates, icon: Bell },
    ]

    return (
        <Card>
            <CardHeader className="border-b border-border">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center bg-primary/10">
                        <Bell className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-base">Notification Preferences</CardTitle>
                        <p className="text-sm text-muted-foreground">Choose how you want to be notified</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-6">
                {state?.success && <SuccessBanner message="Notification preferences updated" />}
                {state?.error && <ErrorBanner message={state.error} />}

                <form action={formAction} className="flex flex-col gap-1 mt-4">
                    {notificationItems.map((item, index) => (
                        <label
                            key={item.name}
                            htmlFor={item.name}
                            className={`flex items-center justify-between p-4 hover:bg-muted/30 transition-colors cursor-pointer ${index < notificationItems.length - 1 ? "border-b border-border/50" : ""
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-9 w-9 items-center justify-center bg-muted/50">
                                    <item.icon className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                                    <p className="text-xs text-muted-foreground">{item.description}</p>
                                </div>
                            </div>
                            <input
                                type="checkbox"
                                id={item.name}
                                name={item.name}
                                defaultChecked={item.defaultChecked}
                                className="h-4 w-4 accent-primary cursor-pointer"
                            />
                        </label>
                    ))}

                    <div className="flex justify-end pt-4 border-t border-border">
                        <Button type="submit" disabled={pending}>
                            {pending ? "Saving..." : "Update Preferences"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

// ============ Security Section ============
function SecuritySection({ security }: { security: SecuritySettings | null }) {
    const [state, formAction, pending] = useActionState(changePasswordAction, null)
    const [showPasswordForm, setShowPasswordForm] = useState(false)

    useEffect(() => {
        if (state?.success) {
            toast.success("Password changed successfully")
            setShowPasswordForm(false)
        }
    }, [state])

    return (
        <Card>
            <CardHeader className="border-b border-border">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center bg-primary/10">
                        <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-base">Security</CardTitle>
                        <p className="text-sm text-muted-foreground">Manage your password and security settings</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="flex flex-col gap-6">
                    {/* Password Change */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex h-9 w-9 items-center justify-center bg-muted/50">
                                    <Key className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground">Password</p>
                                    <p className="text-xs text-muted-foreground">
                                        {security?.lastPasswordChange
                                            ? `Last changed ${new Date(security.lastPasswordChange).toLocaleDateString()}`
                                            : "Set a strong password to protect your account"
                                        }
                                    </p>
                                </div>
                            </div>
                            {!showPasswordForm && (
                                <Button variant="outline" size="sm" onClick={() => setShowPasswordForm(true)}>
                                    Change Password
                                </Button>
                            )}
                        </div>

                        {showPasswordForm && (
                            <div className="border border-border p-6 bg-muted/5">
                                {state?.success && <SuccessBanner message="Password changed successfully" />}
                                {state?.error && <ErrorBanner message={state.error} />}

                                <form action={formAction} className="flex flex-col gap-4 mt-3">
                                    <div className="flex flex-col gap-2">
                                        <Label htmlFor="currentPassword">Current Password *</Label>
                                        <Input id="currentPassword" name="currentPassword" type="password" required placeholder="Enter current password" />
                                    </div>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="newPassword">New Password *</Label>
                                            <Input id="newPassword" name="newPassword" type="password" required placeholder="Min 6 characters" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="confirmPassword">Confirm Password *</Label>
                                            <Input id="confirmPassword" name="confirmPassword" type="password" required placeholder="Repeat new password" />
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2 pt-2 border-t border-border">
                                        <Button type="button" variant="outline" onClick={() => setShowPasswordForm(false)}>Cancel</Button>
                                        <Button type="submit" disabled={pending}>
                                            {pending ? "Changing..." : "Change Password"}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>

                    {/* Two-Factor Auth Status */}
                    <div className="border-t border-border pt-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex h-9 w-9 items-center justify-center bg-muted/50">
                                    <Shield className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                                    <p className="text-xs text-muted-foreground">
                                        {security?.twoFactorEnabled
                                            ? "Two-factor authentication is enabled"
                                            : "Add an extra layer of security to your account"
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className={`px-3 py-1 text-xs font-medium border ${security?.twoFactorEnabled
                                    ? "border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-400"
                                    : "border-yellow-500/30 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
                                }`}>
                                {security?.twoFactorEnabled ? "Enabled" : "Disabled"}
                            </div>
                        </div>
                    </div>

                    {/* Login History */}
                    {security?.loginHistory && security.loginHistory.length > 0 && (
                        <div className="border-t border-border pt-6">
                            <h3 className="text-sm font-medium text-foreground mb-4">Recent Login Activity</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-muted/50">
                                        <tr className="border-b border-border text-left">
                                            <th className="p-3 font-medium text-muted-foreground">Device</th>
                                            <th className="p-3 font-medium text-muted-foreground">Location</th>
                                            <th className="p-3 font-medium text-muted-foreground">IP Address</th>
                                            <th className="p-3 font-medium text-muted-foreground">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {security.loginHistory.slice(0, 5).map((entry, i) => (
                                            <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                                                <td className="p-3 text-foreground">{entry.device}</td>
                                                <td className="p-3 text-muted-foreground">{entry.location}</td>
                                                <td className="p-3 text-muted-foreground font-mono text-xs">{entry.ip}</td>
                                                <td className="p-3 text-muted-foreground">{new Date(entry.timestamp).toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

// ============ Main Settings View ============
export function SettingsView({ profile, notifications, security, user }: Props) {
    return (
        <div className="flex flex-col gap-6 max-w-4xl">
            <ProfileSection profile={profile} user={user} />
            <NotificationsSection notifications={notifications} />
            <SecuritySection security={security} />
        </div>
    )
}
