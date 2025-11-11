"use client"

import { useState, useCallback } from "react"

interface Permission {
  id: string
  title: string
  status: "pendiente" | "aprobado" | "rechazado"
  type: "terreno" | "casa"
  date: string
}

const mockPermissions: Permission[] = [
  {
    id: "1",
    title: "Permiso de Construcción - Lote 5",
    status: "aprobado",
    type: "terreno",
    date: "2024-01-15",
  },
  {
    id: "2",
    title: "Licencia de Reforma - Avenida Principal",
    status: "pendiente",
    type: "casa",
    date: "2024-01-20",
  },
  {
    id: "3",
    title: "Certificado de Vivienda - Zona Centro",
    status: "rechazado",
    type: "casa",
    date: "2024-01-10",
  },
  {
    id: "4",
    title: "Autorización de Subdivisión",
    status: "pendiente",
    type: "terreno",
    date: "2024-01-18",
  },
]

export function usePermissions() {
  const [permissions] = useState<Permission[]>(mockPermissions)

  const getStatusColor = useCallback((status: Permission["status"]) => {
    switch (status) {
      case "aprobado":
        return "bg-green-500/20 text-green-400"
      case "rechazado":
        return "bg-red-500/20 text-red-400"
      case "pendiente":
        return "bg-yellow-500/20 text-yellow-400"
    }
  }, [])

  const getStatusLabel = useCallback((status: Permission["status"]) => {
    switch (status) {
      case "aprobado":
        return "Aprobado"
      case "rechazado":
        return "Rechazado"
      case "pendiente":
        return "Pendiente"
    }
  }, [])

  return { permissions, getStatusColor, getStatusLabel }
}
