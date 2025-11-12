"use client"

import { useEffect, useRef, useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Fix para los iconos de Leaflet en Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
})

interface MapViewerProps {
  lat: number
  lon: number
  mapType: "normal" | "satellite"
  direccion?: string
  onLocationChange?: (lat: number, lon: number) => void
  editable?: boolean
}

export default function MapViewer({
  lat,
  lon,
  mapType,
  direccion,
  onLocationChange,
  editable = false,
}: MapViewerProps) {
  interface CustomMap extends L.Map {
    normalLayer?: L.TileLayer
    satelliteLayer?: L.TileLayer
    mapType?: "normal" | "satellite"
  }

  const mapRef = useRef<CustomMap | null>(null)
  const markerRef = useRef<L.Marker | null>(null)
  const [isMapReady, setIsMapReady] = useState(false)

  useEffect(() => {
    if (!mapRef.current) {
      // Inicializar mapa centrado en La Paz
      mapRef.current = L.map("map-container").setView([lat, lon], 15)

      // Layer normal (OpenStreetMap) con mejores tiles para Bolivia
      const normalLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      })

      // Layer satélite (ESRI World Imagery)
      const satelliteLayer = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution: "© Esri, Maxar, Earthstar Geographics",
          maxZoom: 19,
        },
      )

      // Layer de calles para Bolivia (alternativa)
      const streetsLayer = L.tileLayer(
        "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
        {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>',
          maxZoom: 19,
        },
      )

      // Agregar layer inicial basado en el tipo
      if (mapType === "satellite") {
        satelliteLayer.addTo(mapRef.current)
      } else {
        normalLayer.addTo(mapRef.current)
      }

      // Guardar referencias de layers
      mapRef.current.normalLayer = normalLayer
      mapRef.current.satelliteLayer = satelliteLayer
      mapRef.current.mapType = mapType

      // Crear marcador personalizado para mejor visibilidad
      const customIcon = L.divIcon({
        html: `
          <div style="
            background-color: #dc2626;
            width: 24px;
            height: 24px;
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          "></div>
        `,
        className: "custom-marker",
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })

      // Agregar marcador
      markerRef.current = L.marker([lat, lon], {
        draggable: editable,
        icon: customIcon,
      }).addTo(mapRef.current)

      // Popup con información de la ubicación
      const popupContent = `
        <div class="p-2">
          <strong class="text-sm">Ubicación en La Paz</strong>
          ${direccion ? `<p class="text-xs mt-1">${direccion}</p>` : ''}
          <p class="text-xs text-gray-600 mt-1">
            Lat: ${lat.toFixed(6)}<br>
            Lon: ${lon.toFixed(6)}
          </p>
        </div>
      `

      markerRef.current.bindPopup(popupContent)
      
      // Abrir popup automáticamente si hay dirección
      if (direccion) {
        markerRef.current.openPopup()
      }

      // Eventos de marcador para edición
      if (editable) {
        markerRef.current.on("dragstart", () => {
          markerRef.current?.closePopup()
        })

        markerRef.current.on("dragend", () => {
          const pos = markerRef.current?.getLatLng()
          if (pos && onLocationChange) {
            onLocationChange(pos.lat, pos.lng)
            
            // Actualizar popup con nueva posición
            const newPopupContent = `
              <div class="p-2">
                <strong class="text-sm">Nueva Ubicación</strong>
                <p class="text-xs text-gray-600 mt-1">
                  Lat: ${pos.lat.toFixed(6)}<br>
                  Lon: ${pos.lng.toFixed(6)}
                </p>
              </div>
            `
            markerRef.current?.bindPopup(newPopupContent).openPopup()
          }
        })
      }

      // Agregar controles de zoom
      L.control.zoom({
        position: 'topright'
      }).addTo(mapRef.current)

      // Agregar escala
      L.control.scale({
        imperial: false,
        metric: true
      }).addTo(mapRef.current)

      setIsMapReady(true)
    }

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  // Efecto para actualizar posición del marcador cuando cambian las props
  useEffect(() => {
    if (mapRef.current && markerRef.current && isMapReady) {
      const newLatLng = new L.LatLng(lat, lon)
      markerRef.current.setLatLng(newLatLng)
      
      // Centrar el mapa en la nueva posición
      mapRef.current.setView(newLatLng, mapRef.current.getZoom())
    }
  }, [lat, lon, isMapReady])

  // Cambiar tipo de mapa
  useEffect(() => {
    if (mapRef.current && isMapReady) {
      const normalLayer = mapRef.current.normalLayer
      const satelliteLayer = mapRef.current.satelliteLayer

      // Remover layers existentes
      if (mapRef.current.mapType === "satellite" && satelliteLayer) {
        mapRef.current.removeLayer(satelliteLayer)
      } else if (normalLayer) {
        mapRef.current.removeLayer(normalLayer)
      }

      // Agregar nuevo layer
      if (mapType === "satellite" && satelliteLayer) {
        satelliteLayer.addTo(mapRef.current)
      } else if (normalLayer) {
        normalLayer.addTo(mapRef.current)
      }

      mapRef.current.mapType = mapType
    }
  }, [mapType, isMapReady])

  return (
    <div 
      id="map-container" 
      className="w-full h-96 bg-slate-100 rounded-lg"
      style={{ 
        cursor: editable ? 'grab' : 'default'
      }}
    />
  )
}