"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import type { CreateAsBuiltDto } from "@/types/as-built"

interface AsBuiltFormProps {
  expedienteId: string
  onSubmit: (dto: CreateAsBuiltDto) => Promise<void>
  isLoading?: boolean
}

export function AsBuiltForm({ expedienteId, onSubmit, isLoading }: AsBuiltFormProps) {
  const [formData, setFormData] = useState({
    version: "",
    observaciones: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit({
      expediente_id: expedienteId,
      version: formData.version,
      observaciones: formData.observaciones || undefined,
    })
    setFormData({ version: "", observaciones: "" })
  }

  return (
    <Card className="bg-linear-to-br from-slate-950 to-slate-900 border-blue-500/30">
      <CardHeader>
        <CardTitle className="text-blue-400">As Built / Construcción Ejecutada</CardTitle>
        <CardDescription className="text-slate-400">Registrar estado actual de la construcción</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-200">Versión</label>
            <Input
              name="version"
              value={formData.version}
              onChange={handleChange}
              placeholder="v1.0, v1.1, etc"
              required
              className="bg-slate-900 border-slate-700 text-white"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-200">Observaciones</label>
            <Textarea
              name="observaciones"
              value={formData.observaciones}
              onChange={handleChange}
              placeholder="Detalles sobre el estado de construcción..."
              className="bg-slate-900 border-slate-700 text-white min-h-32"
            />
          </div>
          <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 w-full">
            {isLoading ? <Spinner className="mr-2 h-4 w-4" /> : null}
            Registrar As Built
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
