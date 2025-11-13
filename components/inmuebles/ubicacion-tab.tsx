// Nuevo componente: Tab para gestionar ubicación de referencia
"use client"

import { useState } from "react"
import { useUbicacionReferencia } from "@/hooks/use-ubicacion-referencia"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface UbicacionTabProps {
  inmuebleId: string
}

export function UbicacionTab({ inmuebleId }: UbicacionTabProps) {
  const { ubicaciones, isLoading, deleteUbicacion } = useUbicacionReferencia(inmuebleId)
  const [showForm, setShowForm] = useState(false)

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Eliminar esta ubicación?")) {
      await deleteUbicacion(id)
    }
  }

  if (isLoading) return <div className="animate-pulse">Cargando...</div>

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Ubicación de Referencia</h3>
        <Button size="sm" onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Nuevo
        </Button>
      </div>

      {showForm && (
        <Card className="p-4 bg-blue-900/5 border-blue-900/20">
          <p className="text-sm text-muted-foreground">Formulario de nueva ubicación</p>
        </Card>
      )}

      {ubicaciones.length === 0 ? (
        <Card className="p-4 text-center text-muted-foreground">No hay ubicaciones registradas</Card>
      ) : (
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-900/10">
                <TableHead>Latitud</TableHead>
                <TableHead>Longitud</TableHead>
                <TableHead>Fuente</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ubicaciones.map((ubicacion) => (
                <TableRow key={ubicacion.id} className="hover:bg-blue-900/5">
                  <TableCell className="font-mono text-sm">{ubicacion.lat}</TableCell>
                  <TableCell className="font-mono text-sm">{ubicacion.lon}</TableCell>
                  <TableCell>{ubicacion.fuente}</TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button size="sm" variant="ghost">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-600"
                      onClick={() => handleDelete(ubicacion.id)}
                    >
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
