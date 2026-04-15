"use client"

import dynamic from "next/dynamic"
import React from "react"

const EmailSender = dynamic(() => import("@/components/dashboard/email-sender"), { ssr: false })

export default function Page() {
  return (
    <div className="p-6">
      <div className=" mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Send Email</h1>
        <p className="text-sm text-muted-foreground mb-6">Use this form to send a single email. HTML body is edited with CKEditor.</p>
        <EmailSender />
      </div>
    </div>
  )
}
