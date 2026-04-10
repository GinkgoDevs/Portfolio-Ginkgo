"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { projects } from "@/data/projects"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "@/contexts/TranslationContext"
import ScrollAnimation from "../ScrollAnimation"

export default function Projects() {
  const { t, locale } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [visibleCount, setVisibleCount] = useState(6)
  const containerRef = useRef<HTMLDivElement>(null)

  const categories = [
    { id: "all", label: t("home.projects.categories.all") },
    { id: "next", label: t("home.projects.categories.next") },
    { id: "wordpress", label: t("home.projects.categories.wordpress") },
    { id: "shopify", label: t("home.projects.categories.shopify") }
  ]

  const handleMouseMove = (e: MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY })
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const allFilteredProjects = selectedCategory
    ? projects.filter((project) => {
      const projectCategory = project.category;
      if (Array.isArray(projectCategory)) {
        return projectCategory.some(cat => cat.toLowerCase() === selectedCategory.toLowerCase());
      }
      return projectCategory?.toLowerCase() === selectedCategory.toLowerCase();
    })
    : projects

  const filteredProjects = allFilteredProjects.slice(0, visibleCount)
  const hasMore = visibleCount < allFilteredProjects.length

  return (
    <section id="projects" className="py-24 relative bg-[#293B36] overflow-hidden" ref={containerRef}>
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#D4F57A]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-white/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <ScrollAnimation>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 font-heading tracking-tight">
              {t("home.projects.title")}
            </h2>
            <div className="w-24 h-1.5 bg-[#D4F57A] mx-auto rounded-full mb-8" />
            <p className="text-[#F5F2EB]/70 text-lg md:text-xl max-w-2xl mx-auto font-light">
              {t("home.projects.subtitle")}
            </p>
          </ScrollAnimation>
        </div>

        {/* Categories / Filter */}
        <ScrollAnimation>
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id === "all" ? null : cat.id)
                  setVisibleCount(6) // Reset count when changing category
                }}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${(cat.id === "all" && !selectedCategory) || selectedCategory === cat.id
                  ? "bg-[#D4F57A] border-[#D4F57A] text-[#293B36] shadow-[0_10px_20px_-5px_rgba(212,245,122,0.3)]"
                  : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollAnimation>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link
                  href={`/${locale}/project/${project.id}`}
                  className="group block relative rounded-[2.5rem] overflow-hidden bg-white/5 border border-white/10 aspect-[4/5] sm:aspect-square md:aspect-[4/5] shadow-2xl"
                  onMouseEnter={() => setHoveredProject(project.id as number)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1 grayscale-[20%] group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                  />

                  {/* Glass Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#293B36] via-[#293B36]/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                  <div className="absolute inset-0 flex flex-col justify-end p-8 z-10">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="inline-block px-3 py-1 rounded-full bg-[#D4F57A]/90 text-[#293B36] text-[10px] font-bold uppercase tracking-wider mb-3">
                        {Array.isArray(project.category) ? project.category.join(" / ") : project.category}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                        {locale === 'en' ? project.title : (project.titleEs || project.title)}
                      </h3>
                      <p className="text-white/80 line-clamp-2 text-sm font-light leading-relaxed opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500 delay-100 sm:opacity-100 sm:mt-1 md:opacity-0 md:mt-0">
                        {locale === 'en' ? project.description : (project.descriptionEs || project.description)}
                      </p>
                    </div>
                  </div>

                  {/* Border Hover Effect */}
                  <div className="absolute inset-0 border-2 border-[#D4F57A]/0 group-hover:border-[#D4F57A]/30 rounded-[2.5rem] transition-all duration-500 pointer-events-none" />
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        {hasMore && (
          <ScrollAnimation>
            <div className="mt-16 text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setVisibleCount(prev => prev + 6)}
                className="group relative px-8 py-4 bg-transparent border-2 border-[#D4F57A] text-[#D4F57A] rounded-full font-bold overflow-hidden transition-all duration-300 hover:text-[#293B36]"
              >
                <span className="relative z-10">{t("home.projects.loadMore")}</span>
                <motion.div
                  className="absolute inset-0 bg-[#D4F57A] -translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                  aria-hidden="true"
                />
              </motion.button>
            </div>
          </ScrollAnimation>
        )}
      </div>

      {/* Premium Custom Cursor Follower */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: cursorPosition.x - 60,
              y: cursorPosition.y - 60
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.5 }}
            className="fixed top-0 left-0 w-32 h-32 bg-[#D4F57A] rounded-full flex items-center justify-center font-bold text-[#293B36] text-xs uppercase tracking-widest pointer-events-none z-[100] shadow-[0_0_50px_rgba(212,245,122,0.4)] backdrop-blur-sm bg-opacity-90"
          >
            <div className="text-center">
              <span>{t("home.projects.viewProject")}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
