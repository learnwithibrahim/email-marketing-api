"use client"

import { useActionState, useState, useTransition } from "react"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { verifyEmailAction, resendOtpAction } from "@/lib/actions"

export function VerifyForm({ email }: { email: string }) {
  const [state, formAction, pending] = useActionState(verifyEmailAction, null)
  const [otp, setOtp] = useState("")
  const [resendState, setResendState] = useState<{ success?: boolean; error?: string } | null>(null)
  const [isResending, startResend] = useTransition()

  function handleResend() {
    startResend(async () => {
      const res = await resendOtpAction(email)
      setResendState(res)
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 lg:hidden mb-4">
          <Mail className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-foreground">MailPilot</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Verify your email</h2>
        <p className="text-muted-foreground">
          {"We've sent a 6-character code to "}
          <span className="font-medium text-foreground">{email}</span>
        </p>
      </div>

      {state?.error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {state.error}
        </div>
      )}

      {resendState?.success && (
        <div className="rounded-lg border border-success/30 bg-success/10 p-3 text-sm text-success">
          Verification code resent successfully.
        </div>
      )}

      <form action={formAction} className="flex flex-col gap-4">
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="otp" value={otp} />
        <div className="flex flex-col gap-2">
          <Label>Verification Code</Label>
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button type="submit" className="w-full" disabled={pending || otp.length < 6}>
          {pending ? "Verifying..." : "Verify email"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        {"Didn't receive a code? "}
        <button
          type="button"
          onClick={handleResend}
          disabled={isResending}
          className="text-primary hover:underline font-medium disabled:opacity-50"
        >
          {isResending ? "Resending..." : "Resend code"}
        </button>
      </p>
    </div>
  )
}
