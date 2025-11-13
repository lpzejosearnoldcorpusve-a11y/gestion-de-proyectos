// Nuevo componente: Tab para gestionar permisos de construcción
"use client"

import { useState } from "react"
import { usePermisoConstruccion } from "@/hooks/use-permiso-construccion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface PermisosConstruccionTabProps {
  inmuebleId: string
}

export function PermisosConstruccionTab({ inmuebleId }: PermisosConstruccionTabProps) {
  const { data: permisos, isLoading, deletePermiso } = usePermisoConstruccion(inmuebleId)
  const [showForm, setShowForm] = useState(false)

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Eliminar este permiso?")) {
      await deletePermiso(id)
    }
  }

  if (isLoading) return <div className="animate-pulse">Cargando...</div>

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Permisos de Construcción</h3>
        <Button size="sm" onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Nuevo
        </Button>
      </div>

      {showForm && (
        <Card className="p-4 bg-blue-900/5 border-blue-900/20">
          <p className="text-sm text-muted-foreground">Formulario de nuevo permiso</p>
        </Card>
      )}

      {(permisos ?? []).length === 0 ? (
        <Card className="p-4 text-center text-muted-foreground">No hay permisos registrados</Card>
      ) : (
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-900/10">
                <TableHead>N° Permiso</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Emisión</TableHead>
                <TableHead>Vencimiento</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(permisos ?? []).map((permiso) => (
                <TableRow key={permiso.id} className="hover:bg-blue-900/5">
                  <TableCell className="font-medium">{permiso.nro}</TableCell>
                  <TableCell>{permiso.tipo}</TableCell>
                  <TableCell>{permiso.emision ? new Date(permiso.emision).toLocaleDateString() : "N/A"}</TableCell>
                  <TableCell>{permiso.vence ? new Date(permiso.vence).toLocaleDateString() : "N/A"}</TableCell>
                  <TableCell>
                    <span className="inline-block px-2 py-1 rounded text-xs bg-green-900/20">{permiso.estado}</span>
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button size="sm" variant="ghost">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-600" onClick={() => handleDelete(permiso.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  )
}
