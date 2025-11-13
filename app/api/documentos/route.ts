import { type NextRequest, NextResponse } from "next/server"

const mockDocumentos = [
  {
    id: "doc-1",
    inmueble_id: "1",
    tipo: "plano",
    nombre: "Plano Arquitectónico - La Paz Centro",
    url: "/documents/plano-la-paz.pdf",
    estado: "validado",
    caracteristicas_ml: {
      pisos_exceso: 2,
      altura_exceso_m: 8.5,
      area_afectada_m2: 450,
      sin_permiso_bin: 1,
      tipo_uso: "comercial",
      zona: "LP-01",
      hist_infracciones_area: 3,
      distancia_via_principal: 25,
    },
    creado_en: new Date("2024-11-05"),
    validado_en: new Date("2024-11-08"),
  },
  {
    id: "doc-2",
    inmueble_id: "2",
    tipo: "foto",
    nombre: "Foto estado actual - Calle Murillo",
    url: "/documents/foto-calle-murillo.jpg",
    estado: "pendiente",
    caracteristicas_ml: {
      pisos_exceso: 0,
      altura_exceso_m: 0,
      area_afectada_m2: 0,
      sin_permiso_bin: 0,
      tipo_uso: "residencial",
      zona: "LP-02",
      hist_infracciones_area: 0,
      distancia_via_principal: 45,
    },
    creado_en: new Date("2024-11-10"),
  },
  {
    id: "doc-3",
    inmueble_id: "3",
    tipo: "certificado",
    nombre: "Certificado catastral - Zona Sur",
    url: "/documents/cert-zona-sur.pdf",
    estado: "rechazado",
    caracteristicas_ml: {
      pisos_exceso: 1,
      altura_exceso_m: 3.2,
      area_afectada_m2: 280,
      sin_permiso_bin: 1,
      tipo_uso: "mixto",
      zona: "LP-03",
      hist_infracciones_area: 2,
      distancia_via_principal: 60,
    },
    creado_en: new Date("2024-10-30"),
    validado_en: new Date("2024-11-02"),
  },
]

export async function GET() {
  return NextResponse.json(mockDocumentos)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const newDocumento = {
      id: `doc-${Date.now()}`,
      ...body,
      creado_en: new Date(),
    }
    return NextResponse.json(newDocumento, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Error al crear documento" }, { status: 500 })
  }
}
