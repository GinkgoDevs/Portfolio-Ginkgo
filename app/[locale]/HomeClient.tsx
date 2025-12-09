"use client"

import { useState } from "react"
import Tools from "@/components/Tools/Tools"
import Projects from "@/components/Projects/Projects"
import Contact from "@/components/Contact"
import Hero from "@/components/Hero/Hero"
import Services from "@/components/Services/Services"
import AboutUs from "@/components/AboutUs/AboutUs"
import Footer from "@/components/Footer"
import ScrollProgressBar from "@/components/ScrollProgressBar"
import DynamicScrollWrapper from "./DynamicScrollWrapper"
import { MenuContext } from "@/components/Hero/Navbar"
import StructuredData from "@/components/StructuredData"
import FeaturedProjectBanner from "@/components/FeaturedProjectBanner"
import LeadMagnet from "@/components/LeadMagnet"
import Testimonials from "@/components/Testimonials"

export default function HomeClient() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <MenuContext.Provider value={{ isMenuOpen }}>
      <StructuredData />
      <ScrollProgressBar />
      <DynamicScrollWrapper />

      <main id="main-content" className="bg-gradient-to-b from-green-100 to-white">
        <Hero />

        <FeaturedProjectBanner />

        <section aria-labelledby="servicios-heading">
          <h2 id="servicios-heading" className="sr-only">
            Nuestros servicios
          </h2>
          <Services />
        </section>

        <section aria-labelledby="proyectos-heading">
          <h2 id="proyectos-heading" className="sr-only">
            Nuestros proyectos
          </h2>
          <Projects />
        </section>

        <section aria-labelledby="nosotros-heading">
          <h2 id="nosotros-heading" className="sr-only">
            Sobre nosotros
          </h2>
          <AboutUs />
        </section>

        <section aria-labelledby="herramientas-heading">
          <h2 id="herramientas-heading" className="sr-only">
            Nuestras herramientas
          </h2>
          <Tools />
        </section>

        <section aria-labelledby="testimonios-heading">
          <h2 id="testimonios-heading" className="sr-only">
            Testimonios
          </h2>
          <Testimonials />
        </section>

        <LeadMagnet />

        <section aria-labelledby="contacto-heading">
          <h2 id="contacto-heading" className="sr-only">
            Contacto
          </h2>
          <Contact />
        </section>
      </main>

      <Footer />
    </MenuContext.Provider>
  )
}
