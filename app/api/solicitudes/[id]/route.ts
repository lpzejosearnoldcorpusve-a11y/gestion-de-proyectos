import { type NextRequest, NextResponse } from "next/server"

export async function PUT(
  req: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    
    const updated = {
      id: id,
      ...body,
      actualizado_en: new Date(),
    }
    
    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar solicitud" }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    return NextResponse.json({ success: true, deletedId: id })
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar solicitud" }, { status: 500 })
  }
}