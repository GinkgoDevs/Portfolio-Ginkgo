"use client"
import CircularGallery from "./CircularGallery/CircularGallery"
import { projects } from "@/data/projects"

export default function Projects() {
  // Format projects for the circular gallery
  const galleryItems = projects.map((project) => ({
    image: project.image || "/placeholder.svg",
    text: project.title,
  }))

  return (
    <section id="projects" className="py-20 relative bg-[#293B36]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#D4F57A]">Nuestros Proyectos</h2>

        <div className="">
          <div className="h-[600px] relative rounded-xl overflow-hidden">
            <CircularGallery
              items={galleryItems}
              bend={3}
              textColor="#D4F57A"
              borderRadius={0.05}
              font="bold 30px DM Sans"
            />
          </div>
          <div className="text-center mt-6 text-white/70">
            <p>Desliza o arrastra para navegar por los proyectos</p>
          </div>
        </div>
      </div>
    </section>
  )
}

