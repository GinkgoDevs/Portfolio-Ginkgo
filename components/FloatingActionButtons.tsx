"use client"

import { useState, useEffect, useRef } from "react"
import { MessageCircle, Calendar, X, Phone } from "lucide-react"
import { useTranslation } from "@/contexts/TranslationContext"
import { validateEnv } from "@/lib/env"

export default function FloatingActionButtons() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [cookieConsentShown, setCookieConsentShown] = useState(true)
  const [shouldRender, setShouldRender] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { locale, t } = useTranslation()
  const env = validateEnv()
  const containerRef = useRef<HTMLDivElement>(null)

  // Effect to set initial state based on device type (only runs once on mount)
  useEffect(() => {
    // Detect if PC or mobile
    const isMobileDevice = window.innerWidth < 768
    // On PC: expanded by default, on mobile: closed by default
    setIsExpanded(!isMobileDevice)
  }, [])

  // Effect to check cookie consent
  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookie-consent")
    if (cookieConsent) {
      setCookieConsentShown(false)
      setShouldRender(true)
    } else {
      const handleCookieConsentChange = () => {
        setCookieConsentShown(false)
        setShouldRender(true)
      }

      document.addEventListener("cookieConsentChanged", handleCookieConsentChange)

      const fallbackTimer = setTimeout(() => {
        setCookieConsentShown(false)
        setShouldRender(true)
      }, 10000)

      return () => {
        document.removeEventListener("cookieConsentChanged", handleCookieConsentChange)
        clearTimeout(fallbackTimer)
      }
    }
  }, [])

  // Listen for menu open/close events
  useEffect(() => {
    const handleMenuStateChange = (e: CustomEvent) => {
      setIsMenuOpen(e.detail.isOpen)
    }

    document.addEventListener("menuStateChange", handleMenuStateChange as EventListener)

    return () => {
      document.removeEventListener("menuStateChange", handleMenuStateChange as EventListener)
    }
  }, [])

  // Add click outside listener to close the menu
  useEffect(() => {
    if (!isExpanded) return

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [isExpanded])

  // Simple function to toggle state
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev)
  }

  // WhatsApp number from environment variables
  const whatsappNumber = env.contact.whatsappNumber

  // Calendly link - could also come from environment variables
  const calendlyLink = "https://calendly.com/ginkgodevs/30min"

  const handleWhatsAppClick = () => {
    const message =
      locale === "en"
        ? "Hello! I'm interested in your services. Can you provide more information?"
        : "¡Hola! Estoy interesado en sus servicios. ¿Pueden brindarme más información?"

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank")
  }

  const handleScheduleClick = () => {
    window.open(calendlyLink, "_blank")
  }

  // Don't render anything if cookie banner is visible or if menu is open
  if (cookieConsentShown || !shouldRender) return null
  if (isMenuOpen) return null

  return (
    <div className="fixed bottom-6 right-6 z-40" ref={containerRef}>
      <div className="relative">
        {/* Solo renderizamos los botones cuando el menú está expandido */}
        {isExpanded && (
          <div className="absolute bottom-16 right-0 flex flex-col items-end space-y-3 z-10">
            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsAppClick}
              className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg hover:bg-[#22c55e] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 whitespace-nowrap transition-transform duration-200 hover:scale-105 active:scale-95"
              aria-label={t("home.contact.whatsapp") || "WhatsApp"}
              style={{
                transitionDelay: "0.1s",
              }}
            >
              <MessageCircle size={20} />
              <span className="font-medium">{t("home.contact.whatsapp") || "WhatsApp"}</span>
            </button>

            {/* Schedule Call Button */}
            <button
              onClick={handleScheduleClick}
              className="flex items-center gap-2 rounded-full bg-[#D4F57A] px-4 py-3 text-[#293B36] shadow-lg hover:bg-[#c2e65c] focus:outline-none focus:ring-2 focus:ring-[#D4F57A] focus:ring-offset-2 whitespace-nowrap transition-transform duration-200 hover:scale-105 active:scale-95"
              aria-label={t("home.contact.scheduleCall") || "Schedule a call"}
            >
              <Calendar size={20} />
              <span className="font-medium">{locale === "en" ? "Schedule a call" : "Agendar llamada"}</span>
            </button>
          </div>
        )}

        {/* Main Toggle Button */}
        <button
          onClick={toggleExpand}
          className="flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-[#D4F57A] text-[#293B36] focus:ring-[#D4F57A] hover:scale-105 active:scale-95 relative z-20"
          aria-label={isExpanded ? "Close menu" : "Open contact menu"}
          aria-expanded={isExpanded}
        >
          <div className="transition-transform duration-300">{isExpanded ? <X size={24} /> : <Phone size={24} />}</div>
        </button>
      </div>
    </div>
  )
}
