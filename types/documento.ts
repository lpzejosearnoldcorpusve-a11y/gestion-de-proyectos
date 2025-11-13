export interface CaracteristicasML {
  pisos_exceso: number
  altura_exceso_m: number
  area_afectada_m2: number
  sin_permiso_bin: 0 | 1
  tipo_uso: "residencial" | "comercial" | "mixto" | "industrial"
  zona: string
  hist_infracciones_area: number
  distancia_via_principal: number
}

export interface Documento {
  id: string
  inmueble_id: string
  tipo: "plano" | "foto" | "certificado" | "tasacion" | "otro"
  nombre: string
  url: string
  estado: "pendiente" | "validado" | "rechazado"
  caracteristicas_ml: CaracteristicasML
  creado_en: Date
  validado_en?: Date
}

export interface CreateDocumentoDto {
  inmueble_id: string
  tipo: string
  nombre: string
  url: string
  caracteristicas_ml: CaracteristicasML
}

export interface UpdateDocumentoDto extends Partial<CreateDocumentoDto> {
  estado?: "pendiente" | "validado" | "rechazado"
}

export interface Solicitud {
  id: string
  inmueble_id: string
  tipo: "licencia_construccion" | "ampliacion" | "modificacion" | "demolicion" | "otro"
  estado: "nueva" | "revisando" | "aprobada" | "rechazada" | "archivada"
  prioridad: "baja" | "normal" | "alta" | "urgente"
  riesgo_infraccional: "bajo" | "medio" | "alto" | "critico"
  solicitante: string
  descripcion: string
  documentos: string[]
  caracteristicas_ml: CaracteristicasML
  creado_en: Date
  actualizado_en: Date
  resultado_ia?: {
    puntuacion: number
    riesgo: string
    recomendacion: string
  }
}

export interface CreateSolicitudDto {
  inmueble_id: string
  tipo: string
  prioridad?: string
  solicitante: string
  descripcion: string
  caracteristicas_ml: CaracteristicasML
}

export interface UpdateSolicitudDto extends Partial<CreateSolicitudDto> {
  estado?: string
}
