"use client"

import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { UsersList } from "@/components/users/users-list"
import { UserForm } from "@/components/users/user-form"

export default function UsuariosPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Gestión de Usuarios</h1>
          <p className="text-gray-600 mt-2">Administra todos los usuarios del sistema</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <UsersList />
          </div>
          <div>
            <UserForm />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
