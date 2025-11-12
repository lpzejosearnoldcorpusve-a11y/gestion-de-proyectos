"use client"

import useSWR from "swr"
import type { Inmueble, CreateInmuebleDto, UpdateInmuebleDto } from "@/types/inmuebles"

const API_URL = "/api/inmuebles"

export function useInmuebles() {
const {
    data: inmuebles,
    error,
    isLoading,
    mutate,
} = useSWR<Inmueble[], Error>(API_URL, async (url: string): Promise<Inmueble[]> => {
    const res: Response = await fetch(url)
    if (!res.ok) throw new Error("Error al obtener inmuebles")
    return res.json()
})

  const createInmueble = async (data: CreateInmuebleDto) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Error al crear inmueble")
    const newInmueble = await res.json()
    mutate([...(inmuebles || []), newInmueble])
    return newInmueble
  }

  const updateInmueble = async (id: string, data: UpdateInmuebleDto) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Error al actualizar inmueble")
    const updated = await res.json()
    mutate(inmuebles?.map((i) => (i.id === id ? updated : i)) || [])
    return updated
  }

  const deleteInmueble = async (id: string) => {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" })
    if (!res.ok) throw new Error("Error al eliminar inmueble")
    mutate(inmuebles?.filter((i) => i.id !== id) || [])
  }

  return {
    inmuebles: inmuebles || [],
    isLoading,
    error,
    createInmueble,
    updateInmueble,
    deleteInmueble,
    mutate,
  }
}
