"use client"

import { useState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import DOMPurify from "dompurify"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Calendar, Mail, MessageSquare, Send, CheckCircle, X, AlertCircle } from "lucide-react"
import ScrollAnimation from "./ScrollAnimation"
import { useTranslation } from "@/contexts/TranslationContext"
import { validateEnv } from "@/lib/env"

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must have at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must have at least 10 characters"),
})

type FormData = z.infer<typeof formSchema>

// Definir tipos para nuestro toast personalizado
type ToastType = "success" | "error" | null

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [csrfToken, setCsrfToken] = useState("")
  const [csrfError, setCsrfError] = useState(false)
  const [calendlyLoaded, setCalendlyLoaded] = useState(false)
  const [calendlyError, setCalendlyError] = useState(false)
  const calendlyContainerRef = useRef<HTMLDivElement>(null)
  const { t, locale } = useTranslation()
  const env = validateEnv()

  // Estado para nuestro toast personalizado
  const [toast, setToast] = useState<{
    visible: boolean
    type: ToastType
    title: string
    message: string
  }>({
    visible: false,
    type: null,
    title: "",
    message: "",
  })

  // Función para mostrar el toast
  const showToast = (type: ToastType, title: string, message: string) => {
    setToast({
      visible: true,
      type,
      title,
      message,
    })

    // Vibrar en dispositivos móviles si la API está disponible
    if (navigator.vibrate) {
      navigator.vibrate(200)
    }

    // Ocultar el toast después de 5 segundos
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }))
    }, 5000)
  }

  // Función para cerrar el toast manualmente
  const closeToast = () => {
    setToast((prev) => ({ ...prev, visible: false }))
  }

  useEffect(() => {
    // Use a static CSRF token instead of fetching it
    setCsrfToken("static-csrf-token-" + Date.now())

    // Load Calendly safely
    const loadCalendly = async () => {
      try {
        // Check if Calendly is already loaded
        if (window.Calendly) {
          initializeCalendly()
          return
        }

        // Load Calendly script manually
        const script = document.createElement("script")
        script.src = "https://assets.calendly.com/assets/external/widget.js"
        script.async = true
        script.onload = () => initializeCalendly()
        script.onerror = () => {
          console.error("Error loading Calendly widget")
          setCalendlyError(true)
        }
        document.body.appendChild(script)
      } catch (error) {
        console.error("Error setting up Calendly:", error)
        setCalendlyError(true)
      }
    }

    const initializeCalendly = () => {
      if (calendlyContainerRef.current && window.Calendly) {
        window.Calendly.initInlineWidget({
          url: "https://calendly.com/ginkgodevs/30min",
          parentElement: calendlyContainerRef.current,
          prefill: {},
          utm: {},
        })
        setCalendlyLoaded(true)
      }
    }

    loadCalendly()

    // Add listener for Calendly event
    const handleCalendlyEvent = (e: MessageEvent) => {
      if (e.data.event && e.data.event === "calendly.event_scheduled") {
        showToast("success", t("home.contact.success"), t("home.contact.successDesc"))
      }
    }

    window.addEventListener("message", handleCalendlyEvent)

    return () => {
      window.removeEventListener("message", handleCalendlyEvent)
    }
  }, [t])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      const sanitizedData = {
        name: DOMPurify.sanitize(data.name),
        email: DOMPurify.sanitize(data.email),
        message: DOMPurify.sanitize(data.message),
      }

      // Enviar los datos al endpoint de la API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedData),
      })

      if (!response.ok) {
        throw new Error("Error al enviar el mensaje")
      }

      // Mostrar toast de éxito
      showToast("success", t("home.contact.success"), t("home.contact.successDesc"))

      reset()
    } catch (error) {
      // Mostrar toast de error
      showToast("error", t("home.contact.error"), t("home.contact.errorDesc"))
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-[#293B36]">
      <div className="container mx-auto px-4">
        <ScrollAnimation>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("home.contact.title")}</h2>
            <p className="text-[#F5F2EB]/80 text-lg max-w-2xl mx-auto">{t("home.contact.subtitle")}</p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Contact Form */}
          <ScrollAnimation>
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-6 h-6 text-[#D4F57A]" />
                <h3 className="text-xl font-semibold text-white">{t("home.contact.send")}</h3>
              </div>

              {/* Improve form accessibility */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex-grow flex flex-col">
                <input type="hidden" name="csrfToken" value={csrfToken} />
                <div>
                  <label htmlFor="name" className="block text-white mb-1">
                    {t("home.contact.name")}
                  </label>
                  <Input
                    id="name"
                    placeholder={t("home.contact.name")}
                    {...register("name")}
                    className={`bg-white/5 border-white/10 text-white placeholder:text-white/50 ${
                      errors.name ? "border-red-500" : ""
                    }`}
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-500" role="alert">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-white mb-1">
                    {t("home.contact.email")}
                  </label>
                  <Input
                    id="email"
                    placeholder={t("home.contact.email")}
                    type="email"
                    {...register("email")}
                    className={`bg-white/5 border-white/10 text-white placeholder:text-white/50 ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-500" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="flex-grow">
                  <label htmlFor="message" className="block text-white mb-1">
                    {t("home.contact.message")}
                  </label>
                  <Textarea
                    id="message"
                    placeholder={t("home.contact.message")}
                    {...register("message")}
                    className={`bg-white/5 border-white/10 text-white placeholder:text-white/50 min-h-[120px] h-full ${
                      errors.message ? "border-red-500" : ""
                    }`}
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-sm text-red-500" role="alert">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#D4F57A] text-[#293B36] hover:bg-[#D4F57A]/90 focus:ring-2 focus:ring-offset-2 focus:ring-[#D4F57A] focus:outline-none"
                  aria-busy={isSubmitting}
                >
                  <Send className="w-4 h-4 mr-2" aria-hidden="true" />
                  {isSubmitting ? t("home.contact.sending") : t("home.contact.send")}
                </Button>
              </form>
            </div>
          </ScrollAnimation>

          {/* Calendly Section */}
          <ScrollAnimation>
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-[#D4F57A]" />
                <h3 className="text-xl font-semibold text-white">
                  {locale === "en" ? "Schedule a call" : "Agenda una llamada"}
                </h3>
              </div>

              <p className="text-[#F5F2EB]/80 mb-6">
                {locale === "en"
                  ? "Book a 30-minute video call to discuss your project in detail."
                  : "Reserva una videollamada de 30 minutos para discutir tu proyecto en detalle."}
              </p>

              <div className="flex-grow rounded-lg overflow-hidden bg-white/5 min-h-[500px]">
                {calendlyError ? (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                    <Calendar className="w-12 h-12 text-[#D4F57A] mb-4" />
                    <h4 className="text-white text-lg font-medium mb-2">{t("home.contact.calendarError")}</h4>
                    <p className="text-[#F5F2EB]/80 mb-4">{t("home.contact.calendarErrorDesc")}</p>
                    <a
                      href="https://calendly.com/ginkgodevs/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#D4F57A] text-[#293B36] rounded-md font-medium hover:bg-[#D4F57A]/90 transition-colors"
                    >
                      {t("home.contact.scheduleDirectly")}
                    </a>
                  </div>
                ) : (
                  <div
                    ref={calendlyContainerRef}
                    className="w-full h-full min-h-[500px]"
                    style={{ minHeight: "500px" }}
                  >
                    {!calendlyLoaded && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4F57A]"></div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-center gap-3 p-4 bg-white/5 rounded-lg">
                <Mail className="w-5 h-5 text-[#D4F57A]" />
                <div>
                  <p className="text-white font-medium">
                    {locale === "en" ? "Prefer email?" : "¿Prefieres el correo electrónico?"}
                  </p>
                  <p className="text-[#F5F2EB]/80 text-sm">
                    {locale === "en" ? "Write to us at " : "Escríbenos a "}
                    {env.contact.email}
                  </p>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>

      {/* Toast personalizado v10 - Optimizado para móviles */}
      {toast.visible && (
        <div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 p-4 rounded-lg shadow-lg flex items-start gap-3 w-[90%] max-w-md animate-in fade-in slide-in-from-bottom-5 md:w-auto ${
            toast.type === "success"
              ? "bg-[#D4F57A] text-[#293B36] border-l-4 border-green-600"
              : "bg-red-100 text-red-900 border-l-4 border-red-600"
          }`}
          role="alert"
          aria-live="assertive"
        >
          {toast.type === "success" ? (
            <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-600" />
          ) : (
            <AlertCircle className="h-6 w-6 flex-shrink-0 text-red-600" />
          )}

          <div className="flex-1">
            <h3 className="font-semibold text-base">{toast.title}</h3>
            <p className="text-sm mt-1">{toast.message}</p>
          </div>

          <button
            onClick={closeToast}
            className={`p-1.5 rounded-full hover:bg-black/10 transition-colors ${
              toast.type === "success" ? "text-[#293B36]" : "text-red-900"
            }`}
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
    </section>
  )
}
