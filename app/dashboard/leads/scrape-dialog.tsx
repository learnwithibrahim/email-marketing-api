"use client"

import { useState, useTransition } from "react"
import { Search, Loader2 } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { scrapeLeadsAction } from "@/lib/lead-actions"
import { getUserAction } from "@/lib/actions"
import { useAuthStore } from "@/lib/store"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function ScrapeDialog() {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("")
    const [limit, setLimit] = useState(10)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const setUser = useAuthStore(state => state.setUser)

    function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!query) return

        startTransition(async () => {
            const res = await scrapeLeadsAction(query, limit)
            if (res.error) {
                const isUpgradeError = [
                    "Trial expired. Upgrade required to generate leads",
                    "Insufficient credits. Upgrade required to generate leads",
                    "No credits left. Upgrade required to generate leads"
                ].some(msg => res.error?.includes(msg))

                if (isUpgradeError) {
                    toast.error("Upgrade Required", { description: res.error })
                    router.push("/pricing")
                } else {
                    toast.error(res.error)
                }
            } else {
                toast.success(res.message || "Started scraping process. This might take a few minutes.")
                setOpen(false)
                setQuery("")
                setLimit(10)
                // Quietly refresh credits
                const userRes = await getUserAction()
                if (userRes.success && userRes.user) {
                    setUser(userRes.user)
                }
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground border-0">
                    <Search className="mr-2 h-4 w-4" />
                    Generate Leads
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Generate New Leads</DialogTitle>
                    <DialogDescription>
                        Enter a search query to find potential clients. They will automatically be added to your leads pool.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-4 py-4">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="query">Search Query</Label>
                            <Input
                                id="query"
                                placeholder="e.g. digital marketing agency in Dubai"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="limit">Limit (Number of leads)</Label>
                            <Input
                                id="limit"
                                type="number"
                                min={1}
                                max={500}
                                placeholder="10"
                                value={limit}
                                onChange={(e) => setLimit(Number(e.target.value))}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-end pt-2">
                        <Button type="submit" disabled={isPending || !query} className="bg-gradient-to-r from-primary to-primary/80">
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Starting crawler...
                                </>
                            ) : (
                                "Scrape Leads"
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
