import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { users, usuario_roles, roles } from "@/db/schema"
import { eq } from "drizzle-orm"

// ✅ GET /api/usuarios/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const usuario = await db
      .select({
        id: users.id,
        nombre: users.nombre,
        email: users.email,
        estado: users.estado,
        creado_en: users.creado_en,
        actualizado_en: users.actualizado_en,
        rol: roles.nombre,
        rol_id: roles.id,
      })
      .from(users)
      .leftJoin(usuario_roles, eq(usuario_roles.usuario_id, users.id))
      .leftJoin(roles, eq(roles.id, usuario_roles.rol_id))
      .where(eq(users.id, id))
      .limit(1)

    if (usuario.length === 0)
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })

    return NextResponse.json(usuario[0])
  } catch (error) {
    console.error(`[usuarios/${id}] Error al obtener usuario:`, error)
    return NextResponse.json({ error: "Error al obtener usuario" }, { status: 500 })
  }
}

// ✅ PUT /api/usuarios/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const data = await request.json()

    const existing = await db.select().from(users).where(eq(users.id, id)).limit(1)
    if (existing.length === 0)
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })

    const updateData: any = {
      nombre: data.nombre,
      estado: data.estado,
      actualizado_en: new Date(),
    }

    if (data.email && data.email !== existing[0].email) {
      const emailExists = await db.select().from(users).where(eq(users.email, data.email)).limit(1)
      if (emailExists.length > 0)
        return NextResponse.json({ error: "El email ya está en uso" }, { status: 400 })
      updateData.email = data.email
    }

    await db.update(users).set(updateData).where(eq(users.id, id))

    if (data.rolId) {
      await db.delete(usuario_roles).where(eq(usuario_roles.usuario_id, id))
      await db.insert(usuario_roles).values({ usuario_id: id, rol_id: data.rolId })
    }

    const actualizado = await db
      .select({
        id: users.id,
        nombre: users.nombre,
        email: users.email,
        estado: users.estado,
        creado_en: users.creado_en,
        actualizado_en: users.actualizado_en,
        rol: roles.nombre,
        rol_id: roles.id,
      })
      .from(users)
      .leftJoin(usuario_roles, eq(usuario_roles.usuario_id, users.id))
      .leftJoin(roles, eq(roles.id, usuario_roles.rol_id))
      .where(eq(users.id, id))
      .limit(1)

    return NextResponse.json(actualizado[0])
  } catch (error) {
    console.error(`[usuarios/${id}] Error al actualizar usuario:`, error)
    return NextResponse.json({ error: "Error al actualizar usuario" }, { status: 500 })
  }
}

// ✅ DELETE /api/usuarios/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const existing = await db.select().from(users).where(eq(users.id, id)).limit(1)
    if (existing.length === 0)
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })

    await db.delete(usuario_roles).where(eq(usuario_roles.usuario_id, id))
    const deleted = await db.delete(users).where(eq(users.id, id)).returning()

    return NextResponse.json({
      success: true,
      message: "Usuario eliminado correctamente",
      deletedId: deleted[0].id,
    })
  } catch (error) {
    console.error(`[usuarios/${id}] Error al eliminar usuario:`, error)
    return NextResponse.json({ error: "Error al eliminar usuario" }, { status: 500 })
  }
}