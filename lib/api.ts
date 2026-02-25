import type {
  ApiResponse,
  LoginResponse,
  Campaign,
  CampaignAnalytics,
  Subscriber,
  SubscriberStats,
  Audience,
  Template,
  Tag,
  AnalyticsOverview,
  TimeSeriesData,
  TopCampaign,
  DashboardData,
  ProfileSettings,
  NotificationSettings,
  SecuritySettings,
  Lead,
} from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

// ---------- helpers ----------

function getHeaders(token?: string): HeadersInit {
  const headers: HeadersInit = { "Content-Type": "application/json" }
  if (token) headers["Authorization"] = `Bearer ${token}`
  return headers
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  const res = await fetch(url, {
    ...options,
    headers: { ...getHeaders(token), ...options.headers },
    cache: "no-store",
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || data.message || "Request failed")
  return data as T
}

// ============ Auth API ============

export const authApi = {
  register(body: { name: string; email: string; password: string }) {
    return request<ApiResponse>("/api/v1/auth/register", {
      method: "POST",
      body: JSON.stringify(body),
    })
  },
  login(body: { email: string; password: string }) {
    return request<LoginResponse>("/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    })
  },
  verifyEmail(body: { email: string; otp: string }) {
    return request<ApiResponse>("/api/v1/auth/verify-email", {
      method: "POST",
      body: JSON.stringify(body),
    })
  },
  resendVerification(email: string) {
    return request<ApiResponse>("/api/v1/auth/resend-verification", {
      method: "POST",
      body: JSON.stringify({ email }),
    })
  },
  forgotPassword(email: string) {
    return request<ApiResponse>("/api/v1/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    })
  },
  resetPassword(body: { email: string; otp: string; newPassword: string }) {
    return request<ApiResponse>("/api/v1/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(body),
    })
  },
  me(token: string) {
    return request<ApiResponse<{ id: string; name: string; email: string; role: string }>>("/api/v1/auth/me", {}, token)
  },
  changePassword(body: { currentPassword: string; newPassword: string }, token: string) {
    return request<ApiResponse>("/api/v1/auth/change-password", {
      method: "POST",
      body: JSON.stringify(body),
    }, token)
  },
  logout(token: string) {
    return request<ApiResponse>("/api/v1/auth/logout", { method: "POST" }, token)
  },
}

// ============ Campaigns API ============

export const campaignsApi = {
  list(params: Record<string, string> = {}, token?: string) {
    const qs = new URLSearchParams(params).toString()
    return request<ApiResponse<Campaign[]>>(`/api/v1/campaigns?${qs}`, {}, token)
  },
  get(id: string, token?: string) {
    return request<ApiResponse<Campaign>>(`/api/v1/campaigns/${id}`, {}, token)
  },
  create(body: Partial<Campaign>, token?: string) {
    return request<ApiResponse<Campaign>>("/api/v1/campaigns", {
      method: "POST",
      body: JSON.stringify(body),
    }, token)
  },
  update(id: string, body: Partial<Campaign>, token?: string) {
    return request<ApiResponse<Campaign>>(`/api/v1/campaigns/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }, token)
  },
  delete(id: string, token?: string) {
    return request<ApiResponse>(`/api/v1/campaigns/${id}`, { method: "DELETE" }, token)
  },
  send(id: string, token?: string) {
    return request<ApiResponse>(`/api/v1/campaigns/${id}/send`, { method: "POST" }, token)
  },
  schedule(id: string, scheduledAt: string, token?: string) {
    return request<ApiResponse>(`/api/v1/campaigns/${id}/schedule`, {
      method: "POST",
      body: JSON.stringify({ scheduledAt }),
    }, token)
  },
  pause(id: string, token?: string) {
    return request<ApiResponse>(`/api/v1/campaigns/${id}/pause`, { method: "POST" }, token)
  },
  resume(id: string, token?: string) {
    return request<ApiResponse>(`/api/v1/campaigns/${id}/resume`, { method: "POST" }, token)
  },
  duplicate(id: string, token?: string) {
    return request<ApiResponse<Campaign>>(`/api/v1/campaigns/${id}/duplicate`, { method: "POST" }, token)
  },
  analytics(id: string, token?: string) {
    return request<ApiResponse<CampaignAnalytics>>(`/api/v1/campaigns/${id}/analytics`, {}, token)
  },
}

// ============ Subscribers API ============

export const subscribersApi = {
  list(params: Record<string, string> = {}, token?: string) {
    const qs = new URLSearchParams(params).toString()
    return request<ApiResponse<Subscriber[]>>(`/api/subscribers?${qs}`, {}, token)
  },
  get(id: string, token?: string) {
    return request<ApiResponse<Subscriber>>(`/api/subscribers/${id}`, {}, token)
  },
  create(body: Partial<Subscriber> & { audienceId?: string }, token?: string) {
    return request<ApiResponse<Subscriber>>("/api/subscribers", {
      method: "POST",
      body: JSON.stringify(body),
    }, token)
  },
  bulkCreate(body: { subscribers: Partial<Subscriber>[]; audienceId?: string; tags?: string[] }, token?: string) {
    return request<ApiResponse<{ created: number; failed: number; errors: string[] }>>("/api/subscribers/bulk", {
      method: "POST",
      body: JSON.stringify(body),
    }, token)
  },
  update(id: string, body: Partial<Subscriber>, token?: string) {
    return request<ApiResponse<Subscriber>>(`/api/subscribers/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }, token)
  },
  delete(id: string, token?: string) {
    return request<ApiResponse>(`/api/subscribers/${id}`, { method: "DELETE" }, token)
  },
  unsubscribe(id: string, reason: string, token?: string) {
    return request<ApiResponse>(`/api/subscribers/${id}/unsubscribe`, {
      method: "POST",
      body: JSON.stringify({ reason }),
    }, token)
  },
  stats(token?: string) {
    return request<ApiResponse<SubscriberStats>>("/api/subscribers/stats", {}, token)
  },
}

// ============ Audiences API ============

export const audiencesApi = {
  list(params: Record<string, string> = {}, token?: string) {
    const qs = new URLSearchParams(params).toString()
    return request<ApiResponse<Audience[]>>(`/api/v1/audiences?${qs}`, {}, token)
  },
  get(id: string, token?: string) {
    return request<ApiResponse<Audience>>(`/api/v1/audiences/${id}`, {}, token)
  },
  create(body: Partial<Audience>, token?: string) {
    return request<ApiResponse<Audience>>("/api/v1/audiences", {
      method: "POST",
      body: JSON.stringify(body),
    }, token)
  },
  update(id: string, body: Partial<Audience>, token?: string) {
    return request<ApiResponse>(`/api/v1/audiences/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }, token)
  },
  delete(id: string, token?: string) {
    return request<ApiResponse>(`/api/v1/audiences/${id}`, { method: "DELETE" }, token)
  },
  addSubscribers(id: string, subscriberIds: string[], token?: string) {
    return request<ApiResponse>(`/api/v1/audiences/${id}/subscribers`, {
      method: "POST",
      body: JSON.stringify({ subscriberIds }),
    }, token)
  },
  sync(id: string, token?: string) {
    return request<ApiResponse<{ added: number; removed: number }>>(`/api/v1/audiences/${id}/sync`, { method: "POST" }, token)
  },
}

// ============ Templates API ============

export const templatesApi = {
  list(params: Record<string, string> = {}, token?: string) {
    const qs = new URLSearchParams(params).toString()
    return request<ApiResponse<Template[]>>(`/api/v1/templates?${qs}`, {}, token)
  },
  get(id: string, token?: string) {
    return request<ApiResponse<Template>>(`/api/v1/templates/${id}`, {}, token)
  },
  create(body: Partial<Template>, token?: string) {
    return request<ApiResponse<Template>>("/api/v1/templates", {
      method: "POST",
      body: JSON.stringify(body),
    }, token)
  },
  update(id: string, body: Partial<Template>, token?: string) {
    return request<ApiResponse>(`/api/v1/templates/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }, token)
  },
  delete(id: string, token?: string) {
    return request<ApiResponse>(`/api/v1/templates/${id}`, { method: "DELETE" }, token)
  },
}

