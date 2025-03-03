"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const approaches = [
  {
    title: "Cultivate Innovation",
    description:
      "We plant the seeds of creativity, nurturing each project with cutting-edge technologies and fresh ideas.",
  },
  {
    title: "Grow Scalable Solutions",
    description: "Our solutions are designed to grow with your business, adapting to new challenges and opportunities.",
  },
  {
    title: "Sustainable Development",
    description:
      "We build lasting digital ecosystems that thrive long-term, focusing on maintainability and future-proofing.",
  },
]

export default function About() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
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
    <section id="about" className="py-20 bg-gradient-to-b from-transparent to-green-50 -mt-[50vh] relative z-10">
      <div className="container mx-auto px-4">
        <motion.h2
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={itemVariants}
          className="text-3xl sm:text-4xl font-bold text-center mb-16 text-green-800"
        >
          Our Approach
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {approaches.map((approach, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white bg-opacity-80 backdrop-blur-md p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-4 text-green-700">{approach.title}</h3>
              <p className="text-gray-600">{approach.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-green-50"></div>
    </section>
  )
}

