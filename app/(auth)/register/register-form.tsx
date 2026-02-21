"use client"

import { useActionState } from "react"
import Link from "next/link"
import { Mail, Loader2, User, Lock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registerAction } from "@/lib/actions"
import { cn } from "@/lib/utils" // Standard shadcn helper

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerAction, null)

  return (
    <div className="w-full space-y-10 animate-fade-in-up">
      {/* Header Section */}
      <div className="flex flex-col space-y-3">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Create your account
        </h1>
        <p className="text-muted-foreground">
          Get started with MailPilot and elevate your marketing.
        </p>
      </div>

      {/* Error State */}
      {state?.error && (
        <div className="animate-in fade-in slide-in-from-top-2 rounded-lg border border-destructive/20 bg-destructive/5 p-4 flex items-start gap-3 text-sm text-destructive">
          <div className="h-2 w-2 rounded-full bg-destructive mt-1.5" />
          <p className="font-semibold leading-relaxed">{state.error}</p>
        </div>
      )}

      {/* Form Section */}
      <form action={formAction} className="space-y-6">
        <div className="grid gap-5">
          {/* Full Name */}
          <div className="space-y-2.5">
            <Label htmlFor="name" className="text-sm font-semibold">Full Name</Label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                className="pl-12 h-12 bg-muted/30 border-muted-foreground/20 focus:bg-background transition-all"
                required
                autoComplete="name"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2.5">
            <Label htmlFor="email" className="text-sm font-semibold">Email Address</Label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                className="pl-12 h-12 bg-muted/30 border-muted-foreground/20 focus:bg-background transition-all"
                required
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2.5">
            <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                className="pl-12 h-12 bg-muted/30 border-muted-foreground/20 focus:bg-background transition-all"
                required
                minLength={6}
                autoComplete="new-password"
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="group w-full h-12 text-base font-bold transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-primary/20"
          disabled={pending}
        >
          {pending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Explore MailPilot free
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </form>

      {/* Footer Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs font-bold uppercase tracking-widest">
          <span className="bg-background px-4 text-muted-foreground/60">
            Already have an account?
          </span>
        </div>
      </div>

      <div className="grid gap-4">
        <Button variant="outline" asChild className="w-full h-12 font-bold border-muted-foreground/20 hover:bg-muted/50 transition-all">
          <Link href="/login">
            Sign in here
          </Link>
        </Button>
      </div>

      <div className="text-center text-xs text-muted-foreground leading-relaxed px-4">
        By continuing, you agree to our{" "}
        <Link href="/terms" className="text-primary hover:underline font-medium">Terms of Service</Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-primary hover:underline font-medium">Privacy Policy</Link>.
      </div>
    </div>
  )
}