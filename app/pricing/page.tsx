"use client"

import React, { useState, useCallback } from "react"
import { toast } from "sonner"
import Navbar from "@/components/home/navbar";
import Footer from "@/components/home/footer";
// ─── Types ────────────────────────────────────────────────────────────────────

interface Package {
  id: string
  amount: number
  credits: number
  label: string
  perCredit: string
  popular: boolean
  scrapes: number
  accentColor: string
  accentBg: string
  accentBorder: string
  icon: React.ReactNode
}

interface PaymentFormState {
  txnId: string
  note: string
  submitting: boolean
  success: boolean
}

// ─── Icons (inline SVG – no extra dependency) ─────────────────────────────────

const IconZap = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)

const IconSparkles = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
    <path d="M19 14l.75 2.25L22 17l-2.25.75L19 20l-.75-2.25L16 17l2.25-.75z" />
    <path d="M5 17l.5 1.5L7 19l-1.5.5L5 21l-.5-1.5L3 19l1.5-.5z" />
  </svg>
)

const IconCrown = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 20h20M5 20l2-10 5 5 5-5 2 10" />
  </svg>
)

const IconRocket = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
)

const IconCheck = ({ className }: { className?: string }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const IconCopy = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
)

const IconX = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const IconArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

const IconLoader = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    className="animate-spin">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
)

const IconCheckCircle = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)

const IconWallet = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 12V22H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16v4" />
    <path d="M20 12a2 2 0 0 0-2 2 2 2 0 0 0 2 2h4v-4z" />
  </svg>
)

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
  return match ? match[2] : undefined
}

async function submitPaymentRequest(payload: {
  packageAmount: number
  transactionId: string
  note?: string
}, token?: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch("/api/payments/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      return { ok: false, error: data?.error || "Request failed" }
    }
    return { ok: true }
  } catch (err: unknown) {
    return { ok: false, error: err instanceof Error ? err.message : "Network error" }
  }
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PACKAGES: Package[] = [
  {
    id: "starter",
    amount: 5,
    credits: 1000,
    label: "Starter",
    perCredit: "$0.005",
    popular: false,
    scrapes: 10,
    accentColor: "text-emerald-600",
    accentBg: "bg-emerald-50",
    accentBorder: "border-emerald-200",
    icon: <IconZap />,
  },
  {
    id: "growth",
    amount: 10,
    credits: 2500,
    label: "Growth",
    perCredit: "$0.004",
    popular: true,
    scrapes: 25,
    accentColor: "text-blue-600",
    accentBg: "bg-blue-50",
    accentBorder: "border-blue-200",
    icon: <IconSparkles />,
  },
  {
    id: "professional",
    amount: 20,
    credits: 5000,
    label: "Professional",
    perCredit: "$0.004",
    popular: false,
    scrapes: 50,
    accentColor: "text-violet-600",
    accentBg: "bg-violet-50",
    accentBorder: "border-violet-200",
    icon: <IconCrown />,
  },
  {
    id: "enterprise",
    amount: 50,
    credits: 10000,
    label: "Enterprise",
    perCredit: "$0.005",
    popular: false,
    scrapes: 100,
    accentColor: "text-amber-600",
    accentBg: "bg-amber-50",
    accentBorder: "border-amber-200",
    icon: <IconRocket />,
  },
]

const WALLET_ADDRESS = "TRC20: TXxxxxxxxxxxxxxxxxxxxxxxxxxxx"

const FEATURES = ["Premium member status", "No trial limitations", "Priority support"]

// ─── Sub-components ───────────────────────────────────────────────────────────

interface PricingCardProps {
  pkg: Package
  isSelected: boolean
  onSelect: (pkg: Package) => void
  index: number
}

