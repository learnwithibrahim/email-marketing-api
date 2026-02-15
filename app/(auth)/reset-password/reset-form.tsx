"use client"

import { useActionState, useState } from "react"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { resetPasswordAction } from "@/lib/actions"

export function ResetPasswordForm({ email }: { email: string }) {
  const [state, formAction, pending] = useActionState(resetPasswordAction, null)
  const [otp, setOtp] = useState("")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 lg:hidden mb-4">
          <Mail className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-foreground">MailPilot</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Reset password</h2>
        <p className="text-muted-foreground">Enter the code sent to your email and your new password</p>
      </div>

      {state?.error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {state.error}
        </div>
      )}

      <form action={formAction} className="flex flex-col gap-4">
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="otp" value={otp} />
        <div className="flex flex-col gap-2">
          <Label>Reset Code</Label>
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
        <div className="flex flex-col gap-2">
          <Label htmlFor="newPassword">New Password</Label>
          <Input id="newPassword" name="newPassword" type="password" placeholder="At least 6 characters" required minLength={6} autoComplete="new-password" />
        </div>
        <Button type="submit" className="w-full" disabled={pending || otp.length < 6}>
          {pending ? "Resetting..." : "Reset password"}
        </Button>
      </form>
    </div>
  )
}
