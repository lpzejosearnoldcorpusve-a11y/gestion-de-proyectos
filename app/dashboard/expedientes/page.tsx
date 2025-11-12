"use client"

import { ExpedientesList } from "@/components/expedientes/expedientes-list"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"

export default function ExpedientesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Expedientes</h1>
          <p className="text-muted-foreground">Administra los expedientes de solicitud de permisos y construcción</p>
        </div>
        <ExpedientesList />
      </div>
    </DashboardLayout>
  )
}
