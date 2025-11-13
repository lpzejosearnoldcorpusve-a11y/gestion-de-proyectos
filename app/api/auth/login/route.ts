import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { users, usuario_roles, roles, rol_permisos, permisos, tokens } from "@/db/schema"
import { eq } from "drizzle-orm"
import { verifyPassword, generateToken, hashToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email y contraseña requeridos" }, { status: 400 })
    }

    // Buscar usuario
    const userResult = await db.select().from(users).where(eq(users.email, email)).limit(1)

    if (userResult.length === 0) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 })
    }

    const user = userResult[0]

    // Verificar contraseña
    const isValidPassword = await verifyPassword(password, user.hash_pwd)
    if (!isValidPassword) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 })
    }

    // Obtener roles y permisos del usuario
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

    // Generar token
    const token = generateToken()
    const tokenHash = hashToken(token)
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)

    await db.insert(tokens).values({
      usuario_id: user.id,
      token_hash: tokenHash,
      expira_en: expiresAt,
      activo: true,
    })

    return NextResponse.json({
      token,
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
    console.error("[v0] Login error:", error)
    return NextResponse.json({ error: "Error en autenticación" }, { status: 500 })
  }
}
