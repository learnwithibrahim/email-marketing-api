"use client"

import { useState, useEffect, useCallback } from "react"
import { paymentsApi } from "@/lib/api"
import { toast } from "sonner"
import {
  CheckCircle2,
  Clock,
  XCircle,
  Loader2,
  DollarSign,
  User,
  Mail,
  Calendar,
  FileText,
  Shield,
  RefreshCw,
} from "lucide-react"

interface PaymentRequest {
  _id: string
  userId: {
    _id: string
    name: string
    email: string
  }
  packageAmount: number
  transactionId: string
  note?: string
  status: "pending" | "approved" | "rejected"
  createdAt: string
  updatedAt: string
}

const CREDIT_MAP: Record<number, number> = {
  5: 1000,
  10: 2500,
  20: 5000,
  50: 10000,
}

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"))
  return match ? match[2] : undefined
}

function StatusBadge({ status }: { status: string }) {
  if (status === "pending") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
        <Clock className="h-3 w-3" />
        Pending
      </span>
    )
  }
  if (status === "approved") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
        <CheckCircle2 className="h-3 w-3" />
        Approved
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200">
      <XCircle className="h-3 w-3" />
      Rejected
    </span>
  )
}

export default function PaymentRequestsPage() {
  const [requests, setRequests] = useState<PaymentRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [approvingId, setApprovingId] = useState<string | null>(null)

  const fetchRequests = useCallback(async () => {
    setLoading(true)
    try {
      const token = getCookie("auth_token")
      const res = await paymentsApi.list(token)
      if (res.ok) {
        setRequests(res.data || [])
      } else {
        toast.error("Failed to fetch payment requests")
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to fetch payment requests")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRequests()
  }, [fetchRequests])

  async function handleApprove(id: string) {
    setApprovingId(id)
    try {
      const token = getCookie("auth_token")
      const res = await paymentsApi.approve(id, token)
      if (res.ok) {
        toast.success(
          "Transaction approved! Credits have been injected and the user has been converted to Premium.",
          { duration: 5000 }
        )
        // Update local state
        setRequests((prev) =>
          prev.map((r) => (r._id === id ? { ...r, status: "approved" as const } : r))
        )
      } else {
        toast.error(res.error || "Failed to approve transaction")
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to approve transaction")
    } finally {
      setApprovingId(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#140D36] tracking-tight flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2e2692] to-[#4338ca] flex items-center justify-center shadow-lg">
              <Shield className="h-5 w-5 text-white" />
            </div>
            Payment Requests
          </h1>
          <p className="text-sm text-gray-500 mt-1 ml-[52px]">
            Review and approve user payment transactions
          </p>
        </div>
        <button
          onClick={fetchRequests}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
            <Clock className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-[#140D36]">
              {requests.filter((r) => r.status === "pending").length}
            </p>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Pending</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
            <CheckCircle2 className="h-6 w-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-[#140D36]">
              {requests.filter((r) => r.status === "approved").length}
            </p>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Approved</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <DollarSign className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-extrabold text-[#140D36]">
              ${requests.filter((r) => r.status === "approved").reduce((s, r) => s + r.packageAmount, 0)}
            </p>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Revenue</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-[#2e2692]" />
              <p className="text-sm font-medium text-gray-500">Loading payment requests...</p>
            </div>
          </div>
        ) : requests.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-sm font-medium text-gray-500">No payment requests yet</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="text-left px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Package
                  </th>
                  <th className="text-left px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="text-left px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Note
                  </th>
                  <th className="text-left px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-right px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {requests.map((req) => (
                  <tr
                    key={req._id}
                    className={`transition-colors hover:bg-gray-50/50 ${
                      req.status === "pending" ? "bg-amber-50/30" : ""
                    }`}
                  >
                    {/* User */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#140D36] flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5 text-gray-400" />
                          {req.userId?.name || "Unknown"}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                          <Mail className="h-3 w-3 text-gray-400" />
                          {req.userId?.email || "N/A"}
                        </span>
                      </div>
                    </td>

                    {/* Package */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-extrabold text-[#2e2692]">
                          ${req.packageAmount}
                        </span>
                        <span className="text-xs text-gray-500">
                          {(CREDIT_MAP[req.packageAmount] || 0).toLocaleString()} credits
                        </span>
                      </div>
                    </td>

                    {/* Transaction ID */}
                    <td className="px-6 py-4">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded-md font-mono text-gray-700 max-w-[160px] truncate block">
                        {req.transactionId}
                      </code>
                    </td>

                    {/* Note */}
                    <td className="px-6 py-4">
                      <span className="text-xs text-gray-600 max-w-[120px] truncate block">
                        {req.note || "—"}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <StatusBadge status={req.status} />
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4">
                      <span className="text-xs text-gray-500 flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" />
                        {new Date(req.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4 text-right">
                      {req.status === "pending" ? (
                        <button
                          onClick={() => handleApprove(req._id)}
                          disabled={approvingId === req._id}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm hover:from-emerald-600 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {approvingId === req._id ? (
                            <>
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              Approving...
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              Approve Transaction
                            </>
                          )}
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400 font-medium italic">Processed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
