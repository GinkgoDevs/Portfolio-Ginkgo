"use client"

import type React from "react"
import { useState } from "react"
import { useTranslation } from "@/contexts/TranslationContext"

export default function SkipToContent() {
  const { t } = useTranslation()
  const [isFocused, setIsFocused] = useState(false)

  const handleSkip = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const mainContent = document.getElementById("main-content")
    if (mainContent) {
      mainContent.tabIndex = -1
      mainContent.focus()
      setTimeout(() => {
        mainContent.removeAttribute("tabindex")
      }, 1000)
    }
  }

  return (
    <a
      href="#main-content"
      onClick={handleSkip}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={`
        fixed top-4 left-1/2 transform -translate-x-1/2 z-50
        bg-[#D4F57A] text-[#293B36] font-bold py-2 px-4 rounded-lg
        transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4F57A]
        ${isFocused ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
    >
      {t("accessibility.skipToContent")}
    </a>
  )
}

