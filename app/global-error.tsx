"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="es">
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#293B36] text-white p-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Error</h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Algo salió mal</h2>
          <p className="text-lg mb-8 text-center max-w-md">
            Lo sentimos, pero algo salió mal. Por favor, inténtalo de nuevo más tarde.
          </p>
          <button
            onClick={reset}
            className="px-6 py-3 bg-[#D4F57A] text-[#293B36] rounded-lg font-medium hover:bg-[#c2e65c] transition-colors"
          >
            Intentar de nuevo
          </button>
        </div>
      </body>
    </html>
  )
}

