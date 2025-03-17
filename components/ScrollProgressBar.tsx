"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useSpring } from "framer-motion"

export default function ScrollProgressBar() {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar la barra solo después de un cierto umbral de desplazamiento
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-[#D4F57A] z-50 origin-left"
      style={{ scaleX }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
  )
}

