"use client"

import { useSolicitudes } from "@/hooks/use-solicitudes"
import { Spinner } from "@/components/ui/spinner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Edit, Trash2, TrendingUp } from "lucide-react"
import { useState } from "react"

export function SolicitudesList() {
  const { solicitudes, isLoading, deleteSolicitud } = useSolicitudes()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleDelete = async () => {
    if (selectedId) {
      await deleteSolicitud(selectedId)
      setShowDeleteDialog(false)
      setSelectedId(null)
    }
  }

  const getRiskColor = (riesgo: string) => {
    switch (riesgo) {
      case "BAJO":
        return "bg-green-100 text-green-800"
      case "MEDIO":
        return "bg-yellow-100 text-yellow-800"
      case "ALTO":
        return "bg-orange-100 text-orange-800"
      case "CRITICO":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {solicitudes.map((sol) => (
          <Card key={sol.id} className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-blue-600">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-base">{sol.solicitante}</h3>
                <p className="text-sm text-muted-foreground capitalize">{sol.tipo.replace("_", " ")}</p>
              </div>
              <div className="flex gap-2">
                <Badge
                  className={`${sol.estado === "aprobada" ? "bg-green-100 text-green-800" : sol.estado === "rechazada" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}`}
                >
                  {sol.estado}
                </Badge>
              </div>
            </div>

            <p className="text-sm mb-4 line-clamp-2">{sol.descripcion}</p>

            {sol.resultado_ia && (
              <div className="bg-secondary/50 p-3 rounded-lg mb-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold">Análisis IA</span>
                  <Badge className={getRiskColor(sol.resultado_ia.riesgo)}>{sol.resultado_ia.riesgo}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="text-xs">Puntuación: {(sol.resultado_ia.puntuacion * 100).toFixed(0)}%</span>
                </div>
                <p className="text-xs text-muted-foreground italic">{sol.resultado_ia.recomendacion}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
              <div>
                <p className="text-muted-foreground">Prioridad</p>
                <p className="font-semibold capitalize">{sol.prioridad}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Zona</p>
                <p className="font-semibold">{sol.caracteristicas_ml.zona}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent"
                onClick={() => {
                  setSelectedId(sol.id)
                  setShowDeleteDialog(true)
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar Solicitud</AlertDialogTitle>
            <AlertDialogDescription>¿Estás seguro? Esta acción no se puede deshacer.</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Eliminar
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
