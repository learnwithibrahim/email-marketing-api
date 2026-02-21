"use client"

import { useActionState, useState } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { bulkImportAction } from "@/lib/subscriber-actions"

export function BulkImportDialog() {
  const [open, setOpen] = useState(false)
  const [state, formAction, pending] = useActionState(bulkImportAction, null)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="h-4 w-4 mr-2" />
          Bulk Import
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bulk Import Subscribers</DialogTitle>
        </DialogHeader>

        {state?.error && (
          <div className="border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
            {state.error}
          </div>
        )}

        {state?.success && (
          <div className="border border-success/30 bg-success/10 p-3 text-sm text-success">
            Import complete! {state.data?.created} created, {state.data?.failed} failed.
          </div>
        )}

        <form action={formAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="csvData">CSV Data *</Label>
            <Textarea
              id="csvData"
              name="csvData"
              rows={6}
              placeholder={"email@example.com, John, Doe\nemail2@example.com, Jane, Smith"}
            />
            <p className="text-xs text-muted-foreground">One subscriber per line: email, firstName, lastName</p>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="bulk-tags">Tags</Label>
            <Input id="bulk-tags" name="tags" placeholder="bulk-import, newsletter" />
          </div>
          <Button type="submit" disabled={pending}>
            {pending ? "Importing..." : "Import Subscribers"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
