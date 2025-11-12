import useSWR from "swr"
import type { ProyectoParam, CreateProyectoParamDto, UpdateProyectoParamDto } from "@/types/proyecto-param"

export function useProyectoParam(expedienteId?: string) {
const { data, error, isLoading, mutate } = useSWR<ProyectoParam>(
    expedienteId ? `/api/proyecto-param/${expedienteId}` : null,
    async (url: string): Promise<ProyectoParam> => {
        const res = await fetch(url)
        if (!res.ok) throw new Error("Error al cargar parámetros del proyecto")
        return res.json()
    },
)

  const createProyectoParam = async (dto: CreateProyectoParamDto) => {
    const res = await fetch("/api/proyecto-param", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    })
    if (!res.ok) throw new Error("Error al crear parámetros")
    await mutate()
    return res.json()
  }

  const updateProyectoParam = async (id: string, dto: UpdateProyectoParamDto) => {
    const res = await fetch(`/api/proyecto-param/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    })
    if (!res.ok) throw new Error("Error al actualizar parámetros")
    await mutate()
    return res.json()
  }

  const deleteProyectoParam = async (id: string) => {
    const res = await fetch(`/api/proyecto-param/${id}`, { method: "DELETE" })
    if (!res.ok) throw new Error("Error al eliminar parámetros")
    await mutate()
  }

  return { data, error, isLoading, createProyectoParam, updateProyectoParam, deleteProyectoParam }
}
