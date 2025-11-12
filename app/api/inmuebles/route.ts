import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { inmuebles } from "@/db/schema"

export async function GET() {
  try {
    const result = await db.select().from(inmuebles)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error al obtener inmuebles:", error)
    return NextResponse.json({ error: "Error al obtener inmuebles" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { cod_catastral, direccion, distrito, zona } = body

    if (!cod_catastral || !direccion || !distrito) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    const result = await db
      .insert(inmuebles)
      .values({
        cod_catastral,
        direccion,
        distrito,
        zona,
      })
      .returning()

    return NextResponse.json(result[0], { status: 201 })
  } catch (error) {
    console.error("Error al crear inmueble:", error)
    return NextResponse.json({ error: "Error al crear inmueble" }, { status: 500 })
  }
}
