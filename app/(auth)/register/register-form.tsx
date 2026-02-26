"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Mail, Loader2, User, Lock, ArrowRight, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerAction } from "@/lib/actions";

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerAction, null);

  return (
    <div className="w-full max-w-[420px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header Section */}
      <div className="flex flex-col space-y-3 text-center lg:text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#2e2692]">
          Create your account
        </h1>
        <p className="text-[15px] md:text-[16px] text-gray-600 font-medium">
          Get started with Funurex and elevate your marketing.
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
      <form action={formAction} className="space-y-6">
        <div className="grid gap-6">

          {/* Full Name */}
          <div className="space-y-2.5">
            <Label htmlFor="name" className="text-[13px] font-extrabold text-[#2e2692] uppercase tracking-wider">
              Full Name
            </Label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#2e2692] transition-colors" />
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
                autoComplete="name"
                className="pl-12 h-14 bg-white border-[2px] border-[#2e2692] shadow-[3px_3px_0px_0px_rgba(46,38,146,0.1)] focus-visible:ring-0 focus-visible:border-[#2e2692] focus-visible:shadow-[4px_4px_0px_0px_#2e2692] rounded-xl text-[16px] text-[#2e2692] font-medium transition-all duration-200"
              />
            </div>
          </div>

          {/* Email */}
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

          {/* Password */}
          <div className="space-y-2.5">
            <Label htmlFor="password" className="text-[13px] font-extrabold text-[#2e2692] uppercase tracking-wider">
              Password
            </Label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#2e2692] transition-colors" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                minLength={6}
                autoComplete="new-password"
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
              Processing...
            </>
          ) : (
            <>
              Explore Funurex free
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>
      </form>

      {/* Footer Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t-[2px] border-gray-200" />
        </div>
        <div className="relative flex justify-center text-[12px] font-extrabold uppercase tracking-widest text-gray-400">
          <span className="bg-[#f8f9fc] px-4">
            Already have an account?
          </span>
        </div>
      </div>

      {/* Secondary Action: Login */}
      <div className="grid gap-4">
        <Link
          href="/login"
          className="w-full flex items-center justify-center gap-3 bg-white text-[#2e2692] text-[16px] font-bold h-14 rounded-xl border-[2px] border-[#2e2692] shadow-[3px_3px_0px_0px_#2e2692] hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_#2e2692] hover:bg-gray-50 active:translate-y-1 active:shadow-none transition-all duration-200"
        >
          Sign in here
        </Link>
      </div>

      {/* Terms and Privacy */}
      <div className="text-center text-[13px] text-gray-500 font-medium leading-relaxed px-4 pt-2">
        By continuing, you agree to our{" "}
        <Link href="/terms" className="text-[#2e2692] font-bold hover:text-[#22c55e] transition-colors">Terms of Service</Link>
        {" "}and{" "}
        <Link href="/privacy" className="text-[#2e2692] font-bold hover:text-[#22c55e] transition-colors">Privacy Policy</Link>.
      </div>

    </div>
  );
}