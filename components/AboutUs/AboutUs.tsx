"use client"

import { useRef, useState, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import DisintegrationEffect from "./DisintegrationEffect"
import { ShieldCheck, Users, RefreshCw, BookOpen, Sparkles, Smile } from "lucide-react"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const teamMembers = [
  {
    name: "Nicolas Alonso",
    role: "Full Stack Developer",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Federico Valle",
    role: "Full Stack Developer",
    image: "/placeholder.svg?height=400&width=400",
  },
]

const values = [
  {
    title: "Creatividad",
    description: "Diseñamos experiencias únicas y diferenciadoras.",
    icon: <Sparkles className="w-12 h-12" />,
  },
  {
    title: "Diversión",
    description: "Porque mientras creamos, nos divertimos y disfrutamos de nuestro trabajo.",
    icon: <Smile className="w-12 h-12" />,
  },
  {
    title: "Colaboración",
    description:
      "Tanto con los clientes como en el equipo, trabajamos 'codo a codo' para garantizar que el resultado sea perfecto.",
    icon: <Users className="w-12 h-12" />,
  },
  {
    title: "Responsabilidad",
    description: "Nos comprometemos con cada proyecto y cumplimos nuestras promesas.",
    icon: <ShieldCheck className="w-12 h-12" />,
  },
  {
    title: "Adaptabilidad",
    description: "Nos adaptamos rápidamente a nuevas tecnologías y necesidades.",
    icon: <RefreshCw className="w-12 h-12" />,
  },
  {
    title: "Aprendizaje Continuo",
    description: "Nunca dejamos de aprender y mejorar nuestras habilidades.",
    icon: <BookOpen className="w-12 h-12" />,
  },
]

export default function AboutUs() {
  const [showValues, setShowValues] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const teamSectionRef = useRef<HTMLDivElement>(null)
  const valuesSectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !teamSectionRef.current || !valuesSectionRef.current || !titleRef.current) return

    // Crear una timeline para la animación de desintegración
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: true,
        pinSpacing: true,
      },
    })

    // Animar el título para que desaparezca
    tl.to(
      titleRef.current,
      {
        opacity: 0,
        y: -50,
        duration: 0.3,
      },
      0,
    )

    // Animar la sección del equipo para que desaparezca
    tl.to(
      teamSectionRef.current,
      {
        opacity: 0,
        y: -100,
        duration: 0.5,
        onComplete: () => setShowValues(true),
      },
      0.2,
    )

    // Animar la sección de valores para que aparezca
    tl.fromTo(valuesSectionRef.current, { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 0.5 }, 0.5)

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    let isDown = false
    let startX: number
    let scrollLeft: number

    const handleDragStart = (e: MouseEvent | TouchEvent) => {
      isDown = true
      carousel.classList.add("active")
      startX = "touches" in e ? e.touches[0].pageX : e.pageX
      scrollLeft = carousel.scrollLeft
      cancelMomentumTracking()
    }

    const handleDragEnd = () => {
      isDown = false
      carousel.classList.remove("active")
      beginMomentumTracking()
    }

    const handleDragMove = (e: MouseEvent | TouchEvent) => {
      if (!isDown) return
      e.preventDefault()
      const x = "touches" in e ? e.touches[0].pageX : e.pageX
      const dist = x - startX
      carousel.scrollLeft = scrollLeft - dist
    }

    carousel.addEventListener("mousedown", handleDragStart)
    carousel.addEventListener("touchstart", handleDragStart)

    carousel.addEventListener("mousemove", handleDragMove)
    carousel.addEventListener("touchmove", handleDragMove)

    carousel.addEventListener("mouseleave", handleDragEnd)
    carousel.addEventListener("mouseup", handleDragEnd)
    carousel.addEventListener("touchend", handleDragEnd)

    // Momentum scrolling
    let velX = 0
    let momentumID: number

    const beginMomentumTracking = () => {
      cancelMomentumTracking()
      momentumID = requestAnimationFrame(momentumLoop)
    }

    const cancelMomentumTracking = () => {
      cancelAnimationFrame(momentumID)
    }

    const momentumLoop = () => {
      carousel.scrollLeft += velX
      velX *= 0.95
      if (Math.abs(velX) > 0.5) {
        momentumID = requestAnimationFrame(momentumLoop)
      }
    }

    return () => {
      carousel.removeEventListener("mousedown", handleDragStart)
      carousel.removeEventListener("touchstart", handleDragStart)
      carousel.removeEventListener("mousemove", handleDragMove)
      carousel.removeEventListener("touchmove", handleDragMove)
      carousel.removeEventListener("mouseleave", handleDragEnd)
      carousel.removeEventListener("mouseup", handleDragEnd)
      carousel.removeEventListener("touchend", handleDragEnd)
      cancelMomentumTracking()
    }
  }, [])

  return (
    <section id="about-us" ref={sectionRef} className="relative bg-[#293B36] min-h-screen py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#293B36] to-transparent opacity-100" />

      <div className="container mx-auto px-4 relative z-10 min-h-[80vh] flex flex-col justify-center">
        <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-[#D4F57A] text-center mb-16">
          Meet Our Team
        </h2>

        {/* Team Members Grid */}
        <div ref={teamSectionRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative mb-6">
                <div className="w-[300px] h-[300px] rounded-full border-4 border-[#D4F57A] overflow-hidden">
                  <DisintegrationEffect
                    imageSrc={member.image}
                    altText={member.name}
                    index={index}
                    scrollTriggerEnabled={true}
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
              <p className="text-[#F5F2EB]/80">{member.role}</p>
            </div>
          ))}
        </div>

        {/* Values Section - New Design with Carousel */}
        <div
          ref={valuesSectionRef}
          className={`transition-all duration-700 absolute inset-0 flex flex-col justify-center items-center ${showValues ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <div className="max-w-7xl mx-auto w-full px-4">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16">
              {/* Left side - Title */}
              <div className="md:w-1/3">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Nuestros <span className="text-[#D4F57A]">valores</span>
                </h2>
                <div className="w-16 h-1.5 bg-[#D4F57A] rounded-full mb-8"></div>
              </div>

              {/* Right side - Values Carousel */}
              <div className="md:w-2/3 overflow-hidden">
                <div
                  ref={carouselRef}
                  className="flex gap-6 overflow-x-auto pb-8 cursor-grab active:cursor-grabbing carousel"
                >
                  {values.map((value, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-[300px] bg-white/5 backdrop-blur-sm rounded-xl p-8 hover:bg-white/10 transition-all duration-300 card"
                    >
                      <div className="text-[#D4F57A] mb-6">{value.icon}</div>
                      <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                      <p className="text-[#F5F2EB]/80 text-lg">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

