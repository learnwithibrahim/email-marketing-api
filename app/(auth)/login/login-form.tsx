"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { loginAction } from "@/lib/actions";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full flex items-center justify-center gap-2 bg-[#22c55e] text-[#120f3a] text-[16px] font-extrabold h-14 rounded-xl border-[3px] border-[#2e2692] shadow-[4px_4px_0px_0px_#2e2692] hover:translate-y-1 hover:shadow-[1px_1px_0px_0px_#2e2692] hover:bg-[#4ade80] active:translate-y-1 active:shadow-none transition-all duration-200 uppercase tracking-wide disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Signing in...
        </>
      ) : (
        "Sign in to Dashboard"
      )}
    </button>
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
    <div className="w-full max-w-[420px] mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-3 text-center lg:text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#2e2692]">
          Sign In
        </h1>
        <p className="text-[15px] md:text-[16px] text-gray-600 font-medium">
          Enter your details below to access your workspace.
        </p>
      </div>

      {/* Alerts */}
      <div className="space-y-4 empty:hidden">
        {verified && (
          <div className="animate-in fade-in slide-in-from-top-2 p-4 text-[14px] font-bold text-[#065f46] bg-[#d1fae5] border-[2px] border-[#059669] shadow-[3px_3px_0px_0px_#059669] rounded-xl flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            Email verified. You can now sign in.
          </div>
        )}
        {reset && (
          <div className="animate-in fade-in slide-in-from-top-2 p-4 text-[14px] font-bold text-[#065f46] bg-[#d1fae5] border-[2px] border-[#059669] shadow-[3px_3px_0px_0px_#059669] rounded-xl flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            Password has been reset successfully.
          </div>
        )}
        {state?.error && (
          <div className="animate-in fade-in slide-in-from-top-2 p-4 text-[14px] font-bold text-[#991b1b] bg-[#fee2e2] border-[2px] border-[#dc2626] shadow-[3px_3px_0px_0px_#dc2626] rounded-xl flex items-center gap-3">
            <AlertCircle className="h-5 w-5 shrink-0" />
            {state.error}
          </div>
        )}
      </div>

      {/* Main Form */}
      <form action={formAction} className="space-y-6">
        <div className="grid gap-6">
          {/* Email Input */}
          <div className="space-y-2.5">
            <Label htmlFor="email" className="text-[13px] font-extrabold text-[#2e2692] uppercase tracking-wider">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@company.com"
              required
              autoComplete="email"
              className="h-14 bg-white border-[2px] border-[#2e2692] shadow-[3px_3px_0px_0px_rgba(46,38,146,0.1)] focus-visible:ring-0 focus-visible:border-[#2e2692] focus-visible:shadow-[4px_4px_0px_0px_#2e2692] rounded-xl px-4 text-[16px] text-[#2e2692] font-medium transition-all duration-200"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-[13px] font-extrabold text-[#2e2692] uppercase tracking-wider">
                Password
              </Label>
              <Link
                href="/forgot-password"
                className="text-[13px] font-bold text-gray-500 hover:text-[#22c55e] transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              autoComplete="current-password"
              className="h-14 bg-white border-[2px] border-[#2e2692] shadow-[3px_3px_0px_0px_rgba(46,38,146,0.1)] focus-visible:ring-0 focus-visible:border-[#2e2692] focus-visible:shadow-[4px_4px_0px_0px_#2e2692] rounded-xl px-4 text-[16px] text-[#2e2692] font-medium transition-all duration-200"
            />
          </div>

          {/* Keep me signed in */}
          <div className="flex items-center gap-3 py-1">
            <Checkbox
              id="remember"
              name="remember"
              className="rounded-md h-5 w-5 border-[2px] border-[#2e2692] data-[state=checked]:bg-[#22c55e] data-[state=checked]:text-[#120f3a]"
            />
            <label
              htmlFor="remember"
              className="text-[14px] font-bold text-gray-600 cursor-pointer select-none"
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
          <span className="w-full border-t-[2px] border-gray-200" />
        </div>
        <div className="relative flex justify-center text-[12px] font-extrabold uppercase tracking-widest text-gray-400">
          <span className="bg-[#f8f9fc] px-4">
            Or continue with
          </span>
        </div>
      </div>

      {/* Google Sign In */}
      <div className="grid gap-4">
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 bg-white text-[#2e2692] text-[16px] font-bold h-14 rounded-xl border-[2px] border-[#2e2692] shadow-[3px_3px_0px_0px_#2e2692] hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_#2e2692] hover:bg-gray-50 active:translate-y-1 active:shadow-none transition-all duration-200"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Google
        </button>
      </div>

      {/* Footer Link */}
      <div className="pt-2 text-center text-[15px]">
        <span className="text-gray-600 font-medium">New to MailPilot? </span>
        <Link
          href="/register"
          className="font-bold text-[#2e2692] hover:text-[#22c55e] transition-colors"
        >
          Create an account
        </Link>
      </div>
    </div>
  );
}