"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Quote } from "lucide-react"

const testimonials = [
  {
    text: "Working with Ginkgo Devs was an amazing experience. They delivered exactly what we needed!",
    author: "John Doe",
    company: "Tech Corp",
  },
  {
    text: "Their attention to detail and technical expertise is outstanding.",
    author: "Jane Smith",
    company: "Digital Solutions",
  },
  // Add more testimonials...
]

export default function Testimonials() {
  const sliderRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      const animation = gsap.to(".testimonial-slide", {
        xPercent: -100 * (testimonials.length - 1),
        duration: testimonials.length * 5,
        ease: "none",
        repeat: -1,
      })

      return () => {
        animation.kill()
      }
    }
  }, [])

  return (
    <section className="py-20 bg-[#293B36] overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-green-800">What Our Clients Say</h2>
        <div ref={sliderRef} className="relative">
          <div ref={containerRef} className="flex" style={{ width: `${testimonials.length * 100}%` }}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-slide w-full px-4"
                style={{ flex: `0 0 ${100 / testimonials.length}%` }}
              >
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <Quote className="w-12 h-12 text-green-600 mb-6" />
                  <p className="text-lg mb-6">{testimonial.text}</p>
                  <div>
                    <p className="font-bold text-green-800">{testimonial.author}</p>
                    <p className="text-green-600">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

