"use client"

import type React from "react"

import { useState } from "react"
import { useExpedientes } from "@/hooks/use-expedientes"
import { useInmuebles } from "@/hooks/use-inmuebles"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ExpedienteFormProps {
  onSuccess?: () => void
}

export function ExpedienteForm({ onSuccess }: ExpedienteFormProps) {
  const { createExpediente } = useExpedientes()
  const { inmuebles } = useInmuebles()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  type Prioridad = "baja" | "normal" | "alta" | "urgente"
  type Canal = "web" | "ventanilla" | "email"
  const [formData, setFormData] = useState<{ inmueble_id: string; prioridad: Prioridad; canal: Canal }>({
    inmueble_id: "",
    prioridad: "normal",
    canal: "web",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsLoading(true)

    try {
      await createExpediente({
        inmueble_id: formData.inmueble_id,
        solicitante_id: user.id,
        prioridad: formData.prioridad as any,
        canal: formData.canal,
      })
      setFormData({
        inmueble_id: "",
        prioridad: "normal",
        canal: "web",
      })
      onSuccess?.()
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-6 animate-in fade-in">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="inmueble">Inmueble</Label>
          <Select
            value={formData.inmueble_id}
            onValueChange={(value) => setFormData({ ...formData, inmueble_id: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar inmueble" />
            </SelectTrigger>
            <SelectContent>
              {inmuebles.map((inmueble) => (
                <SelectItem key={inmueble.id} value={inmueble.id}>
                  {inmueble.cod_catastral} - {inmueble.direccion}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="prioridad">Prioridad</Label>
            <Select
              value={formData.prioridad}
              onValueChange={(value) => setFormData({ ...formData, prioridad: value as Prioridad })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="baja">Baja</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="alta">Alta</SelectItem>
                <SelectItem value="urgente">Urgente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="canal">Canal</Label>
            <Select value={formData.canal} onValueChange={(value) => setFormData({ ...formData, canal: value as Canal })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web">Web</SelectItem>
                <SelectItem value="ventanilla">Ventanilla</SelectItem>
                <SelectItem value="email">Email</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={isLoading || !formData.inmueble_id}>
            {isLoading ? "Guardando..." : "Crear Expediente"}
          </Button>
        </div>
      </form>
    </Card>
  )
}
