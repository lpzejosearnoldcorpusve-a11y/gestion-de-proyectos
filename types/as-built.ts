export interface AsBuilt {
  id: string
  expediente_id: string
  version: string
  observaciones?: string
  creado_en: Date
}

export interface CreateAsBuiltDto {
  expediente_id: string
  version: string
  observaciones?: string
}

export interface UpdateAsBuiltDto {
  version?: string
  observaciones?: string
}
