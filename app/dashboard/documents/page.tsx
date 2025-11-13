"use client"

import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { DocumentosList } from "@/components/documentos/documentos-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function DocumentsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Documentos</h1>
            <p className="text-muted-foreground">Gestión de documentos y validación con ML</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            Nuevo Documento
          </Button>
        </div>

        <DocumentosList />
      </div>
    </DashboardLayout>
  )
}
