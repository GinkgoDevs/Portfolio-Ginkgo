"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Calendar, X, Phone } from "lucide-react"
import { useTranslation } from "@/contexts/TranslationContext"

export default function FloatingActionButtons() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [cookieConsentShown, setCookieConsentShown] = useState(true)
  const [shouldRender, setShouldRender] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { locale, t } = useTranslation()

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

  // Simple function to toggle state
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev)
  }

  // WhatsApp number - replace with your actual number
  const whatsappNumber = "+5491112345678"

  // Calendly link - replace with your actual Calendly link
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
    <div className="fixed bottom-6 right-6 z-40">
      <div className="relative">
        <AnimatePresence>
          {isExpanded && (
            <div className="absolute bottom-16 right-0 flex flex-col items-end space-y-3">
              {/* WhatsApp Button */}
              <motion.button
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                onClick={handleWhatsAppClick}
                className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg hover:bg-[#22c55e] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 whitespace-nowrap"
                aria-label={t("home.contact.whatsapp") || "WhatsApp"}
              >
                <MessageCircle size={20} />
                <span className="font-medium">{t("home.contact.whatsapp") || "WhatsApp"}</span>
              </motion.button>

              {/* Schedule Call Button */}
              <motion.button
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                onClick={handleScheduleClick}
                className="flex items-center gap-2 rounded-full bg-[#D4F57A] px-4 py-3 text-[#293B36] shadow-lg hover:bg-[#c2e65c] focus:outline-none focus:ring-2 focus:ring-[#D4F57A] focus:ring-offset-2 whitespace-nowrap"
                aria-label={t("home.contact.scheduleCall") || "Schedule a call"}
              >
                <Calendar size={20} />
                <span className="font-medium">{locale === "en" ? "Schedule a call" : "Agendar llamada"}</span>
              </motion.button>
            </div>
          )}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <motion.button
          onClick={toggleExpand}
          className="flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-[#D4F57A] text-[#293B36] focus:ring-[#D4F57A]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isExpanded ? "Close menu" : "Open contact menu"}
          aria-expanded={isExpanded}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isExpanded ? "close" : "open"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isExpanded ? <X size={24} /> : <Phone size={24} />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  )
}
