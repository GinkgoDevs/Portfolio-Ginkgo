"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

interface FallingLeavesOptimizedProps {
  className?: string
  mobileOnly?: boolean
}

export default function FallingLeavesOptimized({ className = "", mobileOnly = false }: FallingLeavesOptimizedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Detectar si estamos en un dispositivo móvil y si el usuario prefiere reducir el movimiento
  useEffect(() => {
    // Verificar si estamos en el cliente
    if (typeof window === "undefined") return

    // Detectar si es un dispositivo móvil
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768
      setIsMobile(isMobileDevice)

      // Solo renderizar si:
      // - No es solo para móviles O
      // - Es solo para móviles Y estamos en un dispositivo móvil
      setShouldRender(!mobileOnly || (mobileOnly && isMobileDevice))
    }

    // Detectar preferencia de reducción de movimiento
    const checkReducedMotion = () => {
      setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    }

    checkMobile()
    checkReducedMotion()

    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [mobileOnly])

  // Si el usuario prefiere reducir el movimiento, no mostrar la animación
  if (prefersReducedMotion) return null

  // Si no debemos renderizar según la configuración, no mostrar nada
  if (!shouldRender) return null

  return (
    <div ref={containerRef} className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Versión optimizada con imágenes estáticas para móviles */}
      <div className="relative w-full h-full">
        {/* Capa de fondo con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#293B36]/0 to-[#293B36] z-10"></div>

        {/* Primera capa - hojas grandes y lentas, bien espaciadas */}
        <div className="absolute top-0 left-[15%] w-10 h-10 opacity-70 animate-leaf-fall-slow-1">
          <Image
            src="/Logos/SVG/hoja-l.svg"
            alt=""
            width={40}
            height={40}
            className="w-full h-full animate-leaf-spin-slow"
          />
        </div>

        <div className="absolute top-0 left-[45%] w-12 h-12 opacity-65 animate-leaf-fall-slow-2">
          <Image
            src="/Logos/SVG/hoja-l.svg"
            alt=""
            width={48}
            height={48}
            className="w-full h-full animate-leaf-spin-reverse-slow"
          />
        </div>

        <div className="absolute top-0 left-[75%] w-11 h-11 opacity-70 animate-leaf-fall-slow-3">
          <Image
            src="/Logos/SVG/hoja-l.svg"
            alt=""
            width={44}
            height={44}
            className="w-full h-full animate-leaf-spin-slow"
          />
        </div>

        {/* Segunda capa - hojas medianas con velocidad media */}
        <div className="absolute top-0 left-[30%] w-8 h-8 opacity-65 animate-leaf-fall-medium-1">
          <Image
            src="/Logos/SVG/hoja-l.svg"
            alt=""
            width={32}
            height={32}
            className="w-full h-full animate-leaf-spin-medium"
          />
        </div>

        <div className="absolute top-0 left-[60%] w-9 h-9 opacity-70 animate-leaf-fall-medium-2">
          <Image
            src="/Logos/SVG/hoja-l.svg"
            alt=""
            width={36}
            height={36}
            className="w-full h-full animate-leaf-spin-reverse-medium"
          />
        </div>

        {/* Tercera capa - hojas pequeñas y rápidas */}
        <div className="absolute top-0 left-[20%] w-6 h-6 opacity-60 animate-leaf-fall-fast-1">
          <Image
            src="/Logos/SVG/hoja-l.svg"
            alt=""
            width={24}
            height={24}
            className="w-full h-full animate-leaf-spin-fast"
          />
        </div>

        <div className="absolute top-0 left-[50%] w-5 h-5 opacity-65 animate-leaf-fall-fast-2">
          <Image
            src="/Logos/SVG/hoja-l.svg"
            alt=""
            width={20}
            height={20}
            className="w-full h-full animate-leaf-spin-reverse-fast"
          />
        </div>

        <div className="absolute top-0 left-[80%] w-7 h-7 opacity-60 animate-leaf-fall-fast-3">
          <Image
            src="/Logos/SVG/hoja-l.svg"
            alt=""
            width={28}
            height={28}
            className="w-full h-full animate-leaf-spin-fast"
          />
        </div>

      
      </div>
    </div>
  )
}
