"use client"

import { useState } from "react"
import { ChevronDown, LogOut, Settings, User } from "lucide-react"

interface UserMenuProps {
  userName?: string
  userEmail?: string
}

export function UserMenu({ userName = "Usuario", userEmail = "user@example.com" }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-card transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-linear-to-br from-accent to-primary flex items-center justify-center">
          <span className="text-white text-sm font-bold">{userName.charAt(0)}</span>
        </div>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg py-2 z-50">
          <div className="px-4 py-3 border-b border-border">
            <p className="font-semibold text-foreground">{userName}</p>
            <p className="text-sm text-muted-foreground">{userEmail}</p>
          </div>
          <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-secondary/20 transition-colors text-foreground">
            <User className="w-4 h-4" />
            <span>Mi Perfil</span>
          </button>
          <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-secondary/20 transition-colors text-foreground">
            <Settings className="w-4 h-4" />
            <span>Configuración</span>
          </button>
          <hr className="border-border my-2" />
          <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-destructive/10 transition-colors text-red-400">
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      )}
    </div>
  )
}
