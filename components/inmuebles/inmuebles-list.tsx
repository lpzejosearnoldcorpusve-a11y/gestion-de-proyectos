"use client"

import { useInmuebles } from "@/hooks/use-inmuebles"
import { InmuebleCard } from "./inmueble-card"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { useState } from "react"
import { InmuebleForm } from "./inmueble-form"

export function InmueblesList() {
  const { inmuebles, isLoading } = useInmuebles()
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
        <h2 className="text-2xl font-bold">Inmuebles</h2>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="w-4 h-4" />
          Nuevo Inmueble
        </Button>
      </div>

      {showForm && (
        <div className="animate-in fade-in slide-in-from-top-2">
          <InmuebleForm onSuccess={() => setShowForm(false)} />
        </div>
      )}

      {inmuebles.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No hay inmuebles registrados</p>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {inmuebles.map((inmueble) => (
            <div key={inmueble.id} className="animate-in fade-in">
              <InmuebleCard inmueble={inmueble} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
