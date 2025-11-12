"use client"

import dynamic from "next/dynamic"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Satellite, MapIcon } from "lucide-react"

const DynamicMapComponent = dynamic(() => import("./map-viewer"), {
  loading: () => (
    <div className="w-full h-96 bg-slate-100 rounded-lg flex items-center justify-center">
      <Loader2 className="animate-spin" />
    </div>
  ),
  ssr: false,
})

interface InmuebleMapProps {
  lat?: number
  lon?: string
  direccion?: string
  onLocationChange?: (lat: number, lon: number) => void
  editable?: boolean
}

export function InmuebleMap({ lat, lon, direccion, onLocationChange, editable = false }: InmuebleMapProps) {
  const [mapType, setMapType] = useState<"normal" | "satellite">("normal")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  // Coordenadas por defecto para La Paz, Bolivia
  const latitude = lat || -16.4897
  const longitude = lon ? Number.parseFloat(lon) : -68.1193

  return (
    <Card className="p-4 space-y-4 animate-in fade-in">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Ubicación en La Paz, Bolivia</h3>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={mapType === "normal" ? "default" : "outline"}
            onClick={() => setMapType("normal")}
            className="gap-2"
          >
            <MapIcon className="w-4 h-4" />
            Normal
          </Button>
          <Button
            size="sm"
            variant={mapType === "satellite" ? "default" : "outline"}
            onClick={() => setMapType("satellite")}
            className="gap-2"
          >
            <Satellite className="w-4 h-4" />
            Satélite
          </Button>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden border border-slate-200">
        <DynamicMapComponent
          lat={latitude}
          lon={longitude}
          mapType={mapType}
          direccion={direccion}
          onLocationChange={onLocationChange}
          editable={editable}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-slate-50 p-3 rounded">
          <p className="text-muted-foreground">Latitud</p>
          <p className="font-mono font-semibold text-blue-600">{latitude.toFixed(6)}</p>
        </div>
        <div className="bg-slate-50 p-3 rounded">
          <p className="text-muted-foreground">Longitud</p>
          <p className="font-mono font-semibold text-blue-600">{longitude.toFixed(6)}</p>
        </div>
      </div>

      {direccion && (
        <div className="bg-blue-50 border border-blue-200 rounded p-3">
          <p className="text-sm text-blue-900">{direccion}</p>
        </div>
      )}
    </Card>
  )
}