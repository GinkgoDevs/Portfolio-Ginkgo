"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { ShieldCheck, Users, RefreshCw, BookOpen, Sparkles, Smile } from "lucide-react"
import { useTranslation } from "@/contexts/TranslationContext"
import DisintegrationEffect from "./DisintegrationEffect"

const teamMembers = [
  {
    name: "Nicolas Alonso",
    role: "Full Stack Developer",
    image: "/Integrantes/Nico.jpg",
  },
  {
    name: "Federico Valle",
    role: "Full Stack Developer",
    image: "/Integrantes/Fede.jpg",
  },
]

export default function AboutUs() {
  const { t } = useTranslation()
  const [isMobile, setIsMobile] = useState(false)
  const [activeSection, setActiveSection] = useState<"team" | "values">("team")

  // Refs
  const sectionRef = useRef<HTMLElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const mobileCarouselRef = useRef<HTMLDivElement>(null)

  // Carousel state
  const [autoScrollInterval, setAutoScrollInterval] = useState<NodeJS.Timeout | null>(null)

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

  // Simple scroll-based section switching
  useEffect(() => {
    if (isMobile) return

    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const sectionHeight = rect.height
      const scrollProgress = Math.abs(rect.top) / (sectionHeight * 0.5)

      // Switch sections based on scroll progress
      if (scrollProgress > 0.6) {
        setActiveSection("values")
      } else {
        setActiveSection("team")
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMobile])

  // Value cards component
  const valueCards = values.map((value, index) => (
    <div
      key={`value-${index}`}
      className="flex-shrink-0 w-[300px] bg-white/5 backdrop-blur-sm rounded-xl p-8 hover:bg-white/10 transition-all duration-300"
      style={{ marginRight: "16px" }}
    >
      <div className="text-[#D4F57A] mb-6">{value.icon}</div>
      <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
      <p className="text-[#F5F2EB]/80 text-lg">{value.description}</p>
    </div>
  ))

  // Auto-scroll functionality for carousel
  const startAutoScroll = (carouselElement: HTMLDivElement | null) => {
    if (!carouselElement) return

    let direction = 1
    const scrollSpeed = 0.3

    const interval = setInterval(() => {
      const { scrollLeft, scrollWidth, clientWidth } = carouselElement

      if (scrollLeft + clientWidth >= scrollWidth - 10 && direction > 0) {
        direction = -1
      } else if (scrollLeft <= 10 && direction < 0) {
        direction = 1
      }

      carouselElement.scrollLeft += scrollSpeed * direction
    }, 16)

    setAutoScrollInterval(interval)
    return () => clearInterval(interval)
  }

  // Initialize auto-scroll
  useEffect(() => {
    const desktopCarousel = carouselRef.current
    const mobileCarousel = mobileCarouselRef.current

    let cleanup: (() => void) | undefined

    if (desktopCarousel && !isMobile) {
      cleanup = startAutoScroll(desktopCarousel)
    } else if (mobileCarousel && isMobile) {
      cleanup = startAutoScroll(mobileCarousel)
    }

    return () => {
      if (cleanup) cleanup()
      if (autoScrollInterval) clearInterval(autoScrollInterval)
    }
  }, [isMobile])

  // Keyboard navigation for carousel
  const handleKeyDown = (e: React.KeyboardEvent, carouselElement: HTMLDivElement | null) => {
    if (!carouselElement) return

    if (e.key === "ArrowLeft") {
      carouselElement.scrollLeft -= 300
      e.preventDefault()
    } else if (e.key === "ArrowRight") {
      carouselElement.scrollLeft += 300
      e.preventDefault()
    }
  }

  return (
    <>
      {/* Team Section */}
      <section
        id="about-us"
        ref={sectionRef}
        className="relative bg-[#293B36] min-h-screen flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-[#293B36] z-0"></div>

        <div className="relative z-10 container mx-auto px-4 py-16">
          <div
            className={`transition-all duration-1000 ease-in-out ${
              activeSection === "team" && !isMobile
                ? "opacity-100 transform translate-y-0"
                : !isMobile
                  ? "opacity-0 transform -translate-y-8 pointer-events-none"
                  : "opacity-100"
            }`}
          >
            {/* Title */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#D4F57A] mb-4">{t("home.about.title")}</h2>
              <p className="text-[#F5F2EB]/80 text-lg max-w-2xl mx-auto">{t("home.about.subtitle")}</p>
            </div>

            {/* Team Members */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="relative mb-6">
                    <div className="w-[320px] h-[320px] md:w-[320px] md:h-[320px] rounded-full border-4 border-[#D4F57A] overflow-hidden flex items-center justify-center">
                      <DisintegrationEffect
                        imageSrc={member.image}
                        altText={member.name}
                        index={index}
                        scrollTriggerEnabled={!isMobile}
                      />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-[#F5F2EB]/80">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative bg-[#293B36] min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-[#293B36] z-0"></div>

        <div className="relative z-10 container mx-auto px-4 py-16">
          <div
            className={`transition-all duration-1000 ease-in-out ${
              activeSection === "values" && !isMobile
                ? "opacity-100 transform translate-y-0"
                : !isMobile
                  ? "opacity-0 transform translate-y-8 pointer-events-none"
                  : "opacity-100"
            }`}
          >
            <div className="max-w-8xl mx-auto w-full">
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
                    ref={isMobile ? mobileCarouselRef : carouselRef}
                    className="flex overflow-x-auto pb-8 carousel-container cursor-grab"
                    style={{
                      scrollBehavior: "auto",
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                      WebkitOverflowScrolling: "touch",
                    }}
                    onKeyDown={(e) => handleKeyDown(e, isMobile ? mobileCarouselRef.current : carouselRef.current)}
                    tabIndex={0}
                    role="region"
                    aria-label="Carrusel de valores"
                  >
                    {valueCards}
                  </div>

                  {/* Navigation Controls */}
                  <div className="flex justify-between mt-4 gap-3">
                    <div className="text-white/80 text-sm">
                      <span className="sr-only">Instrucciones de accesibilidad: </span>
                      Usa las teclas de flecha izquierda y derecha para navegar por el carrusel
                    </div>
                    <div className="flex gap-3 p-2">
                      <button
                        className="p-2 rounded-full bg-[#D4F57A]/10 hover:bg-[#D4F57A]/20 transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4F57A] focus:ring-offset-2 focus:ring-offset-[#293B36]"
                        onClick={() => {
                          const carousel = isMobile ? mobileCarouselRef.current : carouselRef.current
                          if (carousel) {
                            carousel.scrollLeft -= 300
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
                          const carousel = isMobile ? mobileCarouselRef.current : carouselRef.current
                          if (carousel) {
                            carousel.scrollLeft += 300
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

                  {/* Mobile Scroll Indicator */}
                  {isMobile && (
                    <div className="flex justify-center mt-4">
                      <ScrollIndicator />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
