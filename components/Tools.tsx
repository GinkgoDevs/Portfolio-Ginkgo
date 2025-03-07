"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SiReact, SiNextdotjs, SiWordpress, SiTailwindcss, SiTypescript, SiNodedotjs } from "react-icons/si"

gsap.registerPlugin(ScrollTrigger)

export default function Tools() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sectionRef.current) {
      gsap.from(".tool-item", {
        opacity: 0,
        scale: 0.8,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center+=100",
          toggleActions: "play none none reverse",
        },
      })
    }
  }, [])

  const tools = [
    { icon: SiReact, name: "React" },
    { icon: SiNextdotjs, name: "Next.js" },
    { icon: SiWordpress, name: "WordPress" },
    { icon: SiTailwindcss, name: "Tailwind CSS" },
    { icon: SiTypescript, name: "TypeScript" },
    { icon: SiNodedotjs, name: "Node.js" },
  ]

  return (
    <section ref={sectionRef} className="py-20 bg-[#293B36]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-green-800">Our Tools</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-6xl mx-auto">
          {tools.map((tool, index) => (
            <div key={index} className="tool-item text-center">
              <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <tool.icon className="w-12 h-12 text-green-600" />
              </div>
              <p className="text-green-800 font-medium">{tool.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

