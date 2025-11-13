"use client"

import { Logo } from "@/components/common/logo"
import { FileText, Home, Send, BarChart3, Settings, Users, Shield, Lock, Building2, Brain } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

interface SidebarProps {
  isOpen: boolean
}

export function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname()
  const { hasPermission, user } = useAuth()

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard", permission: null },
    {
      icon: FileText,
      label: "Documentos",
      href: "/dashboard/documents",
      permission: "view_documents",
    },
    { icon: Send, label: "Solicitudes", href: "/dashboard/requests", permission: "view_requests" },
    {
      icon: BarChart3,
      label: "Reportes",
      href: "/dashboard/reports",
      permission: "view_reports",
    },
    {
      icon: Brain,
      label: "IA Analytics",
      href: "/dashboard/ai",
      permission: "manage_users",
    },
    {
      icon: Users,
      label: "Usuarios",
      href: "/dashboard/usuarios",
      permission: "manage_users",
    },
    {
      icon: Shield,
      label: "Roles",
      href: "/dashboard/roles",
      permission: "manage_roles",
    },
    {
      icon: Lock,
      label: "Permisos",
      href: "/dashboard/permisos",
      permission: "manage_permissions",
    },
    {
      icon: Building2,
      label: "Inmuebles",
      href: "/dashboard/inmuebles",
      permission: "view_inmuebles",
    },
    {
      icon: FileText,
      label: "Expedientes",
      href: "/dashboard/expedientes",
      permission: "view_expedientes",
    },
  ]

  const visibleItems = menuItems.filter((item) => !item.permission || hasPermission(item.permission))

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => isOpen} />}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-64 bg-card border-r border-border transition-transform duration-300 z-40 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 border-b border-border">
          <Logo />
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {visibleItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
                  isActive
                    ? "text-foreground bg-blue-600 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/20"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {user && (
          <div className="p-4 border-t border-border">
            <div className="text-xs text-muted-foreground mb-3">
              <p className="font-semibold text-foreground">{user.nombre}</p>
              <p>{user.roles.join(", ")}</p>
            </div>
            <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/20 transition-all">
              <Settings className="w-5 h-5" />
              <span className="font-medium">Configuración</span>
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
