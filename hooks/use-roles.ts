"use client"

import { useState, useEffect } from "react"
import { useAuth } from "./use-auth"
import type { Role, CreateRoleDto, UpdateRoleDto } from "@/types"

export function useRoles() {
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  const fetchRoles = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch("/api/roles")
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.error || "Error al obtener roles")
      }
      
      const data = await response.json()
      setRoles(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
      console.error("[useRoles] Error fetching roles:", err)
    } finally {
      setLoading(false)
    }
  }

  const crearRole = async (datos: CreateRoleDto) => {
    try {
      const response = await fetch("/api/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.error || "Error al crear rol")
      }

      const nuevoRole = await response.json()
      setRoles(prev => [...prev, nuevoRole])
      return nuevoRole
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido"
      setError(errorMessage)
      console.error("[useRoles] Error creating role:", err)
      throw new Error(errorMessage)
    }
  }

  const actualizarRole = async (id: string, datos: UpdateRoleDto) => {
    try {
      const response = await fetch(`/api/roles/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.error || "Error al actualizar rol")
      }

      const roleActualizado = await response.json()
      setRoles(prev => prev.map((r) => (r.id === id ? roleActualizado : r)))
      return roleActualizado
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido"
      setError(errorMessage)
      console.error("[useRoles] Error updating role:", err)
      throw new Error(errorMessage)
    }
  }

  const eliminarRole = async (id: string) => {
    try {
      const response = await fetch(`/api/roles/${id}`, { 
        method: "DELETE" 
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.error || "Error al eliminar rol")
      }

      setRoles(prev => prev.filter((r) => r.id !== id))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido"
      setError(errorMessage)
      console.error("[useRoles] Error deleting role:", err)
      throw new Error(errorMessage)
    }
  }

  useEffect(() => {
    if (user) {
      fetchRoles()
    }
  }, [user])

  return { 
    roles, 
    loading, 
    error, 
    crearRole, 
    actualizarRole, 
    eliminarRole, 
    refetch: fetchRoles 
  }
}
