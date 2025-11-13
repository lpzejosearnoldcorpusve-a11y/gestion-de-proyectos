export interface UserWithRoles {
  id: string
  nombre: string
  email: string
  estado: string
  roles: string[]
  permisos: string[]
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: UserWithRoles
}

export interface AuthSession {
  user: UserWithRoles
  token: string
  expiresAt: number
}
