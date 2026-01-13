"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink, Calendar, Users, Code, CheckCircle, Clock, Github, AlertTriangle, Lightbulb, ClipboardList, Palette, Rocket, Zap } from "lucide-react"
import NavbarComponent from "@/components/Hero/Navbar"
import { useTranslation } from "@/contexts/TranslationContext"
import { projects } from "@/data/projects"

export default function ProjectClient({ project }: { project: any }) {
  const [activeImage, setActiveImage] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const { t, locale } = useTranslation()

  useEffect(() => {
    setIsMounted(true)
    // Scroll to top on page load
    window.scrollTo(0, 0)
  }, [])

  // Ensure all required properties exist with proper translations
  const projectWithDefaults = {
    ...project,
    overview:
      locale === "en"
        ? project.overviewEn || "No description available for this project."
        : project.overview || "No hay descripción disponible para este proyecto.",
    technologies: project.technologies || [],
    process:
      locale === "en"
        ? {
          planning: project.process?.planningEn || "Information not available",
          design: project.process?.designEn || "Information not available",
          development: project.process?.developmentEn || "Information not available",
          deployment: project.process?.deploymentEn || "Information not available",
        }
        : {
          planning: project.process?.planning || "Información no disponible",
          design: project.process?.design || "Información no disponible",
          development: project.process?.development || "Información no disponible",
          deployment: project.process?.deployment || "Información no disponible",
        },
    keyFeatures: locale === "en" ? project.keyFeaturesEn || project.keyFeatures || [] : project.keyFeatures || [],
    challenges:
      locale === "en"
        ? (project.challengesEn || project.challenges || []).map((challenge: any) => {
          if (typeof challenge === "object" && challenge !== null) {
            return {
              title: challenge.titleEn || challenge.title,
              description: challenge.descriptionEn || challenge.description,
              solution: challenge.solutionEn || challenge.solution,
            }
          } else {
            return {
              title: challenge,
              description: "",
              solution: "",
            }
          }
        })
        : project.challenges || [],
    images: project.images || [project.image || "/placeholder.svg?height=600&width=800"],
    duration:
      locale === "en"
        ? project.durationEn || project.duration?.replace("meses", "months").replace("mes", "month") || "3 months"
        : project.duration || "3 meses",
    team:
      locale === "en"
        ? project.teamEn ||
        project.team?.replace("desarrolladores", "developers").replace("desarrollador", "developer") ||
        "2 developers"
        : project.team || "2 desarrolladores",
    role:
      locale === "en"
        ? project.roleEn ||
        (project.role === "Desarrollo completo" ? "Complete development" : project.role) ||
        "Complete development"
        : project.role || "Desarrollo completo",
    year: project.year || "2023",
    url: project.url || null,
    githubUrl: project.githubUrl || null,
    category: project.category || "shopify",
  }

  // Ensure there's at least one image
  if (projectWithDefaults.images.length === 0) {
    projectWithDefaults.images = [projectWithDefaults.image || "/placeholder.svg?height=600&width=800"]
  }

  // Get related projects from the data source
  const relatedProjects = projects
    .filter((p) => {
      if (p.id === project.id) return false;
      const pCat = p.category;
      const currentCat = projectWithDefaults.category;

      if (Array.isArray(currentCat)) {
        if (Array.isArray(pCat)) {
          return currentCat.some(cat => pCat.includes(cat));
        }
        return currentCat.includes(pCat);
      }

      if (Array.isArray(pCat)) {
        return pCat.includes(currentCat);
      }

      return pCat === currentCat;
    })
    .slice(0, 3)
    .map((p) => ({
      id: p.id,
      title: locale === "en" ? p.title : p.titleEs || p.title,
      description: locale === "en" ? p.description : p.descriptionEs || p.description,
      image: p.image || "/placeholder.svg?height=400&width=600",
      category: p.category,
    }))

  // Use filtered projects directly
  const filteredRelatedProjects = relatedProjects

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  // Function for smooth scrolling to sections
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()

    if (href.startsWith("/")) {
      // If it's navigation to another page, use router
      window.location.href = href
      return
    }

    // Extract section ID from href
    const targetId = href.startsWith("#") ? href.substring(1) : href
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      // Calculate offset to account for navbar height
      const navHeight = 80
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navHeight

      // Smooth scroll to section with offset
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      // Update URL without reloading the page
      window.history.pushState(null, "", href)
    }
  }

  if (!isMounted) {
    return null // Avoid server-side rendering for components using animations
  }

  return (
    <main className="min-h-screen bg-[#293B36]">
      {/* Hero Section with Gradient Overlay */}
      <div className="relative h-[50vh] md:h-[70vh] w-full">
        <div className="absolute inset-0 z-0">
          <Image
            src={projectWithDefaults.images[0] || "/placeholder.svg"}
            alt={projectWithDefaults.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#293B36]/70 via-[#293B36]/50 to-[#293B36]" />
        </div>

        {/* Navigation */}
        <NavbarComponent />

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/"
              className="inline-flex items-center text-[#D4F57A] hover:text-[#D4F57A]/80 transition-colors mb-4"
              aria-label={locale === "en" ? "Back to Projects" : "Volver a Proyectos"}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {locale === "en" ? "Back to Projects" : "Volver a Proyectos"}
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-heading">{projectWithDefaults.title}</h1>
            <p className="text-xl text-white/80 max-w-2xl">{projectWithDefaults.description}</p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        className="container mx-auto px-4 py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content - 8 columns */}
          <div className="lg:col-span-8 space-y-16">
            {/* Project Gallery */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl md:text-3xl font-bold text-[#D4F57A] mb-6 font-heading">
                {locale === "en" ? "Project Gallery" : "Galería del Proyecto"}
              </h2>
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-white/5">
                  <Image
                    src={projectWithDefaults.images[activeImage] || "/placeholder.svg"}
                    alt={`${projectWithDefaults.title} - ${locale === "en" ? "View" : "Vista"} ${activeImage + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Thumbnails */}
                {projectWithDefaults.images.length > 1 && (
                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {projectWithDefaults.images.map((image: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all ${activeImage === index
                          ? "ring-2 ring-[#D4F57A] ring-offset-2 ring-offset-[#293B36]"
                          : "opacity-70 hover:opacity-100"
                          }`}
                        aria-label={locale === "en" ? `View image ${index + 1}` : `Ver imagen ${index + 1}`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${locale === "en" ? "Thumbnail" : "Miniatura"} ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Project Overview */}
            <motion.div className="mb-16" variants={itemVariants}>
              <h2 className="text-2xl md:text-3xl font-bold text-[#D4F57A] mb-6 font-heading">
                {locale === "en" ? "Overview" : "Descripción General"}
              </h2>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-white/80 text-lg">{projectWithDefaults.overview}</p>
              </div>
            </motion.div>

            {/* Project Process */}
            {Object.keys(projectWithDefaults.process).length > 0 && (
              <motion.div className="mb-16" variants={itemVariants}>
                <h2 className="text-2xl md:text-3xl font-bold text-[#D4F57A] mb-8 font-heading">
                  {locale === "en" ? "Project Process" : "Proceso del Proyecto"}
                </h2>
                <div className="relative">
                  {/* Vertical line with sliding effect */}
                  <div className="absolute left-8 top-8 bottom-8 w-0.5 overflow-hidden">
                    {/* Line background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#D4F57A]/30 via-[#D4F57A]/20 to-[#D4F57A]/10"></div>

                    {/* Sliding effect */}
                    <div
                      className="absolute inset-0 bg-[#D4F57A]"
                      style={{
                        clipPath: "polygon(0 0, 100% 0, 100% 20px, 0 20px)",
                        animation: "slideDown 3s infinite linear",
                      }}
                    ></div>

                    {/* Sliding dot */}
                    <div
                      className="absolute w-3 h-3 bg-[#D4F57A] rounded-full left-1/2 -translate-x-1/2"
                      style={{
                        filter: "blur(1px)",
                        boxShadow: "0 0 8px 2px rgba(212, 245, 122, 0.8)",
                        animation: "slideDownDot 3s infinite linear",
                      }}
                    ></div>
                  </div>

                  <div className="space-y-12">
                    {Object.entries(projectWithDefaults.process).map(([phase, description], index) => (
                      <div key={phase} className="relative pl-8 md:pl-24">
                        {/* Connecting Line for mobile adjustments if needed, though the main line works */}

                        {/* Point with effects - centered on the line */}
                        <div className="absolute left-8 top-8 -translate-x-1/2 z-20">
                          <div className="relative">
                            {/* Main circle */}
                            <div className="w-4 h-4 rounded-full bg-[#1E2C29] border-2 border-[#D4F57A] relative z-20 group-hover:scale-125 transition-transform" />
                            {/* Glow effect */}
                            <div className="absolute -inset-2 bg-[#D4F57A]/30 rounded-full blur-md" />
                          </div>
                        </div>

                        {/* Content Card */}
                        <div className="bg-[#1E2C29]/60 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-[#D4F57A]/10 hover:border-[#D4F57A]/40 transition-all duration-300 group relative overflow-hidden hover:shadow-2xl hover:shadow-[#D4F57A]/5 hover:-translate-y-1">

                          {/* Large Watermark Number */}
                          <div className="absolute -right-2 -bottom-6 text-9xl font-bold text-[#FFFFFF]/[0.03] font-heading select-none pointer-events-none group-hover:text-[#D4F57A]/10 transition-colors duration-500">
                            0{index + 1}
                          </div>

                          <div className="flex flex-col md:flex-row gap-6 relative z-10">
                            {/* Icon Box */}
                            <div className="flex-shrink-0">
                              <div className="p-4 rounded-xl bg-gradient-to-br from-[#D4F57A]/20 to-[#D4F57A]/5 text-[#D4F57A] border border-[#D4F57A]/20 shadow-lg shadow-[#D4F57A]/5 ring-1 ring-[#D4F57A]/20 group-hover:scale-110 transition-transform duration-500">
                                {phase === 'planning' && <ClipboardList className="w-8 h-8" />}
                                {phase === 'design' && <Palette className="w-8 h-8" />}
                                {phase === 'development' && <Code className="w-8 h-8" />}
                                {phase === 'deployment' && <Rocket className="w-8 h-8" />}
                                {!['planning', 'design', 'development', 'deployment'].includes(phase) && <CheckCircle className="w-8 h-8" />}
                              </div>
                            </div>

                            <div className="flex-1 pt-1">
                              <h3 className="text-2xl font-bold text-white capitalize mb-3 font-heading flex items-center gap-3">
                                {locale === "en"
                                  ? phase === "planning"
                                    ? "Planning & Strategy"
                                    : phase === "design"
                                      ? "UI/UX Design"
                                      : phase === "development"
                                        ? "Development"
                                        : phase === "deployment"
                                          ? "Deployment & Launch"
                                          : phase
                                  : phase === "planning"
                                    ? "Planificación y Estrategia"
                                    : phase === "design"
                                      ? "Diseño UI/UX"
                                      : phase === "development"
                                        ? "Desarrollo"
                                        : phase === "deployment"
                                          ? "Despliegue y Lanzamiento"
                                          : phase}
                              </h3>
                              <p className="text-[#F5F2EB]/80 leading-relaxed text-lg">{description as React.ReactNode}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Key Features */}
            {projectWithDefaults.keyFeatures && projectWithDefaults.keyFeatures.length > 0 && (
              <motion.div className="mb-16" variants={itemVariants}>
                <h2 className="text-2xl md:text-3xl font-bold text-[#D4F57A] mb-8 font-heading">
                  {locale === "en" ? "Key Features" : "Características Principales"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projectWithDefaults.keyFeatures.map((feature: string, index: number) => (
                    <div
                      key={index}
                      className="group relative p-6 bg-[#1E2C29]/50 backdrop-blur-md rounded-2xl border border-[#D4F57A]/10 hover:border-[#D4F57A]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#D4F57A]/5 overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4F57A]/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#D4F57A]/10 transition-all duration-500" />

                      <div className="flex items-start gap-4 relative z-10">
                        <div className="flex-shrink-0 p-3 rounded-xl bg-[#D4F57A]/10 text-[#D4F57A] group-hover:scale-110 transition-transform duration-300 border border-[#D4F57A]/10">
                          <Zap className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-bold mb-2 font-heading text-lg">
                            {locale === "en" ? `Feature ${index + 1}` : `Característica ${index + 1}`}
                          </h4>
                          <p className="text-[#F5F2EB]/80 leading-relaxed">{feature}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Challenges and Solutions */}
            {projectWithDefaults.challenges && projectWithDefaults.challenges.length > 0 && (
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl md:text-3xl font-bold text-[#D4F57A] mb-6 font-heading">
                  {locale === "en" ? "Challenges and Solutions" : "Desafíos y Soluciones"}
                </h2>
                <div className="space-y-6">
                  {projectWithDefaults.challenges.map((challenge: string | { title: string, description: string, solution: string }, index: number) => (
                    <div
                      key={index}
                      className="bg-[#1E2C29]/50 backdrop-blur-md rounded-2xl p-8 border border-[#D4F57A]/10 hover:border-[#D4F57A]/30 transition-all duration-300 group overflow-hidden relative"
                    >
                      {/* Decorative gradient blob */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4F57A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#D4F57A]/10 transition-all duration-500" />

                      <h3 className="text-xl font-bold text-white mb-6 font-heading relative z-10">
                        {typeof challenge === 'string' ? challenge : challenge.title}
                      </h3>

                      <div className="grid md:grid-cols-2 gap-8 relative z-10">
                        {/* Challenge Side */}
                        <div className="bg-red-500/5 rounded-xl p-5 border border-red-500/10">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
                              <AlertTriangle className="w-5 h-5" />
                            </div>
                            <h4 className="text-red-300/90 font-bold font-heading uppercase text-sm tracking-wider">
                              {locale === "en" ? "The Challenge" : "El Desafío"}
                            </h4>
                          </div>
                          <p className="text-white/80 leading-relaxed">
                            {typeof challenge === 'string' ? challenge : challenge.description}
                          </p>
                        </div>

                        {/* Solution Side */}
                        <div className="bg-[#D4F57A]/5 rounded-xl p-5 border border-[#D4F57A]/10">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-[#D4F57A]/10 text-[#D4F57A]">
                              <Lightbulb className="w-5 h-5" />
                            </div>
                            <h4 className="text-[#D4F57A] font-bold font-heading uppercase text-sm tracking-wider">
                              {locale === "en" ? "Our Solution" : "La Solución"}
                            </h4>
                          </div>
                          <p className="text-white/80 leading-relaxed">
                            {typeof challenge === 'string' ? challenge : challenge.solution}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar - 4 columns */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              {/* Project Details Card */}
              <motion.div
                className="bg-[#1E2C29]/60 backdrop-blur-md rounded-2xl p-8 border border-[#D4F57A]/10 mb-8 overflow-hidden relative"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4F57A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <h3 className="text-xl font-bold text-white mb-6 font-heading sticky z-10 border-b border-[#D4F57A]/10 pb-4">
                  {locale === "en" ? "Project Details" : "Detalles del Proyecto"}
                </h3>
                <div className="space-y-6 relative z-10">
                  <div className="flex items-start gap-4 group">
                    <div className="p-2 rounded-lg bg-[#D4F57A]/10 text-[#D4F57A] group-hover:scale-110 transition-transform">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[#F5F2EB]/50 text-sm font-medium uppercase tracking-wider mb-1">{locale === "en" ? "Year" : "Año"}</p>
                      <p className="text-white font-bold text-lg">{projectWithDefaults.year}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="p-2 rounded-lg bg-[#D4F57A]/10 text-[#D4F57A] group-hover:scale-110 transition-transform">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[#F5F2EB]/50 text-sm font-medium uppercase tracking-wider mb-1">{locale === "en" ? "Duration" : "Duración"}</p>
                      <p className="text-white font-bold text-lg">{projectWithDefaults.duration}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="p-2 rounded-lg bg-[#D4F57A]/10 text-[#D4F57A] group-hover:scale-110 transition-transform">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[#F5F2EB]/50 text-sm font-medium uppercase tracking-wider mb-1">{locale === "en" ? "Team" : "Equipo"}</p>
                      <p className="text-white font-bold text-lg">{projectWithDefaults.team}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="p-2 rounded-lg bg-[#D4F57A]/10 text-[#D4F57A] group-hover:scale-110 transition-transform">
                      <Code className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[#F5F2EB]/50 text-sm font-medium uppercase tracking-wider mb-1">{locale === "en" ? "Role" : "Rol"}</p>
                      <p className="text-white font-bold text-lg">{projectWithDefaults.role}</p>
                    </div>
                  </div>
                </div>

                {/* Project Links */}
                <div className="mt-8 space-y-3 relative z-10">
                  {projectWithDefaults.url && (
                    <a
                      href={projectWithDefaults.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-[#D4F57A] text-[#293B36] rounded-xl font-bold font-heading hover:bg-[#c2e65c] transition-all hover:shadow-[0_0_20px_rgba(212,245,122,0.3)] hover:-translate-y-0.5"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {locale === "en" ? "View Live Project" : "Ver Proyecto en Vivo"}
                    </a>
                  )}
                  {projectWithDefaults.githubUrl && (
                    <a
                      href={projectWithDefaults.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 text-white border border-white/10 rounded-xl font-medium hover:bg-white/10 transition-all hover:-translate-y-0.5"
                    >
                      <Github className="w-4 h-4" />
                      {locale === "en" ? "View Source Code" : "Ver Código Fuente"}
                    </a>
                  )}
                </div>
              </motion.div>

              {/* Technologies Used */}
              {projectWithDefaults.technologies.length > 0 && (
                <motion.div
                  className="bg-[#1E2C29]/60 backdrop-blur-md rounded-2xl p-8 border border-[#D4F57A]/10"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <h3 className="text-xl font-bold text-white mb-6 font-heading">
                    {locale === "en" ? "Technologies Used" : "Tecnologías Utilizadas"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {projectWithDefaults.technologies.map((tech: string, index: number) => (
                      <span
                        key={tech}
                        className="px-4 py-2 rounded-lg bg-[#293B36] text-[#D4F57A] text-sm font-medium border border-[#D4F57A]/20 hover:border-[#D4F57A]/50 hover:shadow-[0_0_15px_rgba(212,245,122,0.1)] transition-all cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* CTA for other projects */}
              <motion.div
                className="mt-8 bg-gradient-to-br from-[#D4F57A]/20 to-[#D4F57A]/5 backdrop-blur-sm rounded-xl p-6"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <h3 className="text-xl font-bold text-white mb-3 font-heading">
                  {locale === "en" ? "Did you like this project?" : "¿Te gustó este proyecto?"}
                </h3>
                <p className="text-white/70 mb-4">
                  {locale === "en"
                    ? "Explore more of our work or contact us to discuss your next project."
                    : "Explora más de nuestro trabajo o contáctanos para discutir tu próximo proyecto."}
                </p>
                <div className="space-y-3">
                  <Link
                    href="/"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-[#D4F57A] text-[#293B36] rounded-lg font-medium hover:bg-[#D4F57A]/90 transition-colors"
                  >
                    {locale === "en" ? "View More Projects" : "Ver Más Proyectos"}
                  </Link>
                  <Link
                    href="/#contact"
                    onClick={(e) => handleSmoothScroll(e, "/#contact")}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors"
                  >
                    {locale === "en" ? "Contact Us" : "Contactar"}
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        <motion.div
          className="mt-24"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#D4F57A] mb-8 font-heading">
            {locale === "en" ? "Related Projects" : "Proyectos Relacionados"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRelatedProjects.length > 0 ? (
              filteredRelatedProjects.map((relatedProject) => (
                <Link key={relatedProject.id} href={`/${locale}/project/${relatedProject.id}`} className="block group">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-white/5">
                    <Image
                      src={relatedProject.image || "/placeholder.svg"}
                      alt={relatedProject.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#293B36] to-transparent opacity-70" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg font-bold text-white font-heading">{relatedProject.title}</h3>
                      <p className="text-sm text-white/70 line-clamp-1">{relatedProject.description}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-white/70">
                  {locale === "en"
                    ? "No related projects found in this category."
                    : "No se encontraron proyectos relacionados en esta categoría."}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Footer with gradient */}
      <div className="mt-16 py-8 bg-gradient-to-t from-[#1E2C29] to-[#293B36]">
        <div className="container mx-auto px-4 text-center">
          <Link
            href="/#contact"
            onClick={(e) => handleSmoothScroll(e, "/#contact")}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#D4F57A] text-[#293B36] rounded-lg font-medium hover:bg-[#D4F57A]/90 transition-colors"
          >
            {locale === "en" ? "Ready to start your project?" : "¿Listo para comenzar tu proyecto?"}
          </Link>
          <p className="mt-6 text-white/50">
            © {new Date().getFullYear()} Ginkgo Devs.{" "}
            {locale === "en" ? "All rights reserved." : "Todos los derechos reservados."}
          </p>
        </div>
      </div>
      <style jsx global>{`
@keyframes slideDown {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}

@keyframes slideDownDot {
  0% {
    top: -10px;
  }
  100% {
    top: 100%;
  }
}
`}</style>
    </main>
  )
}

