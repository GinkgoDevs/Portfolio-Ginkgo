"use client"

import type React from "react"
import { useRef, useState, useEffect, useMemo } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import DisintegrationEffect from "./DisintegrationEffect"
import { ShieldCheck, Users, RefreshCw, BookOpen, Sparkles, Smile } from "lucide-react"
import { useTranslation } from "@/contexts/TranslationContext"
import LazyLoad from "@/components/LazyLoad"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const teamMembers = [
  {
    name: "Nicolas Alonso",
    role: "Full Stack Developer",
    image: "/Integrantes/Nico.jpg", // Cambiado a placeholder mientras no exista la imagen
  },
  {
    name: "Federico Valle",
    role: "Full Stack Developer",
    image: "/Integrantes/Fede.jpg",
  },
]

export default function AboutUs() {
  const { t } = useTranslation()
  const [showValues, setShowValues] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const teamSectionRef = useRef<HTMLDivElement>(null)
  const valuesSectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const mobileCarouselRef = useRef<HTMLDivElement>(null)
  const [autoScrollInterval, setAutoScrollInterval] = useState<NodeJS.Timeout | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const dragRef = useRef({
    startX: 0,
    scrollLeft: 0,
    isDown: false,
    lastX: 0,
    velocity: 0,
    lastTimestamp: 0,
    momentumID: null as number | null,
  })

  const values = [
    {
      title: t("home.about.values.creativity"),
      description: t("home.about.values.creativityDesc"),
      icon: <Sparkles className="w-12 h-12" />,
    },
    {
      title: t("home.about.values.fun"),
      description: t("home.about.values.funDesc"),
      icon: <Smile className="w-12 h-12" />,
    },
    {
      title: t("home.about.values.collaboration"),
      description: t("home.about.values.collaborationDesc"),
      icon: <Users className="w-12 h-12" />,
    },
    {
      title: t("home.about.values.responsibility"),
      description: t("home.about.values.responsibilityDesc"),
      icon: <ShieldCheck className="w-12 h-12" />,
    },
    {
      title: t("home.about.values.adaptability"),
      description: t("home.about.values.adaptabilityDesc"),
      icon: <RefreshCw className="w-12 h-12" />,
    },
    {
      title: t("home.about.values.learning"),
      description: t("home.about.values.learningDesc"),
      icon: <BookOpen className="w-12 h-12" />,
    },
  ]

  const ScrollIndicator = () => (
    <div className="flex items-center gap-2 text-[#D4F57A]">
      <span className="text-sm">{t("home.about.scroll")}</span>
      <div className="w-12 h-1 bg-[#D4F57A]/30 rounded-full relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-3 bg-[#D4F57A] rounded-full animate-[slide_2s_infinite]"></div>
      </div>
    </div>
  )

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Desktop scroll animation
  useEffect(() => {
    if (isMobile || !sectionRef.current || !teamSectionRef.current || !valuesSectionRef.current || !titleRef.current)
      return

    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

    // Pre-position the values section below the viewport for smoother animation
    gsap.set(valuesSectionRef.current, {
      opacity: 0,
      y: 80,
      scale: 0.98,
    })

    // Create a timeline for the transition animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top", // Adjusted to start a bit higher
        end: "bottom top", // Reduced for smoother transition
        scrub: 0.5, // Reduced for less delay and smoother animation
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        onEnter: () => {
          setShowValues(false)
        },
        onLeaveBack: () => {
          setShowValues(false)
        },
        markers: false, // Desactivar en producción
      },
    })

    // Mejorar la secuencia de animación para una transición más suave
    // Primero, desvanecemos el título
    tl.to(
      titleRef.current,
      {
        opacity: 0,
        y: -50, // Reduced for smoother transition
        duration: 0.4,
        ease: "power2.out", // Añadido easing para suavizar
      },
      0.5,
    )

    // Luego, desvanecemos la sección del equipo
    tl.to(
      teamSectionRef.current,
      {
        opacity: 0,
        y: -120, // Aumentado para un movimiento más notable
        duration: 0.6,
        ease: "power2.out", // Añadido easing para suavizar
        onComplete: () => setShowValues(true),
      },
      0.5, // Ligeramente retrasado después del título
    )

    // Finalmente, mostramos la sección de valores con una animación más elaborada
    tl.fromTo(
      valuesSectionRef.current,
      {
        opacity: 0,
        y: 120,
        scale: 0.95, // Añadido un ligero escalado para efecto de profundidad
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "power2.out", // Añadido easing para suavizar
      },
      1.0, // Ajustado para una secuencia más fluida
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [isMobile])

  // Memoize value cards to avoid unnecessary re-renders
  const valueCards = useMemo(() => {
    return values.map((value, index) => (
      <div
        key={`value-${index}`}
        className="flex-shrink-0 w-[300px] bg-white/5 backdrop-blur-sm rounded-xl p-8 hover:bg-white/10 transition-all duration-300 card"
        style={{ marginRight: "16px" }}
      >
        <div className="text-[#D4F57A] mb-6">{value.icon}</div>
        <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
        <p className="text-[#F5F2EB]/80 text-lg">{value.description}</p>
      </div>
    ))
  }, [])

  // Configurar el carrusel infinito para desktop
  useEffect(() => {
    if (!carouselRef.current || isMobile) return

    const carousel = carouselRef.current

    // Inicializar el carrusel al principio
    carousel.scrollLeft = 0

    // Añadir límites de desplazamiento para evitar el scroll excesivo
    const handleScrollLimits = () => {
      if (isTransitioning) return

      const { scrollLeft, scrollWidth } = carousel
      const containerWidth = carousel.clientWidth

      // Evitar desplazamiento más allá del final
      if (scrollLeft + containerWidth > scrollWidth) {
        carousel.scrollLeft = scrollWidth - containerWidth
      }

      // Evitar desplazamiento más allá del principio
      if (scrollLeft < 0) {
        carousel.scrollLeft = 0
      }
    }

    carousel.addEventListener("scroll", handleScrollLimits)

    return () => {
      carousel.removeEventListener("scroll", handleScrollLimits)
    }
  }, [isMobile, isTransitioning])

  // Configurar el mismo comportamiento para el carrusel móvil
  useEffect(() => {
    if (!mobileCarouselRef.current || !isMobile) return

    const carousel = mobileCarouselRef.current

    // Inicializar el carrusel al principio
    carousel.scrollLeft = 0

    // Añadir límites de desplazamiento para evitar el scroll excesivo
    const handleScrollLimits = () => {
      if (isTransitioning) return

      const { scrollLeft, scrollWidth } = carousel
      const containerWidth = carousel.clientWidth

      // Evitar desplazamiento más allá del final
      if (scrollLeft + containerWidth > scrollWidth) {
        carousel.scrollLeft = scrollWidth - containerWidth
      }

      // Evitar desplazamiento más allá del principio
      if (scrollLeft < 0) {
        carousel.scrollLeft = 0
      }
    }

    carousel.addEventListener("scroll", handleScrollLimits)

    return () => {
      carousel.removeEventListener("scroll", handleScrollLimits)
    }
  }, [isMobile, isTransitioning])

  // Funciones para el arrastre suave del carrusel con momentum
  const handleMouseDown = (e: React.MouseEvent, carouselElement: HTMLDivElement | null) => {
    // Desactivar el comportamiento de arrastre horizontal
    return
  }

  const handleMouseUp = (carouselElement: HTMLDivElement | null) => {
    // Desactivar el comportamiento de arrastre horizontal
    return
  }

  const handleMouseMove = (e: React.MouseEvent, carouselElement: HTMLDivElement | null) => {
    // Desactivar el comportamiento de arrastre horizontal
    return
  }

  const handleMouseLeave = (carouselElement: HTMLDivElement | null) => {
    // Desactivar el comportamiento de arrastre horizontal
    return
  }

  // Función para aplicar el efecto de momentum
  const applyMomentum = (carousel: HTMLDivElement) => {
    const drag = dragRef.current

    // Ajustar la velocidad inicial para un momentum más natural
    const initialVelocity = drag.velocity * 1.2 // Aumentado para un efecto más pronunciado
    let currentVelocity = initialVelocity
    let lastTimestamp = performance.now()

    const animate = () => {
      const now = performance.now()
      const deltaTime = (now - lastTimestamp) / 16.67 // Normalizar a ~60fps
      lastTimestamp = now

      // Detener la animación si la velocidad es muy baja o el carrusel no existe
      if (Math.abs(currentVelocity) < 0.1 || !carousel) {
        drag.momentumID = null
        return
      }

      // Aplicar fricción variable - más suave al principio, más fuerte al final
      const frictionFactor = 0.92 + 0.03 * (1 - Math.min(Math.abs(currentVelocity) / Math.abs(initialVelocity), 1))
      currentVelocity *= frictionFactor

      // Actualizar posición con suavizado
      carousel.scrollLeft += currentVelocity * deltaTime

      // Continuar el momentum
      drag.momentumID = requestAnimationFrame(animate)
    }

    drag.momentumID = requestAnimationFrame(animate)
  }

  // Función para avanzar el carrusel automáticamente
  const startAutoScroll = (carouselElement: HTMLDivElement | null) => {
    if (!carouselElement) return

    let lastTimestamp = performance.now()
    const scrollSpeed = 0.2 // Velocidad base más lenta para un movimiento más sutil
    let direction = 1 // 1 para derecha, -1 para izquierda

    const interval = setInterval(() => {
      if (dragRef.current.isDown || isTransitioning) return

      const now = performance.now()
      const deltaTime = (now - lastTimestamp) / 16.67 // Normalizar a ~60fps
      lastTimestamp = now

      // Aplicar un patrón sinusoidal para que el movimiento sea más orgánico
      const time = now * 0.001 // Convertir a segundos
      const speedVariation = Math.sin(time * 0.2) * 0.1 + 1.0 // Variación de 0.9 a 1.1

      // Calcular el desplazamiento con variación de velocidad
      const scrollAmount = scrollSpeed * speedVariation * deltaTime * direction

      // Verificar si hemos llegado a un límite
      const { scrollLeft, scrollWidth } = carouselElement
      const containerWidth = carouselElement.clientWidth

      // Si llegamos al final, cambiar dirección
      if (scrollLeft + containerWidth >= scrollWidth - 10 && direction > 0) {
        direction = -1
      }
      // Si llegamos al principio, cambiar dirección
      else if (scrollLeft <= 10 && direction < 0) {
        direction = 1
      }

      carouselElement.scrollLeft += scrollAmount
    }, 16)

    setAutoScrollInterval(interval)

    return () => {
      clearInterval(interval)
    }
  }

  // Iniciar auto-scroll cuando el componente se monta
  useEffect(() => {
    const desktopCarousel = carouselRef.current
    const mobileCarousel = mobileCarouselRef.current

    let desktopCleanup: (() => void) | undefined
    let mobileCleanup: (() => void) | undefined

    if (desktopCarousel && !isMobile) {
      desktopCleanup = startAutoScroll(desktopCarousel)
    }

    if (mobileCarousel && isMobile) {
      mobileCleanup = startAutoScroll(mobileCarousel)
    }

    return () => {
      if (desktopCleanup) desktopCleanup()
      if (mobileCleanup) mobileCleanup()
      if (autoScrollInterval) clearInterval(autoScrollInterval)
      if (dragRef.current.momentumID !== null) {
        cancelAnimationFrame(dragRef.current.momentumID)
      }
    }
  }, [isMobile, isTransitioning])

  // Añadir indicadores visuales al carrusel
  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel || isMobile) return

    // Añadir indicadores visuales de deslizamiento
    const addVisualCues = () => {
      // Añadir clase para mejorar la apariencia del cursor
      carousel.classList.add("cursor-grab")

      // Añadir efecto de sombra para indicar que hay más contenido
      const addShadowEffect = () => {
        // Verificar si ya existe el elemento de sombra
        const existingShadow = document.getElementById("carousel-shadow-indicator")
        if (existingShadow) return

        // Crear elemento de sombra
        const shadowElement = document.createElement("div")
        shadowElement.id = "carousel-shadow-indicator"
        shadowElement.className = "absolute top-0 bottom-0 right-0 w-24 pointer-events-none"
        shadowElement.style.background = "linear-gradient(90deg, rgba(41, 59, 54, 0) 0%, rgba(41, 59, 54, 0.8) 100%)"
        shadowElement.style.zIndex = "1"

        carousel.parentElement?.appendChild(shadowElement)
      }

      addShadowEffect()
    }

    addVisualCues()

    // Limpiar al desmontar
    return () => {
      const shadowElement = document.getElementById("carousel-shadow-indicator")
      if (shadowElement && shadowElement.parentElement) {
        shadowElement.parentElement.removeChild(shadowElement)
      }
    }
  }, [isMobile])

  // Añadir manejo de teclado para el carrusel
  const handleKeyDown = (e: React.KeyboardEvent, carouselElement: HTMLDivElement | null) => {
    if (!carouselElement) return

    if (e.key === "ArrowLeft") {
      if (carouselElement) {
        carouselElement.scrollLeft -= 300 // Ancho aproximado de una card
      }
      e.preventDefault()
    } else if (e.key === "ArrowRight") {
      if (carouselElement) {
        carouselElement.scrollLeft += 300 // Ancho aproximado de una card
      }
      e.preventDefault()
    }
  }

  return (
    <section id="about-us" ref={sectionRef} className="relative bg-[#293B36] min-h-screen -mt-1 md:mt-0">
      {/* Aseguramos que el fondo sea consistente */}
      <div className="absolute inset-0 bg-[#293B36] z-0"></div>

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-12 min-h-screen flex flex-col justify-center">
        {/* Title */}
        <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-[#F5F2EB] text-center mb-12">
          {t("home.about.title")}
        </h2>

        {/* Team Members Grid */}
        <div ref={teamSectionRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative mb-6">
                <div className="w-[300px] h-[300px] rounded-full border-4 border-[#D4F57A] overflow-hidden">
                  <LazyLoad>
                    <DisintegrationEffect
                      imageSrc={member.image}
                      altText={member.name}
                      index={index}
                      scrollTriggerEnabled={!isMobile}
                    />
                  </LazyLoad>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
              <p className="text-[#F5F2EB]/80">{member.role}</p>
            </div>
          ))}
        </div>

        {/* Values Section - Desktop */}
        <div
          ref={valuesSectionRef}
          className={`transition-all duration-700 ${isMobile ? "hidden" : "absolute inset-0"} flex flex-col justify-center items-center ${
            showValues ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="max-w-8xl mx-auto w-full px-4">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16">
              {/* Left side - Title */}
              <div className="md:w-1/3">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  <span className="text-[#D4F57A]">{t("home.about.values.title")}</span>
                </h2>
                <div className="w-16 h-1.5 bg-[#D4F57A] rounded-full mb-8"></div>
                <p className="text-[#F5F2EB]/80 text-lg mb-6">{t("home.about.values.subtitle")}</p>
                <div className="hidden md:flex items-center gap-2">
                  <ScrollIndicator />
                </div>
              </div>

              {/* Right side - Values Carousel */}
              <div className="md:w-2/3 overflow-hidden">
                <div
                  ref={carouselRef}
                  className="flex overflow-x-auto pb-8 carousel-container cursor-grab"
                  style={{
                    scrollBehavior: "auto",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    cursor: dragRef.current.isDown ? "grabbing" : "grab",
                    WebkitOverflowScrolling: "touch",
                    overflowX: "auto",
                    position: "relative",
                  }}
                  onMouseDown={(e) => handleMouseDown(e, carouselRef.current)}
                  onMouseUp={() => handleMouseUp(carouselRef.current)}
                  onMouseMove={(e) => handleMouseMove(e, carouselRef.current)}
                  onMouseLeave={() => handleMouseLeave(carouselRef.current)}
                  onKeyDown={(e) => handleKeyDown(e, carouselRef.current)}
                  tabIndex={0}
                  role="region"
                  aria-label="Carrusel de valores"
                >
                  {valueCards}
                </div>
                <div className="hidden md:flex justify-between mt-4 gap-3">
                  <div className="text-white/80 text-sm">
                    <span className="sr-only">Instrucciones de accesibilidad: </span>
                    Usa las teclas de flecha izquierda y derecha para navegar por el carrusel
                  </div>
                  <div className="flex gap-3 p-2">
                    <button
                      className="p-2 rounded-full bg-[#D4F57A]/10 hover:bg-[#D4F57A]/20 transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4F57A] focus:ring-offset-2 focus:ring-offset-[#293B36]"
                      onClick={() => {
                        if (carouselRef.current) {
                          carouselRef.current.scrollLeft -= 300 // Ancho aproximado de una card
                        }
                      }}
                      aria-label="Desplazar a la izquierda"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#D4F57A]"
                      >
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                    </button>
                    <button
                      className="p-2 rounded-full bg-[#D4F57A]/10 hover:bg-[#D4F57A]/20 transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4F57A] focus:ring-offset-2 focus:ring-offset-[#293B36]"
                      onClick={() => {
                        if (carouselRef.current) {
                          carouselRef.current.scrollLeft += 300 // Ancho aproximado de una card
                        }
                      }}
                      aria-label="Desplazar a la derecha"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#D4F57A]"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section - Mobile */}
        {isMobile && (
          <div className="mt-24 mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 text-center">
              <span className="text-[#D4F57A]">{t("home.about.values.title")}</span>
            </h2>
            <div className="w-16 h-1.5 bg-[#D4F57A] rounded-full mb-8 mx-auto"></div>
            <p className="text-[#F5F2EB]/80 text-lg mb-6 text-center px-4">{t("home.about.values.subtitle")}</p>

            <div className="overflow-hidden">
              <div
                ref={mobileCarouselRef}
                className="flex overflow-x-auto pb-8 carousel-container"
                style={{
                  scrollBehavior: "auto",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  cursor: dragRef.current.isDown ? "grabbing" : "grab",
                  WebkitOverflowScrolling: "touch",
                  overflowX: "auto",
                  position: "relative",
                }}
                onMouseDown={(e) => handleMouseDown(e, mobileCarouselRef.current)}
                onMouseUp={() => handleMouseUp(mobileCarouselRef.current)}
                onMouseMove={(e) => handleMouseMove(e, mobileCarouselRef.current)}
                onMouseLeave={() => handleMouseLeave(mobileCarouselRef.current)}
                onTouchStart={() => {
                  if (autoScrollInterval) {
                    clearInterval(autoScrollInterval)
                    setAutoScrollInterval(null)
                  }
                }}
              >
                {valueCards}
              </div>

              {/* Indicador de scroll */}
              <div className="flex justify-center mt-4">
                <ScrollIndicator />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

