import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { roles } from "@/db/schema"
import { desc, eq } from "drizzle-orm"

export async function GET() {
  try {
    const rolesList = await db
      .select({
        id: roles.id,
        nombre: roles.nombre,
        descripcion: roles.descripcion,
        creado_en: roles.creado_en,
      })
      .from(roles)
      .orderBy(desc(roles.creado_en))

    return NextResponse.json(rolesList)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener roles" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const existingRole = await db.select().from(roles).where(eq(roles.nombre, data.nombre)).limit(1)

    if (existingRole.length > 0) {
      return NextResponse.json({ error: "El rol ya existe" }, { status: 400 })
    }

    const newRole = await db
      .insert(roles)
      .values({
        nombre: data.nombre,
        descripcion: data.descripcion,
      })
      .returning()

    return NextResponse.json(newRole[0], { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating role:", error)
    return NextResponse.json({ error: "Error al crear rol" }, { status: 500 })
  }
}
