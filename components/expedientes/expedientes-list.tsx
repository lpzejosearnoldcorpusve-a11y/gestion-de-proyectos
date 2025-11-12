"use client"

import { useExpedientes } from "@/hooks/use-expedientes"
import { ExpedienteCard } from "./expediente-card"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { useState } from "react"
import { ExpedienteForm } from "./expediente-form"

export function ExpedientesList() {
  const { expedientes, isLoading } = useExpedientes()
  const [showForm, setShowForm] = useState(false)

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="h-48 bg-muted animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Expedientes</h2>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="w-4 h-4" />
          Nuevo Expediente
        </Button>
      </div>

      {showForm && (
        <div className="animate-in fade-in slide-in-from-top-2">
          <ExpedienteForm onSuccess={() => setShowForm(false)} />
        </div>
      )}

      {expedientes.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No hay expedientes registrados</p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {expedientes.map((expediente) => (
            <div key={expediente.id} className="animate-in fade-in">
              <ExpedienteCard expediente={expediente} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
