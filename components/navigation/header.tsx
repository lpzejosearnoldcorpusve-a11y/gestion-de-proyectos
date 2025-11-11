"use client"

import { Menu, Bell, Search } from "lucide-react"
import { UserMenu } from "@/components/common/user-menu"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      <button onClick={onMenuClick} className="lg:hidden p-2 hover:bg-secondary/20 rounded-lg transition-colors">
        <Menu className="w-6 h-6" />
      </button>

      <div className="hidden md:flex flex-1 mx-6 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-secondary/20 rounded-lg transition-colors relative">
          <Bell className="w-6 h-6 text-muted-foreground hover:text-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <UserMenu userName="Juan Pérez" userEmail="juan@gestioTerreno.com" />
      </div>
    </header>
  )
}
