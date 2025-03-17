"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { Code2, Database, Cloud, Laptop, Paintbrush, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react"
import ScrollAnimation from "../ScrollAnimation"
import { useTranslation } from "@/contexts/TranslationContext"

export default function Tools() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [activeCategory, setActiveCategory] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  // Tecnologías organizadas por categoría
  const technologies = [
    {
      category: t("home.tools.categories.frontend"),
      icon: <Laptop className="w-6 h-6" />,
      items: ["React", "Next.js", "Vue.js", "Remix", "Astro"],
    },
    {
      category: t("home.tools.categories.styles"),
      icon: <Paintbrush className="w-6 h-6" />,
      items: ["CSS", "Tailwind CSS", "SASS", "Three.js", "UI/UX Design"],
    },
    {
      category: t("home.tools.categories.backend"),
      icon: <Code2 className="w-6 h-6" />,
      items: ["Node.js", "Express", "Nest.js", "REST APIs", "JavaScript"],
    },
    {
      category: t("home.tools.categories.databases"),
      icon: <Database className="w-6 h-6" />,
      items: ["PostgreSQL", "MongoDB", "SQL", "TypeScript", "ORM/ODM"],
    },
    {
      category: t("home.tools.categories.cms"),
      icon: <ShoppingCart className="w-6 h-6" />,
      items: ["WordPress", "Strapi", "Shopify", "Tienda Nube", "Headless CMS"],
    },
    {
      category: t("home.tools.categories.devops"),
      icon: <Cloud className="w-6 h-6" />,
      items: ["Vercel", "Netlify", "Git", "GitHub", "CI/CD"],
    },
  ]

  // Detectar si es dispositivo móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Funciones para navegación del carrusel
  const handlePrev = () => {
    setActiveCategory((prev) => (prev === 0 ? technologies.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveCategory((prev) => (prev === technologies.length - 1 ? 0 : prev + 1))
  }

  // Manejo de gestos táctiles
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Deslizar hacia la izquierda
      handleNext()
    }

    if (touchStart - touchEnd < -50) {
      // Deslizar hacia la derecha
      handlePrev()
    }
  }

  return (
    <section ref={sectionRef} id="tools" className="py-20 bg-[#293B36] overflow-hidden">
      <div className="container mx-auto px-4">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="text-[#D4F57A]">{t("home.tools.title")}</span>
            </h2>
            <p className="text-[#F5F2EB]/80 text-lg max-w-2xl mx-auto">{t("home.tools.subtitle")}</p>
          </div>
        </ScrollAnimation>

        {/* Vista para escritorio - Grid normal */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech) => (
            <ScrollAnimation key={tech.category}>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 h-full hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-[#D4F57A] text-[#293B36]">{tech.icon}</div>
                  <h3 className="text-xl font-semibold text-white">{tech.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tech.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-2 bg-white/10 rounded-lg text-white/90 text-sm inline-flex items-center hover:bg-[#D4F57A]/10 hover:text-[#D4F57A] transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Vista para móvil - Carrusel */}
        <div
          className="md:hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          ref={carouselRef}
          role="region"
          aria-label={t("home.tools.categories.frontend")}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              handlePrev()
              e.preventDefault()
            } else if (e.key === "ArrowRight") {
              handleNext()
              e.preventDefault()
            }
          }}
        >
          {/* Navegación de categorías */}
          <div className="flex justify-center mb-4">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-white/10 text-white mr-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4F57A]"
              aria-label="Categoría anterior"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <div className="flex items-center px-4 py-2 bg-white/5 rounded-full">
              <span className="text-white" id="current-category">
                {technologies[activeCategory].category}
              </span>
            </div>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white/10 text-white ml-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4F57A]"
              aria-label="Siguiente categoría"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Indicadores de página */}
          <div className="flex justify-center mb-6" role="tablist" aria-label="Categorías de tecnologías">
            {technologies.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`w-2 h-2 mx-1 rounded-full ${index === activeCategory ? "bg-[#D4F57A]" : "bg-white/20"}`}
                aria-label={`Ir a categoría ${technologies[index].category}`}
                aria-selected={index === activeCategory}
                role="tab"
                aria-controls={`category-panel-${index}`}
              />
            ))}
          </div>

          {/* Contenido del carrusel */}
          <div
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6"
            role="tabpanel"
            id={`category-panel-${activeCategory}`}
            aria-labelledby={`category-${activeCategory}`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-[#D4F57A] text-[#293B36]">{technologies[activeCategory].icon}</div>
              <h3 className="text-xl font-semibold text-white">{technologies[activeCategory].category}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {technologies[activeCategory].items.map((item) => (
                <span
                  key={item}
                  className="px-3 py-2 bg-white/10 rounded-lg text-white/90 text-sm inline-flex items-center hover:bg-[#D4F57A]/10 hover:text-[#D4F57A] transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Instrucciones de deslizamiento */}
          <div className="text-center mt-4 text-white/80 text-sm flex items-center justify-center">
            <ChevronLeft className="w-4 h-4 mr-1" />
            <span>{t("home.tools.scrollInstructions")}</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </div>
    </section>
  )
}

