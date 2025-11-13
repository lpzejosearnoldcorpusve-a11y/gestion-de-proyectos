"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import type { ProyectoParam, CreateProyectoParamDto } from "@/types/proyecto-param"

interface ProyectoParamFormProps {
  expedienteId: string
  data?: ProyectoParam
  onSubmit: (dto: CreateProyectoParamDto) => Promise<void>
  isLoading?: boolean
}

export function ProyectoParamForm({ expedienteId, data, onSubmit, isLoading }: ProyectoParamFormProps) {
  const [formData, setFormData] = useState({
    uso_suelo_decl: data?.uso_suelo_decl || "",
    pisos_prop: data?.pisos_prop || "",
    altura_m_prop: data?.altura_m_prop || "",
    area_construida: data?.area_construida || "",
    estacionamientos_prop: data?.estacionamientos_prop || "",
    densidad_prop: data?.densidad_prop || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit({
      expediente_id: expedienteId,
      uso_suelo_decl: formData.uso_suelo_decl || undefined,
      pisos_prop: formData.pisos_prop || undefined,
      altura_m_prop: formData.altura_m_prop ? Number.parseFloat(formData.altura_m_prop as string) : undefined,
      area_construida: formData.area_construida ? Number.parseFloat(formData.area_construida as string) : undefined,
      estacionamientos_prop: formData.estacionamientos_prop || undefined,
      densidad_prop: formData.densidad_prop || undefined,
    })
  }

  return (
    <Card className="bg-linear-to-br from-slate-950 to-slate-900 border-blue-500/30">
      <CardHeader>
        <CardTitle className="text-blue-400">Parámetros del Proyecto</CardTitle>
        <CardDescription className="text-slate-400">Especificaciones técnicas del proyecto</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-200">Uso de Suelo</label>
              <Input
                name="uso_suelo_decl"
                value={formData.uso_suelo_decl}
                onChange={handleChange}
                placeholder="Residencial, comercial, industrial..."
                className="bg-slate-900 border-slate-700 text-white"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-200">Pisos Propuestos</label>
              <Input
                name="pisos_prop"
                value={formData.pisos_prop}
                onChange={handleChange}
                placeholder="Ej: 5"
                className="bg-slate-900 border-slate-700 text-white"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-200">Altura (m)</label>
              <Input
                name="altura_m_prop"
                type="number"
                value={formData.altura_m_prop}
                onChange={handleChange}
                placeholder="25.5"
                className="bg-slate-900 border-slate-700 text-white"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-200">Área Construida (m²)</label>
              <Input
                name="area_construida"
                type="number"
                value={formData.area_construida}
                onChange={handleChange}
                placeholder="5000"
                className="bg-slate-900 border-slate-700 text-white"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-200">Estacionamientos</label>
              <Input
                name="estacionamientos_prop"
                value={formData.estacionamientos_prop}
                onChange={handleChange}
                placeholder="50"
                className="bg-slate-900 border-slate-700 text-white"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-200">Densidad Poblacional</label>
              <Input
                name="densidad_prop"
                value={formData.densidad_prop}
                onChange={handleChange}
                placeholder="Media"
                className="bg-slate-900 border-slate-700 text-white"
              />
            </div>
          </div>
          <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 w-full">
            {isLoading ? <Spinner className="mr-2 h-4 w-4" /> : null}
            Guardar Parámetros
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
