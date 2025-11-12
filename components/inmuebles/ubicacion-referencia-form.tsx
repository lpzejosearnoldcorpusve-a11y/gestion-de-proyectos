"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import type { CreateUbicacionReferenciaDto } from "@/types/ubicacion-referencia"

interface UbicacionReferenciaFormProps {
  inmuebleId: string
  onSubmit: (dto: CreateUbicacionReferenciaDto) => Promise<void>
  isLoading?: boolean
}

export function UbicacionReferenciaForm({ inmuebleId, onSubmit, isLoading }: UbicacionReferenciaFormProps) {
  const [formData, setFormData] = useState({
    lat: "",
    lon: "",
    fuente: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit({
      inmueble_id: inmuebleId,
      lat: Number.parseFloat(formData.lat),
      lon: Number.parseFloat(formData.lon),
      fuente: formData.fuente || undefined,
    })
    setFormData({ lat: "", lon: "", fuente: "" })
  }

  // Función para obtener ubicación actual
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            lat: position.coords.latitude.toFixed(6),
            lon: position.coords.longitude.toFixed(6),
            fuente: "GPS Dispositivo",
          })
        },
        (error) => {
          alert("Error obteniendo la ubicación: " + error.message)
        }
      )
    } else {
      alert("La geolocalización no es soportada por este navegador")
    }
  }

  return (
    <Card className="bg-gradient-to-br from-slate-950 to-slate-900 border-blue-500/30">
      <CardHeader>
        <CardTitle className="text-blue-400">Ubicación Geográfica - La Paz</CardTitle>
        <CardDescription className="text-slate-400">
          Coordenadas GPS del inmueble en La Paz, Bolivia
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-200">Latitud</label>
              <Input
                name="lat"
                type="number"
                step="0.000001"
                value={formData.lat}
                onChange={handleChange}
                placeholder="-16.489689"
                required
                className="bg-slate-900 border-slate-700 text-white"
              />
              <p className="text-xs text-slate-400 mt-1">Ej: -16.489689 (Centro de La Paz)</p>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-200">Longitud</label>
              <Input
                name="lon"
                type="number"
                step="0.000001"
                value={formData.lon}
                onChange={handleChange}
                placeholder="-68.119293"
                required
                className="bg-slate-900 border-slate-700 text-white"
              />
              <p className="text-xs text-slate-400 mt-1">Ej: -68.119293 (Centro de La Paz)</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-200">Fuente</label>
            <Input
              name="fuente"
              value={formData.fuente}
              onChange={handleChange}
              placeholder="Google Maps, GPS, Catastro, IGM..."
              className="bg-slate-900 border-slate-700 text-white"
            />
          </div>

          {/* Botón para obtener ubicación actual */}
          <Button
            type="button"
            onClick={getCurrentLocation}
            variant="outline"
            className="w-full border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
          >
            📍 Obtener Mi Ubicación Actual
          </Button>

          <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 w-full">
            {isLoading ? <Spinner className="mr-2 h-4 w-4" /> : null}
            Guardar Ubicación en La Paz
          </Button>
        </form>

        {/* Información de referencia para La Paz */}
        <div className="mt-6 p-4 bg-slate-800 rounded-lg border border-slate-700">
          <h4 className="text-sm font-medium text-slate-200 mb-2">Coordenadas de referencia - La Paz:</h4>
          <div className="grid grid-cols-2 gap-4 text-xs text-slate-400">
            <div>
              <p><strong>Centro:</strong> -16.4957, -68.1335</p>
              <p><strong>Zona Sur:</strong> -16.5400, -68.0800</p>
            </div>
            <div>
              <p><strong>El Alto:</strong> -16.5100, -68.1633</p>
              <p><strong>Miraflores:</strong> -16.5000, -68.1300</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}