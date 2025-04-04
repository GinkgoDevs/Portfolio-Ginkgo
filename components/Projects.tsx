"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { projects } from "@/data/projects"
import { motion, AnimatePresence } from "framer-motion"

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const filteredProjects = selectedCategory
    ? projects.filter((project) => project.category === selectedCategory)
    : projects

  return (
    <section id="projects" className="py-20 relative bg-[#293B36]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-green-800">Our Projects</h2>

        <div className="flex justify-center mb-8 overflow-x-auto">
          <nav className="flex space-x-2 sm:space-x-4">
            {["All", "Next.js", "WordPress", "Shopify"].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === "All" ? null : category.toLowerCase())}
                className={`px-3 py-2 text-sm sm:text-base rounded-md whitespace-nowrap ${
                  (category === "All" && !selectedCategory) || (selectedCategory === category.toLowerCase())
                    ? "bg-green-600 text-white"
                    : "bg-green-100 text-green-800 hover:bg-green-200"
                }`}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Link href={`/projects/${project.id}`} key={project.id}>
              <motion.div
                ref={(el) => (projectRefs.current[index] = el)}
                className="relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
              >
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 p-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-white/90">{project.description}</p>
                  </div>
                </div>
                <AnimatePresence>
                  {hoveredProject === project.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1, x: cursorPosition.x, y: cursorPosition.y }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="fixed bg-green-600 text-white px-4 py-2 rounded-full font-semibold pointer-events-none z-50"
                      style={{ left: 0, top: 0 }}
                    >
                      Ver proyecto
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

