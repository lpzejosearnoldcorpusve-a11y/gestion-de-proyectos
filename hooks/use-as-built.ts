import useSWR from "swr"
import type { SWRResponse } from "swr"
import type { AsBuilt, CreateAsBuiltDto, UpdateAsBuiltDto } from "@/types/as-built"

export function useAsBuilt(expedienteId?: string) {
const { data, error, isLoading, mutate }: SWRResponse<AsBuilt[], Error> = useSWR<AsBuilt[]>(
    expedienteId ? `/api/as-built?expediente_id=${expedienteId}` : null,
    async (url: string): Promise<AsBuilt[]> => {
        const res = await fetch(url)
        if (!res.ok) throw new Error("Error al cargar as-built")
        return res.json()
    },
)

  const createAsBuilt = async (dto: CreateAsBuiltDto) => {
    const res = await fetch("/api/as-built", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    })
    if (!res.ok) throw new Error("Error al crear as-built")
    await mutate()
    return res.json()
  }

  const updateAsBuilt = async (id: string, dto: UpdateAsBuiltDto) => {
    const res = await fetch(`/api/as-built/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    })
    if (!res.ok) throw new Error("Error al actualizar as-built")
    await mutate()
    return res.json()
  }

  const deleteAsBuilt = async (id: string) => {
    const res = await fetch(`/api/as-built/${id}`, { method: "DELETE" })
    if (!res.ok) throw new Error("Error al eliminar as-built")
    await mutate()
  }

  return { data, error, isLoading, createAsBuilt, updateAsBuilt, deleteAsBuilt }
}
