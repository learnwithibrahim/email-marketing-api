"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { loginAction } from "@/lib/actions";
import { Loader2 } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full h-11 font-semibold text-base transition-all"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Signing in...
        </>
      ) : (
        "Sign in"
      )}
    </Button>
  );
}

export function LoginForm({
  verified,
  reset,
}: {
  verified?: boolean;
  reset?: boolean;
}) {
  const [state, formAction] = useActionState(loginAction, null);

  return (
    <div className="w-full space-y-10">
      {/* Header */}
      <div className="flex flex-col space-y-3">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="text-muted-foreground">
          Enter your details below to continue your journey.
        </p>
      </div>

      {/* Alerts */}
      <div className="space-y-4">
        {verified && (
          <div className="animate-in fade-in slide-in-from-top-2 p-4 text-sm font-medium text-success bg-success/10 border border-success/20 rounded-lg flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-success pulse-subtle" />
            Email verified. You can now sign in.
          </div>
        )}
        {reset && (
          <div className="animate-in fade-in slide-in-from-top-2 p-4 text-sm font-medium text-success bg-success/10 border border-success/20 rounded-lg flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-success pulse-subtle" />
            Password has been reset successfully.
          </div>
        )}
        {state?.error && (
          <div className="animate-in fade-in slide-in-from-top-2 p-4 text-sm font-medium text-destructive bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-destructive" />
            {state.error}
          </div>
        )}
      </div>

      {/* Main Form */}
      <form action={formAction} className="space-y-6">
        <div className="grid gap-5">
          <div className="space-y-2.5">
            <Label htmlFor="email" className="text-sm font-semibold">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
              autoComplete="email"
              className="h-12 bg-muted/30 border-muted-foreground/20 focus:bg-background transition-all"
            />
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
              >
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              autoComplete="current-password"
              className="h-12 bg-muted/30 border-muted-foreground/20 focus:bg-background transition-all"
            />
          </div>

          <div className="flex items-center gap-3 py-1">
            <Checkbox id="remember" name="remember" className="rounded-md h-5 w-5" />
            <label
              htmlFor="remember"
              className="text-sm font-medium text-muted-foreground cursor-pointer select-none"
            >
              Keep me signed in
            </label>
          </div>
        </div>

        <SubmitButton />
      </form>

      {/* Social Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs font-bold uppercase tracking-widest">
          <span className="bg-background px-4 text-muted-foreground/60">
            Secure authentication
          </span>
        </div>
      </div>

      <div className="grid gap-4">
        <Button
          variant="outline"
          type="button"
          className="w-full h-12 font-semibold gap-3 transition-all hover:bg-muted/50 border-muted-foreground/20"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </Button>
      </div>

      <div className="pt-2 text-center text-sm">
        <span className="text-muted-foreground">New to MailPilot? </span>
        <Link
          href="/register"
          className="font-bold text-primary hover:text-primary-dark transition-colors underline-offset-4 hover:underline"
        >
          Create an account for free
        </Link>
      </div>
    </div>
  );
}
