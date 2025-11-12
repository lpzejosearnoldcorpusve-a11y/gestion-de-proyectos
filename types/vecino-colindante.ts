export interface VecinoColindante {
  id: string
  inmueble_id: string
  lado: "norte" | "sur" | "este" | "oeste"
  nombre?: string
  observ?: string
}

export interface CreateVecinoColindanteDto {
  inmueble_id: string
  lado: "norte" | "sur" | "este" | "oeste"
  nombre?: string
  observ?: string
}

export interface UpdateVecinoColindanteDto extends Partial<CreateVecinoColindanteDto> {}
