"use client"

import useSWR from "swr"
import type {
  UbicacionReferencia,
  CreateUbicacionReferenciaDto,
  UpdateUbicacionReferenciaDto,
} from "@/types/ubicacion-referencia"

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error("Error al cargar ubicaciones")
  return res.json()
}

export function useUbicacionReferencia(inmuebleId?: string) {
  const { data, error, isLoading, mutate } = useSWR<UbicacionReferencia[]>(
    inmuebleId ? `/api/ubicacion-referencia?inmueble_id=${inmuebleId}` : null,
    fetcher
  )

  const createUbicacion = async (dto: CreateUbicacionReferenciaDto) => {
    const res = await fetch("/api/ubicacion-referencia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    })
    if (!res.ok) throw new Error("Error al crear ubicación")
    await mutate()
    return res.json()
  }

  const updateUbicacion = async (id: string, dto: UpdateUbicacionReferenciaDto) => {
    const res = await fetch(`/api/ubicacion-referencia/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    })
    if (!res.ok) throw new Error("Error al actualizar ubicación")
    await mutate()
    return res.json()
  }

  const deleteUbicacion = async (id: string) => {
    const res = await fetch(`/api/ubicacion-referencia/${id}`, { method: "DELETE" })
    if (!res.ok) throw new Error("Error al eliminar ubicación")
    await mutate()
  }

  return { 
    ubicaciones: data || [], 
    error, 
    isLoading, 
    createUbicacion, 
    updateUbicacion, 
    deleteUbicacion 
  }
}