"use client"

import { motion } from "framer-motion"
import { Calendar, Bot, MessageSquare, Clock, ArrowRight } from "lucide-react"
import ScrollAnimation from "../ScrollAnimation"
import { useTranslation } from "@/contexts/TranslationContext"
import { validateEnv } from "@/lib/env"

const upcomingItems = [
  {
    key: "booking",
    icon: Calendar,
    accentColor: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/20",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
  },
  {
    key: "chatbot",
    icon: MessageSquare,
    accentColor: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/20",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-400",
  },
] as const

export default function UpcomingServices() {
  const { t } = useTranslation()
  const env = validateEnv()

  const whatsappLink = `https://wa.me/${env.contact.whatsappNumber}?text=${encodeURIComponent(
    t("home.upcoming.whatsappMessage")
  )}`

  return (
    <section className="relative py-20 md:py-28 bg-[#293B36] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#D4F57A]/[0.03] blur-[180px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimation>
          <div className="max-w-4xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 mb-6">
              <Clock className="w-4 h-4 text-white/50" />
              <span className="text-white/50 text-xs font-bold tracking-widest uppercase">
                {t("home.upcoming.badge")}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-heading tracking-tight">
              {t("home.upcoming.title")}
            </h2>
            <p className="text-[#F5F2EB]/60 text-lg max-w-xl mx-auto font-light">
              {t("home.upcoming.subtitle")}
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {upcomingItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`group relative rounded-2xl p-8 bg-white/[0.03] border ${item.borderColor} hover:bg-white/[0.06] transition-all duration-500 overflow-hidden cursor-default`}
              >
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.accentColor} blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center`}
                    >
                      <Icon className={`w-6 h-6 ${item.iconColor}`} />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/[0.06] text-white/40 text-[10px] font-bold tracking-widest uppercase">
                      {t("home.upcoming.comingSoon")}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 font-heading">
                    {t(`home.upcoming.items.${item.key}.title`)}
                  </h3>
                  <p className="text-white/50 leading-relaxed text-sm md:text-base">
                    {t(`home.upcoming.items.${item.key}.description`)}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        <ScrollAnimation>
          <div className="text-center">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#D4F57A]/30 text-[#D4F57A] font-bold hover:bg-[#D4F57A]/10 transition-all duration-300 cursor-pointer"
            >
              {t("home.upcoming.cta")}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
