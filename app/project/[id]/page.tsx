import { redirect } from "next/navigation"
import { projects } from "@/data/projects"

export default function ProjectPage({ params }: { params: { id: string } }) {
  const projectId = Number.parseInt(params.id)

  // Buscar el proyecto por ID
  const project = projects.find((p) => p.id === projectId)

  // Si no se encuentra el proyecto, redirigir a la página principal
  if (!project) {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-[#293B36] text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">{project.title}</h1>
        <p className="text-xl mb-8">{project.description}</p>

        <div className="bg-white/10 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-[#D4F57A]">Tecnologías</h2>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map((tech, index) => (
              <span key={index} className="px-3 py-1 bg-[#D4F57A]/20 text-[#D4F57A] rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>

          <h2 className="text-2xl font-semibold mb-4 text-[#D4F57A]">Características</h2>
          <ul className="list-disc pl-5 mb-8 space-y-2">
            {project.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold mb-4 text-[#D4F57A]">Proceso</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(project.process).map(([key, value]) => (
              <div key={key} className="bg-white/5 p-4 rounded-lg">
                <h3 className="font-medium text-[#D4F57A] capitalize mb-2">{key}</h3>
                <p>{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <a
            href="/"
            className="inline-block px-6 py-3 bg-[#D4F57A] text-[#293B36] rounded-lg font-medium hover:bg-[#c2e65c] transition-colors"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  )
}

