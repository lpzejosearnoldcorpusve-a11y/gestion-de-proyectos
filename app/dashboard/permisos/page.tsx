"use client"

import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { PermissionsList } from "@/components/permissions/permissions-list"

export default function PermisosPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Gestión de Permisos</h1>
          <p className="text-gray-600 mt-2">Administra los permisos disponibles en el sistema</p>
        </div>

        <PermissionsList />
      </div>
    </DashboardLayout>
  )
}
