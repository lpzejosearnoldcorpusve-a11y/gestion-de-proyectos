"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lock, Edit2, Trash2, Plus } from "lucide-react"

interface Permission {
  id: string
  codigo: string
  descripcion: string
  rolesCount: number
}

const MOCK_PERMISSIONS: Permission[] = [
  {
    id: "1",
    codigo: "CREAR_SOLICITUD",
    descripcion: "Crear nuevas solicitudes de permisos",
    rolesCount: 3,
  },
  {
    id: "2",
    codigo: "REVISAR_SOLICITUD",
    descripcion: "Revisar y aprobar solicitudes",
    rolesCount: 2,
  },
  {
    id: "3",
    codigo: "ELIMINAR_USUARIO",
    descripcion: "Eliminar usuarios del sistema",
    rolesCount: 1,
  },
]

export function PermissionsList() {
  const [permissions, setPermissions] = useState<Permission[]>(MOCK_PERMISSIONS)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Gestión de Permisos
          </CardTitle>
          <CardDescription>Controla los permisos disponibles en el sistema</CardDescription>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Permiso
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {permissions.map((permission) => (
            <div
              key={permission.id}
              className="flex items-center justify-between p-3 border border-blue-200 rounded-lg hover:bg-blue-50"
            >
              <div className="flex-1">
                <h4 className="font-semibold text-blue-900">{permission.codigo}</h4>
                <p className="text-sm text-gray-600">{permission.descripcion}</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline">{permission.rolesCount} roles</Badge>
                <Button variant="ghost" size="sm">
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-red-600">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
