import useSWR from "swr"
import type {
  PermisoConstruccion,
  CreatePermisoConstruccionDto,
  UpdatePermisoConstruccionDto,
} from "@/types/permiso-construccion"

export function usePermisoConstruccion(expedienteId?: string) {
const { data, error, isLoading, mutate } = useSWR<PermisoConstruccion[]>(
    expedienteId ? `/api/permiso-construccion?expediente_id=${expedienteId}` : null,
    async (url: string): Promise<PermisoConstruccion[]> => {
        const res = await fetch(url)
        if (!res.ok) throw new Error("Error al cargar permisos")
        return res.json()
    },
)

  const createPermiso = async (dto: CreatePermisoConstruccionDto) => {
    const res = await fetch("/api/permiso-construccion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    })
    if (!res.ok) throw new Error("Error al crear permiso")
    await mutate()
    return res.json()
  }

  const updatePermiso = async (id: string, dto: UpdatePermisoConstruccionDto) => {
    const res = await fetch(`/api/permiso-construccion/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    })
    if (!res.ok) throw new Error("Error al actualizar permiso")
    await mutate()
    return res.json()
  }

  const deletePermiso = async (id: string) => {
    const res = await fetch(`/api/permiso-construccion/${id}`, { method: "DELETE" })
    if (!res.ok) throw new Error("Error al eliminar permiso")
    await mutate()
  }

  return { data, error, isLoading, createPermiso, updatePermiso, deletePermiso }
}
