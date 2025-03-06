import About from "@/components/About"
import Team from "@/components/Team"
import Tools from "@/components/Tools"
import Projects from "@/components/Projects"
import Testimonials from "@/components/Testimonials"
import Contact from "@/components/Contact"
import Hero from "@/components/Hero/Hero"
export default function Home() {
  return (
    <main className="bg-gradient-to-b from-green-100 to-white">
      <Hero />
      <Team />
      <Tools />
      <Projects />
      <Testimonials />
      <Contact />
    </main>
  )
}

