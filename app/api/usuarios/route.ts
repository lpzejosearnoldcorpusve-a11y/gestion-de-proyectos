import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { users, usuario_roles, roles } from "@/db/schema"
import { eq, desc } from "drizzle-orm"
import { hashPassword } from "@/lib/auth"

export async function GET() {
  try {
    const usuariosList = await db
      .select({
        id: users.id,
        nombre: users.nombre,
        email: users.email,
        estado: users.estado,
        creado_en: users.creado_en,
        rol: roles.nombre,
        rol_id: roles.id, // ⬅️ IMPORTANTE: Agregar el ID del rol
      })
      .from(users)
      .leftJoin(usuario_roles, eq(usuario_roles.usuario_id, users.id))
      .leftJoin(roles, eq(roles.id, usuario_roles.rol_id))
      .orderBy(desc(users.creado_en))

    return NextResponse.json(usuariosList)
  } catch (error) {
    console.error("[usuarios] Error al obtener usuarios:", error)
    return NextResponse.json({ error: "Error al obtener usuarios" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validación básica
    if (!data.nombre || !data.email || !data.password) {
      return NextResponse.json({ error: "Nombre, email y password son obligatorios" }, { status: 400 })
    }

    const existingUser = await db.select().from(users).where(eq(users.email, data.email)).limit(1)

    if (existingUser.length > 0) {
      return NextResponse.json({ error: "El email ya existe" }, { status: 400 })
    }

    const hashedPassword = await hashPassword(data.password)
    
    // Crear usuario
    const newUser = await db
      .insert(users)
      .values({
        nombre: data.nombre,
        email: data.email,
        hash_pwd: hashedPassword,
        estado: data.estado || "activo", // ⬅️ Usar el estado proporcionado o "activo" por defecto
      })
      .returning()

    // Asignar rol si se proporciona
    if (newUser.length > 0 && data.rolId) {
      await db.insert(usuario_roles).values({
        usuario_id: newUser[0].id,
        rol_id: data.rolId,
      })
    }

    // Obtener el usuario creado con su rol
    const usuarioCompleto = await db
      .select({
        id: users.id,
        nombre: users.nombre,
        email: users.email,
        estado: users.estado,
        creado_en: users.creado_en,
        rol: roles.nombre,
        rol_id: roles.id,
      })
      .from(users)
      .where(eq(users.id, newUser[0].id))
      .leftJoin(usuario_roles, eq(usuario_roles.usuario_id, users.id))
      .leftJoin(roles, eq(roles.id, usuario_roles.rol_id))
      .limit(1)

    return NextResponse.json(usuarioCompleto[0], { status: 201 })
  } catch (error) {
    console.error("[usuarios] Error creating user:", error)
    return NextResponse.json({ error: "Error al crear usuario" }, { status: 500 })
  }
}