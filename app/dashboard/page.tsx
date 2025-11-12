"use client"

import { useAuth } from "@/hooks/use-auth"
import { usePermissions } from "@/hooks/use-permissions"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { Card } from "@/components/ui/card"
import { FileText, PlusCircle, Clock, CheckCircle } from "lucide-react"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const { permissions } = usePermissions()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const stats = [
    {
      icon: FileText,
      label: "Documentos",
      value: permissions.length.toString(),
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Clock,
      label: "Pendientes",
      value: permissions.filter((p) => p.status === "pendiente").length.toString(),
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: CheckCircle,
      label: "Completadas",
      value: permissions.filter((p) => p.status === "aprobado").length.toString(),
      color: "from-green-500 to-emerald-500",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bienvenido, {user.name}</h1>
          <p className="text-muted-foreground mt-2">Visualiza el estado de tus documentos y solicitudes de permisos</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6 border-border bg-card hover:border-accent/50 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                </div>
                <div
                  className={`w-12 h-12 bg-linear-to-br ${stat.color} rounded-lg flex items-center justify-center`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="p-6 border-border bg-card">
          <h2 className="text-xl font-bold text-foreground mb-4">Acciones Rápidas</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <button className="flex items-center gap-3 p-4 rounded-lg bg-linear-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground transition-all font-medium">
              <PlusCircle className="w-5 h-5" />
              Nueva Solicitud
            </button>
            <button className="flex items-center gap-3 p-4 rounded-lg bg-secondary/20 hover:bg-secondary/30 text-foreground transition-all font-medium border border-border">
              <FileText className="w-5 h-5" />
              Ver Documentos
            </button>
          </div>
        </Card>

        {/* Recent Permissions */}
        <Card className="p-6 border-border bg-card">
          <h2 className="text-xl font-bold text-foreground mb-4">Solicitudes Recientes</h2>
          <div className="space-y-3">
            {permissions.slice(0, 3).map((permission) => (
              <div
                key={permission.id}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/10 border border-border"
              >
                <div>
                  <p className="font-medium text-foreground">{permission.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {permission.type === "terreno" ? "Terreno" : "Casa"} • {permission.date}
                  </p>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    permission.status === "aprobado"
                      ? "bg-green-500/20 text-green-400"
                      : permission.status === "pendiente"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {permission.status === "aprobado"
                    ? "Aprobado"
                    : permission.status === "pendiente"
                      ? "Pendiente"
                      : "Rechazado"}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
