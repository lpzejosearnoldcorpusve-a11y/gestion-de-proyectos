import { type NextRequest, NextResponse } from "next/server"

const mockSolicitudes = [
  {
    id: "sol-1",
    inmueble_id: "1",
    tipo: "licencia_construccion",
    estado: "revisando",
    prioridad: "alta",
    riesgo_infraccional: "alto",
    solicitante: "Juan Condori",
    descripcion: "Solicitud de licencia para ampliación comercial en zona central",
    documentos: ["doc-1"],
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
    actualizado_en: new Date("2024-11-10"),
    resultado_ia: {
      puntuacion: 0.72,
      riesgo: "ALTO",
      recomendacion: "Requiere revisión técnica por exceso de pisos",
    },
  },
  {
    id: "sol-2",
    inmueble_id: "2",
    tipo: "ampliacion",
    estado: "nueva",
    prioridad: "normal",
    riesgo_infraccional: "bajo",
    solicitante: "María La Torre",
    descripcion: "Ampliación residencial en sector norte",
    documentos: ["doc-2"],
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
    actualizado_en: new Date("2024-11-10"),
    resultado_ia: {
      puntuacion: 0.95,
      riesgo: "BAJO",
      recomendacion: "Aprobación automática recomendada",
    },
  },
  {
    id: "sol-3",
    inmueble_id: "3",
    tipo: "modificacion",
    estado: "rechazada",
    prioridad: "urgente",
    riesgo_infraccional: "critico",
    solicitante: "Roberto Chavez",
    descripcion: "Modificación de estructura - Zona Sur",
    documentos: ["doc-3"],
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
    actualizado_en: new Date("2024-11-02"),
    resultado_ia: {
      puntuacion: 0.15,
      riesgo: "CRITICO",
      recomendacion: "Rechazar - Incumple normativas de zona",
    },
  },
]

export async function GET() {
  return NextResponse.json(mockSolicitudes)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const newSolicitud = {
      id: `sol-${Date.now()}`,
      ...body,
      creado_en: new Date(),
      actualizado_en: new Date(),
    }
    return NextResponse.json(newSolicitud, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Error al crear solicitud" }, { status: 500 })
  }
}
