"use client"

import type { Inmueble } from "@/types/inmuebles"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, FileText } from "lucide-react"

interface InmuebleCardProps {
  inmueble: Inmueble
}

export function InmuebleCard({ inmueble }: InmuebleCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
            {inmueble.cod_catastral}
          </CardTitle>
          <Badge variant={inmueble.estado === "activo" ? "default" : "secondary"}>{inmueble.estado}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 mt-1 text-blue-600" />
          <div>
            <p className="font-medium text-sm">{inmueble.direccion}</p>
            <p className="text-xs text-muted-foreground">
              {inmueble.distrito} {inmueble.zona && `- ${inmueble.zona}`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <FileText className="w-4 h-4" />
          <span>Creado: {new Date(inmueble.creado_en).toLocaleDateString("es-ES")}</span>
        </div>
      </CardContent>
    </Card>
  )
}
