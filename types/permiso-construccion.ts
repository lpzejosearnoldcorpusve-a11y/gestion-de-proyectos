export interface PermisoConstruccion {
  id: string
  expediente_id: string
  nro: string
  emision?: Date
  vence?: Date
  tipo?: string
  estado: "vigente" | "vencido" | "cancelado"
}

export interface CreatePermisoConstruccionDto {
  expediente_id: string
  nro: string
  emision?: Date
  vence?: Date
  tipo?: string
}

export interface UpdatePermisoConstruccionDto extends Partial<CreatePermisoConstruccionDto> {
  estado?: "vigente" | "vencido" | "cancelado"
}
