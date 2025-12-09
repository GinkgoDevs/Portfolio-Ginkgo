import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { projects } from "@/data/projects"
import ProjectClient from "./project-client"

export async function generateMetadata({ params }: { params: Promise<{ id: string; locale: string }> }): Promise<Metadata> {
  const { id, locale } = await params
  const project = projects.find((p) => p.id === Number.parseInt(id))
  const isEnglish = locale === "en"

  if (!project) {
    return {
      title: isEnglish ? "Project not found | Ginkgo Devs" : "Proyecto no encontrado | Ginkgo Devs",
      description: isEnglish ? "The project you're looking for doesn't exist." : "El proyecto que buscas no existe.",
    }
  }

  const title = isEnglish
    ? `${project.title} | Projects | Ginkgo Devs`
    : `${project.titleEs || project.title} | Proyectos | Ginkgo Devs`

  const description = isEnglish ? project.description : project.descriptionEs || project.description

  return {
    title,
    description,
    openGraph: {
      title: isEnglish ? `${project.title} | Ginkgo Devs` : `${project.titleEs || project.title} | Ginkgo Devs`,
      description,
      images: [{ url: project.image }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: isEnglish ? `${project.title} | Ginkgo Devs` : `${project.titleEs || project.title} | Ginkgo Devs`,
      description,
      images: [project.image],
    },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id } = await params
  const projectId = Number.parseInt(id)
  const project = projects.find((p) => p.id === projectId)

  if (!project) {
    notFound()
  }

  return <ProjectClient project={project} />
}

