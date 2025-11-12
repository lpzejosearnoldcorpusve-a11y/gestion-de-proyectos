import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { expedientes } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const result = await db
      .select()
      .from(expedientes)
      .where(eq(expedientes.id, id))
      .then((r) => r[0])

    if (!result) {
      return NextResponse.json({ error: "Expediente no encontrado" }, { status: 404 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error al obtener expediente:", error)
    return NextResponse.json({ error: "Error al obtener expediente" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json()
    const { estado, prioridad } = body

    const result = await db
      .update(expedientes)
      .set({
        ...(estado && { estado }),
        ...(prioridad && { prioridad }),
        updated_at: new Date(),
      })
      .where(eq(expedientes.id, id))
      .returning()

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error al actualizar expediente:", error)
    return NextResponse.json({ error: "Error al actualizar expediente" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await db.delete(expedientes).where(eq(expedientes.id, id))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error al eliminar expediente:", error)
    return NextResponse.json({ error: "Error al eliminar expediente" }, { status: 500 })
  }
}