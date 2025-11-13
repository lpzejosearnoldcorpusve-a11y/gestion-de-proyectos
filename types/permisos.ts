export interface Permiso {
  id: string
  codigo: string
  descripcion: string
  creado_en: Date
}

export interface CreatePermisoDto {
  codigo: string
  descripcion: string
}

export interface Rol {
  id: string
  nombre: string
  descripcion: string
  permisos: Permiso[]
  creado_en: Date
}

export interface RolWithPermisos extends Rol {
  permisos: Permiso[]
}

export interface CreateRolDto {
  nombre: string
  descripcion: string
  permiso_ids: string[]
}
