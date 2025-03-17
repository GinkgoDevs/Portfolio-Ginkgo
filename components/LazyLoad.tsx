"use client"

import { useEffect, useState, useRef } from "react"
import type { ReactNode } from "react"

interface LazyLoadProps {
  children: ReactNode
  threshold?: number
  rootMargin?: string
  placeholder?: ReactNode
}

export default function LazyLoad({
  children,
  threshold = 0.1,
  rootMargin = "0px",
  placeholder = <div className="animate-pulse bg-gray-200 rounded-lg h-full w-full min-h-[200px]" />,
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold,
        rootMargin,
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, rootMargin])

  useEffect(() => {
    if (isVisible) {
      // Pequeño retraso para evitar bloquear el hilo principal
      const timer = setTimeout(() => {
        setHasLoaded(true)
      }, 10)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  return (
    <div ref={ref} className="w-full h-full">
      {hasLoaded ? children : placeholder}
    </div>
  )
}

