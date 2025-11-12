export interface UbicacionReferencia {
  id: string
  inmueble_id: string
  lat: number
  lon: number
  fuente?: string
}

export interface CreateUbicacionReferenciaDto {
  inmueble_id: string
  lat: number
  lon: number
  fuente?: string
}

export interface UpdateUbicacionReferenciaDto extends Partial<CreateUbicacionReferenciaDto> {}
