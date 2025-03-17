"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function ScrollToSection() {
  // Este componente usa useSearchParams() que requiere Suspense
  const searchParams = useSearchParams()

  useEffect(() => {
    // Verificar si hay un parámetro de sección en la URL
    if (!searchParams) return

    const section = searchParams.get("section")
    if (!section) return

    // Asegurarse de que section es un string
    const sectionId = String(section)

    const targetElement = document.getElementById(sectionId)
    if (!targetElement) return

    // Dar tiempo a que la página se cargue completamente
    setTimeout(() => {
      try {
        // Calcular offset para tener en cuenta la altura de la barra de navegación
        const navHeight = 80 // Altura aproximada de la barra de navegación
        const elementPosition = targetElement.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - navHeight

        // Scroll suave a la sección con offset
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      } catch (error) {
        console.error("Error scrolling to section:", error)
      }
    }, 500)
  }, [searchParams])

  return null // Este componente no renderiza nada visible
}

