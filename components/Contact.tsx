"use client"

import { useState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import DOMPurify from "dompurify"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Calendar, Mail, MessageSquare, Send } from "lucide-react"
import ScrollAnimation from "./ScrollAnimation"

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must have at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must have at least 10 characters"),
})

type FormData = z.infer<typeof formSchema>

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [csrfToken, setCsrfToken] = useState("")
  const [csrfError, setCsrfError] = useState(false)
  const [calendlyLoaded, setCalendlyLoaded] = useState(false)
  const [calendlyError, setCalendlyError] = useState(false)
  const calendlyContainerRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Get CSRF token
    const fetchCsrfToken = async () => {
      try {
        // Add timestamp to avoid cache
        const response = await fetch(`/api/csrf?t=${Date.now()}`, {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()
        if (!data || !data.csrfToken) {
          throw new Error("Invalid CSRF token response")
        }

        setCsrfToken(data.csrfToken)
      } catch (error) {
        console.error("Error fetching CSRF token:", error)
        setCsrfError(true)
        // Use a fallback token in case of error
        setCsrfToken("fallback-csrf-token-" + Date.now())
      }
    }

    fetchCsrfToken()

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
        toast({
          title: "Call scheduled!",
          description: "Your call has been successfully scheduled. We'll send you an email with the details.",
          duration: 5000,
        })
      }
    }

    window.addEventListener("message", handleCalendlyEvent)

    return () => {
      window.removeEventListener("message", handleCalendlyEvent)
    }
  }, [toast])

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
        csrfToken: csrfToken,
      }

      // Here would go the real logic to send the form with sanitized data and CSRF token
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
        duration: 5000,
      })
      reset()
    } catch (error) {
      toast({
        title: "Error sending",
        description: "A problem has occurred. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Let's talk about your <span className="text-[#D4F57A]">project</span>
            </h2>
            <p className="text-[#F5F2EB]/80 text-lg max-w-2xl mx-auto">
              Schedule a call or send us a message. We're here to turn your ideas into reality.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Contact Form */}
          <ScrollAnimation>
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-6 h-6 text-[#D4F57A]" />
                <h3 className="text-xl font-semibold text-white">Send us a message</h3>
              </div>

              {/* Improve form accessibility */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex-grow flex flex-col">
                <input type="hidden" name="csrfToken" value={csrfToken} />
                <div>
                  <label htmlFor="name" className="block text-white mb-1">
                    Your name
                  </label>
                  <Input
                    id="name"
                    placeholder="Your name"
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
                    Your email
                  </label>
                  <Input
                    id="email"
                    placeholder="Your email"
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
                    Your message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Your message"
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
                  {isSubmitting ? "Sending..." : "Send message"}
                </Button>
              </form>
            </div>
          </ScrollAnimation>

          {/* Calendly Section */}
          <ScrollAnimation>
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-[#D4F57A]" />
                <h3 className="text-xl font-semibold text-white">Schedule a call</h3>
              </div>

              <p className="text-[#F5F2EB]/80 mb-6">Book a 30-minute video call to discuss your project in detail.</p>

              <div className="flex-grow rounded-lg overflow-hidden bg-white/5 min-h-[500px]">
                {calendlyError ? (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                    <Calendar className="w-12 h-12 text-[#D4F57A] mb-4" />
                    <h4 className="text-white text-lg font-medium mb-2">Could not load calendar</h4>
                    <p className="text-[#F5F2EB]/80 mb-4">There seems to be a problem loading our booking system.</p>
                    <a
                      href="https://calendly.com/ginkgodevs/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#D4F57A] text-[#293B36] rounded-md font-medium hover:bg-[#D4F57A]/90 transition-colors"
                    >
                      Schedule directly on Calendly
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
                  <p className="text-white font-medium">Prefer email?</p>
                  <p className="text-[#F5F2EB]/80 text-sm">Write to us at hello@ginkgodevs.com</p>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}

