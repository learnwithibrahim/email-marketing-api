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
        <div className="flex flex-col gap-8 animate-fade-in">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-1">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gradient">Leads</h1>
                    <p className="text-muted-foreground mt-1">Discover and manage high-quality potential clients</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <Button
                        variant="outline"
                        onClick={handleExport}
                        disabled={isExporting}
                        className="btn-premium border-primary/20 hover:bg-primary/5 hover:text-primary min-w-[140px]"
                    >
                        {isExporting ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                            <Download className="h-4 w-4 mr-2" />
                        )}
                        Export Data
                    </Button>
                    <div className="flex-shrink-0">
                        <ScrapeDialog />
                    </div>
                </div>
            </div>

            <Card className="premium-card-static border-none shadow-md overflow-hidden">
                <CardContent className="p-0">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-6 bg-background/50 backdrop-blur-sm border-b border-border/50">
                        <form onSubmit={handleSearch} className="flex items-center gap-2 w-full sm:max-w-md">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/50" />
                                <Input
                                    placeholder="Search leads by name, category or query..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-10 bg-background/80 border-border/50 focus:border-primary/50 transition-all h-11"
                                />
                            </div>
                            <Button type="submit" size="icon" className="h-11 w-11 shrink-0 lg:hidden">
                                <Search className="h-4 w-4" />
                            </Button>
                        </form>
                    </div>

                    {leads.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 text-center px-6">
                            <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mb-4">
                                <Search className="h-8 w-8 text-muted-foreground/50" />
                            </div>
                            <h3 className="text-lg font-medium text-foreground">No leads found</h3>
                            <p className="text-sm text-muted-foreground max-w-xs mt-1">
                                Try adjusting your search or use the Scrape Leads tool to find new prospects.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 stagger-children">
                            {leads.map((lead) => (
                                <Card key={lead._id} className="premium-card overflow-hidden group">
                                    <div className="h-36 bg-muted/20 relative overflow-hidden">
                                        {lead.raw?.imageUrl ? (
                                            <img src={lead.raw.imageUrl} alt={lead.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-primary/5">
                                                <Building2 className="h-14 w-14 text-primary/10 transition-transform duration-500 group-hover:scale-110" />
                                            </div>
                                        )}
                                        <div className="absolute top-3 right-3 flex gap-2">
                                            {lead.raw?.rank && (
                                                <Badge variant="secondary" className="bg-background/90 backdrop-blur-md border border-white/20 shadow-sm font-semibold">
                                                    Rank #{lead.raw.rank}
                                                </Badge>
                                            )}
                                        </div>
                                        {lead.raw?.categoryName && (
                                            <div className="absolute bottom-3 left-3">
                                                <Badge className="bg-primary/90 hover:bg-primary text-white border-0 text-[10px] uppercase tracking-wider font-bold">
                                                    {lead.raw.categoryName}
                                                </Badge>
                                            </div>
                                        )}
                                    </div>
                                    <CardContent className="p-6">
                                        <div className="mb-5">
                                            <h3 className="font-bold text-lg line-clamp-1 text-foreground group-hover:text-primary transition-colors duration-200">{lead.name}</h3>
                                            {lead.address && (
                                                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                                    <MapPin className="h-3 w-3" />
                                                    <span className="line-clamp-1">{lead.address}</span>
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-3.5 text-sm">
                                            {lead.raw?.phoneUnformatted ? (
                                                <div className="flex items-start gap-3 text-muted-foreground hover:text-foreground transition-colors">
                                                    <div className="w-7 h-7 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
                                                        <Phone className="h-3.5 w-3.5 text-primary" />
                                                    </div>
                                                    <a href={`tel:${lead.raw.phoneUnformatted}`} className="hover:text-primary transition-colors mt-1 font-medium italic">
                                                        {lead.raw.phone || lead.raw.phoneUnformatted}
                                                    </a>
                                                </div>
                                            ) : lead.phones && lead.phones.length > 0 ? (
                                                <div className="flex items-start gap-3 text-muted-foreground">
                                                    <div className="w-7 h-7 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
                                                        <Phone className="h-3.5 w-3.5 text-primary" />
                                                    </div>
                                                    <span className="mt-1 font-medium">{lead.phones[0]}</span>
                                                </div>
                                            ) : null}

                                            {(lead.emails && lead.emails.length > 0) || (lead.validatedEmails && lead.validatedEmails.length > 0) ? (
                                                <div className="flex items-start gap-3 text-muted-foreground hover:text-foreground transition-colors">
                                                    <div className="w-7 h-7 rounded-full bg-success/5 flex items-center justify-center shrink-0">
                                                        <Mail className="h-3.5 w-3.5 text-success" />
                                                    </div>
                                                    <span className="line-clamp-1 mt-1 font-medium">
                                                        {lead.validatedEmails && lead.validatedEmails.length > 0 ? lead.validatedEmails[0] : lead.emails[0]}
                                                    </span>
                                                </div>
                                            ) : null}

                                            {lead.website ? (
                                                <div className="flex items-start gap-3 text-muted-foreground hover:text-foreground transition-colors">
                                                    <div className="w-7 h-7 rounded-full bg-accent/5 flex items-center justify-center shrink-0 border border-accent/10">
                                                        <Globe className="h-3.5 w-3.5 text-accent-foreground" />
                                                    </div>
                                                    <a href={lead.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors line-clamp-1 mt-1 font-medium italic">
                                                        {lead.website.replace(/^https?:\/\/(www\.)?/, '')}
                                                    </a>
                                                </div>
                                            ) : null}

                                            <div className="pt-2 flex items-center justify-between border-t border-border/50 mt-4">
                                                {lead.raw?.url ? (
                                                    <a href={lead.raw.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary font-semibold hover:underline flex items-center gap-1">
                                                        View on Maps <LinkIcon className="h-3 w-3" />
                                                    </a>
                                                ) : <div />}

                                                <Button variant="ghost" size="sm" className="h-8 text-[10px] uppercase tracking-wider font-bold text-muted-foreground group-hover:text-primary transition-colors">
                                                    Details
                                                </Button>
                                            </div>
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
