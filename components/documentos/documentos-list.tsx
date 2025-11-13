"use client"

import { useDocumentos } from "@/hooks/use-documentos"
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
import { Edit, Trash2, FileText, Eye } from "lucide-react"
import { useState } from "react"

export function DocumentosList() {
  const { documentos, isLoading, deleteDocumento } = useDocumentos()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleDelete = async () => {
    if (selectedId) {
      await deleteDocumento(selectedId)
      setShowDeleteDialog(false)
      setSelectedId(null)
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documentos.map((doc) => (
          <Card key={doc.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-sm truncate">{doc.nombre}</h3>
                  <p className="text-xs text-muted-foreground">{doc.tipo}</p>
                </div>
              </div>
              <Badge
                className={`${
                  doc.estado === "validado"
                    ? "bg-green-100 text-green-800"
                    : doc.estado === "rechazado"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {doc.estado}
              </Badge>
            </div>

            <div className="space-y-2 mb-4 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-muted-foreground">Pisos Exceso</p>
                  <p className="font-semibold">{doc.caracteristicas_ml.pisos_exceso}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Altura Exceso</p>
                  <p className="font-semibold">{doc.caracteristicas_ml.altura_exceso_m}m</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Área Afectada</p>
                  <p className="font-semibold">{doc.caracteristicas_ml.area_afectada_m2}m²</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Zona</p>
                  <p className="font-semibold">{doc.caracteristicas_ml.zona}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                <Eye className="w-4 h-4" />
                Ver
              </Button>
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent"
                onClick={() => {
                  setSelectedId(doc.id)
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
            <AlertDialogTitle>Eliminar Documento</AlertDialogTitle>
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