function PricingCard({ pkg, isSelected, onSelect, index }: PricingCardProps) {
  return (

    <article
      onClick={() => onSelect(pkg)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onSelect(pkg)}
      aria-pressed={isSelected}
      aria-label={`Select ${pkg.label} package — $${pkg.amount} for ${pkg.credits.toLocaleString()} credits`}
      style={{ animationDelay: `${index * 80}ms` }}
      className={[
        "relative flex flex-col rounded-2xl p-6 cursor-pointer outline-none",
        "border-2 bg-white transition-all duration-300 ease-out",
        "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500",
        "animate-[fadeSlideUp_0.5s_ease_both]",
        isSelected
          ? "border-indigo-500 shadow-[0_0_0_4px_rgba(99,102,241,0.12),0_8px_32px_rgba(26,21,96,0.14)]"
          : "border-slate-200 hover:border-slate-300 hover:shadow-lg hover:-translate-y-0.5",
        pkg.popular && !isSelected ? "border-blue-300 shadow-md" : "",
      ].join(" ")}
    >
      {/* Popular badge */}
      {pkg.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap
          bg-gradient-to-r from-blue-600 to-indigo-600 text-white
          text-[10px] font-bold tracking-widest uppercase
          px-4 py-1 rounded-full shadow-md">
          Most Popular
        </span>
      )}

      {/* Icon */}
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 flex-shrink-0
        ${pkg.accentBg} ${pkg.accentColor} border ${pkg.accentBorder}`}>
        {pkg.icon}
      </div>

      {/* Label */}
      <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-slate-400 mb-2.5">
        {pkg.label}
      </p>

      {/* Price */}
      <div className="flex items-baseline gap-0.5 mb-1">
        <span className="text-lg font-semibold text-slate-400 leading-none mt-1">$</span>
        <span className="text-5xl font-extrabold text-slate-900 tracking-tight leading-none">
          {pkg.amount}
        </span>
      </div>
      <p className="text-xs text-slate-400 font-medium mb-5">{pkg.perCredit} per credit</p>

      {/* Credits pill */}
      <div className={`rounded-xl py-3.5 px-4 mb-5 text-center ${pkg.accentBg} border ${pkg.accentBorder}`}>
        <p className={`text-2xl font-extrabold tracking-tight ${pkg.accentColor}`}>
          {pkg.credits.toLocaleString()}
        </p>
        <p className="text-xs font-semibold text-slate-500 mt-0.5">credits</p>
      </div>

      {/* Feature list */}
      <ul className="flex flex-col gap-2.5 mb-6 flex-1" aria-label="Package features">
        <li className="flex items-center gap-2 text-sm text-slate-600">
          <IconCheck className="text-emerald-500 flex-shrink-0" />
          {pkg.scrapes} scrape executions
        </li>
        {FEATURES.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
            <IconCheck className="text-emerald-500 flex-shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      {/* CTA button */}
      <button
        type="button"
        className={[
          "w-full py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-200",
          isSelected
            ? "bg-indigo-600 text-white shadow-sm"
            : "bg-slate-100 text-slate-700 hover:bg-slate-200",
        ].join(" ")}
        tabIndex={-1}
        aria-hidden="true"
      >
        {isSelected ? "Selected ✓" : "Select Plan"}
      </button>
    </article>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

interface CheckoutFormProps {
  pkg: Package
  onClose: () => void
}

function CheckoutForm({ pkg, onClose }: CheckoutFormProps) {
  const [form, setForm] = useState<PaymentFormState>({
    txnId: "",
    note: "",
    submitting: false,
    success: false,
  })

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!form.txnId.trim() || form.submitting) return

      setForm((s) => ({ ...s, submitting: true }))
      const token = getCookie("auth_token")
      const res = await submitPaymentRequest(
        { packageAmount: pkg.amount, transactionId: form.txnId.trim(), note: form.note.trim() || undefined },
        token
      )
      if (res.ok) {
        setForm((s) => ({ ...s, submitting: false, success: true }))
        toast.success("Payment request submitted successfully!")
      } else {
        setForm((s) => ({ ...s, submitting: false }))
        toast.error(res.error ?? "Failed to submit payment request")
      }
    },
    [form.txnId, form.note, form.submitting, pkg.amount]
  )

  const handleCopy = useCallback(() => {
    navigator.clipboard
      .writeText(WALLET_ADDRESS)
      .then(() => toast.success("Address copied to clipboard!"))
      .catch(() => toast.error("Failed to copy address"))
  }, [])

  return (
    <section
      className="w-full max-w-[520px] mx-auto
        bg-white rounded-2xl border-2 border-slate-200
        shadow-[0_8px_48px_rgba(26,21,96,0.12)]
        overflow-hidden
        animate-[fadeSlideUp_0.35s_cubic-bezier(0.4,0,0.2,1)_both]"
      aria-label="Payment checkout form"
    >
      {/* ── Header ── */}
      <header className="px-7 py-6 border-b border-slate-100 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-slate-400 mb-1">
            Order Summary
          </p>
          <h2 className="text-xl font-extrabold text-slate-900 mb-2">
            Complete Your Purchase
          </h2>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold
            bg-indigo-50 border border-indigo-200 text-indigo-700
            px-3 py-1 rounded-full">
            <IconWallet />
            {pkg.label} — ${pkg.amount} for {pkg.credits.toLocaleString()} credits
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close checkout"
          className="mt-0.5 w-8 h-8 flex items-center justify-center rounded-full
            border border-slate-200 text-slate-400
            hover:bg-slate-100 hover:text-slate-700
            transition-all duration-150 flex-shrink-0"
        >
          <IconX />
        </button>
      </header>

      {/* ── Body ── */}
      {form.success ? (
        /* Success state */
        <div className="px-7 py-14 flex flex-col items-center text-center" role="status" aria-live="polite">
          <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200
            flex items-center justify-center text-emerald-500 mb-5">
            <IconCheckCircle />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 mb-2">
            Payment Request Submitted!
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
            Your request is{" "}
            <strong className="font-semibold text-amber-600">pending admin approval</strong>.
            Credits will be added once the transaction is verified.
          </p>
        </div>
      ) : (
        /* Checkout form */
        <form onSubmit={handleSubmit} noValidate className="px-7 py-7 space-y-5">
          {/* Payment instructions */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">
              💳 Payment Instructions
            </p>
            <p className="text-sm text-amber-700 leading-relaxed mb-3">
              Transfer exactly{" "}
              <strong className="font-bold">${pkg.amount} USD</strong> via USDT (TRC20) to
              the address below, then paste your transaction ID.
            </p>
            <div className="flex items-center gap-2 bg-white border border-amber-200 rounded-lg px-3 py-2.5">
              <code className="text-[11.5px] font-mono text-slate-800 flex-1 truncate select-all">
                {WALLET_ADDRESS}
              </code>
              <button
                type="button"
                onClick={handleCopy}
                aria-label="Copy wallet address"
                className="w-7 h-7 flex-shrink-0 flex items-center justify-center
                  rounded-md text-amber-600 hover:bg-amber-100
                  transition-colors duration-150"
              >
                <IconCopy />
              </button>
            </div>
          </div>

          {/* Transaction ID */}
          <div className="space-y-1.5">
            <label
              htmlFor="txn-id"
              className="text-xs font-bold tracking-[0.08em] uppercase text-slate-500"
            >
              Transaction ID <span className="text-red-500 font-bold">*</span>
            </label>
            <input
              id="txn-id"
              type="text"
              required
              autoComplete="off"
              spellCheck={false}
              placeholder="e.g. a1b2c3d4e5f6..."
              value={form.txnId}
              onChange={(e) => setForm((s) => ({ ...s, txnId: e.target.value }))}
              className="w-full h-11 bg-slate-50 border-2 border-slate-200 rounded-xl
                px-4 text-sm font-medium text-slate-800 placeholder:text-slate-400
                focus:outline-none focus:border-indigo-500 focus:ring-2
                focus:ring-indigo-500/10 focus:bg-white transition-all duration-200"
            />
          </div>

          {/* Note */}
          <div className="space-y-1.5">
            <label
              htmlFor="note"
              className="text-xs font-bold tracking-[0.08em] uppercase text-slate-500"
            >
              Additional Note{" "}
              <span className="font-medium normal-case text-slate-400 tracking-normal">
                (optional)
              </span>
            </label>
            <textarea
              id="note"
              rows={3}
              placeholder="Any extra information for the admin..."
              value={form.note}
              onChange={(e) => setForm((s) => ({ ...s, note: e.target.value }))}
              className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl
                px-4 py-3 text-sm font-medium text-slate-800 placeholder:text-slate-400
                focus:outline-none focus:border-indigo-500 focus:ring-2
                focus:ring-indigo-500/10 focus:bg-white transition-all duration-200 resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={form.submitting || !form.txnId.trim()}
            className="w-full h-13 flex items-center justify-center gap-2
              bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700
              disabled:opacity-50 disabled:cursor-not-allowed
              text-white text-sm font-bold tracking-wide uppercase
              rounded-xl border-2 border-emerald-600
              shadow-[0_2px_8px_rgba(16,185,129,0.28)]
              hover:shadow-[0_4px_20px_rgba(16,185,129,0.38)]
              transition-all duration-200 mt-1"
            style={{ height: "52px" }}
          >
            {form.submitting ? (
              <>
                <IconLoader />
                Submitting…
              </>
            ) : (
              <>
                Submit Payment Request
                <IconArrowRight />
              </>
            )}
          </button>
        </form>
      )}
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  const [selectedPkg, setSelectedPkg] = useState<Package | null>(null)

  const handleSelect = useCallback((pkg: Package) => {
    setSelectedPkg(pkg)
    // Scroll to checkout after state update
    requestAnimationFrame(() => {
      document.getElementById("checkout-section")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    })
  }, [])

  const handleClose = useCallback(() => {
    setSelectedPkg(null)
  }, [])

  return (
    <>
      <Navbar />
      {/* ── Global animation keyframes ─ */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .animate-\\[fadeSlideUp_0\\.5s_ease_both\\] {
          animation: fadeSlideUp 0.5s ease both;
        }
        .animate-\\[fadeSlideUp_0\\.35s_cubic-bezier\\(0\\.4\\,0\\,0\\.2\\,1\\)_both\\] {
          animation: fadeSlideUp 0.35s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>

      <div className="min-h-screen bg-[#F8F8FC] flex flex-col">
        {/* ── Main ── */}
        <main className="flex-grow flex flex-col items-center px-4 sm:px-6 pt-14 sm:pt-20 pb-24">

          {/* ── Page header ── */}
          <header className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
            <span className="inline-flex items-center gap-1.5
              bg-indigo-50 border border-indigo-200 text-indigo-700
              text-[11px] font-bold tracking-[0.08em] uppercase
              px-4 py-1.5 rounded-full mb-5">
              <IconZap />
              Credit Packages
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold
              text-slate-900 tracking-tight leading-[1.1] mb-4">
              Power Up Your{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600
                bg-clip-text text-transparent">
                Lead Generation
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-500 font-medium leading-relaxed">
              Each scrape costs{" "}
              <strong className="font-bold text-slate-800">100 credits</strong>.
              Choose the package that fits your growth goals.
            </p>
          </header>

          {/* ── Cards grid ── */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5
              w-full max-w-[1160px] mb-14"
            role="list"
            aria-label="Credit packages"
          >
            {PACKAGES.map((pkg, i) => (
              <div key={pkg.id} role="listitem">
                <PricingCard
                  pkg={pkg}
                  isSelected={selectedPkg?.id === pkg.id}
                  onSelect={handleSelect}
                  index={i}
                />
              </div>
            ))}
          </div>

          {/* ── Checkout section ── */}
          {selectedPkg && (
            <div
              id="checkout-section"
              className="w-full max-w-[560px] mx-auto scroll-mt-10"
            >
              {/* Divider */}
              <div className="flex items-center gap-4 mb-8">
                <hr className="flex-1 border-slate-200" />
                <span className="text-xs font-bold tracking-[0.1em] uppercase text-slate-400">
                  Complete Purchase
                </span>
                <hr className="flex-1 border-slate-200" />
              </div>

              <CheckoutForm pkg={selectedPkg} onClose={handleClose} />
            </div>
          )}
        </main>
      </div>
      <Footer />
    </>
  )
}