import { db } from "@/db"
import { permisos, roles, rol_permisos, users, usuario_roles } from "@/db/schema"
import { hashPassword } from "@/lib/auth"

async function seedPermissions() {
  console.log("[v0] Starting seed...")

  const permisosData = [
    // Usuarios
    { codigo: "view_users", descripcion: "Ver lista de usuarios" },
    { codigo: "manage_users", descripcion: "Crear, editar y eliminar usuarios" },
    // Roles
    { codigo: "view_roles", descripcion: "Ver lista de roles" },
    { codigo: "manage_roles", descripcion: "Crear, editar y eliminar roles" },
    // Permisos
    { codigo: "view_permissions", descripcion: "Ver lista de permisos" },
    { codigo: "manage_permissions", descripcion: "Crear, editar y eliminar permisos" },
    // Inmuebles
    { codigo: "view_inmuebles", descripcion: "Ver lista de inmuebles" },
    { codigo: "manage_inmuebles", descripcion: "Crear, editar y eliminar inmuebles" },
    // Expedientes
    { codigo: "view_expedientes", descripcion: "Ver lista de expedientes" },
    { codigo: "manage_expedientes", descripcion: "Crear, editar y eliminar expedientes" },
    // Documentos
    { codigo: "view_documents", descripcion: "Ver documentos" },
    { codigo: "manage_documents", descripcion: "Gestionar documentos" },
    // Solicitudes
    { codigo: "view_requests", descripcion: "Ver solicitudes" },
    { codigo: "manage_requests", descripcion: "Gestionar solicitudes" },
    // Reportes
    { codigo: "view_reports", descripcion: "Ver reportes" },
    { codigo: "generate_reports", descripcion: "Generar reportes" },
  ]

  const permisosInsertados = await db.insert(permisos).values(permisosData).returning()
  console.log(`[v0] Created ${permisosInsertados.length} permissions`)

  const rolesData = [
    { nombre: "Admin", descripcion: "Administrador del sistema" },
    { nombre: "Inspector", descripcion: "Inspector de expedientes" },
    { nombre: "Gestor", descripcion: "Gestor de solicitudes" },
    { nombre: "Viewer", descripcion: "Solo lectura" },
  ]

  const rolesInsertados = await db.insert(roles).values(rolesData).returning()
  console.log(`[v0] Created ${rolesInsertados.length} roles`)

  const adminRole = rolesInsertados.find((r) => r.nombre === "Admin")
  const inspectorRole = rolesInsertados.find((r) => r.nombre === "Inspector")
  const gestorRole = rolesInsertados.find((r) => r.nombre === "Gestor")
  const viewerRole = rolesInsertados.find((r) => r.nombre === "Viewer")

  // Asignación de permisos por rol
  if (adminRole) {
    const adminPermisos = permisosInsertados.map((p) => ({
      rol_id: adminRole.id,
      permiso_id: p.id,
    }))
    await db.insert(rol_permisos).values(adminPermisos)
  }

  if (inspectorRole) {
    const inspectorPermisos = permisosInsertados
      .filter(
        (p) =>
          p.codigo.includes("expediente") ||
          p.codigo.includes("inmueble") ||
          p.codigo === "view_documents" ||
          p.codigo === "view_reports",
      )
      .map((p) => ({
        rol_id: inspectorRole.id,
        permiso_id: p.id,
      }))
    await db.insert(rol_permisos).values(inspectorPermisos)
  }

  if (gestorRole) {
    const gestorPermisos = permisosInsertados
      .filter(
        (p) =>
          p.codigo.includes("request") ||
          p.codigo.includes("document") ||
          p.codigo === "view_inmuebles" ||
          p.codigo === "view_expedientes",
      )
      .map((p) => ({
        rol_id: gestorRole.id,
        permiso_id: p.id,
      }))
    await db.insert(rol_permisos).values(gestorPermisos)
  }

  if (viewerRole) {
    const viewerPermisos = permisosInsertados
      .filter((p) => p.codigo.startsWith("view_"))
      .map((p) => ({
        rol_id: viewerRole.id,
        permiso_id: p.id,
      }))
    await db.insert(rol_permisos).values(viewerPermisos)
  }

  console.log("[v0] Assigned permissions to roles")

  // Contraseñas
  const adminHashedPassword = await hashPassword("admin123")
  const inspectorHashedPassword = await hashPassword("inspector123")
  const cristopherHashedPassword = await hashPassword("hola1234")

  // Usuarios demo
  const demoUsers = await db
    .insert(users)
    .values([
      {
        nombre: "Admin User",
        email: "admin@sistema.local",
        hash_pwd: adminHashedPassword,
        estado: "activo",
      },
      {
        nombre: "Inspector User",
        email: "inspector@sistema.local",
        hash_pwd: inspectorHashedPassword,
        estado: "activo",
      },
      {
        nombre: "Cristopher",
        email: "cristopher@gmail.com",
        hash_pwd: cristopherHashedPassword,
        estado: "activo",
      },
    ])
    .returning()

  console.log(`[v0] Created ${demoUsers.length} demo users`)

  // Asignar roles a usuarios
  if (adminRole && demoUsers[0]) {
    await db.insert(usuario_roles).values({
      usuario_id: demoUsers[0].id,
      rol_id: adminRole.id,
    })
  }

  if (inspectorRole && demoUsers[1]) {
    await db.insert(usuario_roles).values({
      usuario_id: demoUsers[1].id,
      rol_id: inspectorRole.id,
    })
  }

  if (adminRole && demoUsers[2]) {
    await db.insert(usuario_roles).values({
      usuario_id: demoUsers[2].id,
      rol_id: adminRole.id,
    })
  }

  console.log("[v0] Seed completed successfully!")
  console.log("\nDemo Credentials:")
  console.log("Admin: admin@sistema.local / admin123")
  console.log("Inspector: inspector@sistema.local / inspector123")
  console.log("Cristopher: cristopher@gmail.com / hola1234 (Admin)")
}

seedPermissions().catch((error) => {
  console.error("[v0] Seed error:", error)
  process.exit(1)
})
