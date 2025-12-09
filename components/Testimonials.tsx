"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Quote } from "lucide-react"

const testimonialsData = {
  en: [
    {
      text: "The platform handles our inventory and traffic very well. A robust solution that professionalized our online store.",
      author: "NasFit Team",
      company: "NasFit Online Store",
    },
    {
      text: "The headless architecture provided the speed we were looking for. They solved the technical challenges of the migration effectively.",
      author: "Chico Zossi",
      company: "Bodega Chico Zossi",
    },
    {
      text: "A very complete educational platform. Automating payments and certificates saved us a lot of manual administration time.",
      author: "Ale Ducca",
      company: "Ale Ducca Cristales",
    },
    {
      text: "The B2B platform digitized our entire quoting process. It is much easier to manage orders and clients now.",
      author: "Operations Manager",
      company: "Hormigón Conecta",
    },
    {
      text: "They managed to capture exactly the high-end aesthetic we wanted. The design aligns perfectly with our brand.",
      author: "Marketing Director",
      company: "Sitio Sport",
    },
    {
      text: "Great technical execution on a complex project. They helped us bring our AI digital cloning concept to reality.",
      author: "Product Lead",
      company: "Bauketing AI",
    }
  ],
  es: [
    {
      text: "La plataforma maneja muy bien nuestro inventario y tráfico. Una solución robusta que profesionalizó nuestra tienda online.",
      author: "Equipo NasFit",
      company: "Tienda Online NasFit",
    },
    {
      text: "La arquitectura headless nos dio la velocidad que buscábamos. Resolvieron los desafíos técnicos de la migración con eficacia.",
      author: "Chico Zossi",
      company: "Bodega Chico Zossi",
    },
    {
      text: "Una plataforma educativa muy completa. La automatización de pagos y certificados nos ahorró mucho tiempo de administración manual.",
      author: "Ale Ducca",
      company: "Ale Ducca Cristales",
    },
    {
      text: "La plataforma B2B digitalizó todo nuestro proceso de cotización. Es mucho más sencillo gestionar pedidos y clientes ahora.",
      author: "Gerente de Operaciones",
      company: "Hormigón Conecta",
    },
    {
      text: "Lograron captar exactamente la estética de alta gama que queríamos. El diseño se alinea perfectamente con nuestra marca.",
      author: "Director de Marketing",
      company: "Sitio Sport",
    },
    {
      text: "Gran ejecución técnica en un proyecto complejo. Nos ayudaron a llevar nuestro concepto de clonación digital con IA a la realidad.",
      author: "Líder de Producto",
      company: "Bauketing AI",
    }
  ]
}

import { useTranslation } from "@/contexts/TranslationContext"

export default function Testimonials() {
  const { t, locale } = useTranslation()
  const sliderRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const testimonials = testimonialsData[locale as keyof typeof testimonialsData] || testimonialsData.es

  useEffect(() => {
    if (containerRef.current) {
      const totalWidth = containerRef.current.scrollWidth / 2 // Width of one set of testimonials

      const animation = gsap.to(containerRef.current, {
        x: -totalWidth, // Move exactly half the total width (the width of the original set)
        duration: testimonials.length * 10, // Adjust speed (slower is better for reading)
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % totalWidth) // Ensures seamless reset if needed, though usually -50% works if content is identical
        }
      })

      // Pause on hover
      const handleMouseEnter = () => animation.timeScale(0)
      const handleMouseLeave = () => animation.timeScale(1)

      containerRef.current.addEventListener('mouseenter', handleMouseEnter)
      containerRef.current.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        containerRef.current?.removeEventListener('mouseenter', handleMouseEnter)
        containerRef.current?.removeEventListener('mouseleave', handleMouseLeave)
        animation.kill()
      }

      return () => {
        animation.kill()
      }
    }
  }, [])

  return (
    <section className="py-20 bg-[#293B36] overflow-hidden relative">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#293B36] to-transparent opacity-100 pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-16 text-white font-heading">
          {t("home.testimonials.title") || "Lo que dicen nuestros clientes"}
        </h2>
        <div ref={sliderRef} className="relative">
          <div ref={containerRef} className="flex space-x-6 md:space-x-8 px-4 w-max">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={`${index}-${testimonial.author}`}
                className="testimonial-slide w-[300px] md:w-[400px] flex-shrink-0"
              >
                <div className="bg-[#1E2C29]/50 backdrop-blur-md p-8 rounded-2xl border border-[#D4F57A]/20 shadow-xl h-full flex flex-col justify-center text-center group hover:border-[#D4F57A]/40 transition-colors duration-300">
                  <Quote className="w-10 h-10 text-[#D4F57A] mb-6 mx-auto opacity-80" />
                  <p className="text-lg md:text-xl mb-6 text-[#F5F2EB]/90 italic font-light leading-relaxed">"{testimonial.text}"</p>
                  <div className="mt-auto">
                    <p className="font-bold text-white font-heading tracking-wide">{testimonial.author}</p>
                    <p className="text-[#D4F57A] text-sm uppercase tracking-wider mt-1">{testimonial.company}</p>
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

