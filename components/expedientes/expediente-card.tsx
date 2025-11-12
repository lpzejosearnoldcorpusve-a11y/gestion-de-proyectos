"use client"

import type { Expediente } from "@/types/expedientes"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Clock } from "lucide-react"

interface ExpedienteCardProps {
  expediente: Expediente
}

export function ExpedienteCard({ expediente }: ExpedienteCardProps) {
  const estadoColor = {
    en_tramite: "bg-yellow-100 text-yellow-800",
    aprobado: "bg-green-100 text-green-800",
    rechazado: "bg-red-100 text-red-800",
  }

  const prioridadColor = {
    baja: "secondary",
    normal: "default",
    alta: "destructive",
    urgente: "destructive",
  } as const

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg group-hover:text-blue-600 transition-colors flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Exp. {expediente.id.slice(0, 8)}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <Badge className={estadoColor[expediente.estado as keyof typeof estadoColor]}>{expediente.estado}</Badge>
          <Badge variant={prioridadColor[expediente.prioridad as keyof typeof prioridadColor]}>
            {expediente.prioridad}
          </Badge>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{new Date(expediente.created_at).toLocaleDateString("es-ES")}</span>
        </div>
      </CardContent>
    </Card>
  )
}
