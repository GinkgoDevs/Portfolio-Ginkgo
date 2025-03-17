"use client"
import { useRouter } from "next/navigation"
import CircularGallery from "./CircularGallery/CircularGallery"
import { projects } from "@/data/projects"
import ScrollAnimation from "../ScrollAnimation"
import { useTranslation } from "@/contexts/TranslationContext"

export default function Projects() {
  const router = useRouter()
  const { locale } = useTranslation()

  // Formatear proyectos para la galería circular
  const galleryItems = projects.map((project) => ({
    image: project.image || "/placeholder.svg",
    text: project.title,
    id: project.id,
  }))

  const handleProjectClick = (id) => {
    // Navegar a la ruta correcta incluyendo el locale
    router.push(`/${locale}/project/${id}`)
  }

  return (
    <section id="projects" className="py-20 relative bg-[#293B36]">
      <div className="container mx-auto px-4">
        <ScrollAnimation>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#D4F57A] mb-12">Nuestros Proyectos</h2>
        </ScrollAnimation>

        <ScrollAnimation>
          <div className="max-w-[1200px] mx-auto">
            <div className="h-[400px] sm:h-[500px] md:h-[600px] relative rounded-xl overflow-hidden">
              <CircularGallery
                items={galleryItems}
                bend={3}
                textColor="#D4F57A"
                borderRadius={0.05}
                font="bold 16px DM Sans"
                onItemClick={handleProjectClick}
              />
            </div>
            <div className="text-center mt-6 text-white/70">
              <p className="text-sm sm:text-base">Desliza o arrastra para navegar por los proyectos</p>
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

