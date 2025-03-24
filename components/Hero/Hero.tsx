"use client"

import { motion } from "framer-motion"
import type React from "react"
import { useInView } from "react-intersection-observer"
import RotatingText from "./RotatingText"
import FallingLeaves from "./FallingLeaves"
import Navbar from "./Navbar"
import Magnet from "./Magnet"
import { useEffect, useState, useCallback, useRef } from "react"
import Link from "next/link"
import { useTranslation } from "@/contexts/TranslationContext"
import { Lock, Unlock, ChevronDown } from "lucide-react"

export default function Hero() {
  const { t } = useTranslation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [isMobile, setIsMobile] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isScrollLocked, setIsScrollLocked] = useState(true)
  const [showLockButton, setShowLockButton] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Referencia para rastrear el estado real del scroll
  const wasScrollLockedBeforeMenu = useRef(true)

  // Modificar la función toggleScrollLock para que se desplace a la sección de servicios
  const toggleScrollLock = useCallback(() => {
    setIsScrollLocked((prev) => !prev)

    if (isScrollLocked) {
      // Unlock scroll and scroll to services section
      document.body.style.overflow = "auto"
      const servicesSection = document.getElementById("services")
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      // Lock scroll and go back to hero
      document.body.style.overflow = "hidden"
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [isScrollLocked])

  // Handle scroll events to show/hide lock button
  const handleScroll = useCallback(() => {
    const heroSection = document.getElementById("home")
    if (heroSection) {
      const heroBottom = heroSection.getBoundingClientRect().bottom
      const windowHeight = window.innerHeight

      // Show lock button when user has scrolled back to hero section
      if (heroBottom > windowHeight * 0.5 && !isScrollLocked) {
        setShowLockButton(true)
      } else if (heroBottom <= windowHeight * 0.5 || isScrollLocked) {
        setShowLockButton(false)
      }
    }
  }, [isScrollLocked])

  // Manejar los cambios de estado del menú
  useEffect(() => {
    const handleMenuStateChange = (e: CustomEvent) => {
      const menuIsOpening = e.detail.isOpen

      if (menuIsOpening) {
        // Si el menú se está abriendo, guardar el estado actual del scroll
        wasScrollLockedBeforeMenu.current = isScrollLocked
        // El menú manejará el bloqueo del scroll
        setIsMenuOpen(true)
      } else {
        // Si el menú se está cerrando, restaurar el estado del scroll
        setIsMenuOpen(false)

        // Esperar a que termine la animación del menú antes de restaurar el scroll
        setTimeout(() => {
          if (wasScrollLockedBeforeMenu.current) {
            // Si estaba bloqueado antes, volver a bloquear
            document.body.style.overflow = "hidden"
          } else {
            // Si no estaba bloqueado, mantenerlo desbloqueado
            document.body.style.overflow = "auto"
          }
        }, 300) // Ajustar este tiempo según la duración de la animación del menú
      }
    }

    // Añadir el event listener para el evento personalizado
    document.addEventListener("menuStateChange", handleMenuStateChange as EventListener)

    return () => {
      document.removeEventListener("menuStateChange", handleMenuStateChange as EventListener)
    }
  }, [isScrollLocked])

  useEffect(() => {
    setIsMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Apply initial scroll lock on mobile
    if (window.innerWidth < 768) {
      document.body.style.overflow = isScrollLocked ? "hidden" : "auto"
    } else {
      document.body.style.overflow = "auto" // Always enable scroll on desktop
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("resize", checkMobile)
      window.removeEventListener("scroll", handleScroll)
      document.body.style.overflow = "auto" // Reset on unmount
    }
  }, [isScrollLocked, handleScroll])

  // Function to handle smooth scrolling to sections
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()

    // Extract section ID from href
    const targetId = href.startsWith("#") ? href.substring(1) : href
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      // Calculate offset to account for navbar height
      const navHeight = 80
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navHeight

      // Unlock scroll if it was locked
      if (isScrollLocked) {
        setIsScrollLocked(false)
        wasScrollLockedBeforeMenu.current = false
        document.body.style.overflow = "auto"
      }

      // Smooth scroll to section with offset
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      // Update URL without page reload
      window.history.pushState(null, "", href)
    }
  }

  const ButtonWrapper = isMobile ? "div" : Magnet

  // Get rotating texts from translations
  const rotatingTextsString = t("home.hero.rotatingTexts")
  const rotatingTexts = rotatingTextsString.split(",")

  return (
    <div id="home" className="relative min-h-screen bg-[#293B36] pb-32 overflow-x-hidden">
      {isMounted && <FallingLeaves />}
      <Navbar />

      <div className="relative z-10 flex flex-col justify-start md:justify-center items-center min-h-screen px-2 sm:px-4 md:px-16 lg:px-24 pt-16 md:pt-0">
        <div className="w-full max-w-7xl mt-20 md:mt-0">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-2 md:mb-4">
              <span className="block mb-2 md:mb-0">{t("home.hero.title")}</span>
              <div className="flex flex-col md:flex-row justify-center items-center gap-2">
                <span className="md:mr-2">{t("home.hero.titleSuffix")}</span>
                <div className="bg-[#D4F57A] text-[#293B36] px-4 py-2 md:px-6 md:py-3 rounded-lg inline-flex">
                  <RotatingText
                    texts={rotatingTexts}
                    mainClassName="overflow-hidden inline-flex"
                    staggerFrom="last"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-0.5"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={3000}
                  />
                </div>
              </div>
            </h1>
            <p className="text-base sm:text-lg md:text-2xl mt-4 md:mt-8 mb-4 md:mb-8 text-[#F5F2EB] max-w-2xl mx-auto px-4">
              {t("home.hero.subtitle")}
            </p>
            <ButtonWrapper padding={60} disabled={isMobile} magnetStrength={2}>
              <Link href="#contact" onClick={(e) => handleSmoothScroll(e, "#contact")}>
                <motion.button
                  whileHover={isMobile ? {} : { scale: 1.05 }}
                  whileTap={isMobile ? {} : { scale: 0.95 }}
                  className="bg-[#D4F57A] hover:bg-[#D4F57A]/90 text-[#293B36] font-bold py-2.5 md:py-3 px-6 md:px-8 rounded-lg text-base md:text-lg transition-all duration-300 mt-2 md:mt-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4F57A]"
                  aria-label={t("home.hero.ctaButtonAriaLabel")}
                >
                  {t("home.hero.ctaButton")}
                </motion.button>
              </Link>
            </ButtonWrapper>
          </div>
        </div>
      </div>

      {/* Mobile scroll lock/unlock button - Centrado y alargado */}
      {isMobile && !isMenuOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center items-center pb-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="relative"
          >
            {isScrollLocked ? (
              <motion.button
                onClick={toggleScrollLock}
                className="flex flex-col items-center justify-center bg-[#D4F57A] text-[#293B36] px-4 py-3 rounded-full shadow-lg"
                whileTap={{ scale: 0.95 }}
                style={{
                  boxShadow: "0 4px 20px rgba(212, 245, 122, 0.3)",
                }}
              >
                <Unlock size={22} className="mb-1" strokeWidth={2.5} />
                <motion.div
                  animate={{
                    y: [0, 4, 0],
                    opacity: [1, 0.8, 1],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                >
                  <ChevronDown size={18} strokeWidth={2.5} />
                </motion.div>
                <span className="sr-only">{t("home.hero.unlockScreen")}</span>
              </motion.button>
            ) : (
              showLockButton && (
                <motion.button
                  onClick={toggleScrollLock}
                  className="flex items-center justify-center bg-[#D4F57A] text-[#293B36] w-14 h-14 rounded-full shadow-lg"
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  style={{
                    boxShadow: "0 4px 20px rgba(212, 245, 122, 0.3)",
                  }}
                >
                  <Lock size={22} strokeWidth={2.5} />
                  <span className="sr-only">{t("home.hero.lockScreen")}</span>
                </motion.button>
              )
            )}
          </motion.div>
        </div>
      )}

    

      {/* Gradient transition at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#293B36] pointer-events-none" />
    </div>
  )
}

