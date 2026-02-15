"use client"

import { useState, useTransition } from "react"
import { Plus, MoreHorizontal, Trash2, RefreshCw, Pencil, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Audience } from "@/lib/types"
import { createAudienceAction, deleteAudienceAction, syncAudienceAction } from "@/lib/audience-actions"
import { useActionState } from "react"
import { toast } from "sonner"

interface Props {
  audiences: Audience[]
}

export function AudiencesView({ audiences }: Props) {
  const [, startTransition] = useTransition()

  function handleAction(action: () => Promise<{ success?: boolean; error?: string }>, msg: string) {
    startTransition(async () => {
      const res = await action()
      if (res.error) toast.error(res.error)
      else toast.success(msg)
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Audiences</h1>
          <p className="text-muted-foreground">Organize subscribers into targeted segments</p>
        </div>
        <CreateAudienceDialog />
      </div>

      {audiences.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No audiences created yet. Create your first audience to get started.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a) => (
            <Card key={a._id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{a.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{a.description || "No description"}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleAction(() => syncAudienceAction(a._id), "Audience synced")}>
                        <RefreshCw className="h-4 w-4 mr-2" /> Sync
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction(() => deleteAudienceAction(a._id), "Audience deleted")} className="text-destructive focus:text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {a.subscriberCount.toLocaleString()} subscribers
                  </div>
                </div>
                {a.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {a.tags.map((t) => (
                      <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

function CreateAudienceDialog() {
  const [open, setOpen] = useState(false)
  const [state, formAction, pending] = useActionState(createAudienceAction, null)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Audience
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Audience</DialogTitle>
        </DialogHeader>
        {state?.error && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{state.error}</div>
        )}
        <form action={formAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="aud-name">Name *</Label>
            <Input id="aud-name" name="name" required placeholder="e.g. VIP Customers" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="aud-desc">Description</Label>
            <Textarea id="aud-desc" name="description" rows={3} placeholder="Describe this audience segment" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="aud-tags">Tags</Label>
            <Input id="aud-tags" name="tags" placeholder="vip, customers" />
          </div>
          <Button type="submit" disabled={pending}>
            {pending ? "Creating..." : "Create Audience"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