// ============ Tags API ============

export const tagsApi = {
  list(token?: string) {
    return request<ApiResponse<Tag[]>>("/api/tags", {}, token)
  },
  create(body: { name: string; color: string }, token?: string) {
    return request<ApiResponse<Tag>>("/api/tags", {
      method: "POST",
      body: JSON.stringify(body),
    }, token)
  },
  update(id: string, body: { name?: string; color?: string }, token?: string) {
    return request<ApiResponse>(`/api/tags/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }, token)
  },
  delete(id: string, token?: string) {
    return request<ApiResponse>(`/api/tags/${id}`, { method: "DELETE" }, token)
  },
}

// ============ Analytics API ============

export const analyticsApi = {
  overview(params: Record<string, string> = {}, token?: string) {
    const qs = new URLSearchParams(params).toString()
    return request<ApiResponse<AnalyticsOverview>>(`/api/analytics?${qs}`, {}, token)
  },
  timeseries(params: Record<string, string>, token?: string) {
    const qs = new URLSearchParams(params).toString()
    return request<ApiResponse<TimeSeriesData[]>>(`/api/analytics/timeseries?${qs}`, {}, token)
  },
  topCampaigns(params: Record<string, string> = {}, token?: string) {
    const qs = new URLSearchParams(params).toString()
    return request<ApiResponse<TopCampaign[]>>(`/api/analytics/top-campaigns?${qs}`, {}, token)
  },
}

// ============ Dashboard API ============

export const dashboardApi = {
  overview(token?: string) {
    return request<ApiResponse<DashboardData>>("/api/dashboard", {}, token)
  },
}

// ============ Settings API ============

export const settingsApi = {
  getProfile(token?: string) {
    return request<ApiResponse<ProfileSettings>>("/api/settings/profile", {}, token)
  },
  updateProfile(body: Partial<ProfileSettings>, token?: string) {
    return request<ApiResponse>("/api/settings/profile", {
      method: "PUT",
      body: JSON.stringify(body),
    }, token)
  },
  getNotifications(token?: string) {
    return request<ApiResponse<NotificationSettings>>("/api/settings/notifications", {}, token)
  },
  updateNotifications(body: Partial<NotificationSettings>, token?: string) {
    return request<ApiResponse>("/api/settings/notifications", {
      method: "PUT",
      body: JSON.stringify(body),
    }, token)
  },
  getSecurity(token?: string) {
    return request<ApiResponse<SecuritySettings>>("/api/settings/security", {}, token)
  },
  updatePassword(body: { currentPassword: string; newPassword: string }, token?: string) {
    return request<ApiResponse>("/api/settings/password", {
      method: "PUT",
      body: JSON.stringify(body),
    }, token)
  },
}

// ============ Leads API ============

export const leadsApi = {
  list(params: Record<string, string> = {}, token?: string) {
    const qs = new URLSearchParams(params).toString()
    return request<{ ok: boolean; items: Lead[]; total: number; page: number; limit: number }>(`/api/v1/leads?${qs}`, {}, token)
  },
  scrape(body: {
    actorId: string
    input: {
      searchStringsArray: string[]
      maxCrawledPlacesPerSearch: number
      language: string
    }
  }, token?: string) {
    return request<ApiResponse>("/api/v1/scrape", {
      method: "POST",
      body: JSON.stringify(body),
    }, token)
  },
}
