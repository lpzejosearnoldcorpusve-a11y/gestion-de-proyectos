import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { users, usuario_roles, roles, rol_permisos, permisos, tokens } from "@/db/schema"
import { eq } from "drizzle-orm"
import { hashToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: "Token requerido" }, { status: 400 })
    }

    const tokenHash = hashToken(token)

    // Buscar token válido
    const tokenResult = await db.select().from(tokens).where(eq(tokens.token_hash, tokenHash)).limit(1)

    if (tokenResult.length === 0 || !tokenResult[0].activo || new Date() > tokenResult[0].expira_en) {
      return NextResponse.json({ error: "Token inválido o expirado" }, { status: 401 })
    }

    // Obtener usuario y sus permisos
    const userResult = await db.select().from(users).where(eq(users.id, tokenResult[0].usuario_id)).limit(1)

    if (userResult.length === 0) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
    }

    const user = userResult[0]

    const userRoles = await db
      .select({ rol: roles })
      .from(usuario_roles)
      .innerJoin(roles, eq(roles.id, usuario_roles.rol_id))
      .where(eq(usuario_roles.usuario_id, user.id))

    const rolesIds = userRoles.map((r) => r.rol.id)

    const userPermisos = await db
      .select({ permiso: permisos })
      .from(rol_permisos)
      .innerJoin(permisos, eq(permisos.id, rol_permisos.permiso_id))
      .where(eq(rol_permisos.rol_id, rolesIds[0] || ""))

    return NextResponse.json({
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        estado: user.estado,
        roles: userRoles.map((r) => r.rol.nombre),
        permisos: userPermisos.map((p) => p.permiso.codigo),
      },
    })
  } catch (error) {
    console.error("[v0] Verify token error:", error)
    return NextResponse.json({ error: "Error al verificar token" }, { status: 500 })
  }
}
