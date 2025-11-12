import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { roles } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params

  try {
    const role = await db.select().from(roles).where(eq(roles.id, id)).limit(1)

    if (role.length === 0) {
      return NextResponse.json({ error: "Rol no encontrado" }, { status: 404 })
    }

    return NextResponse.json(role[0])
  } catch (error) {
    console.error("Error al obtener rol:", error)
    return NextResponse.json({ error: "Error al obtener rol" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params

  try {
    const data = await request.json()

    const updatedRole = await db
      .update(roles)
      .set({
        nombre: data.nombre,
        descripcion: data.descripcion,
      })
      .where(eq(roles.id, id))
      .returning()

    if (updatedRole.length === 0) {
      return NextResponse.json({ error: "Rol no encontrado" }, { status: 404 })
    }

    return NextResponse.json(updatedRole[0])
  } catch (error) {
    console.error("Error al actualizar rol:", error)
    return NextResponse.json({ error: "Error al actualizar rol" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params

  try {
    const deletedRole = await db.delete(roles).where(eq(roles.id, id)).returning()

    if (deletedRole.length === 0) {
      return NextResponse.json({ error: "Rol no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ success: true, deletedId: deletedRole[0].id })
  } catch (error) {
    console.error("Error al eliminar rol:", error)
    return NextResponse.json({ error: "Error al eliminar rol" }, { status: 500 })
  }
}
