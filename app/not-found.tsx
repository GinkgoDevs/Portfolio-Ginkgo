import Link from "next/link"
import { defaultLocale } from "@/i18n.config"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#293B36] text-white p-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Página no encontrada</h2>
      <p className="text-lg mb-8 text-center max-w-md">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <Link
        href={`/${defaultLocale}`}
        className="px-6 py-3 bg-[#D4F57A] text-[#293B36] rounded-lg font-medium hover:bg-[#c2e65c] transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  )
}

