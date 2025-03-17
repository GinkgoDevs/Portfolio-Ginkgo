"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type AccessibilityContextType = {
  highContrast: boolean
  toggleHighContrast: () => void
  fontSize: number
  increaseFontSize: () => void
  decreaseFontSize: () => void
  resetFontSize: () => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [highContrast, setHighContrast] = useState(false)
  const [fontSize, setFontSize] = useState(100)

  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === "undefined") return

    const savedHighContrast = localStorage.getItem("highContrast") === "true"
    const savedFontSize = Number.parseInt(localStorage.getItem("fontSize") || "100")

    setHighContrast(savedHighContrast)
    setFontSize(savedFontSize)
  }, [])

  // Apply high contrast class to the document body
  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === "undefined") return

    if (highContrast) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }
  }, [highContrast])

  const toggleHighContrast = () => {
    setHighContrast((prev) => {
      const newValue = !prev
      localStorage.setItem("highContrast", String(newValue))
      return newValue
    })
  }

  // Modificar el rango de tamaño de texto para permitir hasta 150%
  const increaseFontSize = () => {
    setFontSize((prev) => {
      const newSize = Math.min(prev + 10, 150)
      localStorage.setItem("fontSize", String(newSize))
      return newSize
    })
  }

  const decreaseFontSize = () => {
    setFontSize((prev) => {
      const newSize = Math.max(prev - 10, 80)
      localStorage.setItem("fontSize", String(newSize))
      return newSize
    })
  }

  const resetFontSize = () => {
    setFontSize(100)
    localStorage.setItem("fontSize", "100")
  }

  // Apply font size to the document root
  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === "undefined") return

    // Aplicar el tamaño de fuente directamente al elemento html
    document.documentElement.style.fontSize = `${fontSize}%`

    // Eliminar todas las clases de tamaño de texto anteriores
    const sizeClasses = [
      "text-size-80",
      "text-size-90",
      "text-size-100",
      "text-size-110",
      "text-size-120",
      "text-size-130",
      "text-size-140",
      "text-size-150",
    ]

    sizeClasses.forEach((cls) => {
      document.documentElement.classList.remove(cls)
    })

    // Añadir la clase correspondiente al tamaño actual
    document.documentElement.classList.add(`text-size-${fontSize}`)
  }, [fontSize])

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        toggleHighContrast,
        fontSize,
        increaseFontSize,
        decreaseFontSize,
        resetFontSize,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider")
  }
  return context
}

