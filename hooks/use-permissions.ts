"use client"

import useSWR from "swr"
import { TokenManager } from "@/lib/token-manager"
import type { UserWithRoles } from "@/types/auth"

export function usePermissions() {
  const token = TokenManager.getToken()

  const { data: userPermissions, isLoading } = useSWR(token ? `/api/auth/verify-${token}` : null, async () => {
    if (!token) return null

    const response = await fetch("/api/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })

    if (!response.ok) {
      TokenManager.clearToken()
      return null
    }

    const data = await response.json()
    return data.user as UserWithRoles
  })

  const hasPermission = (permissionCode: string): boolean => {
    return userPermissions?.permisos.includes(permissionCode) ?? false
  }

  const hasRole = (roleName: string): boolean => {
    return userPermissions?.roles.includes(roleName) ?? false
  }

  const hasAnyPermission = (permissionCodes: string[]): boolean => {
    return permissionCodes.some((code) => hasPermission(code))
  }

  const hasAllPermissions = (permissionCodes: string[]): boolean => {
    return permissionCodes.every((code) => hasPermission(code))
  }

  return {
    user: userPermissions,
    permissions: userPermissions?.permisos || [], 
    isLoading,
    hasPermission,
    hasRole,
    hasAnyPermission,
    hasAllPermissions,
  }
}