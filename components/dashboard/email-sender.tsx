"use client"

import React, { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
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
import { toast } from "@/hooks/use-toast"

const CustomCKEditor = dynamic(() => import("@/components/ui/ckeditor-wrapper"), { ssr: false })

interface Recipient {
  id: string
  email: string
  name?: string
}

interface Props {
  recipients?: Recipient[]
  apiUrl?: string
}

export default function EmailSender({ recipients: initialRecipients, apiUrl = "http://localhost:5000/api/v1/email/send-email" }: Props) {
  const defaultRecipients: Recipient[] = [
    { id: 'r1', email: 'info@adbiyas.com', name: 'Info Adbiyas' },
    { id: 'r2', email: 'test1@example.com', name: 'Test 1' },
    { id: 'r3', email: 'test2@example.com', name: 'Test 2' },
    { id: 'r4', email: 'test3@example.com', name: 'Test 3' },
    { id: 'r5', email: 'test4@example.com', name: 'Test 4' },
  ]

  const [recipients, setRecipients] = useState<Recipient[]>(initialRecipients || defaultRecipients)
  const [to, setTo] = useState<string>("")
  const [subject, setSubject] = useState<string>("")
  const [html, setHtml] = useState<string>("")
  const [text, setText] = useState<string>("")
  const [loadingRecipients, setLoadingRecipients] = useState<boolean>(!initialRecipients)
  const [submitting, setSubmitting] = useState<boolean>(false)

  useEffect(() => {
    if (initialRecipients) return
    const fetchRecipients = async () => {
      try {
        setLoadingRecipients(true)
        const res = await fetch('/api/audiences')
        if (!res.ok) throw new Error('No recipients')
        const body = await res.json()
        // Expect body to be array of { _id, email, name }
        const fetched = (body || []).map((b: any) => ({ id: b._id || b.id || b.email, email: b.email, name: b.name }))
        setRecipients(fetched.length ? fetched : defaultRecipients)
      } catch (err) {
        // Not fatal; use static default recipients so dropdown remains populated
        setRecipients(defaultRecipients)
      } finally {
        setLoadingRecipients(false)
      }
    }
    fetchRecipients()
  }, [initialRecipients])

  function htmlToPlain(htmlStr: string) {
    if (typeof document !== "undefined") {
      const div = document.createElement("div")
      div.innerHTML = htmlStr
      return div.textContent || div.innerText || ""
    }
    return htmlStr.replace(/<[^>]*>?/gm, "")
  }

  const handleAutoGenerateText = () => {
    setText(htmlToPlain(html))
    toast({ title: "Plain text generated", description: "You can edit the plain text fallback before sending." })
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!to) {
      toast({ title: "Recipient required", description: "Select a recipient or enter an email." })
      return
    }
    if (!subject) {
      toast({ title: "Subject required", description: "Please enter a subject line." })
      return
    }
    setSubmitting(true)
    try {
      const payload = { to, subject, text: text || htmlToPlain(html), html }
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.message || "Send failed")
      }
      toast({ title: "Email queued", description: data?.message || "Email sent successfully." })
      setSubject("")
      setHtml("")
      setText("")
      setTo("")
    } catch (err: any) {
      toast({ title: "Send error", description: err.message || String(err) })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSend} className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 flex flex-col gap-6">
        <div className="p-4 border rounded bg-white shadow-sm">
          <Label className="text-sm font-medium">To</Label>
            <div className="flex gap-2 mt-2">
            <div className="flex-1">
              <Select value={to || undefined} onValueChange={(v) => setTo(v || '')}>
                <SelectTrigger className="h-11 shadow-none">
                  <SelectValue placeholder={loadingRecipients ? "Loading recipients..." : "Select recipient"} />
                </SelectTrigger>
                <SelectContent>
                  {recipients.map((r) => (
                    <SelectItem key={r.id} value={r.email}>
                      {r.name ? `${r.name} <${r.email}>` : r.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Input
              placeholder="Or paste an email address"
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              onInput={(e) => setTo((e.target as HTMLInputElement).value)}
              onFocus={() => console.log('to-input focus')}
              onClick={(e) => { e.stopPropagation(); console.log('to-input click') }}
              onPaste={async (e) => {
                try {
                  const pasted = (e.clipboardData || (window as any).clipboardData).getData('text')
                  console.log('pasted:', pasted)
                  setTo(pasted)
                } catch (err) {
                  console.warn('paste failed', err)
                }
              }}
              style={{ position: 'relative', zIndex: 20 }}
              className="flex-1 h-11"
            />
          </div>
        </div>

        <div className="p-4 border rounded bg-white shadow-sm">
          <Label className="text-sm font-medium">Subject</Label>
          <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject line" className="mt-2 h-11" />
        </div>

        <div className="p-4 border rounded bg-white shadow-sm">
          <Label className="text-sm font-medium mb-2">Email HTML</Label>
          <CustomCKEditor value={html} onChange={setHtml} />
        </div>

        <div className="p-4 border rounded bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Plain text fallback</Label>
            <Button type="button" onClick={handleAutoGenerateText} disabled={!html} className="h-9">
              Auto-generate
            </Button>
          </div>
          <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Plain text fallback (auto-generated or custom)" className="mt-2 min-h-[120px]" />
        </div>

        <div className="flex gap-3">
          <Button type="submit" className="h-11 font-semibold" disabled={submitting}>{submitting ? 'Sending...' : 'Send Email'}</Button>
          <Button type="button" variant="ghost" className="h-11" onClick={() => { setSubject(''); setHtml(''); setText(''); setTo('') }}>Reset</Button>
        </div>
      </div>

      <aside className="flex flex-col gap-4">
        <div className="p-4 border rounded bg-slate-50 shadow-sm">
          <Label className="text-sm font-medium">Plain Preview</Label>
          <div className="mt-2 p-3 bg-white rounded border min-h-[120px] text-sm whitespace-pre-wrap">{text || htmlToPlain(html) || 'Plain text preview...'}</div>
        </div>

        <div className="p-4 border rounded bg-slate-50 shadow-sm">
          <Label className="text-sm font-medium">HTML Preview</Label>
          <div className="mt-2 border bg-white rounded overflow-hidden" style={{ minHeight: 160 }}>
            <iframe title="html-preview" className="w-full h-40" srcDoc={html || '<div class="p-4 text-sm text-muted">HTML preview will appear here</div>'} sandbox="allow-same-origin" />
          </div>
        </div>
      </aside>
    </form>
  )
}
