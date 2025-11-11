export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-linear-to-br from-accent to-primary rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-lg">G</span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-lg text-foreground">GestioTerreno</span>
        <span className="text-xs text-muted-foreground">Sistema de Gestión</span>
      </div>
    </div>
  )
}
