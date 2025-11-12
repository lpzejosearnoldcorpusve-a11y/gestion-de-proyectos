"use client"

import { InmueblesList } from "@/components/inmuebles/inmuebles-list"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"

export default function InmueblesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Inmuebles</h1>
          <p className="text-muted-foreground">Administra el catálogo de inmuebles y propiedades</p>
        </div>
        <InmueblesList />
      </div>
    </DashboardLayout>
  )
}
