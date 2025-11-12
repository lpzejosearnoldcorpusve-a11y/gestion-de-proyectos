export interface ExpedienteHistorial {
  id: string
  expediente_id: string
  estado_from?: string
  estado_to: string
  by_user?: string
  at: Date
}

export interface CreateExpedienteHistorialDto {
  expediente_id: string
  estado_from?: string
  estado_to: string
  by_user?: string
}
