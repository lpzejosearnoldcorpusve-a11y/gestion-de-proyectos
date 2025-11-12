"use client"

import { InmuebleMap } from "./inmueble-map"
import { InmuebleHistorial } from "./inmueble-historial"
import type { Inmueble } from "@/types/inmuebles"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface InmuebleDetailsProps {
  inmueble: Inmueble
}

export function InmuebleDetails({ inmueble }: InmuebleDetailsProps) {
  return (
    <div className="space-y-6 animate-in fade-in">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>{inmueble.cod_catastral}</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">{inmueble.direccion}</p>
            </div>
            <Badge>{inmueble.estado}</Badge>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Distrito</p>
            <p className="font-semibold">{inmueble.distrito}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Zona</p>
            <p className="font-semibold">{inmueble.zona || "N/A"}</p>
          </div>
        </CardContent>
      </Card>

      <InmuebleMap lat={-12.0464} direccion={inmueble.direccion} editable={false} />

      <InmuebleHistorial inmuebleId={inmueble.id} />
    </div>
  )
}
