"use client"

import { useState } from "react"
import { useUsuarios } from "@/hooks/use-usuarios"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { 
  Users, Edit2, Trash2, Plus, Search, RefreshCw, 
  Filter, Mail, User, Shield 
} from "lucide-react"
import type { Usuario } from "@/types"

interface UsersListProps {
  onNewUser?: () => void
  onEditUser?: (user: Usuario) => void
}

export function UsersList({ onNewUser, onEditUser }: UsersListProps) {
  const { usuarios, loading, error, eliminarUsuario, refetch } = useUsuarios()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterEstado, setFilterEstado] = useState<string>("todos")

  const getEstadoBadge = (estado: string) => {
    return estado === "activo" ? (
      <Badge className="bg-emerald-600 hover:bg-emerald-700">Activo</Badge>
    ) : (
      <Badge variant="secondary" className="bg-gray-200 text-gray-700">Inactivo</Badge>
    )
  }

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este usuario? Esta acción no se puede deshacer.")) {
      return
    }

    setDeletingId(id)
    try {
      await eliminarUsuario(id)
      // El hook ya actualiza la lista automáticamente
    } catch (err) {
      console.error("Error eliminando usuario:", err)
      alert("No se pudo eliminar el usuario. Inténtalo de nuevo.")
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

  // Filtrar usuarios basado en búsqueda y filtros
  const filteredUsuarios = usuarios.filter((user: Usuario) => {
    const matchesSearch = user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.rol.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesEstado = filterEstado === "todos" || user.estado === filterEstado
    
    return matchesSearch && matchesEstado
  })

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 font-medium">Error al cargar usuarios</p>
              <p className="text-red-500 text-sm mt-1">{error}</p>
            </div>
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
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Gestión de Usuarios
          </CardTitle>
          <CardDescription>
            Total: {filteredUsuarios.length} de {usuarios.length} usuarios
          </CardDescription>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={onNewUser}
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Usuario
        </Button>
      </CardHeader>

      {/* Filtros y Búsqueda */}
      <div className="px-6 pb-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar por nombre, email o rol..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-blue-200"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value)}
              className="px-3 py-2 border border-blue-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="todos">Todos los estados</option>
              <option value="activo">Activos</option>
              <option value="inactivo">Inactivos</option>
            </select>
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={refreshing || loading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
              Actualizar
            </Button>
          </div>
        </div>
      </div>

      <CardContent className="pt-0">
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : filteredUsuarios.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">
              {usuarios.length === 0 ? "No hay usuarios creados" : "No se encontraron usuarios"}
            </p>
            <p className="text-sm mb-4">
              {usuarios.length === 0 
                ? "Comienza creando el primer usuario del sistema." 
                : "Intenta ajustar los filtros de búsqueda."
              }
            </p>
            {usuarios.length === 0 && onNewUser && (
              <Button onClick={onNewUser} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Crear Primer Usuario
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto border border-blue-200 rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-blue-50 border-b border-blue-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-blue-900">Usuario</th>
                  <th className="text-left py-3 px-4 font-semibold text-blue-900">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-blue-900">Rol</th>
                  <th className="text-left py-3 px-4 font-semibold text-blue-900">Estado</th>
                  <th className="text-left py-3 px-4 font-semibold text-blue-900">Creado</th>
                  <th className="text-left py-3 px-4 font-semibold text-blue-900">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsuarios.map((user: Usuario) => (
                  <tr 
                    key={user.id} 
                    className="border-b border-blue-100 hover:bg-blue-50 transition-colors last:border-b-0"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-blue-900">{user.nombre}</p>
                          <p className="text-xs text-gray-500">ID: {user.id.slice(0, 8)}...</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        {user.email}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-gray-400" />
                        <Badge variant="outline" className="text-xs">
                          {user.rol}
                        </Badge>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {getEstadoBadge(user.estado)}
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-xs">
                      {new Date(user.creado_en).toLocaleDateString('es-ES')}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => onEditUser?.(user)}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-100"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          disabled={deletingId === user.id}
                          onClick={() => handleDelete(user.id)}
                        >
                          {deletingId === user.id ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}