"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
import { UserPlus, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface Role {
  id: string
  nombre: string
}

export function UserForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    rolId: "",
    estado: "activo" as "activo" | "inactivo"
  })
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingRoles, setLoadingRoles] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()

  // Cargar roles disponibles
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch("/api/roles")
        if (!response.ok) throw new Error("Error al cargar roles")
        const data = await response.json()
        setRoles(data)
      } catch (err) {
        setError("No se pudieron cargar los roles")
        console.error("Error fetching roles:", err)
      } finally {
        setLoadingRoles(false)
      }
    }

    fetchRoles()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    if (error) setError("")
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Validaciones
    if (!formData.nombre.trim() || !formData.email.trim() || !formData.password) {
      setError("Todos los campos son obligatorios")
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      setLoading(false)
      return
    }

    if (!formData.rolId) {
      setError("Debe seleccionar un rol")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formData.nombre.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          rolId: formData.rolId,
          estado: formData.estado
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al crear usuario")
      }

      console.log("[v0] Usuario creado exitosamente:", data)
      
      // Limpiar formulario
      setFormData({
        nombre: "",
        email: "",
        password: "",
        rolId: "",
        estado: "activo"
      })

      // Recargar la página para actualizar datos
      router.refresh()

      // Mostrar mensaje de éxito
      alert("Usuario creado exitosamente!")

    } catch (err) {
      console.error("[v0] Error creando usuario:", err)
      setError(err instanceof Error ? err.message : "Error al crear usuario")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="w-5 h-5" />
          Crear Nuevo Usuario
        </CardTitle>
        <CardDescription>Agrega un nuevo usuario al sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="nombre" className="text-blue-900">
              Nombre Completo
            </Label>
            <Input
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Juan Pérez"
              className="border-blue-200"
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-blue-900">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="juan@example.com"
              className="border-blue-200"
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-blue-900">
              Contraseña
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="border-blue-200"
              disabled={loading}
              required
              minLength={6}
            />
            <p className="text-xs text-gray-500">Mínimo 6 caracteres</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rolId" className="text-blue-900">
              Rol
            </Label>
            <Select 
              value={formData.rolId} 
              onValueChange={(value) => handleSelectChange("rolId", value)}
              disabled={loading || loadingRoles}
            >
              <SelectTrigger className="border-blue-200">
                <SelectValue placeholder={loadingRoles ? "Cargando roles..." : "Seleccionar rol"} />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="estado" className="text-blue-900">
              Estado
            </Label>
            <Select 
              value={formData.estado} 
              onValueChange={(value: "activo" | "inactivo") => handleSelectChange("estado", value)}
              disabled={loading}
            >
              <SelectTrigger className="border-blue-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="activo">Activo</SelectItem>
                <SelectItem value="inactivo">Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={loading || loadingRoles}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creando...
              </>
            ) : (
              "Crear Usuario"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}