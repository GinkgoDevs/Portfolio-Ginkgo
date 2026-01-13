"use client"

import { motion } from "framer-motion"
import type React from "react"
import { useInView } from "react-intersection-observer"
import RotatingText from "./RotatingText"
import dynamic from "next/dynamic"
import Navbar from "./Navbar"
import Magnet from "./Magnet"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useTranslation } from "@/contexts/TranslationContext"

// Lazy load FallingLeaves para mejorar performance inicial
const FallingLeaves = dynamic(() => import("./FallingLeaves"), {
  ssr: false,
  loading: () => null,
})

export default function Hero() {
  const { t } = useTranslation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [isMobile, setIsMobile] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Manejar los cambios de estado del menú
  useEffect(() => {
    const handleMenuStateChange = (e: CustomEvent) => {
      const menuIsOpening = e.detail.isOpen
      setIsMenuOpen(menuIsOpening)
    }

    document.addEventListener("menuStateChange", handleMenuStateChange as EventListener)

    return () => {
      document.removeEventListener("menuStateChange", handleMenuStateChange as EventListener)
    }
  }, [])

  useEffect(() => {
    setIsMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Siempre permitir scroll natural
    document.body.style.overflow = "auto"
    document.documentElement.style.overflow = "auto"
    document.body.style.overflowX = "hidden"
    document.documentElement.style.overflowX = "hidden"

    return () => {
      window.removeEventListener("resize", checkMobile)
      document.body.style.overflow = "auto"
      document.documentElement.style.overflow = "auto"
      document.body.style.overflowX = "hidden"
      document.documentElement.style.overflowX = "hidden"
    }
  }, [])

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
    <div id="home" className="relative min-h-screen bg-[#293B36] pb-32 overflow-hidden">
      {isMounted && (
        <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
          <FallingLeaves />
        </div>
      )}
      <Navbar />

      <div className="relative z-10 flex flex-col justify-start md:justify-center items-center min-h-screen px-4 sm:px-6 md:px-16 lg:px-24 pt-16 md:pt-0 overflow-hidden">
        <div className="w-full max-w-7xl mt-20 md:mt-0">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-2 md:mb-4 font-heading">
              <span className="block mb-2 md:mb-0">{t("home.hero.title")}</span>
              <div className="flex flex-col md:flex-row justify-center items-center gap-2">
                <span className="md:mr-2">{t("home.hero.titleSuffix")}</span>
                <div className="bg-[#D4F57A] text-[#293B36] px-4 py-2 md:px-8 md:py-4 rounded-2xl inline-flex shadow-[0_0_40px_rgba(212,245,122,0.1)]">
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
            <p className="text-base sm:text-lg md:text-2xl mt-4 md:mt-8 mb-4 md:mb-8 text-[#F5F2EB]/90 max-w-2xl mx-auto px-6">
              {t("home.hero.subtitle")}
            </p>
            <ButtonWrapper padding={60} disabled={isMobile} magnetStrength={2}>
              <Link href="#contacto" onClick={(e) => handleSmoothScroll(e, "#contact")}>
                <motion.button
                  whileHover={isMobile ? {} : { scale: 1.05 }}
                  whileTap={isMobile ? {} : { scale: 0.95 }}
                  className="bg-[#D4F57A] hover:bg-[#D4F57A]/90 text-[#293B36] font-bold py-3.5 md:py-5 px-8 md:px-14 rounded-2xl text-lg md:text-xl transition-all duration-300 mt-4 md:mt-8 focus:outline-none focus:ring-4 focus:ring-[#D4F57A]/20 shadow-[0_10px_30px_-5px_rgba(212,245,122,0.3)] hover:shadow-[0_20px_40px_-5px_rgba(212,245,122,0.4)] active:scale-95"
                  aria-label={t("home.hero.ctaButtonAriaLabel")}
                >
                  {t("home.hero.ctaButton")}
                </motion.button>
              </Link>
            </ButtonWrapper>

          </div>
        </div>
      </div>

      {/* Gradient transition at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#293B36] pointer-events-none" />
    </div>
  )
}
