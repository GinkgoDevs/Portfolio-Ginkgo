"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Quote } from "lucide-react"
import { useTranslation } from "@/contexts/TranslationContext"

const testimonialsData = {
  en: [
    { text: "The platform handles our inventory and traffic very well. A robust solution that professionalized our online store.", author: "NasFit Team", company: "NasFit Online Store" },
    { text: "The headless architecture provided the speed we were looking for. They solved the technical challenges of the migration effectively.", author: "Chico Zossi", company: "Bodega Chico Zossi" },
    { text: "A very complete educational platform. Automating payments and certificates saved us a lot of manual administration time.", author: "Ale Ducca", company: "Ale Ducca Cristales" },
    { text: "The B2B platform digitized our entire quoting process. It is much easier to manage orders and clients now.", author: "Operations Manager", company: "Hormigón Conecta" },
    { text: "They managed to capture exactly the high-end aesthetic we wanted. The design aligns perfectly with our brand.", author: "Marketing Director", company: "Sitio Sport" },
    { text: "Great technical execution on a complex project. They helped us bring our AI digital cloning concept to reality.", author: "Product Lead", company: "Bauketing AI" }
  ],
  es: [
    { text: "La plataforma maneja muy bien nuestro inventario y tráfico. Una solución robusta que profesionalizó nuestra tienda online.", author: "Equipo NasFit", company: "Tienda Online NasFit" },
    { text: "La arquitectura headless nos dio la velocidad que buscábamos. Resolvieron los desafíos técnicos de la migración con eficacia.", author: "Chico Zossi", company: "Bodega Chico Zossi" },
    { text: "Una plataforma educativa muy completa. La automatización de pagos y certificados nos ahorró mucho tiempo de administración manual.", author: "Ale Ducca", company: "Ale Ducca Cristales" },
    { text: "La plataforma B2B digitalizó todo nuestro proceso de cotización. Es mucho más sencillo gestionar pedidos y clientes ahora.", author: "Gerente de Operaciones", company: "Hormigón Conecta" },
    { text: "Lograron captar exactamente la estética de alta gama que queríamos. El diseño se alinea perfectamente con nuestra marca.", author: "Director de Marketing", company: "Sitio Sport" },
    { text: "Gran ejecución técnica en un proyecto complejo. Nos ayudaron a llevar nuestro concepto de clonación digital con IA a la realidad.", author: "Líder de Producto", company: "Bauketing AI" }
  ]
}

export default function Testimonials() {
  const { t, locale } = useTranslation()
  const sliderRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const testimonials = testimonialsData[locale as keyof typeof testimonialsData] || testimonialsData.es

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current
      const totalWidth = container.scrollWidth / 2

      const animation = gsap.to(container, {
        x: -totalWidth,
        duration: testimonials.length * 15, // Slower for premium feel
        ease: "none",
        repeat: -1,
      })

      if (isHovered) animation.pause()
      else animation.play()

      return () => {
        animation.kill()
      }
    }
  }, [testimonials, isHovered])

  return (
    <section className="py-24 bg-[#293B36] overflow-hidden relative">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[400px] bg-[#D4F57A]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white font-heading mb-6 tracking-tight">
            {t("home.testimonials.title") || "Lo que dicen nuestros clientes"}
          </h2>
          <div className="w-16 h-1 bg-[#D4F57A]/40 mx-auto rounded-full" />
        </div>

        <div
          ref={sliderRef}
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Side masks with smooth CSS transition */}
          <div className="absolute inset-y-0 left-0 w-12 md:w-32 z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 md:w-32 z-20 pointer-events-none" />

          <div ref={containerRef} className="flex space-x-6 md:space-x-12 px-4 w-max">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={`${index}-${testimonial.author}`}
                className="testimonial-slide w-[320px] md:w-[500px] flex-shrink-0"
              >
                <div className="bg-[#1E2C29]/40 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl h-full flex flex-col justify-center text-center group hover:border-[#D4F57A]/20 transition-all duration-700 hover:-translate-y-2">
                  <Quote className="w-10 h-10 text-[#D4F57A] mb-8 mx-auto opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />

                  <p className="text-lg md:text-xl xl:text-2xl mb-8 text-white/90 italic font-light leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  <div className="mt-auto">
                    <p className="font-bold text-white text-lg font-heading tracking-wide">
                      {testimonial.author}
                    </p>
                    <p className="text-[#D4F57A]/60 text-xs uppercase tracking-widest mt-2 font-medium">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
