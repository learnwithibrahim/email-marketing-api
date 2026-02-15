"use client"

import { useState, useTransition } from "react"
import { Plus, MoreHorizontal, Trash2, Pencil, FileText } from "lucide-react"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Template } from "@/lib/types"
import { createTemplateAction, deleteTemplateAction } from "@/lib/template-actions"
import { useActionState } from "react"
import { toast } from "sonner"

interface Props {
  templates: Template[]
}

export function TemplatesView({ templates }: Props) {
  const [, startTransition] = useTransition()

  function handleDelete(id: string) {
    startTransition(async () => {
      const res = await deleteTemplateAction(id)
      if (res.error) toast.error(res.error)
      else toast.success("Template deleted")
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Templates</h1>
          <p className="text-muted-foreground">Reusable email templates for your campaigns</p>
        </div>
        <CreateTemplateDialog />
      </div>

      {templates.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No templates yet. Create your first template to get started.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((t) => (
            <Card key={t._id} className="group">
              <CardContent className="p-0">
                <div className="h-36 bg-muted rounded-t-lg flex items-center justify-center">
                  {t.thumbnail ? (
                    <img src={t.thumbnail} alt={t.name} className="h-full w-full object-cover rounded-t-lg" />
                  ) : (
                    <FileText className="h-12 w-12 text-muted-foreground/40" />
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{t.name}</h3>
                      <p className="text-sm text-muted-foreground truncate mt-0.5">{t.subject}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleDelete(t._id)} className="text-destructive focus:text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <Badge variant="outline" className="capitalize text-xs">{t.category}</Badge>
                    <span className="text-xs text-muted-foreground">{new Date(t.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

function CreateTemplateDialog() {
  const [open, setOpen] = useState(false)
  const [state, formAction, pending] = useActionState(createTemplateAction, null)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Template
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Template</DialogTitle>
        </DialogHeader>
        {state?.error && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{state.error}</div>
        )}
        <form action={formAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="tpl-name">Name *</Label>
            <Input id="tpl-name" name="name" required placeholder="e.g. Welcome Email" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="tpl-subject">Subject *</Label>
            <Input id="tpl-subject" name="subject" required placeholder="e.g. Welcome, {{'{firstName}'}}" />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Category</Label>
            <Select name="category" defaultValue="welcome">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="welcome">Welcome</SelectItem>
                <SelectItem value="promotional">Promotional</SelectItem>
                <SelectItem value="transactional">Transactional</SelectItem>
                <SelectItem value="newsletter">Newsletter</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="tpl-body">HTML Body</Label>
            <Textarea id="tpl-body" name="body" rows={6} placeholder="<html><body>...</body></html>" />
          </div>
          <Button type="submit" disabled={pending}>
            {pending ? "Creating..." : "Create Template"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
