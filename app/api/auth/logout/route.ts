import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { tokens } from "@/db/schema"
import { eq } from "drizzle-orm"
import { hashToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: "Token requerido" }, { status: 400 })
    }

    const tokenHash = hashToken(token)

    await db.update(tokens).set({ activo: false }).where(eq(tokens.token_hash, tokenHash))

    return NextResponse.json({ message: "Logout exitoso" })
  } catch (error) {
    console.error("[v0] Logout error:", error)
    return NextResponse.json({ error: "Error en logout" }, { status: 500 })
  }
}
