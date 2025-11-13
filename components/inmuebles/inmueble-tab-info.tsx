// Nuevo componente: Tab de información general del inmueble
"use client"

import type { Inmueble } from "@/types/inmuebles"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Code } from "lucide-react"

interface InmuebleTabInfoProps {
  inmueble: Inmueble
}

export function InmuebleTabInfo({ inmueble }: InmuebleTabInfoProps) {
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Información General</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Código Catastral</p>
              <p className="font-semibold flex items-center gap-2">
                <Code className="w-4 h-4" />
                {inmueble.cod_catastral}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Estado</p>
              <Badge variant={inmueble.estado === "activo" ? "default" : "secondary"}>{inmueble.estado}</Badge>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-muted-foreground">Dirección</p>
              <p className="font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                {inmueble.direccion}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Distrito</p>
              <p className="font-semibold">{inmueble.distrito}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Zona</p>
              <p className="font-semibold">{inmueble.zona || "N/A"}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-muted-foreground">Creado</p>
              <p className="font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(inmueble.creado_en).toLocaleDateString("es-ES", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
