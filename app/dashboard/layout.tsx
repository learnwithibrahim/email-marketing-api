import { SidebarNav } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { StoreInitializer } from "@/components/store-initializer"
import { authApi } from "@/lib/api"
import { getToken } from "@/lib/auth"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const token = await getToken()
  let user = null
  if (token) {
    try {
      const res = await authApi.me(token)
      if (res.ok && res.user) {
        user = res.user
      }
    } catch {
      // Ignored
    }
  }

  return (
    <div className="min-h-screen bg-[#f4f5f8]">
      <StoreInitializer user={user} />
      {/* 1. Sidebar Component */}
      <SidebarNav />

      {/* 2. Main Wrapper: 
          On Desktop (lg:), we add padding-left (pl-64) equal to the sidebar width.
          On Mobile, we add pt-16 (top padding) to clear the mobile header.
      */}
      <div className="flex flex-col min-h-screen lg:pl-64 pt-16 lg:pt-0">
        <DashboardHeader />

        <main className="flex-1 p-4">
          <div className=" mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}