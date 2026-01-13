"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface RotatingTextProps {
  texts: string[]
  mainClassName?: string
  staggerFrom?: "first" | "last"
  initial?: object
  animate?: object
  exit?: object
  staggerDuration?: number
  splitLevelClassName?: string
  transition?: object
  rotationInterval?: number
}

const RotatingText: React.FC<RotatingTextProps> = ({
  texts,
  mainClassName = "",
  staggerFrom = "last",
  initial = { y: "100%" },
  animate = { y: 0 },
  exit = { y: "-120%" },
  staggerDuration = 0.025,
  splitLevelClassName = "",
  transition = { type: "spring", damping: 30, stiffness: 400 },
  rotationInterval = 3000,
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
    }, rotationInterval)

    return () => clearInterval(interval)
  }, [texts, rotationInterval])

  const currentText = texts[currentTextIndex]

  return (
    <div className="relative inline-flex items-center justify-center">
      <div className="grid invisible select-none pointer-events-none" aria-hidden="true">
        {texts.map((text, i) => (
          <div key={i} className={`${splitLevelClassName} whitespace-nowrap col-start-1 row-start-1`}>
            {text}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentTextIndex}
            className={`${mainClassName} inline-flex`}
            initial="hidden"
            animate="visible"
            exit="exit"
            aria-live="polite"
            aria-atomic="true"
          >
            {currentText.split("").map((char, index) => (
              <motion.span
                key={index}
                className={`${splitLevelClassName} inline-block whitespace-pre`}
                variants={{
                  hidden: { ...initial, opacity: 0 },
                  visible: { ...animate, opacity: 1 },
                  exit: { ...exit, opacity: 0 },
                }}
                transition={{
                  ...transition,
                  delay:
                    staggerFrom === "first"
                      ? index * staggerDuration
                      : (currentText.length - 1 - index) * staggerDuration,
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default RotatingText

