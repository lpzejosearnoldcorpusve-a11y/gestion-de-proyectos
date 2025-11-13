import useSWR from "swr"
import type { Solicitud, CreateSolicitudDto, UpdateSolicitudDto } from "@/types/documento"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function useSolicitudes() {
  const { data: solicitudes = [], isLoading, error, mutate } = useSWR<Solicitud[]>("/api/solicitudes", fetcher)

  const createSolicitud = async (dto: CreateSolicitudDto) => {
    const res = await fetch("/api/solicitudes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    })
    if (!res.ok) throw new Error("Error al crear solicitud")
    const newSolicitud = await res.json()
    mutate([...solicitudes, newSolicitud])
    return newSolicitud
  }

  const updateSolicitud = async (id: string, dto: UpdateSolicitudDto) => {
    const res = await fetch(`/api/solicitudes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    })
    if (!res.ok) throw new Error("Error al actualizar solicitud")
    const updated = await res.json()
    mutate(solicitudes.map((s) => (s.id === id ? updated : s)))
    return updated
  }

  const deleteSolicitud = async (id: string) => {
    const res = await fetch(`/api/solicitudes/${id}`, { method: "DELETE" })
    if (!res.ok) throw new Error("Error al eliminar solicitud")
    mutate(solicitudes.filter((s) => s.id !== id))
  }

  return { solicitudes, isLoading, error, createSolicitud, updateSolicitud, deleteSolicitud }
}
