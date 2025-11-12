"use client"

import * as React from "react"
import { cn } from "@/lib/utils" 

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl"
}

export function Spinner({ size = "md", className, ...props }: SpinnerProps) {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-8 w-8 border-[3px]",
    xl: "h-12 w-12 border-[4px]",
  }

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-muted border-t-current",
        sizes[size],
        className
      )}
      {...props}
    />
  )
}
