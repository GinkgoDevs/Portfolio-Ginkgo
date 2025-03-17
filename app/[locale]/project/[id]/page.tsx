import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { projects } from "@/data/projects"
import ProjectClient from "./project-client"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const project = projects.find((p) => p.id === Number.parseInt(params.id))

  if (!project) {
    return {
      title: "Proyecto no encontrado | Ginkgo Devs",
      description: "El proyecto que buscas no existe.",
    }
  }

  return {
    title: `${project.title} | Proyectos | Ginkgo Devs`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Ginkgo Devs`,
      description: project.description,
      images: [{ url: project.image }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Ginkgo Devs`,
      description: project.description,
      images: [project.image],
    },
  }
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const projectId = Number.parseInt(params.id)
  const project = projects.find((p) => p.id === projectId)

  if (!project) {
    notFound()
  }

  return <ProjectClient project={project} />
}

