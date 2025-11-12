"use client"

import { useState, useEffect } from "react"
import { useAuth } from "./use-auth"
import type { Usuario, CreateUsuarioDto, UpdateUsuarioDto } from "@/types"

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  const fetchUsuarios = async () => {
    try {
      setLoading(true)
      setError(null) // ⬅️ Limpiar error antes de la petición
      const response = await fetch("/api/usuarios")
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.error || "Error al obtener usuarios")
      }
      
      const data = await response.json()
      setUsuarios(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido"
      setError(errorMessage)
      console.error("[useUsuarios] Error fetching usuarios:", err)
    } finally {
      setLoading(false)
    }
  }

  const crearUsuario = async (datos: CreateUsuarioDto) => {
    try {
      const response = await fetch("/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.error || "Error al crear usuario")
      }

      const nuevoUsuario = await response.json()
      setUsuarios(prev => [...prev, nuevoUsuario]) // ⬅️ Usar función de actualización
      return nuevoUsuario
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido"
      setError(errorMessage)
      console.error("[useUsuarios] Error creating user:", err)
      throw new Error(errorMessage) // ⬅️ Siempre lanzar Error
    }
  }

  const actualizarUsuario = async (id: string, datos: UpdateUsuarioDto) => {
    try {
      const response = await fetch(`/api/usuarios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.error || "Error al actualizar usuario")
      }

      const usuarioActualizado = await response.json()
      setUsuarios(prev => prev.map((u) => (u.id === id ? usuarioActualizado : u)))
      return usuarioActualizado
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido"
      setError(errorMessage)
      console.error("[useUsuarios] Error updating user:", err)
      throw new Error(errorMessage)
    }
  }

  const eliminarUsuario = async (id: string) => {
    try {
      const response = await fetch(`/api/usuarios/${id}`, { 
        method: "DELETE" 
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.error || "Error al eliminar usuario")
      }

      setUsuarios(prev => prev.filter((u) => u.id !== id))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido"
      setError(errorMessage)
      console.error("[useUsuarios] Error deleting user:", err)
      throw new Error(errorMessage)
    }
  }

  useEffect(() => {
    if (user) {
      fetchUsuarios()
    }
  }, [user])

  return { 
    usuarios, 
    loading, 
    error, 
    crearUsuario, 
    actualizarUsuario, 
    eliminarUsuario, 
    refetch: fetchUsuarios 
  }
}