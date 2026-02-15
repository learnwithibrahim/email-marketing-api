"use client"

import { useActionState, useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { createSubscriberAction } from "@/lib/subscriber-actions"

export function AddSubscriberDialog() {
  const [open, setOpen] = useState(false)
  const [state, formAction, pending] = useActionState(createSubscriberAction, null)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Subscriber
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Subscriber</DialogTitle>
        </DialogHeader>

        {state?.error && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
            {state.error}
          </div>
        )}

        <form action={formAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="sub-email">Email *</Label>
            <Input id="sub-email" name="email" type="email" required placeholder="subscriber@example.com" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="sub-firstName">First Name *</Label>
              <Input id="sub-firstName" name="firstName" required placeholder="John" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="sub-lastName">Last Name</Label>
              <Input id="sub-lastName" name="lastName" placeholder="Doe" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="sub-phone">Phone</Label>
            <Input id="sub-phone" name="phone" type="tel" placeholder="+1234567890" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="sub-tags">Tags</Label>
            <Input id="sub-tags" name="tags" placeholder="newsletter, vip" />
            <p className="text-xs text-muted-foreground">Comma-separated</p>
          </div>
          <Button type="submit" disabled={pending}>
            {pending ? "Adding..." : "Add Subscriber"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
