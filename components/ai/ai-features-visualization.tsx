"use client"

import { Card } from "@/components/ui/card"
import type { CaracteristicasML } from "@/types/documento"
import {
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { AlertCircle, TrendingUp, Zap, Shield } from "lucide-react"

interface AIFeaturesVisualizationProps {
  caracteristicas: CaracteristicasML
  puntuacionRiesgo: number
}

export function AIFeaturesVisualization({ caracteristicas, puntuacionRiesgo }: AIFeaturesVisualizationProps) {
  // Datos normalizados para el radar
  const radarData = [
    {
      metric: "Pisos Exceso",
      value: Math.min(caracteristicas.pisos_exceso * 20, 100),
    },
    {
      metric: "Altura Exceso",
      value: Math.min((caracteristicas.altura_exceso_m / 20) * 100, 100),
    },
    {
      metric: "Área Afectada",
      value: Math.min((caracteristicas.area_afectada_m2 / 500) * 100, 100),
    },
    {
      metric: "Sin Permiso",
      value: caracteristicas.sin_permiso_bin * 100,
    },
    {
      metric: "Infracciones",
      value: Math.min(caracteristicas.hist_infracciones_area * 10, 100),
    },
    {
      metric: "Cercanía Vía",
      value: Math.min(100 - caracteristicas.distancia_via_principal / 5, 100),
    },
  ]

  // Distribución por zona
  const zoneData = [
    { zona: "LP-01 Centro", riesgo: 65 },
    { zona: "LP-02 Zona Sur", riesgo: 45 },
    { zona: "LP-03 Zona Norte", riesgo: 35 },
  ]

  const tipoUsoColor = {
    residencial: "from-blue-500 to-cyan-500",
    comercial: "from-orange-500 to-red-500",
    mixto: "from-purple-500 to-pink-500",
    industrial: "from-gray-500 to-slate-500",
  }

  const getRiskColor = (score: number) => {
    if (score < 30) return "from-green-500 to-emerald-500"
    if (score < 60) return "from-yellow-500 to-amber-500"
    if (score < 80) return "from-orange-500 to-red-500"
    return "from-red-600 to-purple-600"
  }

  const getRiskLabel = (score: number) => {
    if (score < 30) return "Bajo"
    if (score < 60) return "Medio"
    if (score < 80) return "Alto"
    return "Crítico"
  }

  return (
    <div className="space-y-6">
      {/* Score de Riesgo Principal */}
      <Card className="p-6 border-border bg-linear-to-br from-card to-card/50 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl -z-10" />

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">Puntuación de Riesgo IA</h3>
            <div
              className={`w-32 h-32 rounded-full bg-gradient-to-br ${getRiskColor(puntuacionRiesgo)} flex items-center justify-center relative`}
            >
              <div className="absolute inset-2 bg-card rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">{puntuacionRiesgo}</div>
                  <div className="text-xs text-muted-foreground mt-1">{getRiskLabel(puntuacionRiesgo)}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="grid grid-cols-2 gap-3 h-full">
              <div className="bg-secondary/20 rounded-lg p-4 border border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-semibold text-muted-foreground">Tipo de Uso</span>
                </div>
                <p className="text-lg font-bold text-foreground capitalize">{caracteristicas.tipo_uso}</p>
                <p className="text-xs text-muted-foreground mt-1">Categoría principal</p>
              </div>

              <div className="bg-secondary/20 rounded-lg p-4 border border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-semibold text-muted-foreground">Zona Regulatoria</span>
                </div>
                <p className="text-lg font-bold text-foreground">{caracteristicas.zona}</p>
                <p className="text-xs text-muted-foreground mt-1">Código administrativo</p>
              </div>

              <div className="bg-secondary/20 rounded-lg p-4 border border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-orange-400" />
                  <span className="text-xs font-semibold text-muted-foreground">Permiso Legal</span>
                </div>
                <p className="text-lg font-bold text-foreground">
                  {caracteristicas.sin_permiso_bin === 1 ? "Sin Permiso" : "Con Permiso"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Estado normativo</p>
              </div>

              <div className="bg-secondary/20 rounded-lg p-4 border border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-red-400" />
                  <span className="text-xs font-semibold text-muted-foreground">Infracciones</span>
                </div>
                <p className="text-lg font-bold text-foreground">{caracteristicas.hist_infracciones_area}</p>
                <p className="text-xs text-muted-foreground mt-1">Antecedentes registrados</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Radar Chart - Análisis Multidimensional */}
      <Card className="p-6 border-border bg-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Análisis Multidimensional de Riesgo</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarAngleAxis dataKey="metric" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <Radar
                name="Nivel de Riesgo"
                dataKey="value"
                stroke="hsl(59 89.8% 50.8%)"
                fill="hsl(59 89.8% 50.8%)"
                fillOpacity={0.25}
              />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Detalles de Características */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Excesos Detectados */}
        <Card className="p-6 border-border bg-card">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-400" />
            Excesos Detectados
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/30">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-muted-foreground">Pisos en Exceso</span>
                <span className="text-lg font-bold text-orange-400">{caracteristicas.pisos_exceso}</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-orange-500 h-2 rounded-full"
                  style={{ width: `${Math.min(caracteristicas.pisos_exceso * 20, 100)}%` }}
                />
              </div>
            </div>

            <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/30">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-muted-foreground">Altura en Exceso (m)</span>
                <span className="text-lg font-bold text-red-400">{caracteristicas.altura_exceso_m}</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${Math.min((caracteristicas.altura_exceso_m / 20) * 100, 100)}%` }}
                />
              </div>
            </div>

            <div className="p-3 bg-rose-500/10 rounded-lg border border-rose-500/30">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-muted-foreground">Área Afectada (m²)</span>
                <span className="text-lg font-bold text-rose-400">{caracteristicas.area_afectada_m2}</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-rose-500 h-2 rounded-full"
                  style={{ width: `${Math.min((caracteristicas.area_afectada_m2 / 500) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Ubicación y Contexto */}
        <Card className="p-6 border-border bg-card">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" />
            Ubicación y Contexto
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
              <p className="text-xs text-muted-foreground mb-2">Distancia a Vía Principal</p>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-blue-400">{caracteristicas.distancia_via_principal}</span>
                <span className="text-sm text-muted-foreground mb-1">metros</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {caracteristicas.distancia_via_principal < 50
                  ? "Muy cercano a vía principal (mayor impacto vial)"
                  : caracteristicas.distancia_via_principal < 200
                    ? "Cercano a vía principal (impacto moderado)"
                    : "Alejado de vía principal (bajo impacto)"}
              </p>
            </div>

            <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
              <p className="text-xs text-muted-foreground mb-3">Historial de Infracciones en Zona</p>
              <div className="grid grid-cols-3 gap-2">
                {[...Array(Math.max(1, caracteristicas.hist_infracciones_area))].map((_, i) => (
                  <div key={i} className="h-8 bg-purple-500 rounded animate-pulse" />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                <strong>{caracteristicas.hist_infracciones_area}</strong> infracciones registradas en esta zona
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Distribución por Zona - Contexto Regional */}
      <Card className="p-6 border-border bg-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Comparativa de Riesgo por Zona (La Paz)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={zoneData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="zona" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} domain={[0, 100]} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Legend />
              <Bar dataKey="riesgo" fill="hsl(59 89.8% 50.8%)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}
