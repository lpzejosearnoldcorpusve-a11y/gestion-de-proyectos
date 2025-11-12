"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { ShieldPlus } from "lucide-react"
import { useRouter } from "next/navigation"

export function RoleForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validación básica
    if (!formData.nombre.trim()) {
      setError("El nombre del rol es obligatorio")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/roles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al crear el rol")
      }

      console.log("[v0] Rol creado exitosamente:", data)
      
      // Limpiar formulario
      setFormData({
        nombre: "",
        descripcion: "",
      })

      // Recargar la página o redirigir si es necesario
      router.refresh()

      // Opcional: Mostrar mensaje de éxito
      alert("Rol creado exitosamente!")

    } catch (err) {
      console.error("[v0] Error creando rol:", err)
      setError(err instanceof Error ? err.message : "Error al crear el rol")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldPlus className="w-5 h-5" />
          Crear Nuevo Rol
        </CardTitle>
        <CardDescription>Define un nuevo rol con sus permisos</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">Nombre del Rol</label>
            <Input
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Revisor de Documentos"
              className="border-blue-200"
              disabled={loading}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Descripción del rol y sus responsabilidades"
              className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              rows={3}
              disabled={loading}
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Creando..." : "Crear Rol"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}