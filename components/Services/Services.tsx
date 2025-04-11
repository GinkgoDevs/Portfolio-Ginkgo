"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Code, Settings, LineChart, ArrowRight } from "lucide-react"
import Magnet from "../Hero/Magnet"
import ScrollAnimation from "../ScrollAnimation"
// Actualizar la definición del tipo TranslationContextType para incluir el parámetro de reemplazos
import { useTranslation } from "@/contexts/TranslationContext"
import { validateEnv } from "@/lib/env"

interface ServiceCardProps {
  title: string
  description: string
  icon: React.ReactNode
  index: number
  isMobile: boolean
  activeCardIndex?: number
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, index, isMobile, activeCardIndex }) => {
  const controls = useAnimation()
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.3 })
  const [isHovered, setIsHovered] = useState(false)
  // Asegurarse de que la función t se use correctamente con el nuevo parámetro
  const { t } = useTranslation()
  const env = validateEnv()

  // Determine if this card should be highlighted (either by hover on desktop or by being centered on mobile)
  const isHighlighted = isMobile ? activeCardIndex === index : isHovered

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.2,
        ease: "easeOut",
      },
    },
  }

  const generateWhatsAppLink = (service: string) => {
    // Usar el número de WhatsApp del entorno
    const whatsappNumber = env.contact.whatsappNumber

    // Crear mensaje personalizado según el servicio
    const message = t("home.services.whatsappMessage", { service })

    // Generar enlace de WhatsApp con número y mensaje codificado
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
  }

  const ButtonWrapper = isMobile ? "div" : Magnet

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={controls}
      variants={variants}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      className="relative overflow-hidden rounded-2xl transition-all duration-500 bg-white/10 backdrop-blur-sm text-white hover:bg-[#D4F57A]/10 h-[280px] flex flex-col"
      data-index={index}
      style={{
        boxShadow: isHighlighted ? "0 10px 25px rgba(212, 245, 122, 0.15)" : "none",
        transform: isHighlighted ? "translateY(-5px)" : "translateY(0)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
        backgroundColor: isHighlighted ? "rgba(212, 245, 122, 0.1)" : "rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="flex flex-col h-full p-6 md:p-8">
        {/* Icon container with fixed size */}
        <div className="rounded-full w-14 h-14 flex items-center justify-center mb-4 bg-[#D4F57A] text-[#293B36] shrink-0">
          {icon}
        </div>

        {/* Content container with flex-grow */}
        <div className="flex flex-col flex-grow">
          {/* Title with fixed height */}
          <h3 className="text-xl md:text-2xl font-bold mb-3 min-h-[2rem] line-clamp-2">{title}</h3>

          {/* Description with fixed height */}
          <p className="text-[#F5F2EB]/80 mb-4 min-h-[2.5rem] line-clamp-2">{description}</p>
        </div>

        {/* Button container fixed to bottom */}
        <div className="mt-auto">
          <ButtonWrapper padding={40} disabled={isMobile} magnetStrength={1.5}>
            <motion.a
              href={generateWhatsAppLink(title)}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={isMobile ? {} : { scale: 1.05 }}
              whileTap={isMobile ? {} : { scale: 0.95 }}
              className="flex items-center gap-2 font-medium text-[#D4F57A] hover:text-white transition-colors duration-300"
            >
              <span>{t("home.services.quoteButton")}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </ButtonWrapper>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-transparent to-white/5 pointer-events-none" />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: isHighlighted ? 1 : 0.8,
          opacity: isHighlighted ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-[#D4F57A]/10 pointer-events-none"
      />
    </motion.div>
  )
}

export default function Services() {
  // Asegurarse de que la función t se use correctamente con el nuevo parámetro
  const { t } = useTranslation()
  const [isMobile, setIsMobile] = useState(false)
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })
  const controls = useAnimation()
  const cardsGridRef = useRef(null)

  const services = [
    {
      title: t("home.services.webDevelopment"),
      description: t("home.services.webDevelopmentDesc"),
      icon: <Code className="w-8 h-8" />,
    },
    {
      title: t("home.services.optimization"),
      description: t("home.services.optimizationDesc"),
      icon: <Settings className="w-8 h-8" />,
    },
    {
      title: t("home.services.strategies"),
      description: t("home.services.strategiesDesc"),
      icon: <LineChart className="w-8 h-8" />,
    },
  ]

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  // Add vertical centering detection for mobile
  useEffect(() => {
    if (!isMobile || !cardsGridRef.current) return

    // Function to find which card is closest to the center of the viewport
    const findCenteredCard = () => {
      const cards = cardsGridRef.current.querySelectorAll("[data-index]")
      const viewportHeight = window.innerHeight
      const viewportCenter = window.scrollY + viewportHeight / 2

      let closestCard = null
      let closestDistance = Number.POSITIVE_INFINITY

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        const cardCenter = window.scrollY + rect.top + rect.height / 2
        const distance = Math.abs(viewportCenter - cardCenter)

        if (distance < closestDistance) {
          closestDistance = distance
          closestCard = card
        }
      })

      if (closestCard && closestDistance < viewportHeight / 3) {
        const index = Number.parseInt(closestCard.getAttribute("data-index"))
        setActiveCardIndex(index)
      }
    }

    // Call initially and on scroll
    findCenteredCard()
    window.addEventListener("scroll", findCenteredCard)

    return () => {
      window.removeEventListener("scroll", findCenteredCard)
    }
  }, [isMobile])

  return (
    <section
      id="services"
      className="relative -mt-32 pt-32 pb-20 md:pb-32 bg-[#293B36] overflow-x-hidden"
      style={{
        background: "linear-gradient(180deg, #293B36 0%, #293B36 100%)",
      }}
    >
      {/* Smooth transition overlay */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#293B36] to-transparent opacity-100" />

      <div className="container mx-auto px-4 relative z-10" ref={containerRef}>
        <ScrollAnimation>
          <div className="text-center mb-16 pt-16 md:pt-24">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("home.services.title")}</h2>
            <p className="text-[#F5F2EB]/80 max-w-2xl mx-auto text-lg">{t("home.services.subtitle")}</p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8" ref={cardsGridRef}>
          {services.map((service, index) => (
            <ScrollAnimation key={index}>
              <ServiceCard
                title={service.title}
                description={service.description}
                icon={service.icon}
                index={index}
                isMobile={isMobile}
                activeCardIndex={activeCardIndex}
              />
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation className="mt-16 text-center">
          <Magnet padding={60} disabled={isMobile} magnetStrength={2}>
            <motion.a
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }}
              whileHover={isMobile ? {} : { scale: 1.05 }}
              whileTap={isMobile ? {} : { scale: 0.95 }}
              className="bg-[#D4F57A] hover:bg-[#c2e65c] text-[#293B36] font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 font-inter inline-block"
            >
              {t("home.services.portfolioButton")}
            </motion.a>
          </Magnet>
        </ScrollAnimation>
      </div>
    </section>
  )
}
