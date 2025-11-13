// Nuevo componente: Tab para gestionar vecinos colindantes
"use client"

import { useState } from "react"
import { useVecinoColindante } from "@/hooks/use-vecino-colindante"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit2, Trash2, User } from "lucide-react"

interface VecinosTabProps {
  inmuebleId: string
}

export function VecinosTab({ inmuebleId }: VecinosTabProps) {
  const { vecinos, isLoading, deleteVecino } = useVecinoColindante(inmuebleId)
  const [showForm, setShowForm] = useState(false)

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Eliminar este vecino?")) {
      await deleteVecino(id)
    }
  }

  if (isLoading) return <div className="animate-pulse">Cargando...</div>

  const lados: Record<"N" | "S" | "E" | "O" | "NE" | "NO" | "SE" | "SO", string> = {
    N: "Norte",
    S: "Sur",
    E: "Este",
    O: "Oeste",
    NE: "Noreste",
    NO: "Noroeste",
    SE: "Sureste",
    SO: "Suroeste",
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Vecinos Colindantes</h3>
        <Button size="sm" onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Nuevo
        </Button>
      </div>

      {showForm && (
        <Card className="p-4 bg-blue-900/5 border-blue-900/20">
          <p className="text-sm text-muted-foreground">Formulario de nuevo vecino</p>
        </Card>
      )}

      {vecinos.length === 0 ? (
        <Card className="p-4 text-center text-muted-foreground">No hay vecinos registrados</Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {vecinos.map((vecino) => (
            <Card key={vecino.id} className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-blue-600" />
                    <p className="font-semibold">{vecino.nombre}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    <span className="font-medium">Lado:</span> {lados[vecino.lado.toUpperCase() as keyof typeof lados] || vecino.lado}
                  </p>
                  {vecino.observ && <p className="text-sm bg-blue-900/5 p-2 rounded">{vecino.observ}</p>}
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-red-600" onClick={() => handleDelete(vecino.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
