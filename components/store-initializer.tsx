"use client"

import { useEffect, useRef } from "react"
import { useAuthStore } from "@/lib/store"
import { User } from "@/lib/types"

export function StoreInitializer({ user }: { user: User | null }) {
  const initialized = useRef(false)
  
  if (!initialized.current) {
    useAuthStore.setState({ user, isLoading: false })
    initialized.current = true
  }

  // Also sync changes if the server prop somehow changes (optional but good practice)
  useEffect(() => {
    useAuthStore.setState({ user })
  }, [user])

  return null
}
