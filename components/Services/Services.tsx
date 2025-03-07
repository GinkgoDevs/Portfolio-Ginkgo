"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Code, Settings, LineChart, ArrowRight } from "lucide-react"
import Magnet from "../Hero/Magnet"
import ScrollAnimation from "../ScrollAnimation"

interface ServiceCardProps {
  title: string
  description: string
  icon: React.ReactNode
  index: number
  isMobile: boolean
}

const services = [
  {
    title: "Desarrollo Web",
    description: "Sitios web escalables, rápidos y optimizados.",
    icon: <Code className="w-8 h-8" />,
  },
  {
    title: "Optimización y Mantenimiento",
    description: "Mejoramos tu web para que rinda al máximo.",
    icon: <Settings className="w-8 h-8" />,
  },
  {
    title: "Estrategias Digitales",
    description: "Maximizamos tu presencia online con soluciones inteligentes.",
    icon: <LineChart className="w-8 h-8" />,
  },
]

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, index, isMobile }) => {
  const controls = useAnimation()
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.3 })
  const [isHovered, setIsHovered] = useState(false)

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

  const ButtonWrapper = isMobile ? "div" : Magnet

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={controls}
      variants={variants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden rounded-2xl transition-all duration-500 bg-white/10 backdrop-blur-sm text-white hover:bg-[#D4F57A]/10 h-[280px] flex flex-col"
      style={{
        boxShadow: isHovered ? "0 10px 25px rgba(212, 245, 122, 0.15)" : "none",
        transform: isHovered ? "translateY(-5px)" : "translateY(0)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
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
            <motion.button
              whileHover={isMobile ? {} : { scale: 1.05 }}
              whileTap={isMobile ? {} : { scale: 0.95 }}
              className="flex items-center gap-2 font-medium text-[#D4F57A] hover:text-white transition-colors duration-300"
            >
              <span>Cotiza tu proyecto</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </ButtonWrapper>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-transparent to-white/5 pointer-events-none" />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: isHovered ? 1 : 0.8,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-[#D4F57A]/10 pointer-events-none"
      />
    </motion.div>
  )
}

export default function Services() {
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })
  const controls = useAnimation()

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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Soluciones digitales que transforman negocios
            </h2>
            <p className="text-[#F5F2EB]/80 max-w-2xl mx-auto text-lg">
              Creamos experiencias digitales que impulsan el crecimiento de tu empresa
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ScrollAnimation key={index}>
              <ServiceCard
                title={service.title}
                description={service.description}
                icon={service.icon}
                index={index}
                isMobile={isMobile}
              />
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation className="mt-16 text-center">
          <Magnet padding={60} disabled={isMobile} magnetStrength={2}>
            <motion.button
              whileHover={isMobile ? {} : { scale: 1.05 }}
              whileTap={isMobile ? {} : { scale: 0.95 }}
              className="bg-[#D4F57A] hover:bg-[#c2e65c] text-[#293B36] font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 font-inter"
            >
              Ver portafolio
            </motion.button>
          </Magnet>
        </ScrollAnimation>
      </div>
    </section>
  )
}

