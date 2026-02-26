"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin, Globe, Phone, Mail, Link as LinkIcon, Building2, Download, Loader2, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import type { Lead, Pagination } from "@/lib/types"
import { ScrapeDialog } from "./scrape-dialog"
import { exportLeadsAction } from "@/lib/lead-actions"
import { toast } from "sonner"

interface Props {
    leads: Lead[]
    pagination: Pagination | null
    currentSearch: string
}

export function LeadsView({ leads, pagination, currentSearch }: Props) {
    const router = useRouter()
    const [search, setSearch] = useState(currentSearch)
    const [isExporting, startExport] = useTransition()

    // Calculate serial number starting point
    const startIndex = ((pagination?.page || 1) - 1) * (pagination?.limit || 50)

    function handleSearch(e: React.FormEvent) {
        e.preventDefault()
        const params = new URLSearchParams()
        if (search) params.set("search", search)
        router.push(`/dashboard/leads?${params.toString()}`)
    }

    function handleExport() {
        startExport(async () => {
            const res = await exportLeadsAction(currentSearch)
            if (res.error) {
                toast.error(res.error)
                return
            }

            const leadsForExport = res.data || []
            if (leadsForExport.length === 0) {
                toast.error("No leads found to export")
                return
            }

            const headers = ["Name", "Category", "Phone", "Email", "Website", "Maps URL"]
            const csvData = leadsForExport.map((l: Lead) => [
                `"${(l.name || "").replace(/"/g, '""')}"`,
                `"${(l.raw?.categoryName || "").replace(/"/g, '""')}"`,
                `"${(l.raw?.phoneUnformatted || l.phones?.[0] || "").replace(/"/g, '""')}"`,
                `"${(l.validatedEmails?.[0] || l.emails?.[0] || "").replace(/"/g, '""')}"`,
                `"${(l.website || "").replace(/"/g, '""')}"`,
                `"${(l.raw?.url || "").replace(/"/g, '""')}"`,
            ])

            const csvContent = [headers.join(","), ...csvData.map(row => row.join(","))].join("\n")
            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
            const link = document.createElement("a")
            const url = URL.createObjectURL(blob)

            link.setAttribute("href", url)
            link.setAttribute("download", `leads_export_${new Date().getTime()}.csv`)
            link.style.visibility = "hidden"
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

            toast.success(`Successfully downloaded ${leadsForExport.length} leads!`)
        })
    }

    return (
        <div className="flex flex-col gap-6 animate-fade-in pb-8">
            {/* Header Section */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Leads Management</h1>
                    <p className="text-sm text-slate-500 mt-1">Discover, manage, and export high-quality potential clients.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <Button
                        variant="outline"
                        onClick={handleExport}
                        disabled={isExporting}
                        className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all min-w-[130px] shadow-sm"
                    >
                        {isExporting ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin text-indigo-600" />
                        ) : (
                            <Download className="h-4 w-4 mr-2 text-slate-500" />
                        )}
                        {isExporting ? "Exporting..." : "Export All"}
                    </Button>
                    <ScrapeDialog />
                </div>
            </div>

            {/* Table Card */}
            <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden flex flex-col">

                {/* Search Bar */}
                <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                    <form onSubmit={handleSearch} className="flex items-center w-full max-w-md relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Search leads by name, category or query..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 bg-white border-slate-200 focus-visible:ring-indigo-500 h-10 w-full shadow-sm"
                        />
                        <Button type="submit" className="hidden" />
                    </form>
                </div>

                {/* Data Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-16 text-center">#</th>
                                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Lead Info</th>
                                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Website</th>
                                <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {leads.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                        <div className="flex flex-col items-center justify-center">
                                            <Search className="h-8 w-8 text-slate-300 mb-3" />
                                            <p className="text-sm font-medium text-slate-700">No leads found</p>
                                            <p className="text-xs text-slate-500 mt-1">Try adjusting your search query.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                leads.map((lead, index) => {
                                    const email = lead.validatedEmails?.[0] || lead.emails?.[0];
                                    const phone = lead.raw?.phoneUnformatted || lead.phones?.[0];

                                    return (
                                        <tr key={lead._id} className="hover:bg-slate-50/80 transition-colors group">
                                            {/* Serial */}
                                            <td className="px-6 py-4 text-sm text-slate-500 text-center font-medium">
                                                {startIndex + index + 1}
                                            </td>

                                            {/* Lead Info (Image + Name) */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 shrink-0 rounded-md border border-slate-200 bg-slate-100 overflow-hidden flex items-center justify-center">
                                                        {lead.raw?.imageUrl ? (
                                                            <img src={lead.raw.imageUrl} alt={lead.name} className="h-full w-full object-cover" />
                                                        ) : (
                                                            <Building2 className="h-5 w-5 text-slate-400" />
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col max-w-[250px]">
                                                        <span className="text-sm font-semibold text-slate-900 truncate" title={lead.name}>
                                                            {lead.name}
                                                        </span>
                                                        <div className="flex items-center gap-2 mt-0.5">
                                                            {lead.raw?.categoryName && (
                                                                <span className="text-[11px] font-medium text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded truncate">
                                                                    {lead.raw.categoryName}
                                                                </span>
                                                            )}
                                                            {lead.address && (
                                                                <span className="text-xs text-slate-500 truncate flex items-center gap-1" title={lead.address}>
                                                                    <MapPin className="h-3 w-3" />
                                                                    {lead.address.split(',')[0]}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Contact (Email + Phone) */}
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1.5">
                                                    {email ? (
                                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                                            <Mail className="h-3.5 w-3.5 text-slate-400" />
                                                            <span className="truncate max-w-[180px]" title={email}>{email}</span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-xs text-slate-400 italic">No email</span>
                                                    )}
                                                    {phone ? (
                                                        <div className="flex items-center gap-2 text-sm text-slate-600">
                                                            <Phone className="h-3.5 w-3.5 text-slate-400" />
                                                            <span>{phone}</span>
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </td>

                                            {/* Website */}
                                            <td className="px-6 py-4">
                                                {lead.website ? (
                                                    <a
                                                        href={lead.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 hover:underline transition-colors w-fit"
                                                    >
                                                        <Globe className="h-3.5 w-3.5 shrink-0" />
                                                        <span className="truncate max-w-[150px]">{lead.website.replace(/^https?:\/\/(www\.)?/, '')}</span>
                                                    </a>
                                                ) : (
                                                    <span className="text-xs text-slate-400 italic">N/A</span>
                                                )}
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-4 text-right">
                                                {lead.raw?.url ? (
                                                    <a
                                                        href={lead.raw.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center justify-center h-8 w-8 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                                                        title="View on Google Maps"
                                                    >
                                                        <LinkIcon className="h-4 w-4" />
                                                    </a>
                                                ) : null}
                                            </td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Strict Pagination UI */}
                {pagination && pagination.totalPages > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50 mt-auto">
                        <p className="text-sm font-medium text-slate-500">
                            Showing <span className="text-slate-900">{startIndex + 1}</span> to <span className="text-slate-900">{Math.min(startIndex + pagination.limit, pagination.total)}</span> of <span className="text-slate-900">{pagination.total}</span> leads
                        </p>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={!pagination.hasPrev}
                                onClick={() => {
                                    const p = new URLSearchParams();
                                    p.set("page", String(pagination.page - 1))
                                    if (currentSearch) p.set("search", currentSearch)
                                    router.push(`/dashboard/leads?${p.toString()}`)
                                }}
                                className="h-8 px-3 border-slate-200 hover:bg-slate-100 text-slate-600"
                            >
                                <ChevronLeft className="h-4 w-4 mr-1" /> Prev
                            </Button>
                            <span className="text-sm font-medium text-slate-600 px-2">
                                Page {pagination.page} of {pagination.totalPages}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={!pagination.hasNext}
                                onClick={() => {
                                    const p = new URLSearchParams();
                                    p.set("page", String(pagination.page + 1))
                                    if (currentSearch) p.set("search", currentSearch)
                                    router.push(`/dashboard/leads?${p.toString()}`)
                                }}
                                className="h-8 px-3 border-slate-200 hover:bg-slate-100 text-slate-600"
                            >
                                Next <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    )
}