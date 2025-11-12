"use client"

import type { Expediente } from "@/types/expedientes"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, MapPin } from "lucide-react"

interface ExpedienteDetailProps {
  expediente: Expediente
}

export function ExpedienteDetail({ expediente }: ExpedienteDetailProps) {
  const inmueble = (expediente as any).inmueble;
  return (
    <div className="space-y-4 animate-in fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Detalles del Expediente
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Estado</p>
              <Badge className="mt-2 capitalize">{expediente.estado}</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Prioridad</p>
              <Badge variant="outline" className="mt-2 capitalize">
                {expediente.prioridad}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Canal</p>
              <p className="mt-2 capitalize">{expediente.canal}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Creado</p>
              <p className="mt-2">{new Date(expediente.created_at).toLocaleDateString("es-ES")}</p>
            </div>
          </div>
          {inmueble && (
            <Card className="p-4 bg-secondary/50">
              <h4 className="flex items-center gap-2 font-semibold mb-2">
                <MapPin className="w-4 h-4" />
                Inmueble Asociado
              </h4>
              <p className="text-sm">{inmueble.direccion}</p>
              <p className="text-xs text-muted-foreground">{inmueble.cod_catastral}</p>
            </Card>
          )}

          <div className="flex gap-2">
            <Button size="sm">Descargar Documentos</Button>
            <Button variant="outline" size="sm">
              Ver Historial
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
