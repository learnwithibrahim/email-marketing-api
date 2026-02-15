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
    <div className="mx-auto w-full max-w-[400px] space-y-8 p-4 md:p-0">
      {/* Header Section */}
      <div className="flex flex-col space-y-2 text-center">
        <div className="flex justify-center lg:hidden mb-2">
           <div className="rounded-xl bg-primary/10 p-2">
             <Mail className="h-6 w-6 text-primary" />
           </div>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Join 10,000+ users managing their mail with MailPilot.
        </p>
      </div>

      {/* Error State */}
      {state?.error && (
        <div className="animate-in fade-in slide-in-from-top-1 rounded-lg border border-destructive/20 bg-destructive/5 p-4 flex items-start gap-3 text-sm text-destructive">
          <span className="mt-0.5">⚠️</span>
          <p className="font-medium leading-tight">{state.error}</p>
        </div>
      )}


      {/* Form Section */}
      <form action={formAction} className="grid gap-5">
        <div className="grid gap-4">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs uppercase tracking-wider font-bold text-muted-foreground/80">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/70" />
              <Input 
                id="name" 
                name="name" 
                type="text" 
                placeholder="John Doe" 
                className="pl-10 transition-all focus-visible:ring-primary"
                required 
                autoComplete="name" 
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs uppercase tracking-wider font-bold text-muted-foreground/80">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/70" />
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="name@company.com" 
                className="pl-10 transition-all focus-visible:ring-primary"
                required 
                autoComplete="email" 
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-xs uppercase tracking-wider font-bold text-muted-foreground/80">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/70" />
              <Input 
                id="password" 
                name="password" 
                type="password" 
                placeholder="••••••••" 
                className="pl-10 transition-all focus-visible:ring-primary"
                required 
                minLength={6} 
                autoComplete="new-password" 
              />
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          className="group w-full h-11 text-base font-semibold transition-all hover:shadow-lg active:scale-[0.98]" 
          disabled={pending}
        >
          {pending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </form>

      {/* Footer */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Already a member?
          </span>
        </div>
      </div>

      <div className="text-center">
        <Button variant="outline" asChild className="w-full">
          <Link href="/login">
            Sign in to your account
          </Link>
        </Button>
      </div>

      <p className="px-8 text-center text-xs text-muted-foreground leading-relaxed">
        By clicking continue, you agree to our{" "}
        <Link href="/terms" className="underline underline-offset-4 hover:text-primary transition-colors">Terms of Service</Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-primary transition-colors">Privacy Policy</Link>.
      </p>
    </div>
  )
}