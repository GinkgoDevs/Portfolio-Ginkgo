"use client"
import { useRouter } from "next/navigation"
import CircularGallery from "./CircularGallery/CircularGallery"
import { projects } from "@/data/projects"
import ScrollAnimation from "../ScrollAnimation"
import { useTranslation } from "@/contexts/TranslationContext"

export default function Projects() {
  const router = useRouter()
  const { t, locale } = useTranslation()

  // Formatear proyectos para la galería circular con títulos según el idioma
  const galleryItems = projects.map((project) => ({
    image: project.image || "/placeholder.svg",
    text: locale === "en" ? project.title : project.titleEs || project.title,
    id: project.id,
  }))

  const handleProjectClick = (id) => {
    // Navegar a la ruta correcta incluyendo el locale
    router.push(`/${locale}/project/${id}`)
  }

  return (
    <section id="projects" className="py-20 relative bg-[#293B36]">
      <div className="w-full px-0 mx-0">
        <ScrollAnimation>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#D4F57A] ">{t("home.projects.title")}</h2>
        </ScrollAnimation>

        <ScrollAnimation>
          <div className="w-full px-0 mx-0">
            <div className="h-[400px] sm:h-[500px] md:h-[600px] relative overflow-visible">
              <CircularGallery
                items={galleryItems}
                bend={2}
                textColor="#D4F57A"
                borderRadius={0.05}
                font="bold 16px DM Sans"
                onItemClick={handleProjectClick}
              />
            </div>
            <div className="text-center mt-6 text-white/70">
              <p className="text-sm sm:text-base">{t("home.projects.scrollInstructions")}</p>
              <span className="sr-only">
                Galería de proyectos interactiva. Usa las teclas de flecha izquierda y derecha para navegar entre
                proyectos.
              </span>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}

