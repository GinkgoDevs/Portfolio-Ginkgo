"use client"

import { useState } from "react"
import Tools from "@/components/Tools/Tools"
import Projects from "@/components/Projects/Projects"
import Contact from "@/components/Contact"
import Hero from "@/components/Hero/Hero"
import Services from "@/components/Services/Services"
import AboutUs from "@/components/AboutUs/AboutUs"
import Footer from "@/components/Footer"
import AIServicesBanner from "@/components/AIServicesBanner"
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
      <DynamicScrollWrapper />

      <main id="main-content" className="bg-gradient-to-b from-green-100 to-white">
        <Hero />

        <FeaturedProjectBanner />

        <Services />

        <AIServicesBanner />

        <Projects />

        <AboutUs />

        <Tools />

        <Testimonials />

        <LeadMagnet />

        <Contact />
      </main>

      <Footer />
    </MenuContext.Provider>
  )
}
