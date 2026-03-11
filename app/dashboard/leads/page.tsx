import { getToken } from "@/lib/auth"
import { leadsApi, audiencesApi } from "@/lib/api"
import { LeadsView } from "./leads-view"

export const metadata = { title: "Leads - Funurex" }

interface Props {
    searchParams: Promise<{ page?: string; search?: string }>
}

async function getLeads(params: Record<string, string>) {
    try {
        const token = await getToken()
        if (!token) return { data: [], pagination: null }

        const res = await leadsApi.list(params, token)
        return {
            data: res.items || [],
            pagination: {
                page: res.page || 1,
                limit: res.limit || 50,
                total: res.total || 0,
                totalPages: Math.ceil((res.total || 0) / (res.limit || 50)) || 1,
                hasNext: (res.page * res.limit) < res.total,
                hasPrev: res.page > 1
            },
        }
    } catch {
        return { data: [], pagination: null }
    }
}

export default async function LeadsPage({ searchParams }: Props) {
    const params = await searchParams
    const queryParams: Record<string, string> = {
        page: params.page || "1",
        limit: "50",
    }
    if (params.search) queryParams.search = params.search

    const token = await getToken()
    const { data, pagination } = await getLeads(queryParams)
    let audiences: any[] = []
    if (token) {
        const audRes = await audiencesApi.list({}, token)
        audiences = audRes.data || []
    }

    return (
        <LeadsView
            leads={data ?? []}
            pagination={pagination}
            currentSearch={params.search || ""}
            audiences={audiences}
        />
    )
}
