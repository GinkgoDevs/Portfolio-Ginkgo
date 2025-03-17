"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

const ScrollToSectionWrapper = dynamic(() => import("@/components/ScrollToSection"), { ssr: false })

export default function DynamicScrollWrapper() {
  return (
    <Suspense fallback={null}>
      <ScrollToSectionWrapper />
    </Suspense>
  )
}

