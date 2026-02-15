"use client"

import { useActionState } from "react"
import Link from "next/link"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registerAction } from "@/lib/actions"

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerAction, null)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 lg:hidden mb-4">
          <Mail className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-foreground">MailPilot</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Create an account</h2>
        <p className="text-muted-foreground">Get started with your free trial</p>
      </div>

      {state?.error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {state.error}
        </div>
      )}

      <form action={formAction} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" type="text" placeholder="John Doe" required autoComplete="name" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" required autoComplete="email" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" placeholder="At least 6 characters" required minLength={6} autoComplete="new-password" />
        </div>
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </div>
  )
}
