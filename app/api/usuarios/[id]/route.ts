import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { users, usuario_roles, roles } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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
        rol_id: roles.id, // ⬅️ IMPORTANTE: Agregar el ID del rol
      })
      .from(users)
      .where(eq(users.id, params.id))
      .leftJoin(usuario_roles, eq(usuario_roles.usuario_id, users.id))
      .leftJoin(roles, eq(roles.id, usuario_roles.rol_id))
      .limit(1)

    if (usuario.length === 0) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
    }

    return NextResponse.json(usuario[0])
  } catch (error) {
    console.error(`[usuarios/${params.id}] Error al obtener usuario:`, error)
    return NextResponse.json({ error: "Error al obtener usuario" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()

    // Verificar que el usuario existe
    const existingUser = await db.select().from(users).where(eq(users.id, params.id)).limit(1)
    if (existingUser.length === 0) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
    }

    // Actualizar datos básicos del usuario
    const updateData: any = {
      nombre: data.nombre,
      estado: data.estado,
      actualizado_en: new Date(),
    }

    // Solo actualizar email si es diferente y no existe otro usuario con ese email
    if (data.email && data.email !== existingUser[0].email) {
      const emailExists = await db.select().from(users).where(eq(users.email, data.email)).limit(1)
      if (emailExists.length > 0) {
        return NextResponse.json({ error: "El email ya está en uso" }, { status: 400 })
      }
      updateData.email = data.email
    }

    const updatedUser = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, params.id))
      .returning()

    // Actualizar rol si se proporciona
    if (data.rolId) {
      // Eliminar relación actual de rol
      await db.delete(usuario_roles).where(eq(usuario_roles.usuario_id, params.id))
      
      // Crear nueva relación
      await db.insert(usuario_roles).values({
        usuario_id: params.id,
        rol_id: data.rolId,
      })
    }

    // Obtener el usuario actualizado con su rol
    const usuarioCompleto = await db
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
      .where(eq(users.id, params.id))
      .leftJoin(usuario_roles, eq(usuario_roles.usuario_id, users.id))
      .leftJoin(roles, eq(roles.id, usuario_roles.rol_id))
      .limit(1)

    return NextResponse.json(usuarioCompleto[0])
  } catch (error) {
    console.error(`[usuarios/${params.id}] Error al actualizar usuario:`, error)
    return NextResponse.json({ error: "Error al actualizar usuario" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Verificar que el usuario existe
    const existingUser = await db.select().from(users).where(eq(users.id, params.id)).limit(1)
    if (existingUser.length === 0) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
    }

    // Eliminar relaciones de roles primero (si es necesario por las constraints)
    await db.delete(usuario_roles).where(eq(usuario_roles.usuario_id, params.id))

    // Eliminar usuario
    const deletedUser = await db.delete(users).where(eq(users.id, params.id)).returning()

    return NextResponse.json({ 
      success: true, 
      message: "Usuario eliminado correctamente",
      deletedId: deletedUser[0].id 
    })
  } catch (error) {
    console.error(`[usuarios/${params.id}] Error al eliminar usuario:`, error)
    return NextResponse.json({ error: "Error al eliminar usuario" }, { status: 500 })
  }
}