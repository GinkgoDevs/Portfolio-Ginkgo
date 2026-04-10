"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import {
  Bot,
  Handshake,
  ClipboardList,
  FileText,
  Rocket,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Calendar,
  MessageSquare,
  Clock,
  Zap,
  Shield,
  BarChart3,
  Plug,
} from "lucide-react"
import NavbarComponent from "@/components/Hero/Navbar"
import Footer from "@/components/Footer"
import { useTranslation } from "@/contexts/TranslationContext"
import { validateEnv } from "@/lib/env"

const processSteps = [
  { icon: Handshake, key: "meeting" },
  { icon: ClipboardList, key: "planning" },
  { icon: FileText, key: "proposal" },
  { icon: Rocket, key: "development" },
  { icon: CheckCircle, key: "solution" },
] as const

const capabilities = [
  { icon: MessageSquare, key: "conversations" },
  { icon: Calendar, key: "scheduling" },
  { icon: BarChart3, key: "analytics" },
  { icon: Plug, key: "integrations" },
  { icon: Shield, key: "security" },
  { icon: Zap, key: "automation" },
] as const

const upcomingItems = [
  {
    key: "booking",
    icon: Calendar,
    gradient: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/20 hover:border-blue-500/40",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
  },
  {
    key: "chatbot",
    icon: MessageSquare,
    gradient: "from-purple-500/20 to-pink-500/20",
    border: "border-purple-500/20 hover:border-purple-500/40",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-400",
  },
] as const

