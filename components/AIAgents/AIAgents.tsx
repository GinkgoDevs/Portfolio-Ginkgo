"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import {
  Bot,
  Handshake,
  ClipboardList,
  FileText,
  Rocket,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import ScrollAnimation from "../ScrollAnimation"
import { useTranslation } from "@/contexts/TranslationContext"
import { validateEnv } from "@/lib/env"

const steps = [
  { icon: Handshake, key: "meeting" },
  { icon: ClipboardList, key: "planning" },
  { icon: FileText, key: "proposal" },
  { icon: Rocket, key: "development" },
  { icon: CheckCircle, key: "solution" },
] as const

function StepCard({
  step,
  index,
  total,
  isActive,
  onActivate,
}: {
  step: (typeof steps)[number]
  index: number
  total: number
  isActive: boolean
  onActivate: () => void
}) {
  const { t } = useTranslation()
  const Icon = step.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      onMouseEnter={onActivate}
      onClick={onActivate}
      className="group relative cursor-pointer"
    >
      <div
        className={`relative rounded-2xl p-6 md:p-8 border transition-all duration-500 overflow-hidden ${
          isActive
            ? "bg-white/[0.08] border-[#D4F57A]/40 shadow-[0_20px_60px_-15px_rgba(212,245,122,0.2)]"
            : "bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06] hover:border-white/10"
        }`}
      >
        {isActive && (
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4F57A]/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        )}

        <div className="relative z-10 flex items-start gap-5">
          <div className="flex flex-col items-center gap-3 shrink-0">
            <span
              className={`text-xs font-bold tracking-widest uppercase transition-colors duration-300 ${
                isActive ? "text-[#D4F57A]" : "text-white/30"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                isActive
                  ? "bg-[#D4F57A] text-[#293B36] shadow-lg shadow-[#D4F57A]/25 scale-110"
                  : "bg-white/10 text-white/60"
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>

            {index < total - 1 && (
              <div
                className={`w-px h-8 transition-colors duration-500 hidden md:block ${
                  isActive ? "bg-[#D4F57A]/40" : "bg-white/10"
                }`}
              />
            )}
          </div>

          <div className="flex-1 pt-6">
            <h4
              className={`text-lg md:text-xl font-bold mb-2 font-heading transition-colors duration-300 ${
                isActive ? "text-[#D4F57A]" : "text-white"
              }`}
            >
              {t(`home.aiAgents.steps.${step.key}.title`)}
            </h4>
            <p className="text-white/60 leading-relaxed text-sm md:text-base">
              {t(`home.aiAgents.steps.${step.key}.description`)}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function AIAgents() {
  const { t } = useTranslation()
  const env = validateEnv()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isInView])

  const whatsappLink = `https://wa.me/${env.contact.whatsappNumber}?text=${encodeURIComponent(
    t("home.aiAgents.whatsappMessage")
  )}`

  return (
    <section
      id="ai-agents"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#293B36] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[#D4F57A]/[0.04] blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-white/[0.02] blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimation>
          <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4F57A]/10 border border-[#D4F57A]/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-[#D4F57A]" />
              <span className="text-[#D4F57A] text-xs font-bold tracking-widest uppercase">
                {t("home.aiAgents.badge")}
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-heading tracking-tight">
              {t("home.aiAgents.title")}
            </h2>
            <div className="w-24 h-1.5 bg-[#D4F57A] mx-auto rounded-full mb-8" />
            <p className="text-[#F5F2EB]/70 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              {t("home.aiAgents.subtitle")}
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Intro + CTA */}
          <ScrollAnimation>
            <div className="space-y-8">
              <div className="bg-white/[0.04] backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-white/[0.06]">
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
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#D4F57A] text-[#293B36] rounded-xl font-bold font-heading text-lg hover:bg-[#c2e65c] transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,245,122,0.3)] hover:-translate-y-0.5 cursor-pointer"
                >
                  {t("home.aiAgents.cta")}
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </ScrollAnimation>

          {/* Right: Process steps */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <StepCard
                key={step.key}
                step={step}
                index={index}
                total={steps.length}
                isActive={activeStep === index}
                onActivate={() => setActiveStep(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
