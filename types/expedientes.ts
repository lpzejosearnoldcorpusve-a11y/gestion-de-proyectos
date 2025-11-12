export interface Expediente {
  id: string
  inmueble_id: string
  solicitante_id: string
  estado: "en_tramite" | "aprobado" | "rechazado"
  prioridad: "baja" | "normal" | "alta" | "urgente"
  canal: "web" | "ventanilla" | "email"
  created_at: Date
  updated_at: Date
}

export interface CreateExpedienteDto {
  inmueble_id: string
  solicitante_id: string
  prioridad?: "baja" | "normal" | "alta" | "urgente"
  canal?: "web" | "ventanilla" | "email"
}

export interface UpdateExpedienteDto {
  estado?: "en_tramite" | "aprobado" | "rechazado"
  prioridad?: "baja" | "normal" | "alta" | "urgente"
}
