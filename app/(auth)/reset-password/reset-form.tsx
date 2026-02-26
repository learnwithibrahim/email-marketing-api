"use client";

import { useActionState, useState } from "react";
import { Loader2, AlertCircle, Lock, KeyRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { resetPasswordAction } from "@/lib/actions";

export function ResetPasswordForm({ email }: { email: string }) {
  const [state, formAction, pending] = useActionState(resetPasswordAction, null);
  const [otp, setOtp] = useState("");

  return (
    <div className="w-full max-w-[420px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header Section */}
      <div className="flex flex-col space-y-3 text-center lg:text-left">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#2e2692]">
          Reset Password
        </h2>
        <p className="text-[15px] md:text-[16px] text-gray-600 font-medium">
          Enter the 6-digit code sent to <span className="font-bold text-[#2e2692]">{email}</span> and your new password.
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
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="otp" value={otp} />

        <div className="grid gap-8">

          {/* OTP Input Section */}
          <div className="space-y-3 flex flex-col items-center lg:items-start">
            <Label className="text-[13px] font-extrabold text-[#2e2692] uppercase tracking-wider flex items-center gap-2">
              <KeyRound className="h-4 w-4" /> Reset Code
            </Label>

            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup className="gap-2">
                {[...Array(6)].map((_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="h-12 w-12 sm:h-14 sm:w-14 text-xl font-black text-[#2e2692] bg-white border-[2px] border-[#2e2692] rounded-xl shadow-[3px_3px_0px_0px_rgba(46,38,146,0.1)] focus-visible:ring-0 focus-visible:border-[#2e2692] focus-visible:shadow-[4px_4px_0px_0px_#2e2692] transition-all duration-200"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          {/* New Password Input */}
          <div className="space-y-2.5">
            <Label htmlFor="newPassword" className="text-[13px] font-extrabold text-[#2e2692] uppercase tracking-wider flex items-center gap-2">
              <Lock className="h-4 w-4" /> New Password
            </Label>
            <div className="relative group">
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                placeholder="At least 6 characters"
                required
                minLength={6}
                autoComplete="new-password"
                className="h-14 bg-white border-[2px] border-[#2e2692] shadow-[3px_3px_0px_0px_rgba(46,38,146,0.1)] focus-visible:ring-0 focus-visible:border-[#2e2692] focus-visible:shadow-[4px_4px_0px_0px_#2e2692] rounded-xl px-4 text-[16px] text-[#2e2692] font-medium transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={pending || otp.length < 6}
          className="group w-full flex items-center justify-center gap-2 bg-[#22c55e] text-[#120f3a] text-[16px] font-extrabold h-14 rounded-xl border-[3px] border-[#2e2692] shadow-[4px_4px_0px_0px_#2e2692] hover:translate-y-1 hover:shadow-[1px_1px_0px_0px_#2e2692] hover:bg-[#4ade80] active:translate-y-1 active:shadow-none transition-all duration-200 uppercase tracking-wide disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_0px_#2e2692]"
        >
          {pending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Resetting...
            </>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>

    </div>
  );
}