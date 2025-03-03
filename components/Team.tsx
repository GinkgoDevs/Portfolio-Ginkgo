"use client"

import { useEffect } from "react"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function Team() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <section ref={ref} className="py-20 bg-green-50 relative">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-green-50 to-transparent"></div>
      <div className="container mx-auto px-4">
        <motion.h2
          variants={itemVariants}
          initial="hidden"
          animate={controls}
          className="text-3xl sm:text-4xl font-bold text-center mb-16 text-green-800"
        >
          Meet Our Team
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center">
            <div className="relative w-48 h-48 mx-auto mb-6">
              <Image
                src="/placeholder.svg?height=192&width=192"
                alt="Nicolas Alonso"
                width={192}
                height={192}
                className="rounded-full border-4 border-green-600"
              />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-2">Nicolas Alonso</h3>
            <p className="text-green-700">Full Stack Developer</p>
          </motion.div>
          <motion.div variants={itemVariants} className="text-center">
            <div className="relative w-48 h-48 mx-auto mb-6">
              <Image
                src="/placeholder.svg?height=192&width=192"
                alt="Federico Valle"
                width={192}
                height={192}
                className="rounded-full border-4 border-green-600"
              />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-2">Federico Valle</h3>
            <p className="text-green-700">Full Stack Developer</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

