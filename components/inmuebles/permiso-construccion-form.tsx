"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import type { CreatePermisoConstruccionDto } from "@/types/permiso-construccion"

interface PermisoConstruccionFormProps {
  expedienteId: string
  onSubmit: (dto: CreatePermisoConstruccionDto) => Promise<void>
  isLoading?: boolean
}

export function PermisoConstruccionForm({ expedienteId, onSubmit, isLoading }: PermisoConstruccionFormProps) {
  const [formData, setFormData] = useState({
    nro: "",
    tipo: "",
    emision: "",
    vence: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit({
      expediente_id: expedienteId,
      nro: formData.nro,
      tipo: formData.tipo || undefined,
      emision: formData.emision ? new Date(formData.emision) : undefined,
      vence: formData.vence ? new Date(formData.vence) : undefined,
    })
    setFormData({ nro: "", tipo: "", emision: "", vence: "" })
  }

  return (
    <Card className="bg-linear-to-br from-slate-950 to-slate-900 border-blue-500/30">
      <CardHeader>
        <CardTitle className="text-blue-400">Permiso de Construcción</CardTitle>
        <CardDescription className="text-slate-400">Datos del permiso de construcción</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-200">Número de Permiso</label>
              <Input
                name="nro"
                value={formData.nro}
                onChange={handleChange}
                placeholder="PC-2024-001"
                required
                className="bg-slate-900 border-slate-700 text-white"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-200">Tipo</label>
              <Input
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                placeholder="Construcción nueva"
                className="bg-slate-900 border-slate-700 text-white"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-200">Fecha de Emisión</label>
              <Input
                name="emision"
                type="date"
                value={formData.emision}
                onChange={handleChange}
                className="bg-slate-900 border-slate-700 text-white"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-200">Fecha de Vencimiento</label>
              <Input
                name="vence"
                type="date"
                value={formData.vence}
                onChange={handleChange}
                className="bg-slate-900 border-slate-700 text-white"
              />
            </div>
          </div>
          <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 w-full">
            {isLoading ? <Spinner className="mr-2 h-4 w-4" /> : null}
            Crear Permiso
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
