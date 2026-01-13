"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Code, Settings, LineChart, ArrowRight } from "lucide-react"
import Magnet from "../Hero/Magnet"
import ScrollAnimation from "../ScrollAnimation"
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
  const { t } = useTranslation()
  const env = validateEnv()

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
    const whatsappNumber = env.contact.whatsappNumber
    const message = t("home.services.whatsappMessage", { service })
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
      className="group relative overflow-hidden rounded-[2rem] transition-all duration-500 bg-white/5 backdrop-blur-md text-white border border-white/10 h-[360px] flex flex-col"
      data-index={index}
      style={{
        boxShadow: isHighlighted ? "0 25px 50px -12px rgba(212, 245, 122, 0.25)" : "none",
        transform: isHighlighted ? "translateY(-12px)" : "translateY(0)",
        transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        backgroundColor: isHighlighted ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.04)",
      }}
    >
      <div className="flex flex-col h-full p-8 md:p-10 relative z-10">
        <motion.div
          animate={isHighlighted ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
          className="rounded-2xl w-16 h-16 flex items-center justify-center mb-6 bg-[#D4F57A] text-[#293B36] shrink-0 shadow-lg shadow-[#D4F57A]/20"
        >
          {icon}
        </motion.div>

        <div className="flex flex-col flex-grow">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight font-heading group-hover:text-[#D4F57A] transition-colors duration-300">
            {title}
          </h3>
          <p className="text-[#F5F2EB]/80 text-lg mb-8 flex-grow leading-relaxed font-light">
            {description}
          </p>
        </div>

        <div className="mt-auto">
          <ButtonWrapper padding={40} disabled={isMobile} magnetStrength={1.5}>
            <motion.a
              href={generateWhatsAppLink(title)}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={isMobile ? {} : { x: 5 }}
              whileTap={isMobile ? { scale: 0.95 } : { scale: 0.98 }}
              className="inline-flex items-center gap-3 font-bold text-[#D4F57A] group/btn transition-all duration-300"
            >
              <span className="border-b border-[#D4F57A]/0 group-hover/btn:border-[#D4F57A]/50 pb-0.5 transition-all">
                {t("home.services.quoteButton")}
              </span>
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </motion.a>
          </ButtonWrapper>
        </div>
      </div>

      {/* Subtle decorative elements */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-[#D4F57A]/10 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2 transition-opacity duration-700 ${isHighlighted ? 'opacity-100' : 'opacity-0'}`} />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 blur-[50px] rounded-full" />
    </motion.div>
  )
}

export default function Services() {
  const { t } = useTranslation()
  const [isMobile, setIsMobile] = useState(false)
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })
  const controls = useAnimation()
  const cardsGridRef = useRef<HTMLDivElement | null>(null)

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

  useEffect(() => {
    if (!isMobile || !cardsGridRef.current) return

    const findCenteredCard = () => {
      if (!cardsGridRef.current) return
      const cards = Array.from(cardsGridRef.current.querySelectorAll("[data-index]")) as HTMLElement[]
      const viewportHeight = window.innerHeight
      const viewportCenter = window.scrollY + viewportHeight / 2

      let closestCard: HTMLElement | null = null
      let closestDistance = Number.POSITIVE_INFINITY

      cards.forEach((card: HTMLElement) => {
        const rect = card.getBoundingClientRect()
        const cardCenter = window.scrollY + rect.top + rect.height / 2
        const distance = Math.abs(viewportCenter - cardCenter)

        if (distance < closestDistance) {
          closestDistance = distance
          closestCard = card
        }
      })

      if (closestCard) {
        const index = Number.parseInt((closestCard as HTMLElement).getAttribute("data-index") || "0")
        setActiveCardIndex(index)
      }
    }

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
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#293B36] to-transparent opacity-100" />

      <div className="container mx-auto px-4 relative z-10" ref={containerRef}>
        <ScrollAnimation>
          <div className="text-center mb-16 pt-16 md:pt-24">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-heading">{t("home.services.title")}</h2>
            <p className="text-[#F5F2EB]/90 max-w-2xl mx-auto text-lg">{t("home.services.subtitle")}</p>
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


      </div>
    </section>
  )
}
