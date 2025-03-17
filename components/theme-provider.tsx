"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)

  // Asegurarse de que el componente solo se renderice completamente en el cliente
  useEffect(() => {
    setMounted(true)
  }, [])

  // Evitar problemas de hidratación renderizando solo los hijos cuando está montado
  if (!mounted) {
    return <>{children}</>
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

