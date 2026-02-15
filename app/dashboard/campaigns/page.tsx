import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getToken } from "@/lib/auth"
import { campaignsApi } from "@/lib/api"
import { CampaignsTable } from "./campaigns-table"

export const metadata = { title: "Campaigns - MailPilot" }

interface Props {
  searchParams: Promise<{ page?: string; search?: string; status?: string }>
}

async function getCampaigns(params: Record<string, string>) {
  try {
    const token = await getToken()
    if (!token) return { data: [], pagination: null }
    const res = await campaignsApi.list(params, token)
    return { data: res.data || [], pagination: res.pagination || null }
  } catch {
    return { data: [], pagination: null }
  }
}

export default async function CampaignsPage({ searchParams }: Props) {
  const params = await searchParams
  const queryParams: Record<string, string> = {
    page: params.page || "1",
    limit: "10",
  }
  if (params.search) queryParams.search = params.search
  if (params.status) queryParams.status = params.status

  const { data, pagination } = await getCampaigns(queryParams)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Campaigns</h1>
          <p className="text-muted-foreground">Manage and track your email campaigns</p>
        </div>
        <Link href="/dashboard/campaigns/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Campaign
          </Button>
        </Link>
      </div>

      <CampaignsTable
        campaigns={data ?? []}
        pagination={pagination}
        currentSearch={params.search || ""}
        currentStatus={params.status || ""}
      />
    </div>
  )
}
