"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import type { CreateVecinoColindanteDto } from "@/types/vecino-colindante"

interface VecinoColindanteFormProps {
  inmuebleId: string
  onSubmit: (dto: CreateVecinoColindanteDto) => Promise<void>
  isLoading?: boolean
}

export function VecinoColindanteForm({ inmuebleId, onSubmit, isLoading }: VecinoColindanteFormProps) {
  const [formData, setFormData] = useState({
    lado: "norte" as const,
    nombre: "",
    observ: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit({
      inmueble_id: inmuebleId,
      lado: formData.lado,
      nombre: formData.nombre || undefined,
      observ: formData.observ || undefined,
    })
    setFormData({ lado: "norte", nombre: "", observ: "" })
  }

  return (
    <Card className="bg-gradient-to-br from-slate-950 to-slate-900 border-blue-500/30">
      <CardHeader>
        <CardTitle className="text-blue-400">Vecino Colindante</CardTitle>
        <CardDescription className="text-slate-400">Información de propiedades adyacentes</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-200">Lado</label>
              <select
                name="lado"
                value={formData.lado}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded-md"
              >
                <option value="norte">Norte</option>
                <option value="sur">Sur</option>
                <option value="este">Este</option>
                <option value="oeste">Oeste</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-200">Nombre del Propietario</label>
              <Input
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Nombre completo"
                className="bg-slate-900 border-slate-700 text-white"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-200">Observaciones</label>
            <Textarea
              name="observ"
              value={formData.observ}
              onChange={handleChange}
              placeholder="Detalles sobre la propiedad colindante..."
              className="bg-slate-900 border-slate-700 text-white min-h-24"
            />
          </div>
          <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 w-full">
            {isLoading ? <Spinner className="mr-2 h-4 w-4" /> : null}
            Registrar Vecino
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
