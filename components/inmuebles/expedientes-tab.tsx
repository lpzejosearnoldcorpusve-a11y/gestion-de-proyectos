// Nuevo componente: Tab para visualizar expedientes asociados
"use client"

import { useExpedientesDelInmueble } from "@/hooks/use-expedientes"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ExpedientesTabProps {
  inmuebleId: string
}

export function ExpedientesTab({ inmuebleId }: ExpedientesTabProps) {
  const { expedientes, isLoading } = useExpedientesDelInmueble(inmuebleId)

  if (isLoading) return <div className="animate-pulse">Cargando...</div>

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Expedientes Asociados</h3>

      {expedientes.length === 0 ? (
        <Card className="p-4 text-center text-muted-foreground">No hay expedientes asociados a este inmueble</Card>
      ) : (
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-900/10">
                <TableHead>ID Expediente</TableHead>
                <TableHead>Solicitante</TableHead>
                <TableHead>Canal</TableHead>
                <TableHead>Prioridad</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Creado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expedientes.map((exp) => (
                <TableRow key={exp.id} className="hover:bg-blue-900/5">
                  <TableCell className="font-medium">{exp.id}</TableCell>
                  <TableCell>{exp.solicitante_id}</TableCell>
                  <TableCell>{exp.canal}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        exp.prioridad === "urgente" ? "destructive" : exp.prioridad === "normal" ? "default" : "secondary"
                      }
                    >
                      {exp.prioridad}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="inline-block px-2 py-1 rounded text-xs bg-blue-900/20">{exp.estado}</span>
                  </TableCell>
                  <TableCell className="text-sm">{new Date(exp.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  )
}
