"use client"

import useSWR from "swr"
import type { Expediente, CreateExpedienteDto, UpdateExpedienteDto } from "@/types/expedientes"

const API_URL = "/api/expedientes"

export function useExpedientes() {
const fetcher = async (url: string): Promise<Expediente[]> => {
    const res = await fetch(url)
    if (!res.ok) throw new Error("Error al obtener expedientes")
    return res.json()
}

const {
    data: expedientes,
    error,
    isLoading,
    mutate,
} = useSWR<Expediente[]>(API_URL, fetcher)

  const createExpediente = async (data: CreateExpedienteDto) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Error al crear expediente")
    const newExpediente = await res.json()
    mutate([...(expedientes || []), newExpediente])
    return newExpediente
  }

  const updateExpediente = async (id: string, data: UpdateExpedienteDto) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Error al actualizar expediente")
    const updated = await res.json()
    mutate(expedientes?.map((e) => (e.id === id ? updated : e)) || [])
    return updated
  }

  const deleteExpediente = async (id: string) => {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" })
    if (!res.ok) throw new Error("Error al eliminar expediente")
    mutate(expedientes?.filter((e) => e.id !== id) || [])
  }

  return {
    expedientes: expedientes || [],
    isLoading,
    error,
    createExpediente,
    updateExpediente,
    deleteExpediente,
    mutate,
  }
}
