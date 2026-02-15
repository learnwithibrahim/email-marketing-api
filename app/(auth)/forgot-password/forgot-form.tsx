"use client"

import { useActionState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { forgotPasswordAction } from "@/lib/actions"

export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(forgotPasswordAction, null)

  if (state?.success) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 lg:hidden mb-4">
            <Mail className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-foreground">MailPilot</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Check your email</h2>
          <p className="text-muted-foreground">
            {"If an account exists for "}
            <span className="font-medium text-foreground">{state.email}</span>
            {", we've sent a reset code."}
          </p>
        </div>
        <Link href={`/reset-password?email=${encodeURIComponent(state.email as string)}`}>
          <Button className="w-full">Enter reset code</Button>
        </Link>
        <Link href="/login" className="flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 lg:hidden mb-4">
          <Mail className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-foreground">MailPilot</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Forgot password</h2>
        <p className="text-muted-foreground">Enter your email and we'll send you a reset code</p>
      </div>

      {state?.error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {state.error}
        </div>
      )}

      <form action={formAction} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" required autoComplete="email" />
        </div>
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Sending..." : "Send reset code"}
        </Button>
      </form>

      <Link href="/login" className="flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Back to sign in
      </Link>
    </div>
  )
}
