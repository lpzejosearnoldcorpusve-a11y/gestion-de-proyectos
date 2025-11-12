"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock } from "lucide-react"

interface InmuebleHistorialProps {
  inmuebleId: string
}

export function InmuebleHistorial({ inmuebleId }: InmuebleHistorialProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Historial
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <div className="w-0.5 h-12 bg-slate-200 mt-2" />
            </div>
            <div>
              <p className="font-semibold">Inmueble Registrado</p>
              <p className="text-sm text-muted-foreground">Sistema</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
