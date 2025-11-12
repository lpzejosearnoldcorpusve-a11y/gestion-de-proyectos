export interface Usuario {
  id: string
  nombre: string
  email: string
  rol: string
  estado: "activo" | "inactivo"
  creado_en: string
  actualizado_en?: string 
}

export interface Role {
  id: string
  nombre: string
  descripcion: string
  usuariosCount: number
  creado_en: string 
  actualizado_en?: string 
}

export interface Permiso {
  id: string
  codigo: string
  descripcion: string
  creado_en?: string
}

export interface RolPermiso {
  id?: string // Generalmente se incluye el ID
  rol_id: string
  permiso_id: string
  creado_en?: string
}

export interface Token {
  id: string
  usuario_id: string
  token_hash: string
  expira_en: string
  creado_en: string
  tipo?: "access" | "refresh" // Útil para diferenciar
}

export interface AuthToken {
  access_token: string
  refresh_token?: string
  expires_in: number
  token_type?: string // Generalmente "Bearer"
}

export interface LoginCredentials {
  email: string
  password: string
  remember?: boolean // Útil para "recordarme"
}

export interface CreateUsuarioDto {
  nombre: string
  email: string
  password: string
  rol: string
  estado?: "activo" | "inactivo" // Opcional, por defecto "activo"
}

export interface UpdateUsuarioDto {
  nombre?: string
  email?: string
  rol?: string
  estado?: "activo" | "inactivo"
  password?: string // Para permitir cambio de contraseña
}

export interface CreateRoleDto {
  nombre: string
  descripcion: string
}

export interface UpdateRoleDto {
  nombre?: string
  descripcion?: string
}

// TIPOS ADICIONALES QUE PODRÍAS NECESITAR:

export interface ApiResponse<T> {
  data?: T
  error?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface UserProfile {
  id: string
  nombre: string
  email: string
  rol: Role
  estado: "activo" | "inactivo"
  creado_en: string
}

// Para filtros y búsquedas
export interface UserFilters {
  search?: string
  rol?: string
  estado?: "activo" | "inactivo"
  page?: number
  limit?: number
}

export interface RoleFilters {
  search?: string
  page?: number
  limit?: number
}