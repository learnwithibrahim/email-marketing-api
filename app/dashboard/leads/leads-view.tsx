"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Search, MapPin, Globe, Phone, Mail, Link as LinkIcon, Building2, Download, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
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

    function handleSearch(e: React.FormEvent) {
        e.preventDefault()
        const params = new URLSearchParams()
        if (search) params.set("search", search)
        router.push(`/dashboard/leads?${params.toString()}`)
    }

    const [isExporting, startExport] = useTransition()

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

            toast.success("Excel/CSV Download successful!")
        })
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Leads</h1>
                    <p className="text-muted-foreground">Manage and discover new potential clients</p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={handleExport}
                        disabled={isExporting}
                        className="border-primary/20 hover:bg-primary/5 hover:text-primary"
                    >
                        {isExporting ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                            <Download className="h-4 w-4 mr-2" />
                        )}
                        Export Data
                    </Button>
                    <ScrapeDialog />
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-6 border-b border-border">
                        <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1 max-w-sm">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search leads by name or query..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
                            </div>
                        </form>
                    </div>

                    {leads.length === 0 ? (
                        <p className="text-center text-muted-foreground py-12">No leads found.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                            {leads.map((lead) => (
                                <Card key={lead._id} className="overflow-hidden bg-card hover:border-primary/50 transition-colors">
                                    <div className="h-32 bg-muted/30 relative">
                                        {lead.raw?.imageUrl ? (
                                            <img src={lead.raw.imageUrl} alt={lead.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-primary/5">
                                                <Building2 className="h-12 w-12 text-primary/20" />
                                            </div>
                                        )}
                                        <div className="absolute top-3 right-3 flex gap-2">
                                            {lead.raw?.rank && (
                                                <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm border-0">
                                                    Rank #{lead.raw.rank}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <CardContent className="p-5">
                                        <div className="mb-4">
                                            <h3 className="font-semibold text-lg line-clamp-1 mb-1">{lead.name}</h3>
                                            {lead.raw?.categoryName && (
                                                <p className="text-xs text-muted-foreground font-medium">{lead.raw.categoryName}</p>
                                            )}
                                        </div>

                                        <div className="space-y-3 text-sm">
                                            {lead.raw?.phoneUnformatted ? (
                                                <div className="flex items-start gap-2 text-muted-foreground">
                                                    <Phone className="h-4 w-4 mt-0.5 shrink-0 text-primary/70" />
                                                    <a href={`tel:${lead.raw.phoneUnformatted}`} className="hover:text-primary transition-colors">
                                                        {lead.raw.phone || lead.raw.phoneUnformatted}
                                                    </a>
                                                </div>
                                            ) : lead.phones && lead.phones.length > 0 ? (
                                                <div className="flex items-start gap-2 text-muted-foreground">
                                                    <Phone className="h-4 w-4 mt-0.5 shrink-0 text-primary/70" />
                                                    <span>{lead.phones[0]}</span>
                                                </div>
                                            ) : null}

                                            {(lead.emails && lead.emails.length > 0) || (lead.validatedEmails && lead.validatedEmails.length > 0) ? (
                                                <div className="flex items-start gap-2 text-muted-foreground">
                                                    <Mail className="h-4 w-4 mt-0.5 shrink-0 text-primary/70" />
                                                    <span className="line-clamp-1">
                                                        {lead.validatedEmails && lead.validatedEmails.length > 0 ? lead.validatedEmails[0] : lead.emails[0]}
                                                    </span>
                                                </div>
                                            ) : null}

                                            {lead.website ? (
                                                <div className="flex items-start gap-2 text-muted-foreground">
                                                    <Globe className="h-4 w-4 mt-0.5 shrink-0 text-primary/70" />
                                                    <a href={lead.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors line-clamp-1">
                                                        {lead.website.replace(/^https?:\/\/(www\.)?/, '')}
                                                    </a>
                                                </div>
                                            ) : null}

                                            {lead.raw?.url ? (
                                                <div className="flex items-start gap-2 text-muted-foreground">
                                                    <LinkIcon className="h-4 w-4 mt-0.5 shrink-0 text-primary/70" />
                                                    <a href={lead.raw.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-xs line-clamp-1">
                                                        Google Maps Link
                                                    </a>
                                                </div>
                                            ) : null}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                    {pagination && pagination.totalPages > 1 && (
                        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/5">
                            <p className="text-sm text-muted-foreground">Page {pagination.page} of {pagination.totalPages}</p>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" disabled={!pagination.hasPrev} onClick={() => {
                                    const p = new URLSearchParams(); p.set("page", String(pagination.page - 1))
                                    if (currentSearch) p.set("search", currentSearch)
                                    router.push(`/dashboard/leads?${p.toString()}`)
                                }}>Previous</Button>
                                <Button variant="outline" size="sm" disabled={!pagination.hasNext} onClick={() => {
                                    const p = new URLSearchParams(); p.set("page", String(pagination.page + 1))
                                    if (currentSearch) p.set("search", currentSearch)
                                    router.push(`/dashboard/leads?${p.toString()}`)
                                }}>Next</Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
