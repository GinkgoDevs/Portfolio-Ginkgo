"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, CheckCircle2, Sparkles, Globe, Mail, Target, ChevronLeft, Send } from "lucide-react"
import { useTranslation } from "@/contexts/TranslationContext"
import { validateEnv } from "@/lib/env"

export default function LeadMagnet() {
    const { t, locale } = useTranslation()
    const env = validateEnv()

    // State for the wizard
    const [step, setStep] = useState(0) // 0: Intro, 1: URL, 2: Email, 3: Goal
    const [formData, setFormData] = useState({
        url: "",
        email: "",
        goal: ""
    })

    const totalSteps = 4 // Intro + 3 inputs

    const handleNext = () => {
        if (step < totalSteps - 1) setStep(step + 1)
    }

    const handleBack = () => {
        if (step > 0) setStep(step - 1)
    }

    const handleFinish = () => {
        const whatsappNumber = env.contact.whatsappNumber
        const goalLabel = t(`home.leadMagnet.steps.goals.${formData.goal}` as any) || formData.goal

        const message = locale === "en"
            ? `Hello! I want to request the Free Web Audit.\n\n🌐 Website: ${formData.url}\n📧 Email: ${formData.email}\n🎯 Goal: ${goalLabel}`
            : `¡Hola! Quiero solicitar la Auditoría Web Gratuita.\n\n🌐 Web: ${formData.url}\n📧 Email: ${formData.email}\n🎯 Objetivo: ${goalLabel}`

        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank")
    }

    // Components for each step
    const renderIntro = () => (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4F57A]/10 border border-[#D4F57A]/30"
            >
                <Sparkles className="w-4 h-4 text-[#D4F57A]" />
                <span className="text-[#D4F57A] text-sm font-bold tracking-wide uppercase">
                    {t("home.leadMagnet.label")}
                </span>
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight font-heading">
                {t("home.leadMagnet.title")}
            </h2>

            <p className="text-[#F5F2EB]/80 text-lg">
                {t("home.leadMagnet.subtitle")}
            </p>

            <ul className="space-y-3">
                {[
                    t("home.leadMagnet.benefit1"),
                    t("home.leadMagnet.benefit2"),
                    t("home.leadMagnet.benefit3")
                ].map((benefit, index) => (
                    <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-center gap-3 text-[#F5F2EB]/90"
                    >
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4F57A] flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-[#293B36]" />
                        </div>
                        <span className="font-medium">{benefit}</span>
                    </motion.li>
                ))}
            </ul>

            <motion.button
                onClick={() => setStep(1)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 inline-flex items-center gap-2 bg-[#D4F57A] text-[#293B36] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#c2e65c] transition-colors shadow-lg hover:shadow-[#D4F57A]/20"
            >
                {t("home.leadMagnet.cta")}
                <ArrowRight className="w-5 h-5" />
            </motion.button>
        </div>
    )

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-4">
                        <label className="text-xl font-bold text-white font-heading block">{t("home.leadMagnet.steps.url_label")}</label>
                        <div className="relative">
                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4F57A]" />
                            <input
                                type="text"
                                className="w-full bg-[#0F1C18] border border-[#D4F57A]/30 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#D4F57A]"
                                placeholder={t("home.leadMagnet.steps.url_placeholder")}
                                value={formData.url}
                                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                autoFocus
                            />
                        </div>
                    </div>
                )
            case 2:
                return (
                    <div className="space-y-4">
                        <label className="text-xl font-bold text-white font-heading block">{t("home.leadMagnet.steps.email_label")}</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4F57A]" />
                            <input
                                type="email"
                                className="w-full bg-[#0F1C18] border border-[#D4F57A]/30 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#D4F57A]"
                                placeholder={t("home.leadMagnet.steps.email_placeholder")}
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                autoFocus
                            />
                        </div>
                    </div>
                )
            case 3:
                return (
                    <div className="space-y-4">
                        <label className="text-xl font-bold text-white font-heading block">{t("home.leadMagnet.steps.goal_label")}</label>
                        <div className="grid gap-3">
                            {['sales', 'leads', 'brand'].map((goalKey) => (
                                <button
                                    key={goalKey}
                                    onClick={() => setFormData({ ...formData, goal: goalKey })}
                                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${formData.goal === goalKey
                                            ? "bg-[#D4F57A]/20 border-[#D4F57A] text-white"
                                            : "bg-[#0F1C18] border-[#D4F57A]/10 text-[#F5F2EB]/60 hover:border-[#D4F57A]/50"
                                        }`}
                                >
                                    <Target className={`w-5 h-5 ${formData.goal === goalKey ? "text-[#D4F57A]" : "text-gray-500"}`} />
                                    <span className="font-bold">{t(`home.leadMagnet.steps.goals.${goalKey}` as any)}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <section className="py-20 px-4 relative overflow-hidden bg-[#293B36]">
            {/* Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-[#D4F57A]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#D4F57A]/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="bg-[#1E2C29]/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl border border-[#D4F57A]/20 min-h-[500px] flex items-center">

                    {step === 0 ? (
                        <div className="grid md:grid-cols-2 gap-12 items-center w-full">
                            {renderIntro()}
                            <div className="relative hidden md:block">
                                <FormVisualPreview />
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-xl mx-auto w-full">
                            {/* Progress */}
                            <div className="flex items-center justify-between mb-8 text-sm text-[#F5F2EB]/50">
                                <span>Paso {step} de 3</span>
                                <div className="flex gap-1">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className={`h-1.5 w-8 rounded-full ${i <= step ? "bg-[#D4F57A]" : "bg-[#293B36]"}`} />
                                    ))}
                                </div>
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={step}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {renderStepContent()}
                                </motion.div>
                            </AnimatePresence>

                            <div className="flex items-center justify-between mt-8 pt-8 border-t border-white/10">
                                <button
                                    onClick={handleBack}
                                    className="text-[#F5F2EB]/60 hover:text-white flex items-center gap-2 px-4 py-2"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    {t("home.leadMagnet.steps.back")}
                                </button>

                                <button
                                    onClick={step === 3 ? handleFinish : handleNext}
                                    disabled={step === 1 && !formData.url || step === 2 && !formData.email || step === 3 && !formData.goal}
                                    className="bg-[#D4F57A] text-[#293B36] px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#c2e65c] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    {step === 3 ? t("home.leadMagnet.steps.finish") : t("home.leadMagnet.steps.next")}
                                    {step === 3 ? <Send className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

function FormVisualPreview() {
    return (
        <div className="relative w-full aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4F57A]/10 to-transparent rounded-full" />
            <div className="absolute inset-4 border border-[#D4F57A]/20 rounded-full" />

            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 right-0 bg-[#0F1C18] p-4 rounded-xl border border-[#D4F57A]/30 shadow-xl z-20"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#D4F57A] rounded-full flex items-center justify-center text-[#293B36]">
                        <Globe className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="h-2 w-20 bg-white/20 rounded-full mb-1" />
                        <div className="h-2 w-12 bg-white/10 rounded-full" />
                    </div>
                </div>
            </motion.div>

            <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 left-0 bg-[#0F1C18] p-4 rounded-xl border border-[#D4F57A]/30 shadow-xl z-10"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#293B36] border border-[#D4F57A] rounded-full flex items-center justify-center text-[#D4F57A]">
                        <Mail className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="h-2 w-24 bg-white/20 rounded-full mb-1" />
                        <div className="h-2 w-16 bg-white/10 rounded-full" />
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
