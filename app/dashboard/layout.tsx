import { SidebarNav } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/header"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#f4f5f8]">
      <SidebarNav />
      <div className="flex flex-1 flex-col">
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-4 md:p-8 lg:p-10">{children}</main>
      </div>
    </div>
  )
}