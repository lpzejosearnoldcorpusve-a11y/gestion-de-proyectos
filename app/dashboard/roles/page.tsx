"use client"

import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { RolesList } from "@/components/roles/roles-list"
import { RoleForm } from "@/components/roles/role-form"

export default function RolesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Gestión de Roles</h1>
          <p className="text-gray-600 mt-2">Administra los roles y permisos del sistema</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RolesList />
          </div>
          <div>
            <RoleForm />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
