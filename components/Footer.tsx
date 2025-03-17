"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Instagram, Linkedin, Github, Mail, MapPin, Phone, ChevronDown, ChevronUp } from "lucide-react"
import { validateEnv } from "@/lib/env"
import { useTranslation } from "@/contexts/TranslationContext"

export default function Footer() {
  const env = validateEnv()
  const { locale } = useTranslation()

  // Filtrar solo las redes sociales que tienen URL
  const socialLinks = [
    { icon: Linkedin, href: env.socialLinks.linkedin, label: "LinkedIn" },
    { icon: Instagram, href: env.socialLinks.instagram, label: "Instagram" },
    { icon: Github, href: env.socialLinks.github, label: "GitHub" },
  ].filter((link) => link.href)

  const contactInfo = [
    { icon: Mail, text: env.contact.email },
    { icon: Phone, text: env.contact.phone },
    { icon: MapPin, text: "Buenos Aires, Argentina" },
  ]

  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (title: string) => {
    if (expandedSection === title) {
      setExpandedSection(null)
    } else {
      setExpandedSection(title)
    }
  }

  // Función para manejar el scroll suave a las secciones
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()

    // Extraer el ID de la sección del href
    const targetId = href.startsWith("#") ? href.substring(1) : href
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      // Calcular offset para tener en cuenta la altura de la barra de navegación
      const navHeight = 80 // Altura aproximada de la barra de navegación
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navHeight

      // Scroll suave a la sección con offset
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      // Actualizar la URL sin recargar la página
      window.history.pushState(null, "", href)
    }
  }

  // Función para determinar el href basado en el nombre del elemento
  const getLinkHref = (item: string) => {
    switch (item) {
      case "Desarrollo Web":
      case "Apps Móviles":
      case "UI/UX Design":
      case "Consultoría":
        return "#services"
      case "Sobre Nosotros":
        return "#about-us"
      case "Proyectos":
        return "#projects"
      case "Blog":
      case "Carreras":
      case "Contacto":
        return "#contact"
      default:
        return "#"
    }
  }

  const links = [
    {
      title: "Servicios",
      items: ["Desarrollo Web", "Apps Móviles", "UI/UX Design", "Consultoría"],
    },
    {
      title: "Compañía",
      items: ["Sobre Nosotros", "Proyectos", "Blog", "Carreras"],
    },
    {
      title: "Recursos",
      items: ["Contacto"],
    },
  ]

  return (
    <footer className="bg-[#1E2C29] text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-12 gap-8 pb-8">
          {/* Logo and Social - 4 columns */}
          <div className="lg:col-span-4">
            <Link href="#home" onClick={(e) => handleSmoothScroll(e, "#home")}>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/descarga-BNlNhb9dAxkJ2cjd8OiX1bfCcJiRqu.png"
                alt="Ginkgo Devs Logo"
                width={200}
                height={129}
                className="mb-6"
              />
            </Link>
            <p className="text-[#F5F2EB]/60 mb-6">
              Transformamos ideas en soluciones digitales innovadoras y escalables.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F5F2EB]/60 hover:text-[#D4F57A] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4F57A]"
                  aria-label={`Visitar ${social.label}`}
                >
                  <social.icon className="w-5 h-5" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Links - 6 columns */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {links.map((section) => (
              <div key={section.title}>
                <h3 className="text-[#D4F57A] font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item}>
                      <Link
                        href={getLinkHref(item)}
                        onClick={(e) => handleSmoothScroll(e, getLinkHref(item))}
                        className="text-[#F5F2EB]/60 hover:text-[#D4F57A] transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Info - 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="text-[#D4F57A] font-semibold mb-4">Contacto</h3>
            <ul className="space-y-4">
              {contactInfo.map((info) => (
                <li key={info.text} className="flex items-center gap-2 text-[#F5F2EB]/60">
                  <info.icon className="w-4 h-4 text-[#D4F57A]" />
                  <span>{info.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile Layout - Compact Accordion Style */}
        <div className="md:hidden">
          {/* Logo and description */}
          <div className="flex flex-col items-center text-center mb-6">
            <Link href="#home" onClick={(e) => handleSmoothScroll(e, "#home")}>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/descarga-BNlNhb9dAxkJ2cjd8OiX1bfCcJiRqu.png"
                alt="Ginkgo Devs Logo"
                width={150}
                height={97}
                className="mb-4"
              />
            </Link>
            <p className="text-[#F5F2EB]/60 text-sm mb-4 max-w-xs">
              Transformamos ideas en soluciones digitales innovadoras y escalables.
            </p>
            <div className="flex space-x-5 mb-2">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F5F2EB]/60 hover:text-[#D4F57A] transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Contact info - always visible */}
          <div className="flex justify-center flex-wrap gap-4 mb-6">
            {contactInfo.map((info) => (
              <div key={info.text} className="flex items-center gap-1 text-[#F5F2EB]/60 text-sm">
                <info.icon className="w-3 h-3 text-[#D4F57A]" />
                <span>{info.text}</span>
              </div>
            ))}
          </div>

          {/* Collapsible sections */}
          <div className="space-y-2 mb-6">
            {links.map((section) => (
              <div key={section.title} className="border-b border-white/10 pb-2">
                <button
                  onClick={() => toggleSection(section.title)}
                  className="flex items-center justify-between w-full py-2 text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4F57A]"
                  aria-expanded={expandedSection === section.title}
                  aria-controls={`section-${section.title}`}
                >
                  <h3 className="text-[#D4F57A] font-semibold text-sm">{section.title}</h3>
                  {expandedSection === section.title ? (
                    <ChevronUp className="w-4 h-4 text-[#D4F57A]" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#D4F57A]" aria-hidden="true" />
                  )}
                </button>
                {expandedSection === section.title && (
                  <ul id={`section-${section.title}`} className="grid grid-cols-2 gap-x-4 gap-y-2 py-2">
                    {section.items.map((item) => (
                      <li key={item}>
                        <Link
                          href={getLinkHref(item)}
                          onClick={(e) => handleSmoothScroll(e, getLinkHref(item))}
                          className="text-[#F5F2EB]/60 text-sm hover:text-[#D4F57A] transition-colors"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar - Same for both layouts */}
        <div className="border-t border-white/10 pt-4 mt-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-[#F5F2EB]/60 text-xs sm:text-sm mb-4 sm:mb-0 text-center sm:text-left">
              © {new Date().getFullYear()} Ginkgo Devs. Todos los derechos reservados.
            </p>
            <div className="flex space-x-4">
              <Link
                href={`/${locale}/terms`}
                className="text-[#F5F2EB]/60 hover:text-[#D4F57A] text-xs sm:text-sm transition-colors"
              >
                Términos
              </Link>
              <Link
                href={`/${locale}/privacy-policy`}
                className="text-[#F5F2EB]/60 hover:text-[#D4F57A] text-xs sm:text-sm transition-colors"
              >
                Privacidad
              </Link>
              <Link
                href={`/${locale}/cookies-policy`}
                className="text-[#F5F2EB]/60 hover:text-[#D4F57A] text-xs sm:text-sm transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

