"use client"

import { CheckCircle2, Clock, AlertCircle } from "lucide-react"

interface TimelineStep {
  label: string
  status: "completed" | "current" | "pending"
}

interface EstadoTimelineProps {
  currentEstado: string
}

export function EstadoTimeline({ currentEstado }: EstadoTimelineProps) {
  const steps: TimelineStep[] = [
    {
      label: "En Trámite",
      status: currentEstado === "en_tramite" ? "current" : currentEstado === "en_tramite" ? "completed" : "pending",
    },
    {
      label: "En Revisión",
      status: currentEstado === "en_revision" ? "current" : currentEstado === "aprobado" ? "completed" : "pending",
    },
    { label: "Aprobado", status: currentEstado === "aprobado" ? "current" : "pending" },
  ]

  return (
    <div className="space-y-4 animate-in fade-in">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="flex items-center">
              {step.status === "completed" && <CheckCircle2 className="w-8 h-8 text-green-600" />}
              {step.status === "current" && <Clock className="w-8 h-8 text-blue-600 animate-spin" />}
              {step.status === "pending" && <AlertCircle className="w-8 h-8 text-gray-400" />}
              {index < steps.length - 1 && (
                <div className={`w-12 h-1 mx-2 ${step.status === "completed" ? "bg-green-600" : "bg-gray-300"}`} />
              )}
            </div>
            <p className="text-xs mt-2 text-center font-medium">{step.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
