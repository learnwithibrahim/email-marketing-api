"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import Link from "next/link"
import { Search, MoreHorizontal, Eye, Pencil, Copy, Trash2, Send, Pause } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Campaign, Pagination } from "@/lib/types"
import { deleteCampaignAction, sendCampaignAction, pauseCampaignAction, duplicateCampaignAction } from "@/lib/campaign-actions"
import { toast } from "sonner"

const statusColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  draft: "secondary",
  scheduled: "outline",
  sending: "default",
  sent: "default",
  paused: "secondary",
  failed: "destructive",
}

interface Props {
  campaigns: Campaign[]
  pagination: Pagination | null
  currentSearch: string
  currentStatus: string
}

export function CampaignsTable({ campaigns, pagination, currentSearch, currentStatus }: Props) {
  const router = useRouter()
  const [search, setSearch] = useState(currentSearch)
  const [, startTransition] = useTransition()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (search) params.set("search", search)
    if (currentStatus) params.set("status", currentStatus)
    router.push(`/dashboard/campaigns?${params.toString()}`)
  }

  function handleStatusFilter(val: string) {
    const params = new URLSearchParams()
    if (search) params.set("search", search)
    if (val && val !== "all") params.set("status", val)
    router.push(`/dashboard/campaigns?${params.toString()}`)
  }

  function handleAction(action: () => Promise<{ success?: boolean; error?: string }>, successMsg: string) {
    startTransition(async () => {
      const res = await action()
      if (res.error) toast.error(res.error)
      else toast.success(successMsg)
    })
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1 max-w-sm">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search campaigns..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </form>
          <Select value={currentStatus || "all"} onValueChange={handleStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="sending">Sending</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {campaigns.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No campaigns found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 font-medium text-muted-foreground">Name</th>
                  <th className="pb-3 font-medium text-muted-foreground">Status</th>
                  <th className="pb-3 font-medium text-muted-foreground">Type</th>
                  <th className="pb-3 font-medium text-muted-foreground text-right">Sent</th>
                  <th className="pb-3 font-medium text-muted-foreground text-right">Opened</th>
                  <th className="pb-3 font-medium text-muted-foreground text-right">Clicked</th>
                  <th className="pb-3 font-medium text-muted-foreground w-10"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => (
                  <tr key={c._id} className="border-b border-border last:border-0">
                    <td className="py-3">
                      <div>
                        <p className="font-medium text-foreground">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.subject}</p>
                      </div>
                    </td>
                    <td className="py-3">
                      <Badge variant={statusColors[c.status] || "secondary"} className="capitalize">
                        {c.status}
                      </Badge>
                    </td>
                    <td className="py-3 text-muted-foreground capitalize">{c.type}</td>
                    <td className="py-3 text-right text-muted-foreground">{c.stats.sent.toLocaleString()}</td>
                    <td className="py-3 text-right text-muted-foreground">{c.stats.opened.toLocaleString()}</td>
                    <td className="py-3 text-right text-muted-foreground">{c.stats.clicked.toLocaleString()}</td>
                    <td className="py-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/campaigns/${c._id}`} className="flex items-center gap-2">
                              <Eye className="h-4 w-4" /> View Analytics
                            </Link>
                          </DropdownMenuItem>
                          {c.status === "draft" && (
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/campaigns/${c._id}/edit`} className="flex items-center gap-2">
                                <Pencil className="h-4 w-4" /> Edit
                              </Link>
                            </DropdownMenuItem>
                          )}
                          {c.status === "draft" && (
                            <DropdownMenuItem onClick={() => handleAction(() => sendCampaignAction(c._id), "Campaign sent!")} className="flex items-center gap-2">
                              <Send className="h-4 w-4" /> Send Now
                            </DropdownMenuItem>
                          )}
                          {c.status === "sending" && (
                            <DropdownMenuItem onClick={() => handleAction(() => pauseCampaignAction(c._id), "Campaign paused")} className="flex items-center gap-2">
                              <Pause className="h-4 w-4" /> Pause
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => handleAction(() => duplicateCampaignAction(c._id), "Campaign duplicated")} className="flex items-center gap-2">
                            <Copy className="h-4 w-4" /> Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleAction(() => deleteCampaignAction(c._id), "Campaign deleted")}
                            className="flex items-center gap-2 text-destructive focus:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Page {pagination.page} of {pagination.totalPages} ({pagination.total} total)
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={!pagination.hasPrev}
                onClick={() => {
                  const params = new URLSearchParams()
                  params.set("page", String(pagination.page - 1))
                  if (currentSearch) params.set("search", currentSearch)
                  if (currentStatus) params.set("status", currentStatus)
                  router.push(`/dashboard/campaigns?${params.toString()}`)
                }}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={!pagination.hasNext}
                onClick={() => {
                  const params = new URLSearchParams()
                  params.set("page", String(pagination.page + 1))
                  if (currentSearch) params.set("search", currentSearch)
                  if (currentStatus) params.set("status", currentStatus)
                  router.push(`/dashboard/campaigns?${params.toString()}`)
                }}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
