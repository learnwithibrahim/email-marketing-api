// ============ Common ============
export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext?: boolean
  hasPrev?: boolean
}

export interface ApiResponse<T = unknown> {
  ok: boolean
  data?: T
  message?: string
  error?: string
  pagination?: Pagination
}

// ============ Auth ============
export interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin"
  isActive?: boolean
  isEmailVerified: boolean
  trialEndsAt: string
  lastLoginAt?: string
  avatar?: string | null
  phone?: string
  company?: string
  timezone?: string
  settings?: {
    notifications: { email: boolean; push: boolean }
    security: { twoFactorEnabled: boolean }
  }
}

export interface LoginResponse {
  ok: boolean
  token: string
  user: User
}

// ============ Campaigns ============
export interface CampaignStats {
  sent: number
  delivered: number
  opened: number
  clicked: number
  bounced: number
  unsubscribed: number
  complained: number
}

export interface Campaign {
  _id: string
  name: string
  subject: string
  body?: string
  status: "draft" | "scheduled" | "sending" | "sent" | "paused" | "failed"
  type: "newsletter" | "promotional" | "transactional" | "welcome"
  provider: string
  audienceId: { _id: string; name: string; subscriberCount?: number } | string
  templateId?: { _id: string; name: string; subject?: string; body?: string } | string
  stats: CampaignStats
  tags: string[]
  settings?: {
    trackOpens: boolean
    trackClicks: boolean
    unsubscribeLink: boolean
    replyTo: string | null
  }
  scheduledAt: string | null
  sentAt: string | null
  createdAt: string
  updatedAt: string
}

export interface CampaignAnalytics {
  campaignId: string
  stats: CampaignStats
  rates: {
    deliveryRate: number
    openRate: number
    clickRate: number
    bounceRate: number
    unsubscribeRate: number
  }
}

// ============ Subscribers ============
export interface Subscriber {
  _id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  status: "active" | "unsubscribed" | "cleaned"
  tags: string[]
  audiences: string[] | { _id: string; name: string }[]
  customFields?: Record<string, string>
  createdAt: string
  updatedAt: string
}

export interface SubscriberStats {
  total: number
  active: number
  unsubscribed: number
  cleaned: number
  byTag: Record<string, number>
  byAudience: Record<string, number>
}

// ============ Audiences ============
export interface Audience {
  _id: string
  name: string
  description: string
  subscriberCount: number
  tags: string[]
  conditions?: { field: string; operator: string; value: string | number }[]
  createdAt: string
  updatedAt: string
}

// ============ Templates ============
export interface Template {
  _id: string
  name: string
  subject: string
  body?: string
  category: string
  thumbnail?: string
  variables?: string[]
  createdAt: string
  updatedAt: string
}

// ============ Tags ============
export interface Tag {
  _id: string
  name: string
  subscriberCount: number
  color: string
  createdAt: string
}

// ============ Analytics ============
export interface AnalyticsOverview {
  overview: {
    totalCampaigns: number
    totalSent: number
    totalDelivered: number
    totalOpened: number
    totalClicked: number
    totalBounced: number
    totalUnsubscribed: number
  }
  rates: {
    deliveryRate: number
    openRate: number
    clickRate: number
    bounceRate: number
    unsubscribeRate: number
  }
}

export interface TimeSeriesData {
  date: string
  sent: number
  delivered: number
  opened: number
  clicked: number
  bounced: number
}

export interface TopCampaign {
  _id: string
  name: string
  sent: number
  opened: number
  clicked: number
  openRate: number
  clickRate: number
}

// ============ Dashboard ============
export interface DashboardData {
  overview: {
    totalSubscribers: number
    totalCampaigns: number
    totalAudiences: number
    sentThisMonth: number
  }
  recentCampaigns: {
    _id: string
    name: string
    status: string
    sent: number
    opened: number
  }[]
  recentActivity: {
    action: string
    campaign: string
    timestamp: string
  }[]
}

// ============ Settings ============
export interface ProfileSettings {
  name: string
  email: string
  phone: string
  company: string
  timezone: string
  avatar: string
}

export interface NotificationSettings {
  email: boolean
  push: boolean
  sms: boolean
  campaignReports: boolean
  weeklyDigest: boolean
  productUpdates: boolean
}

export interface SecuritySettings {
  twoFactorEnabled: boolean
  lastPasswordChange: string
  loginHistory: {
    ip: string
    location: string
    timestamp: string
    device: string
  }[]
}
