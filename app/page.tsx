"use client"

import { WelcomeAnimation } from "@/components/animations/welcome-animation"
import { LoginForm } from "@/components/forms/login-form"
import { Logo } from "@/components/common/logo"

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-primary/5 to-background flex items-center justify-center p-4">
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full">
        {/* Left side - Welcome */}
        <div className="flex flex-col justify-center space-y-8">
          <WelcomeAnimation />
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Gestiona tus permisos fácilmente</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold mt-1">✓</span>
                <span>Solicita y gestiona permisos de terrenos y casas</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold mt-1">✓</span>
                <span>Acceso centralizado a toda tu documentación</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent font-bold mt-1">✓</span>
                <span>Seguimiento en tiempo real de tus solicitudes</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-sm bg-card border border-border rounded-2xl p-8 shadow-2xl">
            <div className="flex justify-center mb-8">
              <Logo />
            </div>
            <h3 className="text-2xl font-bold text-center text-foreground mb-2">Inicia Sesión</h3>
            <p className="text-center text-muted-foreground text-sm mb-8">Accede a tu cuenta para continuar</p>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}
