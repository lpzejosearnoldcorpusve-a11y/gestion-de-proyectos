"use client"

import { useState } from "react"
import { useRoles } from "@/hooks/use-roles"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Shield, Edit2, Trash2, Plus, RefreshCw } from "lucide-react"

interface RolesListProps {
  onNewRole?: () => void
  onEditRole?: (role: any) => void
}

export function RolesList({ onNewRole, onEditRole }: RolesListProps) {
  const { roles, loading, error, eliminarRole, refetch } = useRoles()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este rol? Esta acción no se puede deshacer.")) {
      return
    }

    setDeletingId(id)
    try {
      await eliminarRole(id)
      // El hook ya actualiza la lista automáticamente
    } catch (err) {
      console.error("Error eliminando rol:", err)
      alert("No se pudo eliminar el rol. Inténtalo de nuevo.")
    } finally {
      setDeletingId(null)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      await refetch()
    } finally {
      setRefreshing(false)
    }
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <p className="text-red-600">Error: {error}</p>
            <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
              Reintentar
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="animate-in fade-in duration-500">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Gestión de Roles
          </CardTitle>
          <CardDescription>Total: {roles.length} roles</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={refreshing || loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
            Actualizar
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={onNewRole}>
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Rol
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        ) : roles.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No hay roles creados. Crea el primero.
          </div>
        ) : (
          <div className="grid gap-4 animate-in fade-in-50 duration-500">
            {roles.map((role) => (
              <div
                key={role.id}
                className="flex items-center justify-between p-4 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900">{role.nombre}</h3>
                  <p className="text-sm text-gray-600 mt-1">{role.descripcion}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">
                      ID: {role.id}
                    </Badge>
                    <Badge variant="outline">
                      Creado: {new Date(role.creado_en).toLocaleDateString()}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onEditRole?.(role)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    disabled={deletingId === role.id}
                    onClick={() => handleDelete(role.id)}
                  >
                    {deletingId === role.id ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}