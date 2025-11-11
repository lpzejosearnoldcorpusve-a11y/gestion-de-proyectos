"use client"

import { useEffect, useState } from "react"

export function WelcomeAnimation() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="space-y-6">
      <div
        className={`transform transition-all duration-1000 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <h1 className="text-4xl font-bold bg-linear-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
          Bienvenido a GestioTerreno
        </h1>
      </div>
      <div
        className={`transform transition-all duration-1000 delay-200 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <p className="text-lg text-muted-foreground">Tu plataforma integral de documentación y solicitud de permisos</p>
      </div>
    </div>
  )
}
