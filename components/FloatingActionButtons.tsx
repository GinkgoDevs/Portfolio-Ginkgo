"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Calendar, X, Phone } from "lucide-react"
import { useTranslation } from "@/contexts/TranslationContext"

export default function FloatingActionButtons() {
  const [isExpanded, setIsExpanded] = useState(true) // Inicialmente expandido
  const [cookieConsentShown, setCookieConsentShown] = useState(true) // Asumimos que el banner de cookies está visible inicialmente
  const [shouldRender, setShouldRender] = useState(false) // No renderizar hasta verificar el estado de las cookies
  const [isMenuOpen, setIsMenuOpen] = useState(false) // Estado para controlar si el menú está abierto
  const { t, locale } = useTranslation()

  useEffect(() => {
    // Verificar si el usuario ya ha dado su consentimiento de cookies
    const cookieConsent = localStorage.getItem("cookie-consent")

    // Si ya hay consentimiento de cookies, mostrar los botones inmediatamente
    if (cookieConsent) {
      setCookieConsentShown(false)
      setShouldRender(true)
    } else {
      // Si no hay consentimiento, escuchar el evento de cambio
      const handleCookieConsentChange = () => {
        setCookieConsentShown(false)
        setShouldRender(true)
      }

      // Crear un observador de mutación para detectar cuando se elimina el banner de cookies del DOM
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === "childList" && mutation.removedNodes.length > 0) {
            // Verificar si alguno de los nodos eliminados podría ser el banner de cookies
            const cookieBannerRemoved = Array.from(mutation.removedNodes).some(
              (node) =>
                node instanceof HTMLElement &&
                (node.classList.contains("cookie-banner") ||
                  node.textContent?.includes("cookies") ||
                  node.textContent?.includes("Cookies")),
            )

            if (cookieBannerRemoved) {
              handleCookieConsentChange()
              observer.disconnect()
            }
          }
        })
      })

      // Observar cambios en el cuerpo del documento
      observer.observe(document.body, { childList: true, subtree: true })

      // También escuchar un evento personalizado que podría ser disparado cuando se acepta/rechaza cookies
      document.addEventListener("cookieConsentChanged", handleCookieConsentChange)

      // Establecer un temporizador de respaldo (10 segundos) en caso de que no se detecte el evento
      const fallbackTimer = setTimeout(() => {
        setCookieConsentShown(false)
        setShouldRender(true)
      }, 10000)

      return () => {
        observer.disconnect()
        document.removeEventListener("cookieConsentChanged", handleCookieConsentChange)
        clearTimeout(fallbackTimer)
      }
    }
  }, [])

  // Escuchar eventos de apertura y cierre del menú
  useEffect(() => {
    const handleMenuStateChange = (e: CustomEvent) => {
      setIsMenuOpen(e.detail.isOpen)
    }

    // Añadir el event listener para el evento personalizado
    document.addEventListener("menuStateChange", handleMenuStateChange as EventListener)

    return () => {
      document.removeEventListener("menuStateChange", handleMenuStateChange as EventListener)
    }
  }, [])

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  // WhatsApp number - replace with your actual number
  const whatsappNumber = "+5491112345678"

  // Calendly link - replace with your actual Calendly link
  const calendlyLink = "https://calendly.com/ginkgodevs/30min"

  const handleWhatsAppClick = () => {
    // Open WhatsApp with predefined message
    const message =
      locale === "en"
        ? "Hello! I'm interested in your services. Can you provide more information?"
        : "¡Hola! Estoy interesado en sus servicios. ¿Pueden brindarme más información?"

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank")
  }

  const handleScheduleClick = () => {
    // Open Calendly link
    window.open(calendlyLink, "_blank")
  }

  // No renderizar nada si el banner de cookies está visible o si el menú está abierto
  if (cookieConsentShown || !shouldRender) return null
  // Solo ocultar cuando el menú está abierto, pero mantener el componente montado
  if (isMenuOpen) return <div className="hidden"></div>

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* WhatsApp Button */}
            <motion.button
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              onClick={handleWhatsAppClick}
              className="mb-3 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg hover:bg-[#22c55e] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
              aria-label="Contactar por WhatsApp"
            >
              <MessageCircle size={20} />
              <span className="font-medium">{locale === "en" ? "WhatsApp" : "WhatsApp"}</span>
            </motion.button>

            {/* Schedule Call Button */}
            <motion.button
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={handleScheduleClick}
              className="mb-3 flex items-center gap-2 rounded-full bg-[#D4F57A] px-4 py-3 text-[#293B36] shadow-lg hover:bg-[#c2e65c] focus:outline-none focus:ring-2 focus:ring-[#D4F57A] focus:ring-offset-2"
              aria-label="Agendar una llamada"
            >
              <Calendar size={20} />
              <span className="font-medium">{locale === "en" ? "Schedule a call" : "Agendar una llamada"}</span>
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        onClick={toggleExpand}
        className={`flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isExpanded
            ? "bg-[#D4F57A] text-[#293B36] focus:ring-[#D4F57A]"
            : "bg-[#D4F57A] text-[#293B36] focus:ring-[#D4F57A]"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isExpanded ? "Cerrar menú" : "Abrir menú de contacto"}
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
  )
}

