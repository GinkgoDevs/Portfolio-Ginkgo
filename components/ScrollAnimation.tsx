"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"

interface ScrollAnimationProps {
  children: React.ReactNode
  className?: string
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({ children, className = "" }) => {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          controls.start("visible")
        } else {
          setIsVisible(false)
          controls.start("hidden")
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [controls])

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variants}
      className={`scroll-animation ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default ScrollAnimation

