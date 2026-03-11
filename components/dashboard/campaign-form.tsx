"use client"

import { useActionState, useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Settings, Tag, Target, Send, ChevronLeft, Type } from "lucide-react"
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

const CustomCKEditor = dynamic(() => import("@/components/ui/ckeditor-wrapper"), { ssr: false })

interface Props {
  campaign?: Campaign
  audiences: Audience[]
  action: (prev: unknown, formData: FormData) => Promise<{ error?: string } | undefined>
  submitLabel: string
}

export function CampaignForm({ campaign, audiences, action, submitLabel }: Props) {
  const [state, formAction, pending] = useActionState(action, null)
  const [bodyContent, setBodyContent] = useState(campaign?.body || "")

  return (
    <form action={formAction}>
      {campaign && <input type="hidden" name="id" value={campaign._id} />}

      {state?.error && (
        <div className="border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive mb-6">
          {state.error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
              <CardTitle className="text-base flex items-center gap-2 font-semibold">
                <Mail className="h-4 w-4 text-primary" />
                Campaign Content
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 pt-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-sm font-medium">Campaign Name *</Label>
                <Input id="name" name="name" defaultValue={campaign?.name} required placeholder="e.g. Summer Sale Newsletter" className="h-11 shadow-none focus-visible:ring-primary/20" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="subject" className="text-sm font-medium">Subject Line *</Label>
                <Input id="subject" name="subject" defaultValue={campaign?.subject} required placeholder="e.g. Don't miss our summer sale!" className="h-11 shadow-none focus-visible:ring-primary/20" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Email Body (HTML)</Label>
                <CustomCKEditor value={bodyContent} onChange={setBodyContent} />
                <input type="hidden" name="body" value={bodyContent} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
              <CardTitle className="text-base flex items-center gap-2 font-semibold">
                <Settings className="h-4 w-4 text-primary" />
                Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 pt-6">
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium flex items-center gap-1.5">
                  <Type className="h-3.5 w-3.5" /> Type *
                </Label>
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
                <Label className="text-sm font-medium flex items-center gap-1.5">
                  <Target className="h-3.5 w-3.5" /> Audience *
                </Label>
                <Select name="audienceId" defaultValue={typeof campaign?.audienceId === "object" ? campaign.audienceId._id : campaign?.audienceId || ""}>
                  <SelectTrigger className="h-11 shadow-none focus:ring-primary/20">
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
              <div className="flex flex-col gap-2 border-t pt-2 border-slate-100">
                <Label htmlFor="tags" className="text-sm font-medium flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5" /> Tags
                </Label>
                <Input id="tags" name="tags" defaultValue={campaign?.tags?.join(", ")} placeholder="tag1, tag2, tag3" className="h-11 shadow-none focus-visible:ring-primary/20" />
                <p className="text-[11px] text-muted-foreground">Comma-separated</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-3">
            <Button type="submit" className="h-11 font-semibold text-base shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]" disabled={pending}>
              {pending ? "Saving..." : (
                <span className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  {submitLabel}
                </span>
              )}
            </Button>
            <Link href="/dashboard/campaigns">
              <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground" type="button">
                <ChevronLeft className="h-4 w-4 mr-1" /> Back to Campaigns
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </form>
  )
}
