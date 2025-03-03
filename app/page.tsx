import Hero from "@/components/Hero"
import About from "@/components/About"
import Team from "@/components/Team"
import Tools from "@/components/Tools"
import Projects from "@/components/Projects"
import Testimonials from "@/components/Testimonials"
import Contact from "@/components/Contact"

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-green-100 to-white">
      <Hero />
      <About />
      <Team />
      <Tools />
      <Projects />
      <Testimonials />
      <Contact />
    </main>
  )
}

