"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Bot, ArrowRight, Sparkles } from "lucide-react"
import { useTranslation } from "@/contexts/TranslationContext"

export default function AIServicesBanner() {
  const { t, locale } = useTranslation()

  return (
    <section className="w-full py-8 px-4 md:px-8 lg:px-12 flex justify-center bg-[#293B36] relative z-20">
      <Link
        href={`/${locale}/servicios-ia`}
        className="w-full max-w-5xl rounded-3xl p-6 md:p-10 relative overflow-hidden cursor-pointer group border border-[#D4F57A]/20 hover:border-[#D4F57A]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4F57A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#293B36] transition-all duration-500 hover:shadow-[0_0_60px_-15px_rgba(212,245,122,0.15)] block"
        style={{
          background: "linear-gradient(135deg, rgba(212,245,122,0.08) 0%, rgba(255,255,255,0.02) 50%, rgba(212,245,122,0.04) 100%)",
        }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4F57A]/[0.06] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/[0.02] rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
          <div className="flex-1 text-center md:text-left space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4F57A]/10 border border-[#D4F57A]/20"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4F57A]" />
              <span className="text-[#D4F57A] text-xs font-bold tracking-widest uppercase">
                {t("home.aiAgents.badge")}
              </span>
            </motion.div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight font-heading">
              {t("home.aiAgents.title")}
            </h2>
            <p className="text-white/80 text-base md:text-lg max-w-xl">
              {t("home.aiBanner.description")}
            </p>

            <motion.span
              className="inline-flex items-center gap-2 text-[#D4F57A] font-semibold text-lg group-hover:gap-3 transition-all"
            >
              {t("home.aiBanner.cta")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.span>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative w-32 h-32 md:w-44 md:h-44 flex-shrink-0"
          >
            <div className="absolute inset-0 bg-[#D4F57A]/10 rounded-full blur-2xl group-hover:bg-[#D4F57A]/20 transition-colors duration-700" />
            <div className="relative w-full h-full rounded-full bg-[#D4F57A]/10 border border-[#D4F57A]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <Bot className="w-14 h-14 md:w-20 md:h-20 text-[#D4F57A]" />
            </div>
          </motion.div>
        </div>
      </Link>
    </section>
  )
}
