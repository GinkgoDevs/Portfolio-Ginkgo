"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, Check, Settings } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "@/contexts/TranslationContext"

type CookiePreferences = {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  preferences: boolean
}

type CookieConsentProps = {
  onAccept?: (preferences: CookiePreferences) => void
}

export default function CookieConsent({ onAccept }: CookieConsentProps) {
  const { locale } = useTranslation()
  const [showBanner, setShowBanner] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Siempre necesarias
    analytics: true,
    marketing: false,
    preferences: true,
  })

  useEffect(() => {
    // Verificar si el usuario ya ha dado su consentimiento
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      // Mostrar el banner después de un pequeño retraso para mejorar UX
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    }
    saveConsent(allAccepted)
  }

  const handleRejectNonEssential = () => {
    const essentialOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    }
    saveConsent(essentialOnly)
  }

  const handleSavePreferences = () => {
    saveConsent(preferences)
  }

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem("cookie-consent", JSON.stringify(prefs))
    localStorage.setItem("cookie-consent-date", new Date().toISOString())
    setShowBanner(false)
    setShowPreferences(false)
    if (onAccept) onAccept(prefs)

    // Disparar un evento personalizado para notificar que se ha dado consentimiento
    document.dispatchEvent(new CustomEvent("cookieConsentChanged"))
  }

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === "necessary") return // No se puede cambiar
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  if (!showBanner) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 cookie-banner"
      >
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#1E2C29] border border-[#D4F57A]/20 rounded-xl shadow-xl overflow-hidden">
            {!showPreferences ? (
              <div className="p-4 md:p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {locale === "en" ? "Cookie Policy" : "Política de Cookies"}
                  </h3>
                  <button
                    onClick={() => setShowBanner(false)}
                    className="text-white/60 hover:text-white transition-colors"
                    aria-label="Cerrar"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-white/80 mb-6">
                  {locale === "en"
                    ? 'We use cookies to improve your experience on our website. By clicking "Accept All", you consent to the use of cookies for analytics, personalized content, and advertising. You can customize your preferences or reject non-essential cookies by clicking on the corresponding options.'
                    : 'Utilizamos cookies para mejorar tu experiencia en nuestro sitio web. Al hacer clic en "Aceptar todas", consientes el uso de cookies para análisis, contenido personalizado y publicidad. Puedes personalizar tus preferencias o rechazar las cookies no esenciales haciendo clic en las opciones correspondientes.'}
                </p>

                <div className="flex flex-wrap gap-3 justify-end">
                  <button
                    onClick={handleRejectNonEssential}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm"
                  >
                    {locale === "en" ? "Essential Only" : "Solo esenciales"}
                  </button>
                  <button
                    onClick={() => setShowPreferences(true)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    {locale === "en" ? "Customize" : "Personalizar"}
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="px-4 py-2 bg-[#D4F57A] hover:bg-[#D4F57A]/90 text-[#293B36] font-medium rounded-lg transition-colors text-sm flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    {locale === "en" ? "Accept All" : "Aceptar todas"}
                  </button>
                </div>

                <div className="mt-4 text-xs text-white/60 flex flex-wrap gap-x-4">
                  <Link href={`/${locale}/privacy-policy`} className="hover:text-[#D4F57A] transition-colors">
                    Política de Privacidad
                  </Link>
                  <Link href={`/${locale}/terms`} className="hover:text-[#D4F57A] transition-colors">
                    Términos y Condiciones
                  </Link>
                  <Link href={`/${locale}/cookies-policy`} className="hover:text-[#D4F57A] transition-colors">
                    Política de Cookies
                  </Link>
                </div>
              </div>
            ) : (
              <div className="p-4 md:p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-white mb-4">
                    {locale === "en" ? "Cookie Preferences" : "Preferencias de Cookies"}
                  </h3>
                  <button
                    onClick={() => setShowPreferences(false)}
                    className="text-white/60 hover:text-white transition-colors"
                    aria-label="Volver"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-white/5 rounded-lg flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-white">
                          {locale === "en" ? "Necessary Cookies" : "Cookies necesarias"}
                        </h4>
                        <div className="px-2 py-0.5 bg-[#D4F57A]/20 text-[#D4F57A] text-xs rounded-full">
                          {locale === "en" ? "Always active" : "Siempre activas"}
                        </div>
                      </div>
                      <p className="text-white/70 text-sm mt-1">
                        {locale === "en"
                          ? "These cookies are essential for the website to function and cannot be disabled."
                          : "Estas cookies son esenciales para el funcionamiento del sitio web y no pueden ser desactivadas."}
                      </p>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={preferences.necessary}
                        disabled
                        className="sr-only"
                        id="necessary"
                      />
                      <label
                        htmlFor="necessary"
                        className="block w-12 h-6 rounded-full bg-[#D4F57A] cursor-not-allowed"
                      >
                        <span className="block w-4 h-4 mt-1 ml-1 bg-white rounded-full transition-transform duration-200 transform translate-x-6"></span>
                      </label>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-white">
                        {locale === "en" ? "Analytics Cookies" : "Cookies analíticas"}
                      </h4>
                      <p className="text-white/70 text-sm mt-1">
                        {locale === "en"
                          ? "Help us understand how you interact with the website, allowing us to improve your experience."
                          : "Nos ayudan a entender cómo interactúas con el sitio web, permitiéndonos mejorar tu experiencia."}
                      </p>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={() => togglePreference("analytics")}
                        className="sr-only"
                        id="analytics"
                      />
                      <label
                        htmlFor="analytics"
                        className={`block w-12 h-6 rounded-full ${
                          preferences.analytics ? "bg-[#D4F57A]" : "bg-white/20"
                        } cursor-pointer`}
                      >
                        <span
                          className={`block w-4 h-4 mt-1 ml-1 bg-white rounded-full transition-transform duration-200 transform ${
                            preferences.analytics ? "translate-x-6" : "translate-x-0"
                          }`}
                        ></span>
                      </label>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-white">
                        {locale === "en" ? "Marketing Cookies" : "Cookies de marketing"}
                      </h4>
                      <p className="text-white/70 text-sm mt-1">
                        {locale === "en"
                          ? "Used to track visitors across websites to display relevant advertisements."
                          : "Utilizadas para rastrear a los visitantes en los sitios web con el fin de mostrar anuncios relevantes."}
                      </p>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={() => togglePreference("marketing")}
                        className="sr-only"
                        id="marketing"
                      />
                      <label
                        htmlFor="marketing"
                        className={`block w-12 h-6 rounded-full ${
                          preferences.marketing ? "bg-[#D4F57A]" : "bg-white/20"
                        } cursor-pointer`}
                      >
                        <span
                          className={`block w-4 h-4 mt-1 ml-1 bg-white rounded-full transition-transform duration-200 transform ${
                            preferences.marketing ? "translate-x-6" : "translate-x-0"
                          }`}
                        ></span>
                      </label>
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-white">
                        {locale === "en" ? "Preference Cookies" : "Cookies de preferencias"}
                      </h4>
                      <p className="text-white/70 text-sm mt-1">
                        {locale === "en"
                          ? "Allow the website to remember information that changes how the website behaves or looks."
                          : "Permiten que el sitio web recuerde información que cambia la forma en que se comporta o se ve."}
                      </p>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={preferences.preferences}
                        onChange={() => togglePreference("preferences")}
                        className="sr-only"
                        id="preferences"
                      />
                      <label
                        htmlFor="preferences"
                        className={`block w-12 h-6 rounded-full ${
                          preferences.preferences ? "bg-[#D4F57A]" : "bg-white/20"
                        } cursor-pointer`}
                      >
                        <span
                          className={`block w-4 h-4 mt-1 ml-1 bg-white rounded-full transition-transform duration-200 transform ${
                            preferences.preferences ? "translate-x-6" : "translate-x-0"
                          }`}
                        ></span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 justify-end">
                  <button
                    onClick={() => setShowPreferences(false)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm"
                  >
                    {locale === "en" ? "Cancel" : "Cancelar"}
                  </button>
                  <button
                    onClick={handleSavePreferences}
                    className="px-4 py-2 bg-[#D4F57A] hover:bg-[#D4F57A]/90 text-[#293B36] font-medium rounded-lg transition-colors text-sm flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    {locale === "en" ? "Save Preferences" : "Guardar preferencias"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

