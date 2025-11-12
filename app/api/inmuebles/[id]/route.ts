import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { inmuebles } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const result = await db
      .select()
      .from(inmuebles)
      .where(eq(inmuebles.id, id))
      .then((r) => r[0])

    if (!result) {
      return NextResponse.json({ error: "Inmueble no encontrado" }, { status: 404 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error al obtener inmueble:", error)
    return NextResponse.json({ error: "Error al obtener inmueble" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json()
    const { cod_catastral, direccion, distrito, zona, estado } = body

    const result = await db
      .update(inmuebles)
      .set({
        ...(cod_catastral && { cod_catastral }),
        ...(direccion && { direccion }),
        ...(distrito && { distrito }),
        ...(zona && { zona }),
        ...(estado && { estado }),
        actualizado_en: new Date(),
      })
      .where(eq(inmuebles.id, id))
      .returning()

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error al actualizar inmueble:", error)
    return NextResponse.json({ error: "Error al actualizar inmueble" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await db.delete(inmuebles).where(eq(inmuebles.id, id))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error al eliminar inmueble:", error)
    return NextResponse.json({ error: "Error al eliminar inmueble" }, { status: 500 })
  }
}