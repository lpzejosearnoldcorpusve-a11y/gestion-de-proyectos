"use client"

import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { SolicitudesList } from "@/components/solicitudes/solicitudes-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function RequestsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Solicitudes</h1>
            <p className="text-muted-foreground">Gestión de solicitudes con análisis de riesgo IA</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            Nueva Solicitud
          </Button>
        </div>

        <SolicitudesList />
      </div>
    </DashboardLayout>
  )
}
