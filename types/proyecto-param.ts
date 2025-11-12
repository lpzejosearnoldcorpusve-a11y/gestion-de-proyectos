export interface ProyectoParam {
  id: string
  expediente_id: string
  uso_suelo_decl?: string
  pisos_prop?: string
  altura_m_prop?: number
  area_construida?: number
  estacionamientos_prop?: string
  densidad_prop?: string
  jsonb_extra?: Record<string, any>
}

export interface CreateProyectoParamDto {
  expediente_id: string
  uso_suelo_decl?: string
  pisos_prop?: string
  altura_m_prop?: number
  area_construida?: number
  estacionamientos_prop?: string
  densidad_prop?: string
  jsonb_extra?: Record<string, any>
}

export interface UpdateProyectoParamDto extends Partial<CreateProyectoParamDto> {}
