"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/contexts/TranslationContext";
import { ArrowRight } from "lucide-react";

export default function FeaturedProjectBanner() {
    const { t, locale } = useTranslation();
    const router = useRouter();

    const handleClick = () => {
        router.push(`/${locale}/project/8`);
    };

    return (
        <section className="w-full py-8 px-4 md:px-8 lg:px-12 flex justify-center bg-[#293B36] relative z-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                onClick={handleClick}
                className="w-full max-w-5xl bg-white rounded-3xl p-6 md:p-10 relative overflow-hidden cursor-pointer group border border-white/10 hover:border-green-300 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
                {/* Background Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
                    {/* Text Content */}
                    <div className="flex-1 text-center md:text-left space-y-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 border border-green-200"
                        >
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-green-800 text-xs md:text-sm font-bold tracking-wide uppercase">
                                {t("home.featuredProject.label")}
                            </span>
                        </motion.div>

                        <div className="space-y-2">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                                {t("home.featuredProject.title")}
                            </h2>
                            <p className="text-gray-600 text-base md:text-lg max-w-xl">
                                {t("home.featuredProject.description")}
                            </p>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-2 text-green-700 font-semibold text-lg group-hover:gap-3 transition-all"
                        >
                            {t("home.featuredProject.cta")}
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </div>

                    {/* Icon/Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="relative w-40 h-40 md:w-56 md:h-56 flex-shrink-0"
                    >
                        <div className="absolute inset-0 bg-green-100 rounded-full blur-2xl animate-pulse" />
                        <Image
                            src="/Projects/iconAleDucca.png"
                            alt="Ale Ducca Academy Icon"
                            fill
                            className="object-contain drop-shadow-xl transform group-hover:scale-110 transition-transform duration-500"
                        />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
