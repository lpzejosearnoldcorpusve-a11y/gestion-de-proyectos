"use client"

import type React from "react"
import { useState } from "react"
import { useInmuebles } from "@/hooks/use-inmuebles"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { InmuebleMap } from "./inmueble-map"

interface InmuebleFormProps {
  onSuccess?: () => void
}

export function InmuebleForm({ onSuccess }: InmuebleFormProps) {
  const { createInmueble } = useInmuebles()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    cod_catastral: "",
    direccion: "",
    distrito: "",
    zona: "",
    lat: -12.0464,
    lon: -77.0428,
  })

  const handleLocationChange = (lat: number, lon: number) => {
    setFormData({ ...formData, lat, lon })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await createInmueble({
        cod_catastral: formData.cod_catastral,
        direccion: formData.direccion,
        distrito: formData.distrito,
        zona: formData.zona,
      })
      setFormData({
        cod_catastral: "",
        direccion: "",
        distrito: "",
        zona: "",
        lat: -12.0464,
        lon: -77.0428,
      })
      onSuccess?.()
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in">
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="cod_catastral">Código Catastral</Label>
              <Input
                id="cod_catastral"
                value={formData.cod_catastral}
                onChange={(e) => setFormData({ ...formData, cod_catastral: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="direccion">Dirección</Label>
              <Input
                id="direccion"
                value={formData.direccion}
                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="distrito">Distrito</Label>
              <Input
                id="distrito"
                value={formData.distrito}
                onChange={(e) => setFormData({ ...formData, distrito: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="zona">Zona</Label>
              <Input
                id="zona"
                value={formData.zona}
                onChange={(e) => setFormData({ ...formData, zona: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Guardando..." : "Guardar Inmueble"}
            </Button>
          </div>
        </form>
      </Card>

      <InmuebleMap
        lat={formData.lat}
        lon={formData.lon.toString()}
        direccion={formData.direccion}
        onLocationChange={handleLocationChange}
        editable={true}
      />
    </div>
  )
}
