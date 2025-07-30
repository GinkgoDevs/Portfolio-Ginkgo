"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Target, Heart } from "lucide-react"


export default function Philosophy() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-20 bg-[#293B36] relative overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-[#D4F57A]">
            <path d="M12 2L8 8H4L8 14L12 8L16 14L20 8H16L12 2Z" />
          </svg>
        </div>
        <div className="absolute bottom-20 right-10 w-24 h-24">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-[#D4F57A]">
            <path d="M12 2L8 8H4L8 14L12 8L16 14L20 8H16L12 2Z" />
          </svg>
        </div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-[#D4F57A]">
            <path d="M12 2L8 8H4L8 14L12 8L16 14L20 8H16L12 2Z" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 border-[#D4F57A] text-[#D4F57A] bg-transparent">
            Nuestra Filosofía
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Diseñamos con resiliencia,
            <span className="text-[#D4F57A] block">como el ginkgo</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            El ginkgo biloba es el árbol más resistente del mundo, capaz de sobrevivir durante milenios adaptándose a
            cualquier cambio. Así construimos tus soluciones digitales: para que perduren, crezcan y se adapten al
            futuro.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#F5F2EB] rounded-2xl p-8 md:p-12 mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#293B36] mb-6">
                Más que desarrolladores, somos arquitectos del futuro digital
              </h3>
              <div className="space-y-4 text-gray-600">
                <p>
                  Nacimos de la convicción de que la tecnología debe ser una extensión natural de los objetivos humanos.
                  No creamos código por crear código; construimos puentes entre las ideas y su materialización digital.
                </p>
                <p>
                  Cada proyecto es una oportunidad de demostrar que la excelencia técnica y la sensibilidad humana
                  pueden coexistir, creando soluciones que no solo funcionan, sino que inspiran.
                </p>
                <p>
                  Como el ginkgo que sobrevivió a la bomba de Hiroshima y siguió creciendo, nuestras soluciones están
                  diseñadas para resistir, adaptarse y prosperar en cualquier contexto.
                </p>
              </div>
            </div>
            <div className="relative">
                <img
                    src="/MockUps/9.16.png"
                    alt="Historia del Ginkgo"
                    className="w-full h-[500px] rounded-lg shadow-lg object-cover"
                ></img>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#293B36] rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#D4F57A]">5+</div>
                  <div className="text-xs text-white">Años</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

    

        
      </div>
    </section>
  )
}
