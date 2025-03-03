"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { projects } from "@/data/projects"

export default function ProjectDetails() {
  const { id } = useParams()
  const [project, setProject] = useState<any>(null)

  useEffect(() => {
    const projectData = projects.find((p) => p.id.toString() === id)
    setProject(projectData)
  }, [id])

  if (!project) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-green-50">
      <div className="container mx-auto px-4 py-12">
        <Link href="/#projects" className="inline-flex items-center text-green-700 hover:text-green-900 mb-8">
          <ArrowLeft className="mr-2" />
          Back to Projects
        </Link>

        <h1 className="text-4xl font-bold text-green-800 mb-6">{project.title}</h1>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-green-700 mb-4">Project Overview</h2>
            <p className="text-gray-700 mb-6">{project.description}</p>

            <h3 className="text-xl font-semibold text-green-700 mb-3">Technologies Used</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech: string) => (
                <span key={tech} className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold text-green-800 mb-6">Project Process</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(project.process).map(([key, value]) => (
              <div key={key} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-green-700 mb-3 capitalize">{key}</h3>
                <p className="text-gray-700">{value as string}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold text-green-800 mb-6">Key Features</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {project.features.map((feature: string, index: number) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold text-green-800 mb-6">Challenges and Solutions</h2>
          <div className="space-y-6">
            {project.challenges.map((challenge: any, index: number) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-green-700 mb-3">{challenge.title}</h3>
                <p className="text-gray-700 mb-4">{challenge.description}</p>
                <h4 className="text-lg font-semibold text-green-600 mb-2">Solution:</h4>
                <p className="text-gray-700">{challenge.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

