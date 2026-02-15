"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Search, Plus, MoreHorizontal, Trash2, Upload, Users, UserMinus, UserX } from "lucide-react"
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { StatCard } from "@/components/dashboard/stat-card"
import type { Subscriber, Pagination, SubscriberStats } from "@/lib/types"
import { deleteSubscriberAction } from "@/lib/subscriber-actions"
import { AddSubscriberDialog } from "./add-subscriber-dialog"
import { BulkImportDialog } from "./bulk-import-dialog"
import { toast } from "sonner"

const statusColors: Record<string, "default" | "secondary" | "destructive"> = {
  active: "default",
  unsubscribed: "secondary",
  cleaned: "destructive",
}

interface Props {
  subscribers: Subscriber[]
  pagination: Pagination | null
  stats: SubscriberStats | null
  currentSearch: string
  currentStatus: string
}

export function SubscribersView({ subscribers, pagination, stats, currentSearch, currentStatus }: Props) {
  const router = useRouter()
  const [search, setSearch] = useState(currentSearch)
  const [, startTransition] = useTransition()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (search) params.set("search", search)
    if (currentStatus) params.set("status", currentStatus)
    router.push(`/dashboard/subscribers?${params.toString()}`)
  }

  function handleStatusFilter(val: string) {
    const params = new URLSearchParams()
    if (search) params.set("search", search)
    if (val && val !== "all") params.set("status", val)
    router.push(`/dashboard/subscribers?${params.toString()}`)
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      const res = await deleteSubscriberAction(id)
      if (res.error) toast.error(res.error)
      else toast.success("Subscriber deleted")
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Subscribers</h1>
          <p className="text-muted-foreground">Manage your email subscriber list</p>
        </div>
        <div className="flex gap-2">
          <BulkImportDialog />
          <AddSubscriberDialog />
        </div>
      </div>

      {stats && (
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard title="Active" value={stats.active} icon={Users} />
          <StatCard title="Unsubscribed" value={stats.unsubscribed} icon={UserMinus} />
          <StatCard title="Cleaned" value={stats.cleaned} icon={UserX} />
        </div>
      )}

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
            <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1 max-w-sm">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search subscribers..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
              </div>
            </form>
            <Select value={currentStatus || "all"} onValueChange={handleStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
                <SelectItem value="cleaned">Cleaned</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {subscribers.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">No subscribers found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-3 font-medium text-muted-foreground">Email</th>
                    <th className="pb-3 font-medium text-muted-foreground">Name</th>
                    <th className="pb-3 font-medium text-muted-foreground">Status</th>
                    <th className="pb-3 font-medium text-muted-foreground">Tags</th>
                    <th className="pb-3 font-medium text-muted-foreground">Joined</th>
                    <th className="pb-3 font-medium text-muted-foreground w-10"><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((s) => (
                    <tr key={s._id} className="border-b border-border last:border-0">
                      <td className="py-3 font-medium text-foreground">{s.email}</td>
                      <td className="py-3 text-muted-foreground">{s.firstName} {s.lastName}</td>
                      <td className="py-3">
                        <Badge variant={statusColors[s.status] || "secondary"} className="capitalize">{s.status}</Badge>
                      </td>
                      <td className="py-3">
                        <div className="flex flex-wrap gap-1">
                          {s.tags.slice(0, 3).map((t) => (
                            <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
                          ))}
                          {s.tags.length > 3 && <span className="text-xs text-muted-foreground">+{s.tags.length - 3}</span>}
                        </div>
                      </td>
                      <td className="py-3 text-muted-foreground text-sm">{new Date(s.createdAt).toLocaleDateString()}</td>
                      <td className="py-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleDelete(s._id)} className="text-destructive focus:text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" /> Delete
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
              <p className="text-sm text-muted-foreground">Page {pagination.page} of {pagination.totalPages}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled={!pagination.hasPrev} onClick={() => {
                  const p = new URLSearchParams(); p.set("page", String(pagination.page - 1))
                  if (currentSearch) p.set("search", currentSearch); if (currentStatus) p.set("status", currentStatus)
                  router.push(`/dashboard/subscribers?${p.toString()}`)
                }}>Previous</Button>
                <Button variant="outline" size="sm" disabled={!pagination.hasNext} onClick={() => {
                  const p = new URLSearchParams(); p.set("page", String(pagination.page + 1))
                  if (currentSearch) p.set("search", currentSearch); if (currentStatus) p.set("status", currentStatus)
                  router.push(`/dashboard/subscribers?${p.toString()}`)
                }}>Next</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
