"use client"

import { useState } from "react"
import type { Inmueble } from "@/types/inmuebles"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X } from "lucide-react"
import { InmuebleTabInfo } from "./inmueble-tab-info"
import { PermisosConstruccionTab } from "./permisos-construccion-tab"
import { VecinosTab } from "./vecinos-tab"
import { UbicacionTab } from "./ubicacion-tab"
import { ExpedientesTab } from "./expedientes-tab"

interface InmuebleDetailModalProps {
  inmueble: Inmueble
  onClose: () => void
}

export function InmuebleDetailModal({ inmueble, onClose }: InmuebleDetailModalProps) {
  const [activeTab, setActiveTab] = useState("info")

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{inmueble.cod_catastral}</DialogTitle>
          <DialogClose asChild>
            <button className="absolute right-4 top-4">
              <X className="w-4 h-4" />
            </button>
          </DialogClose>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="info">Información</TabsTrigger>
            <TabsTrigger value="permisos">Permisos</TabsTrigger>
            <TabsTrigger value="vecinos">Vecinos</TabsTrigger>
            <TabsTrigger value="ubicacion">Ubicación</TabsTrigger>
            <TabsTrigger value="expedientes">Expedientes</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4 mt-4">
            <InmuebleTabInfo inmueble={inmueble} />
          </TabsContent>

          <TabsContent value="permisos" className="space-y-4 mt-4">
            <PermisosConstruccionTab inmuebleId={inmueble.id} />
          </TabsContent>

          <TabsContent value="vecinos" className="space-y-4 mt-4">
            <VecinosTab inmuebleId={inmueble.id} />
          </TabsContent>

          <TabsContent value="ubicacion" className="space-y-4 mt-4">
            <UbicacionTab inmuebleId={inmueble.id} />
          </TabsContent>

          <TabsContent value="expedientes" className="space-y-4 mt-4">
            <ExpedientesTab inmuebleId={inmueble.id} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
