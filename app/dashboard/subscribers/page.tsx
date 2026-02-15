import { getToken } from "@/lib/auth"
import { subscribersApi } from "@/lib/api"
import { SubscribersView } from "./subscribers-view"

export const metadata = { title: "Subscribers - MailPilot" }

interface Props {
  searchParams: Promise<{ page?: string; search?: string; status?: string }>
}

async function getSubscribers(params: Record<string, string>) {
  try {
    const token = await getToken()
    if (!token) return { data: [], pagination: null, stats: null }
    const [subRes, statsRes] = await Promise.all([
      subscribersApi.list(params, token),
      subscribersApi.stats(token),
    ])
    return {
      data: subRes.data || [],
      pagination: subRes.pagination || null,
      stats: statsRes.data || null,
    }
  } catch {
    return { data: [], pagination: null, stats: null }
  }
}

export default async function SubscribersPage({ searchParams }: Props) {
  const params = await searchParams
  const queryParams: Record<string, string> = {
    page: params.page || "1",
    limit: "10",
  }
  if (params.search) queryParams.search = params.search
  if (params.status) queryParams.status = params.status

  const { data, pagination, stats } = await getSubscribers(queryParams)

  return (
    <SubscribersView
      subscribers={data ?? []}
      pagination={pagination}
      stats={stats}
      currentSearch={params.search || ""}
      currentStatus={params.status || ""}
    />
  )
}
