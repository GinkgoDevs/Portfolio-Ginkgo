"use client"

import { useEffect } from "react"

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#293B36] p-4">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">Error</h1>
        <h2 className="mb-6 text-2xl font-semibold text-white md:text-3xl">Algo salió mal</h2>
        <p className="mx-auto mb-8 max-w-md text-lg text-white/80">
          Lo sentimos, pero algo salió mal. Por favor, inténtalo de nuevo más tarde.
        </p>
        <button
          onClick={() => reset()}
          className="rounded-lg bg-[#D4F57A] px-6 py-3 font-medium text-[#293B36] transition-colors hover:bg-[#c2e65c] focus:outline-none focus:ring-2 focus:ring-[#D4F57A] focus:ring-offset-2 focus:ring-offset-[#293B36]"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  )
}