export default function ServiciosIAClient() {
  const { t, locale } = useTranslation()
  const env = validateEnv()
  const [activeStep, setActiveStep] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const processRef = useRef(null)
  const isProcessInView = useInView(processRef, { once: true, amount: 0.1 })

  useEffect(() => {
    setIsMounted(true)
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (!isProcessInView) return
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % processSteps.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isProcessInView])

  const whatsappLink = `https://wa.me/${env.contact.whatsappNumber}?text=${encodeURIComponent(
    t("home.aiAgents.whatsappMessage")
  )}`

  const upcomingWhatsapp = `https://wa.me/${env.contact.whatsappNumber}?text=${encodeURIComponent(
    t("home.upcoming.whatsappMessage")
  )}`

  if (!isMounted) return (
    <main className="min-h-screen bg-[#293B36] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#D4F57A] border-t-transparent rounded-full animate-spin" />
    </main>
  )

  return (
    <main className="min-h-screen bg-[#293B36]">
      {/* Hero */}
      <div className="relative min-h-[auto] md:min-h-[70vh] flex flex-col">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-[#D4F57A]/[0.06] blur-[200px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/[0.02] blur-[150px] rounded-full" />
        </div>

        <NavbarComponent />

        <div className="relative z-10 container mx-auto px-4 flex-1 flex flex-col justify-center pb-12 md:pb-16 pt-24 md:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href={`/${locale}`}
              className="inline-flex items-center text-[#D4F57A] hover:text-[#D4F57A]/80 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {locale === "en" ? "Back to Home" : "Volver al Inicio"}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4F57A]/10 border border-[#D4F57A]/20 mb-6">
              <Sparkles className="w-4 h-4 text-[#D4F57A]" />
              <span className="text-[#D4F57A] text-xs font-bold tracking-widest uppercase">
                {t("home.aiAgents.badge")}
              </span>
            </div>

            <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 font-heading tracking-tight leading-[1.1]">
              {t("home.aiAgents.title")}
            </h1>
            <p className="text-[#F5F2EB]/80 text-base md:text-xl max-w-2xl font-light leading-relaxed">
              {t("home.aiAgents.subtitle")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-6 md:px-8 py-4 bg-[#D4F57A] text-[#293B36] rounded-xl font-bold font-heading text-base md:text-lg hover:bg-[#c2e65c] transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,245,122,0.3)] hover:-translate-y-0.5 cursor-pointer"
            >
              {t("home.aiAgents.cta")}
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#process"
              className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-4 rounded-xl font-bold text-white/90 border border-white/10 hover:bg-white/5 transition-all duration-300 cursor-pointer"
            >
              {locale === "en" ? "See the process" : "Ver el proceso"}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Capabilities Grid */}
      <section className="py-20 md:py-28 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-heading">
              {locale === "en" ? "What can your agent do?" : "Qu\u00e9 puede hacer tu agente?"}
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto">
              {locale === "en"
                ? "Every agent is unique. Here are some of the most common capabilities."
                : "Cada agente es \u00fanico. Estas son algunas de las capacidades m\u00e1s comunes."}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon
              return (
                <motion.div
                  key={cap.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-[#D4F57A]/20 transition-all duration-400 cursor-default"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#D4F57A]/10 flex items-center justify-center mb-4 group-hover:bg-[#D4F57A]/20 transition-colors">
                    <Icon className="w-5 h-5 text-[#D4F57A]" />
                  </div>
                  <h3 className="text-white font-bold font-heading text-lg mb-2">
                    {t(`serviciosIA.capabilities.${cap.key}.title`)}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {t(`serviciosIA.capabilities.${cap.key}.description`)}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" ref={processRef} className="py-20 md:py-28 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4F57A]/[0.03] blur-[200px] rounded-full" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-heading">
              {locale === "en" ? "How we work" : "C\u00f3mo trabajamos"}
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto">
              {locale === "en"
                ? "A clear, structured process from the first meeting to a production-ready solution."
                : "Un proceso claro y estructurado desde la primera reuni\u00f3n hasta la soluci\u00f3n en producci\u00f3n."}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start max-w-6xl mx-auto">
            {/* Left: sticky info card - hidden on mobile, shown after steps */}
            <div className="hidden lg:block lg:sticky lg:top-28">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white/[0.04] backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-white/[0.06]"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#D4F57A] flex items-center justify-center shadow-lg shadow-[#D4F57A]/20">
                    <Bot className="w-7 h-7 text-[#293B36]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-heading">
                    {t("home.aiAgents.cardTitle")}
                  </h3>
                </div>
                <p className="text-white/70 leading-relaxed text-lg mb-8">
                  {t("home.aiAgents.cardDescription")}
                </p>

                <div className="space-y-3 mb-8">
                  {["benefit1", "benefit2", "benefit3"].map((key) => (
                    <div key={key} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#D4F57A]/20 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-3 h-3 text-[#D4F57A]" />
                      </div>
                      <span className="text-white/80 text-sm">
                        {t(`home.aiAgents.${key}`)}
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#D4F57A] text-[#293B36] rounded-xl font-bold font-heading text-lg hover:bg-[#c2e65c] transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,245,122,0.3)] hover:-translate-y-0.5 cursor-pointer w-full justify-center"
                >
                  {t("home.aiAgents.cta")}
                  <ArrowRight className="w-5 h-5" />
                </a>
              </motion.div>
            </div>

            {/* Right: Process steps */}
            <div className="space-y-4 order-first lg:order-none">
              {processSteps.map((step, index) => {
                const Icon = step.icon
                const isActive = activeStep === index
                return (
                  <motion.div
                    key={step.key}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onMouseEnter={() => setActiveStep(index)}
                    onFocus={() => setActiveStep(index)}
                    onClick={() => setActiveStep(index)}
                    tabIndex={0}
                    role="button"
                    aria-pressed={isActive}
                    className="group relative cursor-pointer outline-none"
                  >
                    <div
                      className={`relative rounded-2xl p-5 md:p-8 border transition-all duration-500 overflow-hidden ${
                        isActive
                          ? "bg-white/[0.08] border-[#D4F57A]/40 shadow-[0_20px_60px_-15px_rgba(212,245,122,0.2)]"
                          : "bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06] hover:border-white/10"
                      }`}
                    >
                      {isActive && (
                        <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4F57A]/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                      )}

                      <div className="relative z-10 flex items-start gap-4 md:gap-5">
                        <div className="flex flex-col items-center gap-2 md:gap-3 shrink-0">
                          <span
                            className={`text-xs font-bold tracking-widest uppercase transition-colors duration-300 ${
                              isActive ? "text-[#D4F57A]" : "text-white/50"
                            }`}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div
                            className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                              isActive
                                ? "bg-[#D4F57A] text-[#293B36] shadow-lg shadow-[#D4F57A]/25 scale-110"
                                : "bg-white/10 text-white/70"
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          {index < processSteps.length - 1 && (
                            <div
                              className={`w-px h-6 md:h-8 transition-colors duration-500 ${
                                isActive ? "bg-[#D4F57A]/40" : "bg-white/10"
                              }`}
                            />
                          )}
                        </div>

                        <div className="flex-1 pt-4 md:pt-6">
                          <h4
                            className={`text-base md:text-xl font-bold mb-1.5 md:mb-2 font-heading transition-colors duration-300 ${
                              isActive ? "text-[#D4F57A]" : "text-white"
                            }`}
                          >
                            {t(`home.aiAgents.steps.${step.key}.title`)}
                          </h4>
                          <p className="text-white/70 leading-relaxed text-sm md:text-base">
                            {t(`home.aiAgents.steps.${step.key}.description`)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Mobile CTA card - shown below steps on mobile */}
            <div className="lg:hidden">
              <div className="bg-white/[0.04] backdrop-blur-sm rounded-3xl p-6 md:p-10 border border-white/[0.06]">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#D4F57A] flex items-center justify-center shadow-lg shadow-[#D4F57A]/20">
                    <Bot className="w-6 h-6 text-[#293B36]" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-heading">
                    {t("home.aiAgents.cardTitle")}
                  </h3>
                </div>
                <p className="text-white/70 leading-relaxed text-base mb-6">
                  {t("home.aiAgents.cardDescription")}
                </p>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-4 bg-[#D4F57A] text-[#293B36] rounded-xl font-bold font-heading text-base hover:bg-[#c2e65c] transition-all duration-300 cursor-pointer w-full justify-center"
                >
                  {t("home.aiAgents.cta")}
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Services */}
      <section className="py-20 md:py-28 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 mb-6">
              <Clock className="w-4 h-4 text-white/50" />
              <span className="text-white/70 text-xs font-bold tracking-widest uppercase">
                {t("home.upcoming.badge")}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-heading">
              {t("home.upcoming.title")}
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto">
              {t("home.upcoming.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            {upcomingItems.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className={`group relative rounded-2xl p-8 bg-white/[0.03] border ${item.border} transition-all duration-500 overflow-hidden cursor-default`}
                >
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.gradient} blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
                  />
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-5">
                      <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${item.iconColor}`} />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-white/[0.06] text-white/60 text-[10px] font-bold tracking-widest uppercase">
                        {t("home.upcoming.comingSoon")}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 font-heading">
                      {t(`home.upcoming.items.${item.key}.title`)}
                    </h3>
                    <p className="text-white/70 leading-relaxed text-sm md:text-base">
                      {t(`home.upcoming.items.${item.key}.description`)}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div className="text-center">
            <a
              href={upcomingWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#D4F57A]/30 text-[#D4F57A] font-bold hover:bg-[#D4F57A]/10 transition-all duration-300 cursor-pointer"
            >
              {t("home.upcoming.cta")}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center bg-gradient-to-br from-[#D4F57A]/10 to-[#D4F57A]/5 rounded-3xl p-10 md:p-14 border border-[#D4F57A]/20"
          >
            <Bot className="w-12 h-12 text-[#D4F57A] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-heading">
              {locale === "en"
                ? "Ready to automate your business?"
                : "Listo para automatizar tu negocio?"}
            </h2>
            <p className="text-white/70 text-base md:text-lg mb-8 max-w-lg mx-auto">
              {locale === "en"
                ? "Schedule a free meeting and let's explore what AI can do for your operation."
                : "Agend\u00e1 una reuni\u00f3n gratuita y exploremos lo que la IA puede hacer por tu operaci\u00f3n."}
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#D4F57A] text-[#293B36] rounded-xl font-bold font-heading text-lg hover:bg-[#c2e65c] transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,245,122,0.3)] hover:-translate-y-0.5 cursor-pointer"
            >
              {t("home.aiAgents.cta")}
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
