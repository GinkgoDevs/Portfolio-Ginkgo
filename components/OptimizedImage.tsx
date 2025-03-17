"use client"

import Image from "next/image"
import { useState } from "react"
import type { ImageProps } from "next/image"

interface OptimizedImageProps extends Omit<ImageProps, "onError" | "onLoad"> {
  fallbackSrc?: string
}

export default function OptimizedImage({ src, alt, fallbackSrc = "/placeholder.svg", ...props }: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className={`relative ${props.className || ""} ${isLoaded ? "" : "bg-gray-200 animate-pulse"}`}>
      <Image
        {...props}
        className={`${props.className || ""} transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        src={imgSrc || "/placeholder.svg"}
        alt={alt}
        onError={() => setImgSrc(fallbackSrc)}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
        sizes={props.sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        quality={props.quality || 75}
      />
    </div>
  )
}

