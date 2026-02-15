"use client"

import { useActionState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Campaign, Audience } from "@/lib/types"

interface Props {
  campaign?: Campaign
  audiences: Audience[]
  action: (prev: unknown, formData: FormData) => Promise<{ error?: string } | undefined>
  submitLabel: string
}

export function CampaignForm({ campaign, audiences, action, submitLabel }: Props) {
  const [state, formAction, pending] = useActionState(action, null)

  return (
    <form action={formAction}>
      {campaign && <input type="hidden" name="id" value={campaign._id} />}

      {state?.error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive mb-6">
          {state.error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Details</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Campaign Name *</Label>
                <Input id="name" name="name" defaultValue={campaign?.name} required placeholder="e.g. Summer Sale Newsletter" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="subject">Subject Line *</Label>
                <Input id="subject" name="subject" defaultValue={campaign?.subject} required placeholder="e.g. Don't miss our summer sale!" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="body">Email Body (HTML)</Label>
                <Textarea id="body" name="body" defaultValue={campaign?.body} rows={10} placeholder="<html><body>Your email content...</body></html>" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuration</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label>Type *</Label>
                <Select name="type" defaultValue={campaign?.type || "newsletter"}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newsletter">Newsletter</SelectItem>
                    <SelectItem value="promotional">Promotional</SelectItem>
                    <SelectItem value="transactional">Transactional</SelectItem>
                    <SelectItem value="welcome">Welcome</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Provider *</Label>
                <Select name="provider" defaultValue={campaign?.provider || "sendgrid"}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sendgrid">SendGrid</SelectItem>
                    <SelectItem value="mailgun">Mailgun</SelectItem>
                    <SelectItem value="aws-ses">AWS SES</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Audience *</Label>
                <Select name="audienceId" defaultValue={typeof campaign?.audienceId === "object" ? campaign.audienceId._id : campaign?.audienceId || ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    {audiences.map((a) => (
                      <SelectItem key={a._id} value={a._id}>
                        {a.name} ({a.subscriberCount})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" name="tags" defaultValue={campaign?.tags?.join(", ")} placeholder="tag1, tag2, tag3" />
                <p className="text-xs text-muted-foreground">Comma-separated</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Link href="/dashboard/campaigns" className="flex-1">
              <Button variant="outline" className="w-full" type="button">Cancel</Button>
            </Link>
            <Button type="submit" className="flex-1" disabled={pending}>
              {pending ? "Saving..." : submitLabel}
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
