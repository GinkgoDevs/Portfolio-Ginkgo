"use client"

import { useState, useEffect } from "react"
import { useAccessibility } from "./AccessibilityProvider"
import { Accessibility, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"
import { useTheme } from "next-themes"
import { useTranslation } from "@/contexts/TranslationContext"
import { useMenuState } from "./Hero/Navbar" // Importar el hook para el estado del menú

export default function AccessibilityControls() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const { highContrast, toggleHighContrast, fontSize, increaseFontSize, decreaseFontSize, resetFontSize } =
    useAccessibility()
  const { theme, setTheme } = useTheme()
  const menuState = useMenuState() // Obtener el estado del menú

  // Añadir un nuevo estado para controlar la visibilidad basada en el estado del menú
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  // Añadir un efecto para escuchar el evento personalizado
  useEffect(() => {
    const handleMenuStateChange = (e: CustomEvent) => {
      setMenuIsOpen(e.detail.isOpen)
    }

    // Añadir el event listener
    document.addEventListener("menuStateChange", handleMenuStateChange as EventListener)

    // Limpiar el event listener
    return () => {
      document.removeEventListener("menuStateChange", handleMenuStateChange as EventListener)
    }
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Si el menú está abierto, no mostrar el componente
  if (menuIsOpen) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Botón principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-[#D4F57A] text-[#293B36] flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4F57A] focus:ring-offset-[#293B36]"
        aria-label={isOpen ? "Cerrar menú de accesibilidad" : "Abrir menú de accesibilidad"}
      >
        <Accessibility className="w-6 h-6" />
      </button>

      {/* Panel de controles */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-[#1E2C29] border border-[#D4F57A]/20 rounded-lg shadow-xl p-4 w-64">
          <h3 className="text-white font-medium mb-3 text-sm">{t("accessibility.options")}</h3>

          <div className="space-y-3">
            {/* Control de contraste */}
            <div className="flex items-center justify-between">
              <span className="text-white/80 text-sm">{t("accessibility.highContrast")}</span>
              <button
                onClick={toggleHighContrast}
                className={`relative w-10 h-5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4F57A] ${
                  highContrast ? "bg-[#D4F57A]" : "bg-white/20"
                }`}
                aria-label={highContrast ? "Desactivar alto contraste" : "Activar alto contraste"}
                aria-pressed={highContrast}
                role="switch"
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                    highContrast ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Control de tamaño de texto */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80 text-sm">
                  {t("accessibility.fontSize")} ({fontSize}%)
                </span>
                <button
                  onClick={resetFontSize}
                  className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4F57A]"
                  aria-label="Restablecer tamaño de texto"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={decreaseFontSize}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex-1 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#D4F57A]"
                  aria-label="Disminuir tamaño de texto"
                  disabled={fontSize <= 80}
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={increaseFontSize}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex-1 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#D4F57A]"
                  aria-label="Aumentar tamaño de texto"
                  disabled={fontSize >= 140}
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

