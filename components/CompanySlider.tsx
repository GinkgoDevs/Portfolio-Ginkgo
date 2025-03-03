"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function CompanySlider() {
  const sliderRef = useRef<HTMLDivElement>(null)
  const firstRowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (firstRowRef.current) {
      const animation = gsap.to(firstRowRef.current, {
        x: "-50%",
        duration: 20,
        ease: "none",
        repeat: -1,
      })

      const handleMouseEnter = () => {
        gsap.to(animation, { timeScale: 0, duration: 0.5 })
      }

      const handleMouseLeave = () => {
        gsap.to(animation, { timeScale: 1, duration: 0.5 })
      }

      sliderRef.current?.addEventListener("mouseenter", handleMouseEnter)
      sliderRef.current?.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        sliderRef.current?.removeEventListener("mouseenter", handleMouseEnter)
        sliderRef.current?.removeEventListener("mouseleave", handleMouseLeave)
        animation.kill()
      }
    }
  }, [])

  const companies = [
    "Company 1",
    "Company 2",
    "Company 3",
    "Company 4",
    "Company 5",
    "Company 6",
    "Company 7",
    "Company 8",
  ]

  return (
    <div className="py-20 bg-white overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-12 text-green-800">Companies We've Worked With</h2>
      <div ref={sliderRef} className="relative">
        <div ref={firstRowRef} className="flex space-x-12 whitespace-nowrap">
          {[...companies, ...companies].map((company, index) => (
            <div
              key={`${company}-${index}`}
              className="inline-flex items-center justify-center w-48 h-24 bg-green-50 rounded-lg transition-transform duration-300 hover:scale-110"
            >
              <span className="text-green-700 font-semibold">{company}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

