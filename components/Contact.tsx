"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Calendar, ArrowRight, CheckCircle, Users, Clock, Shield, Zap } from "lucide-react"
import { useTranslation } from "@/contexts/TranslationContext"
import { validateEnv } from "@/lib/env"


const guarantees = [
  {
    icon: Users,
    title: "Equipo dedicado",
    description: "Un equipo completo enfocado en tu proyecto",
  },
  {
    icon: Clock,
    title: "Entrega puntual",
    description: "Cumplimos los plazos acordados sin excepciones",
  },
  {
    icon: Shield,
    title: "Garantía de calidad",
    description: "30 días de soporte post-lanzamiento incluido",
  },
  {
    icon: Zap,
    title: "Respuesta rápida",
    description: "Comunicación directa y respuestas en menos de 4 horas",
  },
]

export default function CTASection() {
  const { t, locale } = useTranslation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="contact" className="py-20 bg-[#F5F2EB]" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-[#293B36] rounded-3xl p-8 md:p-16 text-center mb-16 relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-20 h-20 border-2 border-[#D4F57A] rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-[#D4F57A] rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-12 h-12 border-2 border-[#D4F57A] rounded-full"></div>
          </div>

          <div className="relative z-10">
            <Badge variant="outline" className="mb-6 border-[#D4F57A] text-[#D4F57A] bg-transparent">
              {t("home.contact.ctaBadge")}
            </Badge>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-heading">
              {t("home.contact.title")}
              <span className="text-[#D4F57A] block">{t("home.contact.subtitle")}</span>
            </h2>

            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
              {t("home.contact.description")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="bg-[#D4F57A] text-[#293B36] hover:bg-[#D4F57A]/90 font-semibold px-8 py-4 text-lg"
                onClick={() => {
                  const env = validateEnv()
                  const whatsappNumber = env.contact.whatsappNumber
                  const message = locale === "en" ? "Hello! I'm interested in starting a digital project" : "¡Hola! Quiero iniciar un proyecto digital"
                  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank")
                }}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                {t("home.contact.message")}
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#293B36] px-8 py-4 text-lg bg-transparent"
                onClick={() =>
                  window.open("https://calendly.com/ginkgodevs/30min", "_blank")
                }
              >
                <Calendar className="mr-2 h-5 w-5" />
                {t("home.contact.scheduleCall")}
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-[#D4F57A] mr-2" />
                {t("home.contact.indicatorcta1")}
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-[#D4F57A] mr-2" />
                {t("home.contact.indicatorcta2")}
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-[#D4F57A] mr-2" />
                {t("home.contact.indicatorcta3")}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-[#293B36] mb-4 font-heading">{t("home.contact.finaltexttitle")}</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("home.contact.finaltextdesc")}
          </p>
        </motion.div>



      </div>
    </section>
  )
}
