"use client"

import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { AIFeaturesVisualization } from "@/components/ai/ai-features-visualization"
import { Spinner } from "@/components/ui/spinner"
import type { CaracteristicasML } from "@/types/documento"
import { Brain } from "lucide-react"

export default function AIAnalyticsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [solicitudesRiesgo, setSolicitudesRiesgo] = useState<
    Array<{
      id: string
      inmueble: string
      riesgo: number
      caracteristicas: CaracteristicasML
    }>
  >([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    // Simular carga de datos de IA
    const timer = setTimeout(() => {
      setSolicitudesRiesgo([
        {
          id: "1",
          inmueble: "AV-MURILLO-123",
          riesgo: 75,
          caracteristicas: {
            pisos_exceso: 2,
            altura_exceso_m: 8.5,
            area_afectada_m2: 245,
            sin_permiso_bin: 1,
            tipo_uso: "residencial",
            zona: "LP-01 Centro",
            hist_infracciones_area: 3,
            distancia_via_principal: 25,
          },
        },
        {
          id: "2",
          inmueble: "ZONA-SUR-456",
          riesgo: 45,
          caracteristicas: {
            pisos_exceso: 1,
            altura_exceso_m: 3.2,
            area_afectada_m2: 120,
            sin_permiso_bin: 0,
            tipo_uso: "comercial",
            zona: "LP-02 Zona Sur",
            hist_infracciones_area: 1,
            distancia_via_principal: 180,
          },
        },
        {
          id: "3",
          inmueble: "NORTE-789",
          riesgo: 28,
          caracteristicas: {
            pisos_exceso: 0,
            altura_exceso_m: 0,
            area_afectada_m2: 0,
            sin_permiso_bin: 0,
            tipo_uso: "mixto",
            zona: "LP-03 Zona Norte",
            hist_infracciones_area: 0,
            distancia_via_principal: 320,
          },
        },
      ])
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) return null

  if (!user) return null

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold text-foreground">IA Analytics</h1>
          </div>
          <p className="text-muted-foreground">
            Sistema de predicción y análisis de riesgo infraccional con Machine Learning
          </p>
        </div>

        {/* Stats de IA */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="p-4 border-border bg-card">
            <p className="text-xs text-muted-foreground font-semibold mb-2">SOLICITUDES ANALIZADAS</p>
            <p className="text-2xl font-bold text-foreground">127</p>
            <p className="text-xs text-green-400 mt-2">+12% esta semana</p>
          </Card>
          <Card className="p-4 border-border bg-card">
            <p className="text-xs text-muted-foreground font-semibold mb-2">PRECISIÓN DEL MODELO</p>
            <p className="text-2xl font-bold text-foreground">94.2%</p>
            <p className="text-xs text-blue-400 mt-2">Accuracy en validación</p>
          </Card>
          <Card className="p-4 border-border bg-card">
            <p className="text-xs text-muted-foreground font-semibold mb-2">CASOS CRÍTICOS</p>
            <p className="text-2xl font-bold text-red-400">8</p>
            <p className="text-xs text-orange-400 mt-2">Requieren revisión inmediata</p>
          </Card>
          <Card className="p-4 border-border bg-card">
            <p className="text-xs text-muted-foreground font-semibold mb-2">TIEMPO PROMEDIO</p>
            <p className="text-2xl font-bold text-foreground">2.3s</p>
            <p className="text-xs text-purple-400 mt-2">Análisis por solicitud</p>
          </Card>
        </div>

        {/* Solicitudes con Análisis IA */}
        {loading ? (
          <Card className="p-12 border-border bg-card flex items-center justify-center">
            <div className="text-center">
              <Spinner className="w-8 h-8 mx-auto mb-4" />
              <p className="text-muted-foreground">Analizando características con IA...</p>
            </div>
          </Card>
        ) : (
          <div className="space-y-6">
            {solicitudesRiesgo.map((solicitud, idx) => (
              <div key={solicitud.id} className="space-y-4">
                <Card className="p-4 border-border bg-card/50 backdrop-blur">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Brain className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{solicitud.inmueble}</h3>
                        <p className="text-xs text-muted-foreground">ID: {solicitud.id}</p>
                      </div>
                    </div>
                    <div
                      className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                        solicitud.riesgo < 30
                          ? "bg-green-500/20 text-green-400"
                          : solicitud.riesgo < 60
                            ? "bg-yellow-500/20 text-yellow-400"
                            : solicitud.riesgo < 80
                              ? "bg-orange-500/20 text-orange-400"
                              : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      Riesgo: {solicitud.riesgo}%
                    </div>
                  </div>
                </Card>

                <AIFeaturesVisualization
                  caracteristicas={solicitud.caracteristicas}
                  puntuacionRiesgo={solicitud.riesgo}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
