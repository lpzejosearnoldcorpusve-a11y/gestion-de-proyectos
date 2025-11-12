export interface Inmueble {
  id: string
  cod_catastral: string
  direccion: string
  distrito: string
  zona?: string
  estado: "activo" | "inactivo"
  creado_en: Date
  actualizado_en: Date
  ubicacion?: UbicacionGeografica
}

export interface UbicacionGeografica {
  lat: number
  lon: number
  fuente?: string
}

export interface CreateInmuebleDto {
  cod_catastral: string
  direccion: string
  distrito: string
  zona?: string
  ubicacion?: UbicacionGeografica
}

export interface UpdateInmuebleDto extends Partial<CreateInmuebleDto> {
  estado?: "activo" | "inactivo"
}
