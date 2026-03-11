"use client"

import { useState } from "react"
import { Send, Mail, Users, ChevronRight, CheckCircle2, ChevronLeft, Loader2 } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { bulkImportAction } from "@/lib/subscriber-actions"
import { toast } from "sonner"
import { Audience } from "@/lib/types"

interface LeadToCampaignProps {
    selectedEmails: string[]
    audiences: Audience[]
    onSuccess?: () => void
}

export function LeadToCampaignDialog({ selectedEmails, audiences, onSuccess }: LeadToCampaignProps) {
    const [open, setOpen] = useState(false)
    const [audienceId, setAudienceId] = useState<string>("")
    const [isPending, setIsPending] = useState(false)
    const [step, setStep] = useState(1)

    const handleImport = async () => {
        if (!audienceId) {
            toast.error("Please select an audience")
            return
        }

        setIsPending(true)
        try {
            // Prepare CSV data format expected by bulkImportAction: email,firstName,lastName
            const csvData = selectedEmails.map(email => `${email},Lead,User`).join("\n")

            const formData = new FormData()
            formData.append("csvData", csvData)
            formData.append("audienceId", audienceId)
            formData.append("tags", "leads-import")

            const res = await bulkImportAction(null, formData)

            if (res.error) {
                toast.error(res.error)
            } else {
                toast.success(`Successfully added ${selectedEmails.length} leads to audience!`)
                setStep(2) // Move to success step
                onSuccess?.()
            }
        } catch (error) {
            toast.error("Failed to import leads")
        } finally {
            setIsPending(false)
        }
    }

    const resetDialog = () => {
        setOpen(false)
        setStep(1)
        setAudienceId("")
    }

    return (
        <Dialog open={open} onOpenChange={(val) => {
            if (!val) resetDialog()
            else setOpen(true)
        }}>
            <DialogTrigger asChild>
                <Button
                    disabled={selectedEmails.length === 0}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white border-0 shadow-md transition-all active:scale-95"
                >
                    <Mail className="mr-2 h-4 w-4" />
                    Campaign with {selectedEmails.length} Selection
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px] overflow-hidden p-0 border-none shadow-2xl">
                <div className="flex flex-col bg-white rounded-xl">
                    <div className="bg-indigo-600 p-6 text-white">
                        <DialogHeader>
                            <DialogTitle className="text-xl text-white flex items-center gap-2">
                                <Send className="h-5 w-5" />
                                Launch Campaign
                            </DialogTitle>
                            <DialogDescription className="text-indigo-100">
                                Move your selected leads into an audience to start emailing them.
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    <div className="p-6">
                        {step === 1 ? (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                            <Users className="h-5 w-5 text-indigo-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">{selectedEmails.length} Leads Selected</p>
                                            <p className="text-xs text-slate-500">Ready for bulk import</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-sm font-bold text-slate-700">Select Destination Audience</Label>
                                    <Select value={audienceId} onValueChange={setAudienceId}>
                                        <SelectTrigger className="h-12 border-slate-200 focus:ring-indigo-500 rounded-xl shadow-sm">
                                            <SelectValue placeholder="Chose an audience..." />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl border-slate-200">
                                            {audiences.map((audience) => (
                                                <SelectItem key={audience._id} value={audience._id} className="py-3">
                                                    <div className="flex flex-col">
                                                        <span className="font-semibold">{audience.name}</span>
                                                        <span className="text-[11px] text-slate-500">{audience.subscriberCount} existing subscribers</span>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <Button variant="ghost" onClick={resetDialog} className="flex-1 rounded-xl h-11">
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleImport}
                                        disabled={!audienceId || isPending}
                                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 rounded-xl h-11 font-bold shadow-lg shadow-indigo-200"
                                    >
                                        {isPending ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <>
                                                Import & Proceed <ChevronRight className="ml-2 h-4 w-4" />
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="py-8 text-center space-y-6 animate-in zoom-in-95 duration-300">
                                <div className="h-20 w-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto border-4 border-emerald-50">
                                    <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">Leads Imported!</h3>
                                    <p className="text-slate-500 mt-2 max-w-[280px] mx-auto">
                                        Your {selectedEmails.length} leads have been successfully added to the audience.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-3 pt-4">
                                    <Button
                                        className="bg-indigo-600 hover:bg-indigo-700 h-11 font-bold rounded-xl"
                                        onClick={() => window.location.href = '/dashboard/campaigns'}
                                    >
                                        Go to Campaigns <Send className="ml-2 h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" onClick={resetDialog} className="text-slate-500">
                                        <ChevronLeft className="mr-2 h-4 w-4" /> Back to Leads
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
