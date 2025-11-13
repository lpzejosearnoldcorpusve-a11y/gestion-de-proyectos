import useSWR from "swr"
import type { Documento, CreateDocumentoDto, UpdateDocumentoDto } from "@/types/documento"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function useDocumentos() {
  const { data: documentos = [], isLoading, error, mutate } = useSWR<Documento[]>("/api/documentos", fetcher)

  const createDocumento = async (dto: CreateDocumentoDto) => {
    const res = await fetch("/api/documentos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    })
    if (!res.ok) throw new Error("Error al crear documento")
    const newDocumento = await res.json()
    mutate([...documentos, newDocumento])
    return newDocumento
  }

  const updateDocumento = async (id: string, dto: UpdateDocumentoDto) => {
    const res = await fetch(`/api/documentos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    })
    if (!res.ok) throw new Error("Error al actualizar documento")
    const updated = await res.json()
    mutate(documentos.map((d) => (d.id === id ? updated : d)))
    return updated
  }

  const deleteDocumento = async (id: string) => {
    const res = await fetch(`/api/documentos/${id}`, { method: "DELETE" })
    if (!res.ok) throw new Error("Error al eliminar documento")
    mutate(documentos.filter((d) => d.id !== id))
  }

  return { documentos, isLoading, error, createDocumento, updateDocumento, deleteDocumento }
}
