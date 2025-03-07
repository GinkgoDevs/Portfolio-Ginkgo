import Tools from "@/components/Tools"
import Projects from "@/components/Projects/Projects"
import Testimonials from "@/components/Testimonials"
import Contact from "@/components/Contact"
import Hero from "@/components/Hero/Hero"
import Services from "@/components/Services"
import AboutUs from "@/components/AboutUs"

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-green-100 to-white">
      <Hero />
      <Services />
      <AboutUs />
      <Tools />
      <Projects />
      <Testimonials />
      <Contact />
    </main>
  )
}

