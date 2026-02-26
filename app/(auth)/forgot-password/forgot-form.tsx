"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Loader2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPasswordAction } from "@/lib/actions";

export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(forgotPasswordAction, null);

  // Success State View
  if (state?.success) {
    return (
      <div className="w-full max-w-[420px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

        {/* Header Section */}
        <div className="flex flex-col space-y-3 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#2e2692]">
            Check your email
          </h2>
          <p className="text-[15px] md:text-[16px] text-gray-600 font-medium">
            If an account exists for <span className="font-bold text-[#2e2692]">{state.email}</span>, we've sent a reset code.
          </p>
        </div>

        {/* Action Button */}
        <Link
          href={`/reset-password?email=${encodeURIComponent(state.email as string)}`}
          className="group w-full flex items-center justify-center gap-2 bg-[#22c55e] text-[#120f3a] text-[16px] font-extrabold h-14 rounded-xl border-[3px] border-[#2e2692] shadow-[4px_4px_0px_0px_#2e2692] hover:translate-y-1 hover:shadow-[1px_1px_0px_0px_#2e2692] hover:bg-[#4ade80] active:translate-y-1 active:shadow-none transition-all duration-200 uppercase tracking-wide"
        >
          Enter reset code
        </Link>

        {/* Back Link */}
        <div className="flex justify-center pt-2">
          <Link href="/login" className="flex items-center gap-2 font-bold text-[#2e2692] hover:text-[#22c55e] transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to sign in
          </Link>
        </div>

      </div>
    );
  }

  // Default Form View
  return (
    <div className="w-full max-w-[420px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header Section */}
      <div className="flex flex-col space-y-3 text-center lg:text-left">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#2e2692]">
          Forgot password
        </h2>
        <p className="text-[15px] md:text-[16px] text-gray-600 font-medium">
          Enter your email and we'll send you a reset code.
        </p>
      </div>

      {/* Error State */}
      <div className="space-y-4 empty:hidden">
        {state?.error && (
          <div className="animate-in fade-in slide-in-from-top-2 p-4 text-[14px] font-bold text-[#991b1b] bg-[#fee2e2] border-[2px] border-[#dc2626] shadow-[3px_3px_0px_0px_#dc2626] rounded-xl flex items-center gap-3">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p className="leading-relaxed">{state.error}</p>
          </div>
        )}
      </div>

      {/* Form Section */}
      <form action={formAction} className="space-y-8">
        <div className="grid gap-6">
          <div className="space-y-2.5">
            <Label htmlFor="email" className="text-[13px] font-extrabold text-[#2e2692] uppercase tracking-wider">
              Email Address
            </Label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#2e2692] transition-colors" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@company.com"
                required
                autoComplete="email"
                className="pl-12 h-14 bg-white border-[2px] border-[#2e2692] shadow-[3px_3px_0px_0px_rgba(46,38,146,0.1)] focus-visible:ring-0 focus-visible:border-[#2e2692] focus-visible:shadow-[4px_4px_0px_0px_#2e2692] rounded-xl text-[16px] text-[#2e2692] font-medium transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={pending}
          className="group w-full flex items-center justify-center gap-2 bg-[#22c55e] text-[#120f3a] text-[16px] font-extrabold h-14 rounded-xl border-[3px] border-[#2e2692] shadow-[4px_4px_0px_0px_#2e2692] hover:translate-y-1 hover:shadow-[1px_1px_0px_0px_#2e2692] hover:bg-[#4ade80] active:translate-y-1 active:shadow-none transition-all duration-200 uppercase tracking-wide disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {pending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Sending...
            </>
          ) : (
            "Send reset code"
          )}
        </button>
      </form>

      {/* Back Link */}
      <div className="flex justify-center pt-2">
        <Link href="/login" className="flex items-center gap-2 font-bold text-[#2e2692] hover:text-[#22c55e] transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>
      </div>

    </div>
  );
}