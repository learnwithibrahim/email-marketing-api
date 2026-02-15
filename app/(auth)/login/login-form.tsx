"use client"

import { useActionState } from "react"
import Link from "next/link"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { loginAction } from "@/lib/actions"
import { Loader2 } from "lucide-react"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button 
      type="submit" 
      disabled={pending}
      className="w-full h-11 bg-[#00C292] hover:bg-[#00a67e] text-white font-semibold text-base transition-all shadow-md hover:shadow-lg"
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
  )
}

export function LoginForm({ verified, reset }: { verified?: boolean; reset?: boolean }) {
  // NOTE: If you are on Next.js 14, use useFormState. If on Next.js 15, useActionState is correct.
  const [state, formAction] = useActionState(loginAction, null)

  return (
    <div className="w-full max-w-[400px] mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Welcome back
        </h1>
        <p className="text-sm text-gray-500">
          Enter your credentials to access your campaigns.
        </p>
      </div>

      {/* Alerts */}
      {verified && (
        <div className="p-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-600" />
          Email verified successfully.
        </div>
      )}
      {reset && (
        <div className="p-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-600" />
          Password reset successfully.
        </div>
      )}
      {state?.error && (
        <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-600" />
          {state.error}
        </div>
      )}

      {/* Main Form */}
      <form action={formAction} className="space-y-5">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="name@company.com" 
              required 
              autoComplete="email" 
              className="h-11 bg-white"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link 
                href="/forgot-password" 
                className="text-sm font-medium text-[#00C292] hover:text-[#00a67e] hover:underline"
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
              className="h-11 bg-white"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="remember" name="remember" className="data-[state=checked]:bg-[#00C292] data-[state=checked]:border-[#00C292]" />
            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-600"
            >
              Remember me for 30 days
            </label>
          </div>
        </div>

        <SubmitButton />
      </form>

      {/* Social Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-400">Or continue with</span>
        </div>
      </div>

      {/* Google Button */}
      <Button 
        variant="outline" 
        type="button" 
        className="w-full h-11 border-gray-200 bg-white text-gray-700 hover:bg-gray-50 font-medium gap-2 transition-colors"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Google
      </Button>

      <p className="px-8 text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <Link 
          href="/register" 
          className="font-semibold text-[#00C292] hover:text-[#00a67e] hover:underline underline-offset-4"
        >
          Create account
        </Link>
      </p>
    </div>
  )
}