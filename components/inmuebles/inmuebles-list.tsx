"use client"

import { useInmuebles } from "@/hooks/use-inmuebles"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Edit2, Trash2, Eye } from "lucide-react"
import { useState } from "react"
import type { Inmueble } from "@/types/inmuebles"
import { InmuebleForm } from "./inmueble-form"
import { InmuebleDetailModal } from "./inmueble-detail-modal"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function InmueblesList() {
  const { inmuebles, isLoading, deleteInmueble } = useInmuebles()
  const [showForm, setShowForm] = useState(false)
  const [selectedInmueble, setSelectedInmueble] = useState<Inmueble | null>(null)
  const [, setEditingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este inmueble?")) {
      await deleteInmueble(id)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="h-16 bg-muted animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Inmuebles</h2>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="w-4 h-4" />
          Nuevo Inmueble
        </Button>
      </div>

      {showForm && (
        <div className="animate-in fade-in slide-in-from-top-2">
          <InmuebleForm onSuccess={() => setShowForm(false)} />
        </div>
      )}

      {inmuebles.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No hay inmuebles registrados</p>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-900/10">
                <TableHead className="font-semibold">Código Catastral</TableHead>
                <TableHead className="font-semibold">Dirección</TableHead>
                <TableHead className="font-semibold">Distrito</TableHead>
                <TableHead className="font-semibold">Estado</TableHead>
                <TableHead className="font-semibold text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inmuebles.map((inmueble) => (
                <TableRow key={inmueble.id} className="hover:bg-blue-900/5 transition-colors animate-in fade-in">
                  <TableCell className="font-medium">{inmueble.cod_catastral}</TableCell>
                  <TableCell>{inmueble.direccion}</TableCell>
                  <TableCell>{inmueble.distrito}</TableCell>
                  <TableCell>
                    <span className="inline-block px-2 py-1 rounded-full text-xs bg-green-900/20 text-green-700">
                      {inmueble.estado}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="ghost" onClick={() => setSelectedInmueble(inmueble)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => { setEditingId(inmueble.id); setShowForm(true); }}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDelete(inmueble.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {selectedInmueble && (
        <InmuebleDetailModal inmueble={selectedInmueble} onClose={() => setSelectedInmueble(null)} />
      )}
    </div>
  )
}
