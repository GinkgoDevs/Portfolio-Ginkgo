"use client"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import RotatingText from "./RotatingText"
import FallingLeaves from "./FallingLeaves"
import Navbar from "./Navbar"
import Magnet from "./Magnet"
import ScrollAnimation from "../ScrollAnimation"
import { useEffect, useState } from "react"

export default function Hero() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (inView && !controls.isAnimating) {
    controls.start("visible")
  }

  const ButtonWrapper = isMobile ? "div" : Magnet

  return (
    <div id="home" className="relative min-h-screen bg-[#293B36] pb-32 overflow-x-hidden">
      <FallingLeaves />
      <Navbar />

      <div className="relative z-10 flex flex-col justify-start md:justify-center items-center min-h-screen px-2 sm:px-4 md:px-16 lg:px-24 pt-16 md:pt-0">
        <ScrollAnimation className="w-full max-w-7xl mt-20 md:mt-0">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl md:text-6xl lg:text-7xl font-bold text-white font-delight leading-tight mb-2 md:mb-4">
              <span className="block mb-2 md:mb-0">Construimos experiencias</span>
              <div className="flex flex-col md:flex-row justify-center items-center gap-2">
                <span className="md:mr-2">digitales con</span>
                <div className="bg-[#D4F57A] text-[#293B36] px-4 py-2 md:px-6 md:py-3 rounded-lg inline-flex">
                  <RotatingText
                    texts={["propósito", "calidad", "consciencia"]}
                    mainClassName="overflow-hidden inline-flex"
                    staggerFrom="last"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-0.5"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={3000}
                  />
                </div>
              </div>
            </h1>
            <p className="text-base sm:text-lg md:text-2xl mt-4 md:mt-8 mb-4 md:mb-8 text-[#F5F2EB] max-w-2xl mx-auto px-4">
              Soluciones a medida para negocios que buscan impacto y escalabilidad
            </p>
            <ButtonWrapper padding={60} disabled={false} magnetStrength={2}>
              <motion.button
                whileHover={isMobile ? {} : { scale: 1.05 }}
                whileTap={isMobile ? {} : { scale: 0.95 }}
                className="bg-[#D4F57A] hover:bg-[#c2e65c] text-[#293B36] font-bold py-2.5 md:py-3 px-6 md:px-8 rounded-lg text-base md:text-lg transition-all duration-300 font-inter mt-2 md:mt-4"
              >
                Hablemos de tu proyecto
              </motion.button>
            </ButtonWrapper>
          </div>
        </ScrollAnimation>
      </div>

      {/* Add a gradient transition at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#293B36] pointer-events-none" />
    </div>
  )
}

