"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { TokenManager } from "@/lib/token-manager"
import type { UserWithRoles } from "@/types/auth"

interface AuthContextType {
  user: UserWithRoles | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  hasPermission: (permissionCode: string) => boolean
  hasRole: (roleName: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserWithRoles | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      const token = TokenManager.getToken()
      if (token) {
        try {
          const response = await fetch("/api/auth/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          })

          if (response.ok) {
            const data = await response.json()
            setUser(data.user)
          } else {
            TokenManager.clearToken()
          }
        } catch (error) {
          console.error("[v0] Error verifying token:", error)
          TokenManager.clearToken()
        }
      }
      setIsLoading(false)
    }

    loadUser()
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error("Invalid credentials")
      }

      const data = await response.json()
      TokenManager.setToken(data.token)
      setUser(data.user)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    const token = TokenManager.getToken()
    if (token) {
      try {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        })
      } catch (error) {
        console.error("[v0] Logout error:", error)
      }
    }
    TokenManager.clearToken()
    setUser(null)
  }, [])

  const hasPermission = useCallback(
    (permissionCode: string) => {
      return user?.permisos.includes(permissionCode) ?? false
    },
    [user],
  )

  const hasRole = useCallback(
    (roleName: string) => {
      return user?.roles.includes(roleName) ?? false
    },
    [user],
  )

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, hasPermission, hasRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider")
  }
  return context
}
