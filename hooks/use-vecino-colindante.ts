"use client"

import useSWR from "swr"
import type { VecinoColindante, CreateVecinoColindanteDto, UpdateVecinoColindanteDto } from "@/types/vecino-colindante"

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error("Error al cargar vecinos")
  return res.json()
}

export function useVecinoColindante(inmuebleId?: string) {
  const { data, error, isLoading, mutate } = useSWR<VecinoColindante[]>(
    inmuebleId ? `/api/vecino-colindante?inmueble_id=${inmuebleId}` : null,
    fetcher
  )

  const createVecino = async (dto: CreateVecinoColindanteDto) => {
    const res = await fetch("/api/vecino-colindante", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    })
    if (!res.ok) throw new Error("Error al crear vecino")
    await mutate()
    return res.json()
  }

  const updateVecino = async (id: string, dto: UpdateVecinoColindanteDto) => {
    const res = await fetch(`/api/vecino-colindante/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    })
    if (!res.ok) throw new Error("Error al actualizar vecino")
    await mutate()
    return res.json()
  }

  const deleteVecino = async (id: string) => {
    const res = await fetch(`/api/vecino-colindante/${id}`, { method: "DELETE" })
    if (!res.ok) throw new Error("Error al eliminar vecino")
    await mutate()
  }

  return { 
    vecinos: data || [], 
    error, 
    isLoading, 
    createVecino, 
    updateVecino, 
    deleteVecino 
  }
}