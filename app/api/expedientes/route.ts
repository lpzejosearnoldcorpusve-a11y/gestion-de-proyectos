import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { expedientes } from "@/db/schema"

export async function GET() {
  try {
    const result = await db.select().from(expedientes)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error al obtener expedientes:", error)
    return NextResponse.json({ error: "Error al obtener expedientes" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { inmueble_id, solicitante_id, prioridad, canal } = body

    if (!inmueble_id || !solicitante_id) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    const result = await db
      .insert(expedientes)
      .values({
        inmueble_id,
        solicitante_id,
        prioridad: prioridad || "normal",
        canal: canal || "web",
      })
      .returning()

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error("Error al crear expediente:", error)
    return NextResponse.json({ error: "Error al crear expediente" }, { status: 500 })
  }
}
