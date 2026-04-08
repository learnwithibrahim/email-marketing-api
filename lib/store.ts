import { create } from "zustand"
import { authApi } from "./api"
import { User } from "./types"

interface AuthState {
  user: User | null
  isLoading: boolean
  fetchUser: (token: string) => Promise<void>
  setUser: (user: User | null) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  fetchUser: async (token: string) => {
    set({ isLoading: true })
    try {
      const res = await authApi.me(token)
      if (res.ok && res.user) {
        set({ user: res.user, isLoading: false })
      } else {
        set({ user: null, isLoading: false })
      }
    } catch (e) {
      set({ user: null, isLoading: false })
    }
  },
  setUser: (user) => set({ user }),
}))
